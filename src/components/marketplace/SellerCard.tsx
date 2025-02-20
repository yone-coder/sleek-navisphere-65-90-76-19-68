
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Check, Heart, Share2 } from "lucide-react";

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
  const randomLikes = Math.floor(Math.random() * 2000) + 500;
  const randomShares = Math.floor(Math.random() * 1000) + 200;

  return (
    <div className="flex-none w-[280px]">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-3">
        
        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={seller.image} 
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
            />
            <div>
              <h2 className="text-base font-bold flex items-center gap-1 truncate max-w-[120px]">
                {seller.name}
                {seller.isVerified && (
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                )}
              </h2>
              <p className="text-gray-400 text-xs">
                {formatNumber(seller.followers)} followers
              </p>
            </div>
          </div>
          <Button 
            variant="default" 
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 h-6 text-xs px-2 py-0"
          >
            + Follow
          </Button>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 mt-2 text-xs line-clamp-2">
          {seller.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-gray-400 text-xs mt-3">
          <div className="flex items-center space-x-1 bg-gray-700 px-1.5 py-0.5 rounded-full">
            <Heart className="w-3 h-3 text-red-500" />
            <span>{formatNumber(randomLikes)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-gray-700 px-1.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>{seller.rating}</span>
          </div>
          <div className="flex items-center space-x-1 bg-gray-700 px-1.5 py-0.5 rounded-full">
            <Share2 className="w-3 h-3 text-green-500" />
            <span>{formatNumber(randomShares)}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          className="w-full text-sm font-semibold py-1.5 mt-3 bg-blue-600 hover:bg-blue-700"
        >
          View Shop
        </Button>
      </div>
    </div>
  );
};
