
import React, { useState } from 'react';
import { Heart, MessageSquare, ShoppingCart, CreditCard, Shield, Truck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface ModishFloatingActionsProps {
  price: number;
  originalPrice: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  stock: number;
}

// Helper function to format number with k/m suffix
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}m`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export function ModishFloatingActions({
  price,
  originalPrice,
  onAddToCart,
  onBuyNow,
  stock
}: ModishFloatingActionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [showShippingDrawer, setShowShippingDrawer] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? "Item removed from your wishlist" : "Item added to your wishlist",
      duration: 2000,
    });
  };

  const handleAddToCart = () => {
    setCartLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setCartLoading(false);
      onAddToCart();
    }, 600);
  };
  
  const handleBuyNow = () => {
    setBuyLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setBuyLoading(false);
      onBuyNow();
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 animate-in slide-in-from-bottom duration-300 shadow-lg">
        {/* Basic info strip - AliExpress style */}
        <div className="flex justify-between items-center px-3 py-1.5 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs text-gray-700">Buyer Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs text-gray-700">Free Shipping</span>
          </div>
        </div>
        
        <div className="flex flex-col px-0 pt-2 pb-safe">          
          {/* Action buttons - AliExpress style */}
          <div className="grid grid-cols-12 gap-0">
            {/* Social actions */}
            <div className="col-span-2 h-12 flex items-center justify-center border-r">
              <button className="flex flex-col items-center justify-center w-full h-full" onClick={handleLike}>
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              </button>
            </div>
            
            <div className="col-span-2 h-12 flex items-center justify-center border-r">
              <button className="flex flex-col items-center justify-center w-full h-full" onClick={() => setShowShippingDrawer(true)}>
                <MessageSquare className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Enhanced Action buttons */}
            <div className="col-span-4 h-12">
              <Button
                onClick={handleAddToCart}
                className="w-full h-full rounded-none bg-orange-50 hover:bg-orange-100 text-orange-500 border-y border-r border-orange-200 relative overflow-hidden group"
                disabled={stock === 0 || cartLoading}
                variant="outline"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {cartLoading ? (
                    <div className="h-4 w-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingCart className="mr-1 h-5 w-5 relative z-10" />
                      <span className="relative z-10 text-sm font-medium">ADD</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
            
            <div className="col-span-4 h-12">
              <Button
                onClick={handleBuyNow}
                className="w-full h-full rounded-none bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm relative overflow-hidden group"
                disabled={stock === 0 || buyLoading}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {buyLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CreditCard className="mr-1.5 h-5 w-5 relative z-10" />
                      <span className="relative z-10">BUY NOW</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shipping Drawer */}
      <Drawer open={showShippingDrawer} onOpenChange={setShowShippingDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Contact Seller</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 py-3">
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-medium">Seller Store</div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200 text-[10px]">
                        <Check className="w-3 h-3 mr-0.5" />
                        Verified
                      </Badge>
                      <span className="text-xs text-gray-500">97.8% Positive Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Message:</div>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-[120px] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  placeholder="Type your message to the seller here..."
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Response time: Typically within 24 hours</span>
                <Button className="bg-orange-500 hover:bg-orange-600 text-sm px-4">
                  Send
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
