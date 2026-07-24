import React from 'react';
import { Shield, Cloud, ShieldAlert, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductImageProps {
  imageKey: string;
  variantId?: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  imageKey,
  variantId,
  className,
}) => {
  // Select fill color based on variant
  const getVariantColor = (vid?: string) => {
    if (vid === 'black') return '#334155'; // slate-700
    if (vid === 'grey') return '#94A3B8'; // slate-400
    return '#E2E8F0'; // slate-200 (White)
  };

  const variantFill = getVariantColor(variantId);

  // Render clean, beautiful vector illustrations for products
  const renderSvg = () => {
    switch (imageKey) {
      case 'camera-v4':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Base Stand */}
            <path d="M40 85h20M50 70v15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="70" r="8" fill="#CBD5E1" stroke="currentColor" strokeWidth="3" />
            {/* Camera Body (Square/Rounded) */}
            <rect x="30" y="20" width="40" height="40" rx="8" fill={variantFill} stroke="currentColor" strokeWidth="4" />
            {/* Camera Lens Outer */}
            <circle cx="50" cy="40" r="14" fill="#1E293B" stroke="currentColor" strokeWidth="3" />
            {/* Lens Inner Glass */}
            <circle cx="50" cy="40" r="6" fill="#0284C7" />
            {/* Lens Reflection */}
            <circle cx="48" cy="38" r="2" fill="white" />
            {/* Small status LED */}
            <circle cx="50" cy="54" r="1.5" fill="#10B981" />
          </svg>
        );

      case 'camera-pan-v3':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Rotatable base */}
            <ellipse cx="50" cy="80" rx="22" ry="8" fill="#94A3B8" stroke="currentColor" strokeWidth="4" />
            {/* Vertically sliding joints */}
            <path d="M40 60v15M60 60v15" stroke="currentColor" strokeWidth="4" />
            {/* Camera body block */}
            <rect x="35" y="25" width="30" height="36" rx="6" fill={variantFill} stroke="currentColor" strokeWidth="4" />
            {/* Lens circular globe */}
            <circle cx="50" cy="40" r="11" fill="#1E293B" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="40" r="5" fill="#0284C7" />
            {/* Rotation Arrows (360° visual) */}
            <path d="M22 45a28 28 0 0156 0" stroke="#4E2FD2" strokeWidth="2.5" strokeDasharray="3 3" />
            <path d="M78 45l-4-4M78 45l-4 4" stroke="#4E2FD2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'camera-floodlight-v2':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Left light panel */}
            <path d="M12 28l18 6v22l-18-6z" fill="#E2E8F0" stroke="currentColor" strokeWidth="3" />
            <path d="M16 33l10 3v14l-10-3z" fill="#F8FAFC" />
            {/* Right light panel */}
            <path d="M88 28l-18 6v22l18-6z" fill="#E2E8F0" stroke="currentColor" strokeWidth="3" />
            <path d="M84 33l-10 3v14l10-3z" fill="#F8FAFC" />
            {/* Mount base */}
            <circle cx="50" cy="45" r="16" fill="#94A3B8" stroke="currentColor" strokeWidth="3" />
            {/* Camera module under the mount */}
            <rect x="40" y="48" width="20" height="24" rx="4" fill={variantFill} stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="58" r="6" fill="#1E293B" />
            <circle cx="50" cy="58" r="2.5" fill="#0284C7" />
          </svg>
        );

      case 'doorbell':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Doorbell Body */}
            <rect x="36" y="15" width="28" height="70" rx="6" fill="#1E293B" stroke="currentColor" strokeWidth="4" />
            {/* Upper Camera Section */}
            <circle cx="50" cy="30" r="10" fill="#0F172A" />
            <circle cx="50" cy="30" r="4" fill="#0284C7" />
            {/* Lower Button Section */}
            <circle cx="50" cy="65" r="11" fill="#334155" stroke="#4E2FD2" strokeWidth="2.5" />
            {/* Button Bell Icon */}
            <circle cx="50" cy="65" r="6" fill="#64748B" />
          </svg>
        );

      case 'camera-pro':
        return (
          <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="none">
            {/* Stand */}
            <path d="M50 72v12M38 84h24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Rounded Cylinder Body */}
            <rect x="32" y="16" width="36" height="56" rx="18" fill={variantFill} stroke="currentColor" strokeWidth="4" />
            {/* Black Lens Plate */}
            <rect x="36" y="20" width="28" height="26" rx="10" fill="#1E293B" />
            <circle cx="50" cy="30" r="8" fill="#0284C7" />
            <circle cx="48" cy="28" r="2.5" fill="white" />
            {/* PIR Motion Sensor below lens */}
            <ellipse cx="50" cy="54" rx="7" ry="4" fill="#64748B" />
          </svg>
        );

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

  return (
    <div className={cn('relative w-full aspect-square flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg p-3', className)}>
      {renderSvg()}
    </div>
  );
};
