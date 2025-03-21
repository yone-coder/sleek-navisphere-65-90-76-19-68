
import React from 'react';
import { CreditCard } from 'lucide-react';

type ModishBuyNowPayLaterProps = {
  price: number;
};

export function ModishBuyNowPayLater({ price }: ModishBuyNowPayLaterProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-3 border border-green-100">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="h-4 w-4 text-green-600" />
        <h3 className="text-sm font-medium text-green-800">Buy Now, Pay Later</h3>
      </div>
      <p className="text-xs text-green-700 mb-2">
        Split your purchase into 4 interest-free payments.
      </p>
      <div className="flex items-center justify-between bg-white rounded-md p-2 border border-green-100">
        <span className="text-xs font-medium">4 payments of ${(price / 4).toFixed(2)}</span>
        <span className="text-xs text-green-600">Learn more</span>
      </div>
    </div>
  );
}
