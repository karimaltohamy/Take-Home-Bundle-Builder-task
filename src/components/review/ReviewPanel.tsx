import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { ReviewRow } from './ReviewRow';
import { Totals } from './Totals';
import type { Product } from '../../types/product';
import { Typography } from '../ui/Typography';
import { ShoppingCart } from 'lucide-react';
import { Price } from '../ui/Price';
import { cn } from '../../lib/utils';
import { ShippingIcon } from './ShippingIcon';

interface ReviewRowData {
  product: Product;
  variantId: string;
  quantity: number;
}

interface CategoryGroup {
  label: string;
  rows: ReviewRowData[];
}

export const ReviewPanel: React.FC = () => {
  const products = useBundleStore((state) => state.products);
  const selectedItems = useBundleStore((state) => state.selectedItems);

  // Group selections by category
  const categories: { [key: string]: CategoryGroup } = {
    cameras: { label: 'Cameras', rows: [] },
    sensors: { label: 'Sensors', rows: [] },
    accessories: { label: 'Accessories', rows: [] },
    plan: { label: 'Plan', rows: [] },
  };

  let totalItemsCount = 0;

  // Populate selections into categories
  Object.entries(selectedItems).forEach(([productId, selection]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    Object.entries(selection.variants).forEach(([variantId, qty]) => {
      if (qty > 0) {
        totalItemsCount += qty;
        categories[product.category].rows.push({
          product,
          variantId,
          quantity: qty,
        });
      }
    });
  });

  const hasItems = totalItemsCount > 0;

  return (
    <div className="bg-primary-light rounded-md p-4 py-7 xl:py-4 px-4 lg:px-10 xl:px-4 flex flex-col h-full">
      <span className='uppercase font-thin mb-4 text-sm hidden xl:block'>Review</span>

      <div className='px-2'>
        {/* Main Responsive Layout Split */}
        <div className="flex flex-col lg:flex-row xl:flex-col gap-3 lg:gap-12 xl:gap-0 justify-between flex-grow">
          <div className='flex-1'>
            {/* Title Header */}
            <div className="mb-2">
              <Typography variant="h2" className="font-medium text-slate-800 tracking-tight mb-0">
                Your security system
              </Typography>
              <Typography variant="body-sm" className="text-[#1F1F1FBF] leading-5! px-1 text-lg! xl:text-md!">
                Review your personalized protection system designed to keep what matters most safe.
              </Typography>
            </div>

            {/* Selected Items List Area */}
            <div className="flex-grow w-full">
              {hasItems ? (
                <div className="flex flex-col gap-2">
                  {/* Render Categories */}
                  {Object.entries(categories).map(([key, category]) => {
                    if (category.rows.length === 0) return null;

                    return (
                      <div key={key} className="flex flex-col border-t border-[#CED6DE] pt-3 w-full">
                        <span className="text-[10px] font-thin text-[#A8B2BD] uppercase tracking-widest mb-1">
                          {category.label}
                        </span>
                        <div className="flex flex-col divide-y divide-slate-100 bg-slate-50/30 rounded-xl border border-slate-100">
                          {category.rows.map((row) => (
                            <ReviewRow
                              key={`${row.product.id}-${row.variantId}`}
                              product={row.product}
                              variantId={row.variantId}
                              quantity={row.quantity}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Hardcoded Shipping Row when items are selected */}
                  <div className="flex flex-col border-t border-[#CED6DE]">
                    <div className="flex items-center justify-between py-3  bg-emerald-50/20 border border-emerald-100/50 rounded-xl gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 border border-emerald-100">
                          <ShippingIcon />
                        </div>
                        <div className="flex flex-col">
                          <Typography variant="body-sm" className="font-bold text-slate-800">
                            Fast Shipping
                          </Typography>
                        </div>
                      </div>
                      <div className="text-right">
                        <Price
                          price={0.00}
                          compareAtPrice={5.99}
                          size="sm"
                          priceClassName={cn('text-primary !font-semibold')}
                          compareClassName={cn('text-slate-400')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                    <ShoppingCart size={20} />
                  </div>
                  <Typography variant="h3" className="font-bold text-slate-700">
                    Your system is empty
                  </Typography>
                  <p className="text-xs text-slate-400 max-w-xs mt-1 leading-normal">
                    Choose cameras, subscription plans, sensors, and accessories from the builder steps to customize your security bundle.
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* Totals Section */}
          <div className="lg:w-2/5 xl:w-full flex-shrink-0">
            <Totals />
          </div>
        </div>
      </div>

    </div>
  );
};
