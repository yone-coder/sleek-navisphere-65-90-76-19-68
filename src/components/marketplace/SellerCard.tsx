
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Star,
  Bookmark,
  Check,
  Heart,
  Share2,
  Trophy,
  TrendingUp,
  Clock,
  ChevronUp,
  Zap,
  Activity
} from "lucide-react";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const randomLikes = Math.floor(Math.random() * 2000) + 500;
  const randomShares = Math.floor(Math.random() * 1000) + 200;

  const gradientStyle = {
    background: 'linear-gradient(135deg, rgba(37, 38, 43, 0.95) 0%, rgba(44, 45, 50, 0.95) 100%)',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div className="w-[300px]">
      <div 
        style={gradientStyle}
        className="relative rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src={seller.image}
                  alt={seller.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-gray-700"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-white font-bold">
                    {seller.name}
                  </h2>
                  <div className="flex items-center gap-1">
                    {seller.isVerified && (
                      <div className="bg-blue-500/10 p-0.5 rounded">
                        <Check className="w-3 h-3 text-blue-500" />
                      </div>
                    )}
                    {seller.isTopSeller && (
                      <div className="bg-yellow-500/10 p-0.5 rounded">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <Activity className="w-3 h-3" />
                  <span>Active now</span>
                </p>
              </div>
            </div>
            <Button 
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 text-gray-300"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-800/50 rounded-xl p-2 backdrop-blur">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <TrendingUp className="w-3 h-3" />
                <span>Sales</span>
              </div>
              <p className="text-white font-semibold">{formatNumber(seller.recentSales || 234)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-2 backdrop-blur">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <Clock className="w-3 h-3" />
                <span>Response</span>
              </div>
              <p className="text-white font-semibold">{seller.responseTime || '~2h'}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-2 backdrop-blur">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <Zap className="w-3 h-3" />
                <span>Complete</span>
              </div>
              <p className="text-white font-semibold">{seller.completion || '98'}%</p>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {seller.description}
          </p>

          <div className="flex items-center justify-between text-xs mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{formatNumber(randomLikes)}</span>
              </button>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{seller.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Share2 className="w-4 h-4" />
                <span>{formatNumber(randomShares)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <ChevronUp className="w-4 h-4 text-green-500" />
              <span>{formatNumber(seller.followers)} followers</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl"
            >
              View Shop
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
