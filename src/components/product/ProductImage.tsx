import React from 'react';
import { Shield, Cloud, ShieldAlert, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

import cameraImg1 from '../../assets/camera-img1.png';
import cameraImg2 from '../../assets/camera-img2.png';
import cameraImg3 from '../../assets/camera-img3.png';
import cameraImg4 from '../../assets/camera-img4.png';
import cameraImg5 from '../../assets/camera-img5.png';

import cameraVariantWhite from '../../assets/camera-variant-white.png';
import cameraVariantGray from '../../assets/camera-variant-gray.png';
import cameraVariantBlack from '../../assets/camera-variant-black.png';

import camera2VariantWhite from '../../assets/camera2-variant-white.png';
import camera2VariantBlack from '../../assets/camera2-variant-black.png';

import camera3VariantWhite from '../../assets/camera3-variant-white.png';
import camera3VariantBlack from '../../assets/camera3-variant-black.png';

import camera5VariantWhite from '../../assets/camera5-variant-white.png';
import camera5VariantBlack from '../../assets/camera5-variant-black.png';

interface ProductImageProps {
  imageKey: string;
  variantId?: string;
  variantImageKey?: string;
  className?: string;
}

const PNG_IMAGES: Record<string, string> = {
  'camera-img1.png': cameraImg1,
  'camera-img2.png': cameraImg2,
  'camera-img3.png': cameraImg3,
  'camera-img4.png': cameraImg4,
  'camera-img5.png': cameraImg5,
};

const VARIANT_MAP: Record<string, Record<string, string>> = {
  'camera-img1.png': {
    white: cameraVariantWhite,
    grey: cameraVariantGray,
    black: cameraVariantBlack,
  },
  'camera-img2.png': {
    white: camera2VariantWhite,
    black: camera2VariantBlack,
  },
  'camera-img3.png': {
    white: camera3VariantWhite,
    black: camera3VariantBlack,
  },
  'camera-img5.png': {
    white: camera5VariantWhite,
    black: camera5VariantBlack,
  },
};

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

export const ProductImage: React.FC<ProductImageProps> = ({
  imageKey,
  variantId,
  variantImageKey,
  className,
}) => {
  const renderSvg = () => {
    switch (imageKey) {
      case 'plan-unlimited':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-violet-50 text-primary rounded-lg border border-violet-100 p-2">
            <Cloud className="w-12 h-12 stroke-[1.5]" />
            <div className="absolute flex items-center justify-center bg-white rounded-full p-1 shadow-sm mt-3 ml-8">
              <Shield className="w-5 h-5 text-emerald-500 fill-emerald-500/10 stroke-[2.5]" />
            </div>
          </div>
        );

      case 'plan-plus':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-600 rounded-lg border border-blue-100 p-2">
            <Shield className="w-12 h-12 stroke-[1.5] fill-blue-50" />
            <div className="absolute flex items-center justify-center bg-white rounded-full p-1 shadow-sm mt-4 ml-6 font-bold text-xs">
              +
            </div>
          </div>
        );

      case 'plan-none':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 rounded-lg border border-slate-100 p-2">
            <ShieldAlert className="w-12 h-12 stroke-[1.5]" />
          </div>
        );

      case 'sensor-motion':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Small Square body */}
            <rect x="35" y="35" width="30" height="30" rx="6" fill="#F1F5F9" stroke="currentColor" strokeWidth="3" />
            {/* Semi-sphere lens */}
            <path d="M50 40a10 10 0 0110 10H40a10 10 0 0110-10z" fill="#E2E8F0" stroke="currentColor" strokeWidth="2" />
            {/* Soft sensor beam graphic */}
            <path d="M50 35L30 15m20 20L50 10m0 25l20-20" stroke="#4E2FD2" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
          </svg>
        );

      case 'sensor-entry':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Large magnet block */}
            <rect x="32" y="30" width="16" height="40" rx="3" fill="#F1F5F9" stroke="currentColor" strokeWidth="3" />
            <line x1="40" y1="40" x2="40" y2="60" stroke="#4E2FD2" strokeWidth="2.5" />
            {/* Small magnet block */}
            <rect x="54" y="30" width="10" height="40" rx="2" fill="#F1F5F9" stroke="currentColor" strokeWidth="3" />
          </svg>
        );

      case 'sensor-hub':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Rounded flat square hub */}
            <rect x="25" y="25" width="50" height="50" rx="10" fill="#1E293B" stroke="currentColor" strokeWidth="4" />
            {/* Central status speaker ring */}
            <circle cx="50" cy="50" r="12" stroke="#4E2FD2" strokeWidth="3" fill="#0F172A" />
            {/* Small dotted lights */}
            <circle cx="43" cy="38" r="1.5" fill="#10B981" />
            <circle cx="50" cy="38" r="1.5" fill="#10B981" />
            <circle cx="57" cy="38" r="1.5" fill="#10B981" />
          </svg>
        );

      case 'accessory-sd-256':
      case 'accessory-sd-128':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* SD card shape with cut corner */}
            <path d="M35 25h24l6 6v44H35z" fill="#0F172A" stroke="currentColor" strokeWidth="4" />
            {/* Gold connector pins */}
            <path d="M40 28v6M45 28v6M50 28v6M55 28v6" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Storage capacity label */}
            <rect x="40" y="48" width="20" height="18" rx="2" fill="#4E2FD2" />
            <text x="50" y="60" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              {imageKey.includes('256') ? '256G' : '128G'}
            </text>
          </svg>
        );

      case 'accessory-adapter':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Plug box */}
            <rect x="38" y="25" width="24" height="24" rx="4" fill="#F1F5F9" stroke="currentColor" strokeWidth="3" />
            {/* Prongs */}
            <path d="M44 17v8M56 17v8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            {/* Winding cable */}
            <path d="M50 49v10c0 8 16 4 16 12s-16 4-16 12" stroke="#4E2FD2" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'accessory-mount':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Suction cup */}
            <path d="M30 45c0-12 10-20 20-20s20 8 20 20v2H30v-2z" fill="#E2E8F0" fillOpacity="0.6" stroke="currentColor" strokeWidth="3" />
            {/* Bracket arm */}
            <path d="M50 47v18M50 65h15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Camera holding clip */}
            <rect x="61" y="55" width="12" height="20" rx="3" fill="#94A3B8" stroke="currentColor" strokeWidth="3" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 rounded-lg">
            <HelpCircle className="w-8 h-8" />
          </div>
        );
    }
  };

  const renderImage = () => {
    if (variantImageKey && VARIANT_IMAGES[variantImageKey]) {
      return (
        <img
          src={VARIANT_IMAGES[variantImageKey]}
          alt={imageKey}
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }

    const variants = VARIANT_MAP[imageKey];
    if (variants && variantId && variants[variantId]) {
      return (
        <img
          src={variants[variantId]}
          alt={imageKey}
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }

    if (PNG_IMAGES[imageKey]) {
      return (
        <img
          src={PNG_IMAGES[imageKey]}
          alt={imageKey}
          className="w-full h-full object-contain rounded-lg"
        />
      );
    }

    return renderSvg();
  };

  return (
    <div className={cn('relative w-full h-[120px] xl:h-[137px] flex items-center justify-center rounded-lg', className)}>
      {renderImage()}
    </div>
  );
};
