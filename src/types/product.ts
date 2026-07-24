export interface Variant {
  id: string;
  name: string;
}

export type CategoryType = 'cameras' | 'plan' | 'sensors' | 'accessories';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  price: number;
  compareAtPrice: number | null;
  badge: string | null;
  image: string;
  variants: Variant[];
}

export interface SelectedItem {
  variants: {
    [variantId: string]: number; // variantId (or "default" for no-variant items) -> quantity
  };
}

export interface SelectedItems {
  [productId: string]: SelectedItem;
}
