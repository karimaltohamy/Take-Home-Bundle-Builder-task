import React from 'react';
import type { Variant } from '../../types/product';
import { cn } from '../../lib/utils';

import cameraVariantWhite from '../../assets/camera-variant-white.png';
import cameraVariantGray from '../../assets/camera-variant-gray.png';
import cameraVariantBlack from '../../assets/camera-variant-black.png';

import camera2VariantWhite from '../../assets/camera2-variant-white.png';
import camera2VariantBlack from '../../assets/camera2-variant-black.png';

import camera3VariantWhite from '../../assets/camera3-variant-white.png';
import camera3VariantBlack from '../../assets/camera3-variant-black.png';

import camera5VariantWhite from '../../assets/camera5-variant-white.png';
import camera5VariantBlack from '../../assets/camera5-variant-black.png';

interface VariantSelectorProps {
  productId: string;
  variants: Variant[];
  activeVariantId: string;
  onChange: (variantId: string) => void;
}

const VARIANT_IMAGES: Record<string, string> = {
  'camera-variant-white.png': cameraVariantWhite,
  'camera-variant-gray.png': cameraVariantGray,
  'camera-variant-black.png': cameraVariantBlack,
  'camera2-variant-white.png': camera2VariantWhite,
  'camera2-variant-black.png': camera2VariantBlack,
  'camera3-variant-white.png': camera3VariantWhite,
  'camera3-variant-black.png': camera3VariantBlack,
  'camera5-variant-white.png': camera5VariantWhite,
  'camera5-variant-black.png': camera5VariantBlack,
};

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  activeVariantId,
  onChange,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex gap-1.5 mt-3">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;
        const variantSrc = variant.image ? VARIANT_IMAGES[variant.image] : undefined;

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onChange(variant.id)}
            className={cn(
              'flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] rounded-sm border transition-all cursor-pointer select-none',
              isActive
                ? 'border-green-500 bg-green-50 shadow-sm'
                : 'border-[#FFFFFF] bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            {variantSrc && (
              <img src={variantSrc} alt={variant.name} className='w-5 h-5' />
            )}
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
};
