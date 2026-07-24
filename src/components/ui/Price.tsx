import React from 'react';
import { cn } from '../../lib/utils';

interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  compareAtPrice?: number | null;
  isMonthly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  freeText?: string;
  priceClassName?: string;
  compareClassName?: string;
}

export const Price: React.FC<PriceProps> = ({
  price,
  compareAtPrice,
  isMonthly = false,
  size = 'md',
  freeText = 'FREE',
  className,
  priceClassName,
  compareClassName,
  ...props
}) => {
  const formatValue = (val: number) => {
    return `$${val.toFixed(2)}${isMonthly ? '/mo' : ''}`;
  };

  const isFree = price === 0;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)} {...props}>
      {/* Compare price (crossed out) */}
      {compareAtPrice !== undefined && compareAtPrice !== null && (
        <span
          className={cn(
            'text-slate-400 line-through text-xs font-normal',
            size === 'sm' && 'text-[10px]',
            size === 'lg' && 'text-sm',
            compareClassName
          )}
        >
          {formatValue(compareAtPrice)}
        </span>
      )}

      {/* Actual Price */}
      <span
        className={cn(
          'font-semibold text-slate-900',
          isFree && 'text-emerald-600 font-bold',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-lg',
          priceClassName
        )}
      >
        {isFree ? freeText : formatValue(price)}
      </span>
    </div>
  );
};
