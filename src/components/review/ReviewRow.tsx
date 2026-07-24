import React from 'react';
import type { Product } from '../../types/product';
import { ProductImage } from '../product/ProductImage';
import { QuantityStepper } from '../product/QuantityStepper';
import { Price } from '../ui/Price';
import { Typography } from '../ui/Typography';
import { cn } from '../../lib/utils';

interface ReviewRowProps {
  product: Product;
  variantId: string;
  quantity: number;
  stepperClassName?: string;
  minusClassName?: string;
  plusClassName?: string;
  priceClassName?: string;
  compareClassName?: string;
}

export const ReviewRow: React.FC<ReviewRowProps> = ({
  product,
  variantId,
  quantity,
  stepperClassName,
  minusClassName,
  plusClassName,
  priceClassName,
  compareClassName,
}) => {
  const hasVariants = product.variants && product.variants.length > 0;

  // Find variant name if applicable
  const variant = hasVariants
    ? product.variants.find((v) => v.id === variantId)
    : null;

  // Calculate row prices (unit price * quantity)
  const rowActualPrice = product.price * quantity;
  const rowComparePrice = product.compareAtPrice !== null
    ? product.compareAtPrice * quantity
    : null;

  // Locked/disabled state for sensor hub
  const isStepperDisabled = product.id === 'wyze-sense-hub';

  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0 gap-3">
      {/* Thumbnail and Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-12 h-12 flex-shrink-0">
          <ProductImage
            imageKey={product.image}
            variantId={variantId !== 'default' ? variantId : undefined}
            variantImageKey={variant?.image}
            className="p-1 border-slate-100 bg-white w-10 h-10"
          />
        </div>
        <div className="min-w-0 flex flex-col">
          <Typography variant="body-sm" className="font-bold text-slate-800 truncate">
            {product.title}
          </Typography>
          {variant && (
            <span className="text-[11px] font-semibold text-slate-400">
              Variant: {variant.name}
            </span>
          )}
        </div>
      </div>

      {/* Stepper and Row Price */}
      <div className="flex items-center gap-3">
        <QuantityStepper
          productId={product.id}
          variantId={variantId}
          disabled={isStepperDisabled}
          size="sm"
          className={stepperClassName}
          minusClassName={cn('bg-white', minusClassName)}
          plusClassName={cn('bg-white', plusClassName)}
        />

        <div className="text-right">
          <Price
            price={rowActualPrice}
            compareAtPrice={rowComparePrice}
            isMonthly={product.category === 'plan'}
            size='sm'
            priceClassName={cn('text-primary !font-semibold', priceClassName)}
            compareClassName={cn('text-slate-400', compareClassName)}
          />
        </div>
      </div>
    </div>
  );
};
