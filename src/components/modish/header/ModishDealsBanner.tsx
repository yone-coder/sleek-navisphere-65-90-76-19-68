
import React from 'react';
import { Clock, Tag } from 'lucide-react';

export function ModishDealsBanner() {
  return (
    <div className="px-3 py-1.5 bg-red-50 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Tag className="w-4 h-4 text-red-500" />
        <span className="text-xs font-medium text-red-700">Flash Deals</span>
      </div>
      
      <div className="flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-red-500" />
        <span className="text-xs text-red-700">Ends in 02:45:30</span>
      </div>
    </div>
  );
}
