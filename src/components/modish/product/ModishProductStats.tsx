
import React from 'react';
import { Badge } from '@/components/ui/badge';

type ModishProductStatsProps = {
  price: number;
  discountPrice: number;
  soldCount?: number;
  viewCount?: number;
};

export function ModishProductStats({ 
  price, 
  discountPrice, 
  soldCount = 0, 
  viewCount = 0 
}: ModishProductStatsProps) {
  return (
    <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg text-xs text-gray-700">
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-red-500">${discountPrice.toFixed(2)}</span>
        <span className="line-through">${price.toFixed(2)}</span>
        <Badge variant="outline" className="bg-red-50 border-red-100 text-red-500 text-[10px] px-1">
          -{Math.round(((price - discountPrice) / price) * 100)}%
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <span className="text-gray-600">Sold: </span>
          <span className="font-medium">{soldCount}</span>
        </div>
        <div>
          <span className="text-gray-600">Views: </span>
          <span className="font-medium">{viewCount}</span>
        </div>
      </div>
    </div>
  );
}
