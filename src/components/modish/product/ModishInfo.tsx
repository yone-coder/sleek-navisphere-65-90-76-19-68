
import React from 'react';
import { Star } from 'lucide-react';

type ModishInfoProps = {
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
};

export function ModishInfo({
  name,
  brand,
  price,
  discountPrice,
  rating,
  reviewCount,
  description
}: ModishInfoProps) {
  // Calculate discount percentage
  const discountPercentage = Math.round(((price - discountPrice) / price) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{brand}</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-900">{rating}</span>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 leading-tight">{name}</h1>
      
      <div className="flex items-end gap-2 mt-2">
        <span className="text-2xl font-bold text-gray-900">${discountPrice.toLocaleString()}</span>
        {discountPrice < price && (
          <>
            <span className="text-sm text-gray-500 line-through">${price.toLocaleString()}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-red-50 text-red-600 rounded-full">
              Save {discountPercentage}%
            </span>
          </>
        )}
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mt-3">
        {description}
      </p>
    </div>
  );
}
