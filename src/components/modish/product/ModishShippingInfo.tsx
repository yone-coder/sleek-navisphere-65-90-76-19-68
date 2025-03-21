
import React from 'react';
import { MapPin, Clock, Star, Package, Users, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ModishShippingInfoProps = {
  shipFrom: string;
  estimatedDelivery: string;
  freeShipping: boolean;
  sellerRating: number;
};

export function ModishShippingInfo({
  shipFrom,
  estimatedDelivery,
  freeShipping,
  sellerRating
}: ModishShippingInfoProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span className="text-sm">Ships from: <span className="font-medium">{shipFrom}</span></span>
        </div>
        <span className="text-xs text-gray-600">to United States</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-sm">Delivery: <span className="font-medium">{estimatedDelivery}</span></span>
        </div>
        {freeShipping && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Free Shipping
          </Badge>
        )}
      </div>

      <div className="pt-2 border-t border-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              AT
            </div>
            <div>
              <div className="text-sm font-medium">AudioTech Official</div>
              <div className="flex items-center text-xs text-gray-500">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="ml-0.5">{sellerRating}% Positive</span>
              </div>
            </div>
          </div>
          <button className="text-xs font-medium text-blue-500 border border-blue-200 rounded-full px-3 py-1 bg-blue-50">
            Follow
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Package className="h-3 w-3" />
          <span>Products: 342</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Users className="h-3 w-3" />
          <span>Followers: 15.2K</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <MessageCircle className="h-3 w-3" />
          <span>Response: 97%</span>
        </div>
      </div>
    </div>
  );
}
