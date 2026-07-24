import React, { useState } from 'react';
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

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const activeVariantId = useBundleStore((state) => state.activeVariants[product.id] || 'default');
  const changeVariant = useBundleStore((state) => state.changeVariant);
  const selectedItems = useBundleStore((state) => state.selectedItems);

  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariantId = hasVariants ? activeVariantId : 'default';

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
      className="relative flex flex-col h-full bg-white hover:-translate-y-0.5 transition-transform duration-300 select-none overflow-hidden"
    >
      {/* Discount Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="discount">{product.badge}</Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="w-full aspect-square mb-4">
        <ProductImage imageKey={product.image} variantId={hasVariants ? currentVariantId : undefined} />
      </div>

      {/* Info Section */}
      <div className="flex-grow flex flex-col">
        {/* Title */}
        <Typography variant="h3" className="font-bold text-slate-800 line-clamp-1 mb-1">
          {product.title}
        </Typography>

        {/* Description & Learn More */}
        <div className="mb-3">
          <p className="text-xs text-slate-500 leading-relaxed inline">
            {showFullDesc ? product.description : `${product.description.slice(0, 52)}...`}
          </p>
          <button
            type="button"
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-[11px] font-bold text-primary ml-1.5 hover:text-primary-hover active:scale-95 inline-flex items-center gap-0.5"
          >
            {showFullDesc ? (
              <>
                Show Less <ChevronUp size={10} />
              </>
            ) : (
              <>
                Learn More <ChevronDown size={10} />
              </>
            )}
          </button>
        </div>

        {/* Variant Selector (if variants exist) */}
        {hasVariants && (
          <div className="mb-4">
            <VariantSelector
              productId={product.id}
              variants={product.variants}
              activeVariantId={currentVariantId}
              onChange={(variantId) => changeVariant(product.id, variantId)}
            />
          </div>
        )}
      </div>

      {/* Pricing and Stepper Footer */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            isMonthly={product.category === 'plan'}
            size="md"
          />
        </div>

        <QuantityStepper
          productId={product.id}
          variantId={currentVariantId}
          disabled={isStepperDisabled}
          size="sm"
        />
      </div>
    </Card>
  );
};
