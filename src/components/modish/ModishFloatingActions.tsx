
import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type ModishFloatingActionsProps = {
  price: number;
  originalPrice: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  stock: number;
};

export function ModishFloatingActions({
  price,
  originalPrice,
  onAddToCart,
  onBuyNow,
  stock
}: ModishFloatingActionsProps) {
  const { isMobile } = useIsMobile();
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-40 border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-between p-3">
        {/* Price info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-red-500">${price.toFixed(2)}</span>
            <span className="line-through text-gray-400 text-sm">${originalPrice.toFixed(2)}</span>
            <span className="text-xs bg-red-50 text-red-500 px-1.5 py-0.5 rounded">{discount}% OFF</span>
          </div>
          {stock < 20 && (
            <div className="text-xs text-red-500 mt-0.5">Only {stock} left in stock</div>
          )}
        </div>
        
        {/* Actions */}
        <div className={isMobile ? "flex gap-2" : "flex gap-3"}>
          {isMobile ? (
            <>
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-red-200 text-red-500"
                onClick={() => {}}
              >
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full border-gray-200 text-gray-700"
                onClick={onAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
              
              <Button
                className="h-12 rounded-full bg-red-500 hover:bg-red-600 px-5 text-white"
                onClick={onBuyNow}
              >
                Buy Now
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 md:text-base"
                onClick={onAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button
                className="bg-red-500 hover:bg-red-600 text-white md:text-base"
                onClick={onBuyNow}
              >
                Buy Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
