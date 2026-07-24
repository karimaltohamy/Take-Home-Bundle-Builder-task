import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { calculateSubtotal, calculateOriginalPrice, calculateSavings, calculateMonthly } from '../../utils/pricing';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Divider } from '../ui/Divider';
import { Sparkles, Save, RotateCcw } from 'lucide-react';

export const Totals: React.FC = () => {
  const products = useBundleStore((state) => state.products);
  const selectedItems = useBundleStore((state) => state.selectedItems);
  const saveBundle = useBundleStore((state) => state.saveBundle);
  const clearBundle = useBundleStore((state) => state.clearBundle);

  // Derive pricing values from store state
  const subtotal = calculateSubtotal(selectedItems, products);
  const originalPrice = calculateOriginalPrice(selectedItems, products);
  const savings = calculateSavings(originalPrice, subtotal);
  const monthly = calculateMonthly(subtotal);

  const hasItems = subtotal > 0;

  const handleCheckout = () => {
    alert(`Thank you for your order! Total amount: $${subtotal.toFixed(2)}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    saveBundle();
    alert('Your security system configuration has been saved successfully!');
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to clear your security system?')) {
      clearBundle();
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-col gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
      {/* Guarantee Section */}
      <div className="flex-1 flex gap-4 items-start">
        {/* Seal SVG */}
        <div className="w-16 h-16 flex-shrink-0 relative flex items-center justify-center animate-soft-pulse">
          <svg className="w-full h-full text-primary fill-primary/10" viewBox="0 0 100 100">
            {/* Scalloped badge border */}
            <path
              d="M50 5 L55 12 L63 8 L66 16 L74 15 L74 23 L82 25 L79 33 L86 38 L81 45 L86 52 L79 57 L82 65 L74 67 L74 75 L66 74 L63 82 L55 78 L50 85 L45 78 L37 82 L34 74 L26 75 L26 67 L18 65 L21 57 L14 52 L19 45 L14 38 L21 33 L18 25 L26 23 L26 15 L34 16 L37 8 L45 12 Z"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="46" r="28" stroke="currentColor" strokeWidth="2.5" fill="white" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="text-[8px] font-black text-primary leading-none">100%</span>
            <span className="text-[6px] font-bold text-slate-800 uppercase tracking-tighter leading-none mt-0.5">Wyze</span>
            <span className="text-[5px] font-semibold text-slate-500 uppercase tracking-tighter leading-none mt-0.5">Guarantee</span>
          </div>
        </div>

        <div className="flex flex-col">
          <Typography variant="body-sm" className="font-bold text-slate-800">
            30-day hassle-free returns
          </Typography>
          <p className="text-xs text-slate-500 leading-normal mt-0.5">
            If you're not totally in love with the product, we will refund you 100%.
          </p>
        </div>
      </div>

      <Divider className="md:hidden lg:block my-0" />

      {/* Pricing Summary section */}
      <div className="flex-1 flex flex-col justify-end">
        {/* Financing text badge */}
        {hasItems && (
          <div className="self-end mb-2">
            <span className="inline-flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              <Sparkles size={10} className="fill-white" />
              as low as ${monthly}/mo
            </span>
          </div>
        )}

        {/* Pricing numbers */}
        <div className="flex items-baseline justify-between gap-4 mt-1">
          <span className="text-sm font-semibold text-slate-500">Subtotal:</span>
          <div className="flex items-baseline gap-2">
            {savings > 0 && (
              <span className="text-base text-slate-400 line-through font-normal">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl md:text-3xl font-black text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Savings alert banner */}
        {savings > 0 && (
          <div className="mt-2.5 bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
            <span className="text-xs font-bold text-emerald-700 block">
              Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
            </span>
          </div>
        )}

        {/* Checkout Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!hasItems}
          onClick={handleCheckout}
          className="mt-4 font-bold text-base h-12 shadow-md hover:shadow-lg rounded-xl"
        >
          Checkout
        </Button>

        {/* Save/Reset system later links */}
        <div className="flex items-center justify-center gap-5 mt-4 text-xs">
          <a
            href="#save"
            onClick={handleSave}
            className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-primary transition-colors underline cursor-pointer"
          >
            <Save size={12} />
            Save my system for later
          </a>
          {hasItems && (
            <a
              href="#clear"
              onClick={handleReset}
              className="inline-flex items-center gap-1 font-semibold text-slate-400 hover:text-rose-600 transition-colors underline cursor-pointer"
            >
              <RotateCcw size={12} />
              Reset system
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
