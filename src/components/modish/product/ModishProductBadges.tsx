
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function ModishProductBadges() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-none">
      {['Flash Deal 🔥', 'Top Seller 🏆', 'Free Shipping 🚚', 'New Arrival ✨', 'Best Quality ⭐'].map((tag, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className={`whitespace-nowrap px-2 py-1 text-xs font-medium ${
            index === 0 ? 'bg-red-50 text-red-600 border-red-100' : 
            index === 1 ? 'bg-orange-50 text-orange-600 border-orange-100' : 
            index === 2 ? 'bg-green-50 text-green-600 border-green-100' :
            index === 3 ? 'bg-blue-50 text-blue-600 border-blue-100' :
            'bg-purple-50 text-purple-600 border-purple-100'
          }`}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
