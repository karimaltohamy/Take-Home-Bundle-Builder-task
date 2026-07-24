import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuantityStepperProps {
  productId: string;
  variantId: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  productId,
  variantId,
  disabled = false,
  size = 'md',
}) => {
  const quantity = useBundleStore((state) => state.selectedItems[productId]?.variants[variantId] || 0);
  const increaseQuantity = useBundleStore((state) => state.increaseQuantity);
  const decreaseQuantity = useBundleStore((state) => state.decreaseQuantity);

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0 && !disabled) {
      decreaseQuantity(productId, variantId);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      increaseQuantity(productId, variantId);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-sm',
        disabled && 'opacity-60 cursor-not-allowed select-none bg-slate-100',
        size === 'sm' ? 'h-8' : 'h-10'
      )}
    >
      {/* Minus Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 0 || disabled}
        className={cn(
          'flex items-center justify-center transition-all bg-white active:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600 hover:text-primary',
          size === 'sm' ? 'w-8 h-full' : 'w-10 h-full'
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />
      </button>

      {/* Quantity Display */}
      <span
        className={cn(
          'flex items-center justify-center font-bold text-slate-800 text-center select-none bg-slate-50 border-x border-slate-100',
          size === 'sm' ? 'w-8 text-xs' : 'w-10 text-sm'
        )}
      >
        {quantity}
      </span>

      {/* Plus Button */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled}
        className={cn(
          'flex items-center justify-center transition-all bg-white active:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none text-slate-600 hover:text-primary',
          size === 'sm' ? 'w-8 h-full' : 'w-10 h-full'
        )}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />
      </button>
    </div>
  );
};
