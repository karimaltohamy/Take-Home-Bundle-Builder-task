import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { ReviewRow } from './ReviewRow';
import { Totals } from './Totals';
import type { Product } from '../../types/product';
import { Typography } from '../ui/Typography';
import { ShoppingCart } from 'lucide-react';
import { Price } from '../ui/Price';
import { cn } from '../../lib/utils';

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
    <div className="bg-primary-light rounded-md p-4 py-7 xl:py-4 flex flex-col h-full">
      <span className='uppercase font-thin mb-4 text-sm hidden xl:block'>Review</span>

      <div className='px-2'>


        {/* Main Responsive Layout Split */}
        <div className="flex flex-col lg:flex-row xl:flex-col gap-6 xl:gap-0 justify-between flex-grow">
          <div>
            {/* Title Header */}
            <div className="mb-2">
              <Typography variant="h2" className="font-medium text-slate-800 tracking-tight mb-0">
                Your security system
              </Typography>
              <Typography variant="body-sm" className="text-[#1F1F1FBF] leading-5! px-1">
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
                        <span className="text-[10px] font-thin text-[#A8B2BD] uppercase tracking-widest mb-0">
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
                          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.625 14.5H14.5V16.3125H3.625V14.5ZM1.8125 9.96875H10.875V11.7812H1.8125V9.96875Z" fill="#0AA288" />
                            <path d="M27.114 15.0492L24.3953 8.70544C24.3254 8.54245 24.2092 8.40355 24.0612 8.30593C23.9132 8.20831 23.7397 8.15627 23.5624 8.15625H20.8437V6.34375C20.8437 6.1034 20.7482 5.87289 20.5782 5.70293C20.4083 5.53298 20.1778 5.4375 19.9374 5.4375H5.43741V7.25H19.0312V18.6289C18.6185 18.869 18.2573 19.1882 17.9683 19.5683C17.6793 19.9484 17.4683 20.3819 17.3473 20.8438H11.6525C11.4319 19.9895 10.9073 19.245 10.1771 18.7498C9.44685 18.2546 8.56108 18.0427 7.68581 18.1539C6.81054 18.2651 6.00587 18.6916 5.42261 19.3537C4.83936 20.0157 4.51758 20.8677 4.51758 21.75C4.51758 22.6323 4.83936 23.4843 5.42261 24.1463C6.00587 24.8084 6.81054 25.2349 7.68581 25.3461C8.56108 25.4573 9.44685 25.2454 10.1771 24.7502C10.9073 24.255 11.4319 23.5105 11.6525 22.6563H17.3473C17.5445 23.434 17.9953 24.1239 18.6286 24.6166C19.2618 25.1094 20.0413 25.3769 20.8437 25.3769C21.646 25.3769 22.4255 25.1094 23.0587 24.6166C23.692 24.1239 24.1428 23.434 24.34 22.6563H26.2812C26.5215 22.6563 26.752 22.5608 26.922 22.3908C27.0919 22.2209 27.1874 21.9904 27.1874 21.75V15.4063C27.1874 15.2835 27.1624 15.162 27.114 15.0492ZM8.15616 23.5625C7.79768 23.5625 7.44725 23.4562 7.14919 23.257C6.85112 23.0579 6.61881 22.7748 6.48162 22.4436C6.34444 22.1124 6.30855 21.748 6.37848 21.3964C6.44842 21.0448 6.62104 20.7219 6.87453 20.4684C7.12801 20.2149 7.45097 20.0423 7.80256 19.9723C8.15415 19.9024 8.51858 19.9383 8.84977 20.0755C9.18096 20.2127 9.46404 20.445 9.6632 20.743C9.86236 21.0411 9.96866 21.3915 9.96866 21.75C9.96866 22.2307 9.7777 22.6917 9.43779 23.0316C9.09788 23.3715 8.63686 23.5625 8.15616 23.5625ZM20.8437 9.96875H22.9643L24.9073 14.5H20.8437V9.96875ZM20.8437 23.5625C20.4852 23.5625 20.1348 23.4562 19.8367 23.257C19.5386 23.0579 19.3063 22.7748 19.1691 22.4436C19.0319 22.1124 18.996 21.748 19.066 21.3964C19.1359 21.0448 19.3085 20.7219 19.562 20.4684C19.8155 20.2149 20.1385 20.0423 20.4901 19.9723C20.8416 19.9024 21.2061 19.9383 21.5373 20.0755C21.8685 20.2127 22.1515 20.445 22.3507 20.743C22.5499 21.0411 22.6562 21.3915 22.6562 21.75C22.6562 22.2307 22.4652 22.6917 22.1253 23.0316C21.7854 23.3715 21.3244 23.5625 20.8437 23.5625ZM25.3749 20.8438H24.34C24.1403 20.0675 23.6888 19.3794 23.056 18.8874C22.4233 18.3954 21.6452 18.1272 20.8437 18.125V16.3125H25.3749V20.8438Z" fill="#0AA288" />
                          </svg>

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
