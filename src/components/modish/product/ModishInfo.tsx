
import React from 'react';
import { Star, Shield, Truck, Percent, Award, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      {/* Price section - AliExpress style with large prominent pricing */}
      <div className="flex items-baseline gap-2 mt-1">
        <div className="flex items-center">
          <span className="text-xs text-red-500">US $</span>
          <span className="text-2xl font-bold text-red-500">{discountPrice.toFixed(2)}</span>
        </div>
        {discountPrice < price && (
          <div className="flex items-center">
            <span className="text-xs text-gray-500 line-through">US ${price.toFixed(2)}</span>
            <Badge variant="outline" className="ml-2 py-0.5 px-1.5 text-[10px] font-medium bg-red-50 text-red-500 border-red-200">
              {discountPercentage}% OFF
            </Badge>
          </div>
        )}
      </div>
      
      {/* Product title - larger with better spacing */}
      <h1 className="text-lg font-medium text-gray-900 leading-tight">{name}</h1>
      
      {/* Ratings and reviews - AliExpress style with colored background */}
      <div className="flex items-center gap-2 bg-orange-50 w-fit px-2 py-1 rounded-md">
        <div className="flex items-center">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
          <span className="text-sm font-medium text-orange-500 ml-0.5">{rating}</span>
        </div>
        <div className="h-3 w-px bg-gray-300"></div>
        <span className="text-xs text-gray-600">{reviewCount} Reviews</span>
        <div className="h-3 w-px bg-gray-300"></div>
        <span className="text-xs text-gray-600">100+ Sold</span>
      </div>
      
      {/* Shipping and promotions section - AliExpress style */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-500" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-700">Free Shipping</span>
            <span className="text-xs text-gray-500">· Est. arrival: 14-30 days</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-700">Buyer Protection</span>
            <span className="text-xs text-gray-500">· Money back guarantee</span>
          </div>
        </div>
      </div>
      
      {/* Coupons section - typical for AliExpress */}
      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-800">Coupons & Discounts</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex-shrink-0 border border-red-300 border-dashed bg-red-50 rounded px-2 py-1">
            <span className="text-xs font-medium text-red-500">$3 OFF orders over $30</span>
          </div>
          <div className="flex-shrink-0 border border-red-300 border-dashed bg-red-50 rounded px-2 py-1">
            <span className="text-xs font-medium text-red-500">$5 OFF orders over $50</span>
          </div>
          <div className="flex-shrink-0 border border-red-300 border-dashed bg-red-50 rounded px-2 py-1">
            <span className="text-xs font-medium text-red-500">New User Bonus</span>
          </div>
        </div>
      </div>
      
      {/* Product description - more compact like AliExpress */}
      <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700 leading-relaxed space-y-2">
        <div className="flex items-center gap-1.5">
          <ThumbsUp className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-gray-800">Product Highlights</span>
        </div>
        
        <p className="text-sm text-gray-600 pl-6">
          {description}
        </p>
        
        <div className="flex items-center gap-2 pt-2">
          <Award className="w-4 h-4 text-purple-500" />
          <span className="text-xs text-purple-600">Top-rated product</span>
        </div>
      </div>
      
      {/* Seller info - AliExpress style */}
      <div className="pt-2 border-t border-gray-100 mt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {brand.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium">{brand}</div>
              <div className="text-xs text-gray-500">97.8% Positive Feedback</div>
            </div>
          </div>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50 transition-colors">
            Visit Store
          </button>
        </div>
      </div>
    </div>
  );
}
