
import React from 'react';
import { Gift } from 'lucide-react';

export function ModishStoreCoupon() {
  return (
    <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full">
          <Gift className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">Store Coupon</div>
          <div className="text-xs text-gray-600">$5 OFF orders over $50</div>
        </div>
      </div>
      <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">
        Collect
      </button>
    </div>
  );
}
