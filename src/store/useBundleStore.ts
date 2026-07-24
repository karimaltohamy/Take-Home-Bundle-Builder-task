import { create } from 'zustand';
import type { BundleState } from '../types/store';
import type { Product, SelectedItems } from '../types/product';
import productsData from '../data/products.json';
import { TOTAL_STEPS } from '../constants';

// Helper to cast the JSON mock data to Product[]
const products = productsData as Product[];

// Helper to initialize active variants to the first variant if available
const getInitialActiveVariants = (productsList: Product[]) => {
  const initial: { [productId: string]: string } = {};
  productsList.forEach((product) => {
    if (product.variants && product.variants.length > 0) {
      initial[product.id] = product.variants[0].id;
    }
  });
  return initial;
};

// Helper to dynamically adjust the quantity of the required Sensor Hub
const adjustSensorHubQuantity = (selected: SelectedItems, productsList: Product[]) => {
  const sensorHubId = 'wyze-sense-hub';
  let totalSensorsQty = 0;

  Object.entries(selected).forEach(([productId, selection]) => {
    const product = productsList.find((p) => p.id === productId);
    if (product && product.category === 'sensors' && productId !== sensorHubId) {
      Object.values(selection.variants).forEach((qty) => {
        totalSensorsQty += qty;
      });
    }
  });

  if (totalSensorsQty > 0) {
    selected[sensorHubId] = {
      variants: {
        default: 1
      }
    };
  } else {
    delete selected[sensorHubId];
  }
};

export const useBundleStore = create<BundleState>((set, get) => ({
  products: products,
  selectedItems: {},
  activeVariants: getInitialActiveVariants(products),
  currentAccordionStep: 1,

  increaseQuantity: (productId: string, variantId: string) => {
    set((state) => {
      const updatedSelected = JSON.parse(JSON.stringify(state.selectedItems)) as SelectedItems;

      if (!updatedSelected[productId]) {
        updatedSelected[productId] = { variants: {} };
      }

      const product = state.products.find((p) => p.id === productId);
      if (!product) return state;

      // Rule: Plans are mutually exclusive
      if (product.category === 'plan') {
        // Remove all other plans
        state.products.forEach((p) => {
          if (p.category === 'plan') {
            delete updatedSelected[p.id];
          }
        });
        
        // Add this plan with quantity 1
        updatedSelected[productId] = {
          variants: {
            [variantId]: 1
          }
        };
      } else {
        const currentQty = updatedSelected[productId].variants[variantId] || 0;
        updatedSelected[productId].variants[variantId] = currentQty + 1;
      }

      // Rule: Sensor Hub auto-insertion/removal
      adjustSensorHubQuantity(updatedSelected, state.products);

      return { selectedItems: updatedSelected };
    });
  },

  decreaseQuantity: (productId: string, variantId: string) => {
    set((state) => {
      const updatedSelected = JSON.parse(JSON.stringify(state.selectedItems)) as SelectedItems;
      if (!updatedSelected[productId]) return state;

      const currentQty = updatedSelected[productId].variants[variantId] || 0;
      if (currentQty <= 1) {
        delete updatedSelected[productId].variants[variantId];
        
        // Clean up the parent product entry if it has no selected variants left
        if (Object.keys(updatedSelected[productId].variants).length === 0) {
          delete updatedSelected[productId];
        }
      } else {
        updatedSelected[productId].variants[variantId] = currentQty - 1;
      }

      // Rule: Sensor Hub auto-insertion/removal
      adjustSensorHubQuantity(updatedSelected, state.products);

      return { selectedItems: updatedSelected };
    });
  },

  changeVariant: (productId: string, variantId: string) => {
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId
      }
    }));
  },

  nextStep: () => {
    set((state) => ({
      currentAccordionStep: Math.min(state.currentAccordionStep + 1, TOTAL_STEPS)
    }));
  },

  previousStep: () => {
    set((state) => ({
      currentAccordionStep: Math.max(state.currentAccordionStep - 1, 1)
    }));
  },

  toggleAccordion: (stepNumber: number) => {
    set({
      currentAccordionStep: stepNumber
    });
  },

  saveBundle: () => {
    const { selectedItems, activeVariants, currentAccordionStep } = get();
    const dataToSave = {
      selectedItems,
      activeVariants,
      currentAccordionStep
    };
    localStorage.setItem('wyze_bundle_builder_state', JSON.stringify(dataToSave));
  },

  loadBundle: () => {
    const saved = localStorage.getItem('wyze_bundle_builder_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          selectedItems?: SelectedItems;
          activeVariants?: { [productId: string]: string };
          currentAccordionStep?: number;
        };
        
        const initialVariants = getInitialActiveVariants(get().products);
        const selectedItems = parsed.selectedItems || {};
        
        // Ensure sensor hub is present if sensors are selected
        adjustSensorHubQuantity(selectedItems, get().products);
        
        set({
          selectedItems,
          activeVariants: { ...initialVariants, ...(parsed.activeVariants || {}) },
          currentAccordionStep: parsed.currentAccordionStep || 1
        });
      } catch (e) {
        console.error('Error restoring state from localStorage:', e);
      }
    }
  },

  clearBundle: () => {
    const initialVariants = getInitialActiveVariants(get().products);
    set({
      selectedItems: {},
      activeVariants: initialVariants,
      currentAccordionStep: 1
    });
    localStorage.removeItem('wyze_bundle_builder_state');
  }
}));
