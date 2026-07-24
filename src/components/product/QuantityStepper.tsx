import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuantityStepperProps {
  productId: string;
  variantId: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  minusClassName?: string;
  plusClassName?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  productId,
  variantId,
  disabled = false,
  size = 'md',
  className,
  minusClassName,
  plusClassName,
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
        'inline-flex items-center overflow-hidden',
        disabled && 'opacity-60 cursor-not-allowed select-none',
        className
      )}
    >
      {/* Minus Button */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 0 || disabled}
        className={cn(
          'w-5 h-5 flex items-center justify-center transition-all rounded-sm border-2 border-[#F0F4F7] disabled:opacity-30 disabled:pointer-events-none text-slate-600 hover:text-primary',
          quantity > 0 ? 'bg-[#F0F4F7] border-none' : '',
          minusClassName
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />
      </button>

      {/* Quantity Display */}
      <span
        className={cn(
          'w-6 flex items-center justify-center font-normal text-slate-500 text-center select-none',
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
          'w-5 h-5 flex items-center justify-center transition-all rounded-sm bg-[#F0F4F7] active:bg-slate-300 disabled:opacity-30 disabled:pointer-events-none text-slate-600 hover:text-primary',
          plusClassName
        )}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />
      </button>
    </div>
  );
};
