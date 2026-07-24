import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { calculateSubtotal, calculateOriginalPrice, calculateSavings, calculateMonthly } from '../../utils/pricing';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Save, RotateCcw } from 'lucide-react';
import SatisfactionBadge from '../../assets/Satisfaction-Badge.svg';

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
    <div className="flex flex-col xl:gap-1">

      <div className='flex flex-row md:flex-col xl:flex-row gap-2 xl:gap-6'>
        {/* Guarantee Section */}
        <div className="flex-1 flex gap-4 items-start">
          {/* Seal SVG */}
          <img src={SatisfactionBadge} alt='Satisfaction Badge' className='min-w-[78px] min-h-[78px] xl:min-w-[78px] xl:min-h-[78px] md:min-w-[131px] md:min-h-[131px] object-contain' />

          <div className="md:flex hidden flex-col xl:hidden">
            <Typography variant="body-sm" className="font-extrabold text-[17px]! text-slate-800 mb-2">
              30-day hassle-free returns
            </Typography>
            <p className="text-sm text-[#1F1F1F] font-thin leading-bold mt-0.5">
              If you're not totally in love with the product, we will refund you 100%.
            </p>
          </div>
        </div>


        {/* Pricing Summary section */}
        <div className="flex-1 flex flex-col justify-end md:justify-between md:flex-row xl:flex-col xl:justify-end">
          {/* Financing text badge */}
          {hasItems && (
            <div className="self-end xl:mb-0">
              <span className="inline-flex items-center gap-1 bg-primary text-white text-[10px] xl:text-[10px] md:text-[14px] font-normal px-2 py-0.5 rounded tracking-wider shadow-sm">
                as low as ${monthly}/mo
              </span>
            </div>
          )}

          {/* Pricing numbers */}
          <div className="flex items-baseline justify-between gap-4 mt-1">
            <div className="flex items-baseline gap-2">
              {savings > 0 && (
                <span className="text-lg text-gray-500 line-through font-normal">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xl xl:text-2xl xl:font-black font-bold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>


        </div>
      </div>


      <div>
        {/* Savings alert banner */}
        {savings > 0 && (
          <div className="xl:mt-0.5 rounded-lg p-2 text-center">
            <span className="text-[11px] md:text-xs font-semibold text-emerald-500 block">
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
          className="mt-0 font-bold text-base h-12 shadow-md hover:shadow-md rounded-md"
        >
          Checkout
        </Button>

        {/* Save/Reset system later links */}
        <div className="flex items-center justify-center gap-5 mt-1 italic text-xs">
          <a
            href="#save"
            onClick={handleSave}
            className="inline-flex items-center gap-1 font-thin underline  text-[#484848] hover:text-primary transition-colors cursor-pointer"
          >
            Save my system for later
          </a>

        </div>
      </div>
    </div>
  );
};
