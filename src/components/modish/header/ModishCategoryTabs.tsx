
import React from 'react';
import { ChevronDown } from 'lucide-react';

type ModishCategoryTabsProps = {
  scrolled: boolean;
};

export function ModishCategoryTabs({ scrolled }: ModishCategoryTabsProps) {
  if (!scrolled) return null;
  
  return (
    <div className="bg-white overflow-x-auto scrollbar-none">
      <div className="flex items-center px-2 py-1.5 gap-3 min-w-max">
        <button className="flex items-center whitespace-nowrap text-xs bg-red-50 text-red-500 px-2.5 py-1 rounded-full">
          <span>All Categories</span>
          <ChevronDown className="ml-1 w-3 h-3" />
        </button>
        
        <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
          Top Products
        </button>
        
        <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
          Best Selling
        </button>
        
        <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
          Price
        </button>
        
        <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
          New Arrivals
        </button>
        
        <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
          Ship From
        </button>
      </div>
    </div>
  );
}
