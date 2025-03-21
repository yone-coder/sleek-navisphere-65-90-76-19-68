
import React from 'react';
import { MessageCircle } from 'lucide-react';

export function ModishCustomerSupport() {
  return (
    <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        <div>
          <div className="text-sm font-medium text-gray-900">Customer Support</div>
          <div className="text-xs text-gray-600">24/7 Live Chat Available</div>
        </div>
      </div>
      <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full">
        Chat Now
      </button>
    </div>
  );
}
