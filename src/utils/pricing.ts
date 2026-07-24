import type { Product, SelectedItems } from '../types/product';
import { FINANCING_RATE } from '../constants';

/**
 * Calculates the total original price of all selected items.
 * If an item has a compareAtPrice, that is used. Otherwise, its regular price is used.
 */
export const calculateOriginalPrice = (
  selectedItems: SelectedItems,
  products: Product[]
): number => {
  let total = 0;

  Object.entries(selectedItems).forEach(([productId, selection]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    Object.entries(selection.variants).forEach(([, quantity]) => {
      if (quantity <= 0) return;
      const originalUnitPrice = product.compareAtPrice !== null ? product.compareAtPrice : product.price;
      total += quantity * originalUnitPrice;
    });
  });

  return Number(total.toFixed(2));
};

/**
 * Calculates the total actual subtotal of all selected items based on their current unit prices.
 */
export const calculateSubtotal = (
  selectedItems: SelectedItems,
  products: Product[]
): number => {
  let total = 0;

  Object.entries(selectedItems).forEach(([productId, selection]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    Object.entries(selection.variants).forEach(([, quantity]) => {
      if (quantity <= 0) return;
      total += quantity * product.price;
    });
  });

  return Number(total.toFixed(2));
};

/**
 * Calculates the total savings amount (Original Price - Subtotal).
 */
export const calculateSavings = (originalPrice: number, subtotal: number): number => {
  const savings = originalPrice - subtotal;
  return savings > 0 ? Number(savings.toFixed(2)) : 0;
};

/**
 * Calculates the monthly financing cost (e.g. over 12 months with a standard interest rate).
 * In the mockups, $187.89 subtotal corresponds to $19.19/mo, which is approximately 10.213% of the subtotal.
 */
export const calculateMonthly = (subtotal: number): number => {
  if (subtotal <= 0) return 0;
  const monthly = subtotal * FINANCING_RATE;
  return Number(monthly.toFixed(2));
};
