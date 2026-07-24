import React, { useEffect, useState } from 'react';
import type { Product } from '../../types/product';
import { useBundleStore } from '../../store/useBundleStore';
import { ProductImage } from './ProductImage';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Price } from '../ui/Price';
import { Typography } from '../ui/Typography';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isXl, setIsXl] = useState(() => window.matchMedia('(min-width: 1280px)').matches);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1280px)');
    const handler = (e: MediaQueryListEvent) => setIsXl(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const activeVariantId = useBundleStore((state) => state.activeVariants[product.id] || 'default');
  const changeVariant = useBundleStore((state) => state.changeVariant);
  const selectedItems = useBundleStore((state) => state.selectedItems);

  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariantId = hasVariants ? activeVariantId : 'default';
  const currentVariant = hasVariants
    ? product.variants.find((v) => v.id === currentVariantId)
    : null;

  // Determine if this product has any quantity selected
  const productSelection = selectedItems[product.id];
  const totalQty = productSelection
    ? Object.values(productSelection.variants).reduce((sum, qty) => sum + qty, 0)
    : 0;
  const isSelected = totalQty > 0;

  // The sensor hub stepper is disabled because its quantity is locked at 1
  const isStepperDisabled = product.id === 'wyze-sense-hub';

  return (
    <Card
      selected={isSelected}
      className={cn(
        'relative flex flex-col xl:flex-row h-full bg-white hover:-translate-y-0.5 transition-transform duration-300 select-none overflow-hidden',
        className
      )}
    >
      {/* Discount Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="discount">{product.badge}</Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="w-full mb-4 xl:max-w-[103px] xl:mt-auto xl:mb-auto">
        <ProductImage imageKey={product.image} variantId={hasVariants ? currentVariantId : undefined} variantImageKey={currentVariant?.image} />
      </div>

      {/* Info Section */}
      <div className="flex-grow flex flex-col">
        {/* Title */}
        <Typography variant="h3" className="font-bold text-slate-800 line-clamp-1 mb-1">
          {product.title}
        </Typography>

        {/* Description & Learn More */}
        <div className="">
          <p className="text-xs xl:text-[17px] text-slate-500 leading-relaxed inline">
            {showFullDesc ? product.description : `${product.description.slice(0, isXl ? 52 : 40)}...`}
          </p>
          <button
            type="button"
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-xs xl:text-[15px] text-primary ml-1.5 underline hover:text-primary-hover active:scale-95 inline-flex items-center gap-0.5"
          >
            {showFullDesc ? (
              <>
                Show Less
              </>
            ) : (
              <>
                Learn More
              </>
            )}
          </button>
        </div>

        {/* Variant Selector (if variants exist) */}
        {hasVariants && (
          <div className="mb">
            <VariantSelector
              productId={product.id}
              variants={product.variants}
              activeVariantId={currentVariantId}
              onChange={(variantId) => changeVariant(product.id, variantId)}
            />
          </div>
        )}

        {/* Pricing and Stepper Footer */}
        <div className="pt-4 flex items-center justify-between gap-2">
          <QuantityStepper
            productId={product.id}
            variantId={currentVariantId}
            disabled={isStepperDisabled}
            size="sm"
          />

          <div className="flex items-center gap-1">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              isMonthly={product.category === 'plan'}
              size={product.category === 'plan' ? "sm" : "lg"}
            />
          </div>


        </div>
      </div>


    </Card>
  );
};
