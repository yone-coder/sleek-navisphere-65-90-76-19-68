
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";

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

const formatNumber = (num: number) => {
  return num >= 1000 ? `${(num/1000).toFixed(1)}k` : num;
};

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <div className="w-[300px]">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img 
            src={seller.image}
            alt={seller.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          />
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1">
              {seller.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{formatNumber(seller.followers)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{seller.rating}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs"
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};
