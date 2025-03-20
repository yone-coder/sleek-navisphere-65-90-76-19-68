
import React, { useState } from 'react';
import { ArrowUp, Heart, MessageSquare, Share2, ShoppingCart, Tag, Star, Shield, Truck, DollarSign, Package, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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
  const [showReviewsDrawer, setShowReviewsDrawer] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const rating = 4.8; // Example rating
  const reviewCount = 1280; // Example review count
  const wishlistCount = 427; // Example wishlist count
  const shareCount = 89; // Example share count
  
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
      
      // Create mock product data for the checkout page
      const mockProduct = {
        name: "Stylish Modern Product",
        discountPrice: price,
        originalPrice: originalPrice,
        images: ['/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png']
      };
      
      // Navigate to checkout page with product data
      navigate('/modish/checkout', { 
        state: { 
          product: mockProduct,
          selectedColor: "Black",
          quantity: 1
        } 
      });
      
      // Still call the original onBuyNow prop for any additional handling
      onBuyNow();
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 animate-in slide-in-from-bottom duration-300 shadow-lg">
        <div className="flex flex-col px-0 pt-2 pb-safe">
          {/* Price section with discount and rating */}
          <div className="flex items-center justify-between mb-3 px-3">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-red-500">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-500 ml-1">
                ${originalPrice.toFixed(2)}
              </span>
              <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0.5 bg-red-50 text-red-500 border-red-200">
                {discount}% OFF
              </Badge>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-gray-500 ml-1">({formatCount(reviewCount)})</span>
              {stock < 20 && (
                <Badge variant="outline" className="ml-2 bg-red-50 text-red-500 border-red-200">
                  <span className="text-xs">Only {stock} left</span>
                </Badge>
              )}
            </div>
          </div>
          
          {/* Action buttons - Enhanced layout */}
          <div className="grid grid-cols-12 gap-0">
            {/* Social actions */}
            <div className="col-span-3 border-t border-r h-14 flex items-center justify-center" onClick={handleLike}>
              <button className="flex flex-col items-center justify-center w-full h-full relative">
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                <span className="text-[10px] mt-1 text-gray-500">Wishlist</span>
                {wishlistCount > 0 && (
                  <div className="absolute -top-1 -right-1 text-[9px] bg-gray-200 text-gray-700 rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                    {formatCount(wishlistCount)}
                  </div>
                )}
              </button>
            </div>
            
            <div className="col-span-3 border-t border-r h-14 flex items-center justify-center" onClick={handleShare}>
              <button className="flex flex-col items-center justify-center w-full h-full relative">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Share</span>
                {shareCount > 0 && (
                  <div className="absolute -top-1 -right-1 text-[9px] bg-gray-200 text-gray-700 rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                    {formatCount(shareCount)}
                  </div>
                )}
              </button>
            </div>
            
            <div 
              className="col-span-3 border-t border-r h-14 flex items-center justify-center"
              onClick={() => setShowReviewsDrawer(true)}
            >
              <button className="flex flex-col items-center justify-center w-full h-full relative">
                <Star className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Reviews</span>
                {reviewCount > 0 && (
                  <div className="absolute -top-1 -right-1 text-[9px] bg-gray-200 text-gray-700 rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                    {formatCount(reviewCount)}
                  </div>
                )}
              </button>
            </div>
            
            <div 
              className="col-span-3 border-t h-14 flex items-center justify-center" 
              onClick={() => setShowShippingDrawer(true)}
            >
              <button className="flex flex-col items-center justify-center w-full h-full">
                <Shield className="h-5 w-5 text-gray-500" />
                <span className="text-[10px] mt-1 text-gray-500">Shipping</span>
              </button>
            </div>
            
            {/* Enhanced Action buttons */}
            <div className="col-span-4 h-12">
              <Button
                onClick={handleAddToCart}
                className="w-full h-full rounded-none bg-gray-100 hover:bg-gray-200 text-gray-800 relative overflow-hidden group"
                disabled={stock === 0 || cartLoading}
                variant="outline"
              >
                <div className="absolute inset-0 bg-gray-200 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {cartLoading ? (
                    <div className="h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Package className="mr-1 h-5 w-5 relative z-10" />
                      <span className="relative z-10">CART</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
            
            <div className="col-span-8 h-12">
              <Button
                onClick={handleBuyNow}
                className="w-full h-full rounded-none bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base relative overflow-hidden group"
                disabled={stock === 0 || buyLoading}
              >
                <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {buyLoading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CreditCard className="mr-1.5 h-5 w-5 relative z-10" />
                      <span className="relative z-10">BUY NOW</span>
                      {stock > 0 && stock < 10 && (
                        <span className="relative z-10 ml-1 text-xs">({stock} left)</span>
                      )}
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
                        <path d="M32 24v-4h4v-4h-4v-4h-4v4h-4v4h4h4z" fill="#FFF"/>
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

      {/* Reviews Drawer */}
      <Drawer open={showReviewsDrawer} onOpenChange={setShowReviewsDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Customer Reviews</DrawerTitle>
            <DrawerDescription>
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{rating}</span>
                <span className="text-sm text-gray-500 ml-1">({reviewCount} reviews)</span>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <div className="space-y-4">
              {/* Review rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <span className="text-sm w-8">{star} star</span>
                    <div className="flex-1 mx-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-yellow-500 h-full rounded-full"
                        style={{ 
                          width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 1.5 : 0.5}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8">
                      {star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 1.5 : 0.5}%
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Review highlights */}
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Review Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gray-100">Great quality</Badge>
                  <Badge variant="secondary" className="bg-gray-100">Fast shipping</Badge>
                  <Badge variant="secondary" className="bg-gray-100">As described</Badge>
                  <Badge variant="secondary" className="bg-gray-100">Value for money</Badge>
                </div>
              </div>
              
              {/* Sample reviews */}
              <div className="space-y-3 pt-2 max-h-[300px] overflow-y-auto">
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Sarah J.</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">Absolutely love this product! It arrived earlier than expected and the quality is amazing for the price.</p>
                </div>
                
                <div className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Michael T.</span>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <div className="flex items-center mb-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                    {[5].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 text-gray-300"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">Good product overall. Would've given 5 stars but shipping took a bit longer than expected.</p>
                </div>
                
                <div className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">Jessica M.</span>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <div className="flex items-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">Perfect fit and excellent quality! I'm ordering another one in a different color.</p>
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
    </>
  );
}
