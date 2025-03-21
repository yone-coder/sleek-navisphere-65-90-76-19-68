
import React from 'react';
import { Heart, Menu, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ModishHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
        <Heart className="w-5 h-5" />
        <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
          2
        </Badge>
      </button>
      
      <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
        <ShoppingBag className="w-5 h-5" />
        <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
          3
        </Badge>
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center text-gray-700">
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
}
