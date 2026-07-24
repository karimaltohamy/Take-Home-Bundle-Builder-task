import type { CategoryType } from '../types/product';

export interface AccordionStepConfig {
  stepNumber: number;
  title: string;
  category: CategoryType;
  nextLabel: string | null;
}

export const ACCORDION_STEPS: AccordionStepConfig[] = [
  {
    stepNumber: 1,
    title: 'Choose your cameras',
    category: 'cameras',
    nextLabel: 'Next: Choose your plan',
  },
  {
    stepNumber: 2,
    title: 'Choose your plan',
    category: 'plan',
    nextLabel: 'Next: Choose your sensors',
  },
  {
    stepNumber: 3,
    title: 'Choose your sensors',
    category: 'sensors',
    nextLabel: 'Next: Add extra protection',
  },
  {
    stepNumber: 4,
    title: 'Add extra protection',
    category: 'accessories',
    nextLabel: null,
  },
];

export const TOTAL_STEPS = ACCORDION_STEPS.length;

export const LOCAL_STORAGE_KEY = 'wyze_bundle_builder_state';

export const SHIPPING_COMPARE_PRICE = 5.99;
export const SHIPPING_ACTUAL_PRICE = 0;

export const FINANCING_RATE = 0.10213;

export const PRIMARY_COLOR = '#4E2FD2';
