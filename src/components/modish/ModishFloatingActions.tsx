
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
        <div className="flex flex-col px-3 pt-2 pb-safe">
          {/* Top section: Limited time offer + coupon */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                <span className="text-xs font-medium text-red-500">
                  Sale ends in {limitedTimeLeft}h
                </span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 px-2 text-xs border-orange-500 text-orange-500 hover:bg-orange-50"
              onClick={() => setShowCouponDrawer(true)}
            >
              <Tag className="h-3 w-3 mr-1" />
              GET COUPONS
            </Button>
          </div>
          
          {/* Price section with discount */}
          <div className="flex items-baseline mb-2">
            <span className="text-xl font-bold text-red-500">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-500 ml-1">
              ${originalPrice.toFixed(2)}
            </span>
            <Badge variant="destructive" className="ml-2 h-5 text-[10px]">
              {discount}% OFF
            </Badge>
            <div className="ml-auto flex items-center gap-2">
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                onClick={() => setShowShippingDrawer(true)}
              >
                <Truck className="h-4 w-4" />
              </button>
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Installment options */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
            <button 
              className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedInstallment === 'none' 
                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => setSelectedInstallment('none')}
            >
              Pay in full
            </button>
            <button 
              className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedInstallment === '3mo' 
                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => setSelectedInstallment('3mo')}
            >
              <CreditCard className="h-3 w-3 inline mr-1" />
              3 mo. × ${(price / 3).toFixed(2)}
            </button>
            <button 
              className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedInstallment === '6mo' 
                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => setSelectedInstallment('6mo')}
            >
              <CreditCard className="h-3 w-3 inline mr-1" />
              6 mo. × ${(price / 6).toFixed(2)}
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col items-center justify-center col-span-1">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full ${
                  isLiked 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <span className="text-[10px] mt-1">Wishlist</span>
            </div>
            
            <div className="flex flex-col items-center justify-center col-span-1">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-gray-100 text-gray-500"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <span className="text-[10px] mt-1">Share</span>
            </div>
            
            <div className="flex flex-col items-center justify-center col-span-1">
              <button className="p-2 rounded-full bg-gray-100 text-gray-500">
                <MessageSquare className="h-5 w-5" />
              </button>
              <span className="text-[10px] mt-1">Chat</span>
            </div>
            
            <button
              onClick={onAddToCart}
              className="h-11 col-span-1 rounded-lg bg-orange-50 border border-orange-500 text-orange-500 font-semibold text-xs flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-4 w-4 mb-0.5" />
                <span>Cart</span>
              </div>
            </button>
            
            <Button
              onClick={onBuyNow}
              className="h-11 col-span-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs"
              disabled={stock === 0}
            >
              Buy Now
            </Button>
          </div>
          
          {/* Buyer protection */}
          <div className="flex items-center justify-center mt-2 mb-1">
            <Shield className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-[10px] text-gray-500">
              Buyer Protection & Secure Payment
            </span>
          </div>
        </div>
      </div>
      
      {/* Coupons Drawer */}
      <Drawer open={showCouponDrawer} onOpenChange={setShowCouponDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Available Coupons</DrawerTitle>
            <DrawerDescription>Apply coupons to get extra discounts</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-4">
              <div className="border border-orange-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">$5 OFF</span>
                    <Badge variant="outline" className="text-white border-white">New User</Badge>
                  </div>
                  <p className="text-xs opacity-80">On orders above $50</p>
                </div>
                <div className="p-3 bg-orange-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Valid until Jul 30, 2024</p>
                      <p className="text-xs text-gray-500">First order only</p>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border border-orange-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-3 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">10% OFF</span>
                    <Badge variant="outline" className="text-white border-white">Store</Badge>
                  </div>
                  <p className="text-xs opacity-80">On all products from this store</p>
                </div>
                <div className="p-3 bg-orange-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Valid until Jun 15, 2024</p>
                      <p className="text-xs text-gray-500">Min. order $25</p>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">$15 OFF</span>
                    <Badge variant="outline" className="text-white border-white">Membership</Badge>
                  </div>
                  <p className="text-xs opacity-80">On orders above $100</p>
                </div>
                <div className="p-3 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Valid until Aug 31, 2024</p>
                      <p className="text-xs text-gray-500">Membership required</p>
                    </div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Join Now
                    </Button>
                  </div>
                </div>
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
