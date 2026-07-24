import { useMemo } from 'react';
import { useBundleStore } from '../store/useBundleStore';
import type { CategoryType } from '../types/product';

/**
 * Returns the total quantity of selected items for a given category.
 * Memoized to avoid unnecessary recalculations on unrelated state changes.
 */
export const useSelectedCount = (category: CategoryType): number => {
  const products = useBundleStore((state) => state.products);
  const selectedItems = useBundleStore((state) => state.selectedItems);

  return useMemo(() => {
    let count = 0;
    Object.entries(selectedItems).forEach(([productId, selection]) => {
      const product = products.find((p) => p.id === productId);
      if (product && product.category === category) {
        Object.values(selection.variants).forEach((qty) => {
          count += qty;
        });
      }
    });
    return count;
  }, [selectedItems, products, category]);
};

/**
 * Returns the total count of all selected items across all categories.
 */
export const useTotalSelectedCount = (): number => {
  const selectedItems = useBundleStore((state) => state.selectedItems);

  return useMemo(() => {
    let count = 0;
    Object.values(selectedItems).forEach((selection) => {
      Object.values(selection.variants).forEach((qty) => {
        count += qty;
      });
    });
    return count;
  }, [selectedItems]);
};
