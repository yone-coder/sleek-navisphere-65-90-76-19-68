import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ModishGallery } from '@/components/modish/product/ModishGallery';
import { ModishInfo } from '@/components/modish/product/ModishInfo';
import { ModishOptions } from '@/components/modish/product/ModishOptions';
import { ModishDescription } from '@/components/modish/product/ModishDescription';
import { ModishReviews } from '@/components/modish/product/ModishReviews';
import { ModishTrending } from '@/components/modish/product/ModishTrending';
import { ModishSizeGuide } from '@/components/modish/product/ModishSizeGuide';
import { ModishQuestions } from '@/components/modish/product/ModishQuestions';
import { ModishSimilar } from '@/components/modish/product/ModishSimilar';
import { ModishEnhancedFeatures } from '@/components/modish/product/ModishEnhancedFeatures';
import { ModishFeatures } from '@/components/modish/product/ModishFeatures';
import { ModishProductStats } from '@/components/modish/product/ModishProductStats';
import { ModishGuarantee } from '@/components/modish/product/ModishGuarantee';
import { ModishFlashSale } from '@/components/modish/product/ModishFlashSale';
import { ModishProductBadges } from '@/components/modish/product/ModishProductBadges';
import { ModishActionButtons } from '@/components/modish/product/ModishActionButtons';
import { ModishShippingInfo } from '@/components/modish/product/ModishShippingInfo';
import { ModishCoupons } from '@/components/modish/product/ModishCoupons';
import { ModishGuaranteesGrid } from '@/components/modish/product/ModishGuaranteesGrid';
import { ModishShareButton } from '@/components/modish/product/ModishShareButton';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, Activity, ShoppingBag, 
  Gift, DollarSign, Sparkles 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  colors: { name: string; value: string; }[];
  sizes?: { name: string; available: boolean; }[];
  sellerRating?: number;
  shipFrom?: string;
  freeShipping?: boolean;
  estimatedDelivery?: string;
  soldCount?: number;
  viewCount?: number;
  tags?: string[];
  guarantees?: string[];
  features?: { title: string; description: string; icon: string; color: string; details: string; }[];
};

type ModishProductDetailsProps = {
  productId: string;
  price: number;
  discountPrice: number;
};

export function ModishProductDetails({ productId, price, discountPrice }: ModishProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [realTimeViews, setRealTimeViews] = useState(34);
  const [showRealtimeAlert, setShowRealtimeAlert] = useState(false);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showARView, setShowARView] = useState(false);
  const [likeCount, setLikeCount] = useState(243);
  const [isLiked, setIsLiked] = useState(false);
  const [lastPurchaseTime, setLastPurchaseTime] = useState<string | null>(null);
  const [showCompareProducts, setShowCompareProducts] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsNavRef = useRef<HTMLDivElement>(null);
  const headerSpacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setHeaderSpacerHeight = () => {
      const headerHeight = document.querySelector('.modish-header')?.clientHeight || 56;
      if (headerSpacerRef.current) {
        headerSpacerRef.current.style.height = `${headerHeight}px`;
      }
    };

    setHeaderSpacerHeight();
    window.addEventListener('resize', setHeaderSpacerHeight);
    
    const fetchProduct = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockProduct: Product = {
        id: productId,
        name: "High-Quality Bluetooth Speaker",
        brand: "AudioTech",
        price: price,
        discountPrice: discountPrice,
        rating: 4.5,
        reviewCount: 120,
        description: "Experience superior sound quality with this portable Bluetooth speaker. Perfect for indoor and outdoor use.",
        images: [
          '/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400'
        ],
        colors: [
          { name: "Black", value: "#000000" },
          { name: "White", value: "#FFFFFF" },
          { name: "Blue", value: "#0000FF" }
        ],
        sizes: [
          { name: "S", available: true },
          { name: "M", available: true },
          { name: "L", available: false },
          { name: "XL", available: true }
        ],
        sellerRating: 97.8,
        shipFrom: "United States",
        freeShipping: true,
        estimatedDelivery: "Aug 25 - Sep 5",
        soldCount: 1458,
        viewCount: 3892,
        tags: ["Best Seller", "Flash Deal", "New Arrival"],
        guarantees: ["90-Day Warranty", "Authentic Product", "Buyer Protection"],
        features: [
          {
            title: "Premium Sound",
            description: "360° immersive audio experience",
            icon: "Design",
            color: "blue",
            details: "Dual 10W speakers deliver crisp highs and deep bass for a premium audio experience."
          },
          {
            title: "Waterproof Design",
            description: "Perfect for outdoor adventures",
            icon: "Layers",
            color: "green",
            details: "IPX7 water resistance rating means you can use it by the pool or in light rain without worry."
          },
          {
            title: "Long Battery Life",
            description: "Enjoy music all day long",
            icon: "ThumbsUp",
            color: "amber",
            details: "Built-in rechargeable battery provides up to 10 hours of continuous playback on a single charge."
          },
        ]
      };

      setProduct(mockProduct);
    };

    fetchProduct();
    
    const viewsInterval = setInterval(() => {
      setRealTimeViews(prev => {
        const newViews = prev + Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.7) {
          setShowRealtimeAlert(true);
          setTimeout(() => setShowRealtimeAlert(false), 3000);
        }
        return newViews;
      });
    }, 15000);
    
    const purchaseInterval = setInterval(() => {
      const minutes = Math.floor(Math.random() * 30) + 1;
      setLastPurchaseTime(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      setTimeout(() => setLastPurchaseTime(null), 5000);
    }, 45000);
    
    return () => {
      clearInterval(viewsInterval);
      clearInterval(purchaseInterval);
    };
  }, [productId, price, discountPrice]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleCouponSelect = (coupon: string) => {
    setActiveCoupon(coupon);
    toast({
      title: "Coupon collected",
      description: `Coupon ${coupon} has been applied to your cart`,
      duration: 2000,
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    setTimeout(() => {
      const tabContentElement = document.getElementById('tabContent');
      if (tabContentElement) {
        let offsetHeight = 0;
        
        const modishHeaderHeight = document.querySelector('.modish-header')?.clientHeight || 56;
        offsetHeight += modishHeaderHeight;
        
        if (tabsNavRef.current) {
          offsetHeight += tabsNavRef.current.clientHeight;
        }
        
        offsetHeight += 32;
        
        const elementPosition = tabContentElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offsetHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleShare = () => {
    toast({
      title: "Share Product",
      description: "Sharing options would appear here in a real app",
      duration: 2000,
    });
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? "This item has been removed from your favorites" : "This item has been added to your favorites",
      duration: 2000,
    });
  };

  const handleVirtualTryOn = () => {
    setShowVirtualTryOn(true);
    toast({
      title: "Virtual Try-On",
      description: "This feature would launch a virtual try-on experience in a real app",
      duration: 2000,
    });
    setTimeout(() => setShowVirtualTryOn(false), 2000);
  };

  const handleARView = () => {
    setShowARView(true);
    toast({
      title: "AR View",
      description: "This feature would launch an AR view in a real app",
      duration: 2000,
    });
    setTimeout(() => setShowARView(false), 2000);
  };

  const handleCompareProducts = () => {
    setShowCompareProducts(true);
    toast({
      title: "Compare Products",
      description: "This feature would show a product comparison chart in a real app",
      duration: 2000,
    });
    setTimeout(() => setShowCompareProducts(false), 2000);
  };

  if (!product) {
    return <div className="p-4 flex items-center justify-center h-64">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        <div className="h-4 w-48 rounded bg-gray-200"></div>
        <div className="h-3 w-32 rounded bg-gray-200"></div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-4 pb-20">
      
      <div ref={headerSpacerRef} className="w-full"></div>
      
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 opacity-0 pointer-events-none">
        <div className="h-14"></div>
      </div>
      
      <ModishGallery images={product.images} name={product.name} />
      
      {showRealtimeAlert && (
        <div className="fixed bottom-32 right-4 bg-white shadow-lg rounded-lg p-2 animate-fade-in border border-orange-200 z-40">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-medium">{realTimeViews} people viewing now</span>
          </div>
        </div>
      )}

      {lastPurchaseTime && (
        <div className="fixed bottom-44 right-4 bg-white shadow-lg rounded-lg p-2 animate-fade-in border border-green-200 z-40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium">Someone purchased this {lastPurchaseTime}</span>
          </div>
        </div>
      )}

      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-1">
        <div className="flex overflow-x-auto scrollbar-none gap-4 pt-2" ref={tabsNavRef}>
          {['description', 'specs', 'shipping', 'reviews', 'questions', 'similar'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`whitespace-nowrap py-3 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab === 'questions' ? 'Q&A' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ModishActionButtons 
        onVirtualTryOn={handleVirtualTryOn}
        onARView={handleARView}
        onCompare={handleCompareProducts}
        onLikeToggle={handleLikeToggle}
        showVirtualTryOn={showVirtualTryOn}
        showARView={showARView}
        showCompareProducts={showCompareProducts}
        isLiked={isLiked}
        likeCount={likeCount}
      />

      <ModishProductStats 
        price={product.price}
        discountPrice={product.discountPrice}
        soldCount={product.soldCount}
        viewCount={product.viewCount}
      />

      <ModishGuarantee />

      <ModishFlashSale />

      <ModishProductBadges />

      <ModishInfo
        name={product.name}
        brand={product.brand}
        price={product.price}
        discountPrice={product.discountPrice}
        rating={product.rating}
        reviewCount={product.reviewCount}
        description={product.description}
      />
      
      {product.features && (
        <ModishFeatures features={product.features} />
      )}
      
      <ModishEnhancedFeatures productId={product.id} />

      <ModishSizeGuide />

      <ModishShippingInfo 
        shipFrom={product.shipFrom || ""}
        estimatedDelivery={product.estimatedDelivery || ""}
        freeShipping={product.freeShipping || false}
        sellerRating={product.sellerRating || 0}
      />
      
      <div className="px-3 py-4 bg-gray-50 rounded-lg">
        <ModishTrending />
      </div>
      
      <ModishCoupons activeCoupon={activeCoupon} onCouponSelect={handleCouponSelect} />
      
      <ModishGuaranteesGrid />

      <ModishOptions
        colors={product.colors}
        selectedColor={selectedColor}
        onSelectColor={handleColorSelect}
        quantity={quantity}
        onUpdateQuantity={setQuantity}
        stock={100}
        price={product.price}
        discountPrice={product.discountPrice}
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={handleSizeSelect}
      />

      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-3 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <h3 className="text-sm font-medium">Personalization Options</h3>
          </div>
          
          <div className="space-y-2">
            <div className="bg-white rounded-md p-2 border border-gray-100">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-500" />
                <span className="text-xs">Add gift wrapping (+$3.99)</span>
              </label>
            </div>
            
            <div className="bg-white rounded-md p-2 border border-gray-100">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-500" />
                <span className="text-xs">Include a personalized message</span>
              </label>
            </div>
            
            <div className="bg-white rounded-md p-2 border border-gray-100">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-500" />
                <span className="text-xs">Add extended warranty (+$9.99)</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-4 w-4 text-gray-700" />
          <span className="text-sm font-medium text-gray-800">Payment Methods</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {['Visa', 'MasterCard', 'PayPal', 'Apple Pay', 'Google Pay'].map((method, index) => (
            <div key={index} className="flex items-center justify-center bg-white border border-gray-200 rounded p-1.5">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-3 border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-4 w-4 text-green-600" />
          <h3 className="text-sm font-medium text-green-800">Buy Now, Pay Later</h3>
        </div>
        <p className="text-xs text-green-700 mb-2">
          Split your purchase into 4 interest-free payments.
        </p>
        <div className="flex items-center justify-between bg-white rounded-md p-2 border border-green-100">
          <span className="text-xs font-medium">4 payments of ${(product.discountPrice / 4).toFixed(2)}</span>
          <span className="text-xs text-green-600">Learn more</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Store Coupon</div>
            <div className="text-xs text-gray-600">$5 OFF orders over $50</div>
          </div>
        </div>
        <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">
          Collect
        </button>
      </div>
      
      <ModishShareButton onShare={handleShare} />

      <div id="tabContent" className="border-t border-gray-100 mt-2 pt-8">
        {activeTab === 'description' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Product Description</h2>
            <ModishDescription description={product.description} />
          </div>
        )}
        
        {activeTab === 'specs' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Product Specifications</h2>
            <div className="bg-gray-50 rounded-lg p-4 divide-y divide-gray-100">
              {[
                { name: "Brand", value: product.brand },
                { name: "Model", value: "BT-500" },
                { name: "Connectivity", value: "Bluetooth 5.0" },
                { name: "Battery Life", value: "Up to 10 hours" },
                { name: "Charging", value: "USB-C" },
                { name: "Water Resistance", value: "IPX7" },
                { name: "Weight", value: "350g" },
                { name: "Dimensions", value: "120 × 80 × 40 mm" },
              ].map((spec, index) => (
                <div key={index} className="flex py-3 first:pt-0 last:pb-0">
                  <span className="text-sm text-gray-500 w-1/3">{spec.name}</span>
                  <span className="text-sm text-gray-800 w-2/3">{spec.value}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-base font-medium text-gray-800 mt-5 mb-3">Technical Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { feature: "360° Sound", icon: "🔊" },
                { feature: "Water Resistant", icon: "💧" },
                { feature: "Voice Control", icon: "🎤" },
                { feature: "Long Battery", icon: "🔋" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'shipping' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Shipping Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Ship from: {product.shipFrom}</span>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                  International
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Estimated delivery: <span className="font-medium">{product.estimatedDelivery}</span></span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-medium text-sm mb-2">Shipping Options</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md bg-white border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Standard Shipping</p>
                        <p className="text-xs text-gray-500">7-15 business days</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{product.freeShipping ? "Free" : "$4.99"}</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded-md bg-white border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Express Shipping</p>
                        <p className="text-xs text-gray-500">3-7 business days</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">$12.99</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-medium text-sm mb-2">Shipping Policies</h3>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-500 text-lg leading-none">•</span>
                    <span>Free standard shipping on orders over $50</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-500 text-lg leading-none">•</span>
                    <span>Processing time: 1-2 business days</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-500 text-lg leading-none">•</span>
                    <span>All orders are trackable via the provided tracking number</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Reviews</h2>
            <ModishReviews productId={productId} />
          </div>
        )}
        
        {activeTab === 'questions' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Questions & Answers</h2>
            <ModishQuestions productId={productId} />
          </div>
        )}
        
        {activeTab === 'similar' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Similar Products</h2>
            <ModishSimilar currentProductId={productId} />
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">From This Shop</h3>
          <button className="text-xs text-blue-600">View Shop</button>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="shrink-0 w-20">
              <div className="h-20 w-20 rounded-lg bg-white border border-gray-200 overflow-hidden">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Shop item" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs text-red-500 font-medium mt-1">$29.99</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Recently Viewed</h3>
          <button className="text-xs text-blue-600">Clear</button>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-none">
          {[1, 2, 3].map((item) => (
            <div key={item} className="shrink-0 w-20">
              <div className="h-20 w-20 rounded-lg bg-white border border-gray-200 overflow-hidden">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Recently viewed item" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs text-red-500 font-medium mt-1">$19.99</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          <div>
            <div className="text-sm font-medium text-gray-900">Customer Support</div>
            <div className="text-xs text-gray-600">24/7 Live Chat Available</div>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full">
          Chat Now
        </button>
      </div>
    </div>
  );
}
