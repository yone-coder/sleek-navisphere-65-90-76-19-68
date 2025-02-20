
import React from 'react';
import { Check, Star } from "lucide-react";

interface SellerCardProps {
  seller: {
    id: number;
    name: string;
    image: string;
    description: string;
    followers: number;
    isTopSeller?: boolean;
    isVerified?: boolean;
    rating: number;
    recentSales?: number;
    responseTime?: string;
    completion?: number;
  };
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <div className="group w-48 bg-white dark:bg-gray-900 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <img 
          src={seller.image}
          alt={seller.name}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
        />
        
        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {seller.name}
            </p>
            {seller.isVerified && (
              <Check className="w-3 h-3 text-blue-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-0.5 text-xs text-gray-500 dark:text-gray-400">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>{seller.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
