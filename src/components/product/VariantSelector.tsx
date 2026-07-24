import React from 'react';
import type { Variant } from '../../types/product';
import { cn } from '../../lib/utils';

interface VariantSelectorProps {
  productId: string;
  variants: Variant[];
  activeVariantId: string;
  onChange: (variantId: string) => void;
}

// Color map to render swatches next to variant names
const swatchColorMap: { [key: string]: string } = {
  white: 'bg-white border-slate-300 shadow-sm',
  grey: 'bg-slate-400 border-slate-500 shadow-sm',
  black: 'bg-slate-900 border-slate-950 shadow-sm',
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  activeVariantId,
  onChange,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        const swatchClass = swatchColorMap[variant.id] || 'bg-slate-300';

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onChange(variant.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer select-none',
              isActive
                ? 'border-slate-800 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            {/* Color swatch */}
            <span className={cn('w-2.5 h-2.5 rounded-full border', swatchClass)} />
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
};
