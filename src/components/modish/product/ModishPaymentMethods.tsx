
import React from 'react';
import { DollarSign } from 'lucide-react';

export function ModishPaymentMethods() {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-4 w-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-800">Payment Methods</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Google Pay'].map((method, index) => (
          <div key={index} className="flex items-center justify-center bg-white border border-gray-200 rounded p-1.5">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
