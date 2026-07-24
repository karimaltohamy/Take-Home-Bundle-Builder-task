import React from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { ReviewRow } from './ReviewRow';
import { Totals } from './Totals';
import type { Product } from '../../types/product';
import { Typography } from '../ui/Typography';
import { Divider } from '../ui/Divider';
import { ShoppingCart, Truck } from 'lucide-react';
import { Price } from '../ui/Price';

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
    <div className="bg-primary-light rounded-md p-6 flex flex-col h-full">
      {/* Title Header */}
      <div className="mb-6">
        <Typography variant="h2" className="font-extrabold text-slate-800 tracking-tight">
          Your security system
        </Typography>
        <Typography variant="body-sm" className="text-slate-400 mt-1">
          Review your personalized protection system designed to keep what matters most safe.
        </Typography>
      </div>

      <Divider className="my-0 mb-4" />

      {/* Main Responsive Layout Split */}
      <div className="flex flex-col lg:flex-row xl:flex-col gap-6 justify-between flex-grow">
        {/* Selected Items List Area */}
        <div className="flex-grow lg:w-3/5 xl:w-full">
          {hasItems ? (
            <div className="flex flex-col gap-5">
              {/* Render Categories */}
              {Object.entries(categories).map(([key, category]) => {
                if (category.rows.length === 0) return null;

                return (
                  <div key={key} className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      {category.label}
                    </span>
                    <div className="flex flex-col divide-y divide-slate-100 bg-slate-50/30 rounded-xl border border-slate-100 px-4">
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
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Shipping
                </span>
                <div className="flex items-center justify-between py-3 px-4 bg-emerald-50/20 border border-emerald-100/50 rounded-xl gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                      <Truck size={18} strokeWidth={2.5} />
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
                      priceClassName="text-emerald-600 font-bold"
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

        {/* Totals Section */}
        <div className="lg:w-2/5 xl:w-full flex-shrink-0">
          <Totals />
        </div>
      </div>
    </div>
  );
};
