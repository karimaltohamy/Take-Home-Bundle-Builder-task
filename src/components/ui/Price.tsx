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
    <div className={cn('inline-flex items-center flex-row gap-1.5 xl:gap-0 xl:flex-col', className)} {...props}>
      {/* Compare price (crossed out) */}
      {compareAtPrice !== undefined && compareAtPrice !== null && (
        <span
          className={cn(
            'text-red-400 line-through text-md font-thin leading-2',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-md',
            size === 'lg' && 'text-lg',
            compareClassName
          )}
        >
          {formatValue(compareAtPrice)}
        </span>
      )}

      {/* Actual Price */}
      <span
        className={cn(
          'font-thin text-[#575757]',
          isFree && 'text-emerald-600 font-thin',
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
