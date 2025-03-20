import React, { useState } from 'react';
import { ArrowUp, Heart, MessageSquare, Share2, ShoppingCart, Clock, Shield, DollarSign, CreditCard, Tag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModishFloatingActionsProps {
  price: number;
  originalPrice: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  stock: number;
}

export function ModishFloatingActions({
  price,
  originalPrice,
  onAddToCart,
  onBuyNow,
  stock
}: ModishFloatingActionsProps) {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  const [showShippingDrawer, setShowShippingDrawer] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState('none');
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const limitedTimeLeft = Math.floor(Math.random() * 24) + 1; // Random hours left for demo
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? "Item removed from your wishlist" : "Item added to your wishlist",
      duration: 2000,
    });
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this product',
          text: 'I found this amazing product!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 animate-in slide-in-from-bottom duration-300">
        <div className="flex flex-col px-0 pt-2 pb-safe">
          {/* Price section with discount */}
          <div className="flex items-baseline mb-3 px-3">
            <span className="text-xl font-bold text-red-500">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-500 ml-1">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
              {discount}% OFF
            </span>
          </div>
          
          {/* Action buttons - Reorganized layout */}
          <div className="grid grid-cols-12 gap-0">
            {/* Social actions */}
            <div className="col-span-3 border-t border-r h-14 flex items-center justify-center" onClick={handleLike}>
              <button className="flex flex-col items-center justify-center w-full h-full">
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                <span className="text-[10px] mt-1 text-gray-500">Wishlist</span>
              </button>
            </div>
            
            <div className="col-span-3 border-t border-r h-14 flex items-center justify-center" onClick={handleShare}>
              <button className="flex flex-col items-center justify-center w-full h-full">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Share</span>
              </button>
            </div>
            
            <div className="col-span-3 border-t border-r h-14 flex items-center justify-center">
              <button className="flex flex-col items-center justify-center w-full h-full">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Chat</span>
              </button>
            </div>
            
            <div className="col-span-3 border-t h-14 flex items-center justify-center" onClick={onAddToCart}>
              <button className="flex flex-col items-center justify-center w-full h-full">
                <ShoppingCart className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Cart</span>
              </button>
            </div>
            
            {/* Buy button - Full width */}
            <Button
              onClick={onBuyNow}
              className="col-span-12 h-12 rounded-none bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base"
              disabled={stock === 0}
            >
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
      
      {/* Shipping Drawer */}
      <Drawer open={showShippingDrawer} onOpenChange={setShowShippingDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Shipping & Delivery</DrawerTitle>
            <DrawerDescription>Shipping options and estimated delivery times</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Tabs defaultValue="shipping">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              <TabsContent value="shipping" className="space-y-4 py-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Standard Shipping</h4>
                      <p className="text-xs text-gray-500">Estimated delivery: 15-30 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">$2.99</p>
                    <p className="text-xs text-gray-500">Free over $35</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">Express Shipping</h4>
                      <p className="text-xs text-gray-500">Estimated delivery: 7-12 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">$8.99</p>
                  </div>
                </div>
                
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <h4 className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
                    Customs & Import Fees
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Customs fees may apply depending on your country's import regulations.
                    These fees are not included in the product price or shipping costs.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="payment" className="space-y-4 py-4">
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium mb-2">Accepted Payment Methods</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center border rounded p-2">
                      <svg viewBox="0 0 48 48" className="h-6 w-6 mb-1">
                        <rect width="48" height="48" fill="#1565C0"/>
                        <path d="M32 24v-4h4v-4h-4v-4h-4v4h-4v4h4v4h4z" fill="#FFF"/>
                        <path d="M20 12v4h-8v4h4v4h4v-4h4v-4h-4v-4h-4z" fill="#FFF"/>
                      </svg>
                      <span className="text-[10px]">Credit Card</span>
                    </div>
                    <div className="flex flex-col items-center border rounded p-2">
                      <svg viewBox="0 0 48 48" className="h-6 w-6 mb-1">
                        <rect width="48" height="48" fill="#009688"/>
                        <path d="M24 12l-12 12h8v12h8V24h8L24 12z" fill="#FFF"/>
                      </svg>
                      <span className="text-[10px]">PayPal</span>
                    </div>
                    <div className="flex flex-col items-center border rounded p-2">
                      <svg viewBox="0 0 48 48" className="h-6 w-6 mb-1">
                        <rect width="48" height="48" fill="#FF9800"/>
                        <path d="M24 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12z" fill="#FFF"/>
                      </svg>
                      <span className="text-[10px]">Crypto</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                  <h4 className="text-sm font-medium flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-1" />
                    Secure Payment
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    All transactions are secure and encrypted. Your payment information is never stored on our servers.
                  </p>
                </div>
                
                <div className="rounded-lg border p-3">
                  <h4 className="text-sm font-medium mb-2">Installment Plans</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs p-2 border-b">
                      <span>3 months</span>
                      <span className="font-medium">No interest</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 border-b">
                      <span>6 months</span>
                      <span className="font-medium">2.5% APR</span>
                    </div>
                    <div className="flex justify-between text-xs p-2">
                      <span>12 months</span>
                      <span className="font-medium">4.9% APR</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
