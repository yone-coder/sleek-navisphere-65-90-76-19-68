
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Check, Heart, Trophy } from "lucide-react";

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
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img 
            src={seller.image}
            alt={seller.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {seller.name}
              </h3>
              <div className="flex gap-1 flex-shrink-0">
                {seller.isVerified && (
                  <Check className="w-3.5 h-3.5 text-blue-500" />
                )}
                {seller.isTopSeller && (
                  <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{formatNumber(seller.followers)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>{seller.rating}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            size="sm"
            className="h-7 px-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xs rounded-lg"
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};
