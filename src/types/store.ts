import type { Product, SelectedItems } from './product';

export interface BundleState {
  products: Product[];
  selectedItems: SelectedItems;
  activeVariants: { [productId: string]: string }; // Tracks the currently active variant selection for each product card
  currentAccordionStep: number; // 1 to 4
  
  // Actions
  increaseQuantity: (productId: string, variantId: string) => void;
  decreaseQuantity: (productId: string, variantId: string) => void;
  changeVariant: (productId: string, variantId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  toggleAccordion: (stepNumber: number) => void;
  saveBundle: () => void;
  loadBundle: () => void;
  clearBundle: () => void;
}
