
import React from 'react';
import { Heart, Share2, ShoppingBag, CreditCard, Truck, Clock, RefreshCw } from 'lucide-react';

type ModishActionsProps = {
  product: any;
  selectedColor: string;
  quantity: number;
};

export function ModishActions({ product, selectedColor, quantity }: ModishActionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button className="flex-1 bg-black text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
        
        <button className="bg-white border border-gray-200 text-gray-700 h-12 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4" />
          <span className="sr-only md:not-sr-only">Wishlist</span>
        </button>
        
        <button className="bg-white border border-gray-200 text-gray-700 h-12 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <Share2 className="w-4 h-4" />
          <span className="sr-only md:not-sr-only">Share</span>
        </button>
      </div>
      
      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30">
        <CreditCard className="w-4 h-4" />
        Buy Now · ${(product.discountPrice * quantity).toLocaleString()}
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-blue-50">
          <Truck className="w-5 h-5 text-blue-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Free Shipping</span>
          <span className="text-xs text-gray-500">For orders over $100</span>
        </div>
        
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-green-50">
          <RefreshCw className="w-5 h-5 text-green-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Easy Returns</span>
          <span className="text-xs text-gray-500">30-day money back</span>
        </div>
        
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-purple-50">
          <Clock className="w-5 h-5 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Fast Delivery</span>
          <span className="text-xs text-gray-500">{product.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}
