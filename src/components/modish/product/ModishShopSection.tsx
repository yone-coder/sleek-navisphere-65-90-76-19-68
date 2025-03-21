
import React from 'react';

export function ModishShopSection() {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">From This Shop</h3>
        <button className="text-xs text-blue-600">View Shop</button>
      </div>
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="shrink-0 w-20">
            <div className="h-20 w-20 rounded-lg bg-white border border-gray-200 overflow-hidden">
              <img 
                src="/api/placeholder/100/100" 
                alt="Shop item" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-xs text-red-500 font-medium mt-1">$29.99</div>
          </div>
        ))}
      </div>
    </div>
  );
}
