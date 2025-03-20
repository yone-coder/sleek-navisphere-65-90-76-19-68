import React, { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { 
  Tag, Award, ShieldCheck, Clock, Truck, ChevronRight, Gift,
  Star, MessageCircle, ThumbsUp, Zap, PercentCircle, MapPin, 
  CreditCard, Package, Users, Sparkles, TrendingUp, DollarSign,
  Ruler, MessageSquare, Smartphone, Activity
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
  const [showSimilarItems, setShowSimilarItems] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [realTimeViews, setRealTimeViews] = useState(34);
  const [showRealtimeAlert, setShowRealtimeAlert] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call - replace with actual API endpoint
    const fetchProduct = async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock product data
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
    
    // Simulate real-time views
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
    
    return () => clearInterval(viewsInterval);
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
    
    // Smooth scroll to the tab content
    const tabContentElement = document.getElementById('tabContent');
    if (tabContentElement) {
      tabContentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleShare = () => {
    toast({
      title: "Share Product",
      description: "Sharing options would appear here in a real app",
      duration: 2000,
    });
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

  // Main layout content
  return (
    <div className="space-y-4">
      
      {/* Enhanced Product Gallery */}
      <ModishGallery images={product.images} name={product.name} />
      
      {/* Real-time viewers alert */}
      {showRealtimeAlert && (
        <div className="fixed bottom-32 right-4 bg-white shadow-lg rounded-lg p-2 animate-fade-in border border-orange-200 z-40">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-medium">{realTimeViews} people viewing now</span>
          </div>
        </div>
      )}

      {/* Mobile App-like Navigation Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-1">
        <div className="flex overflow-x-auto scrollbar-none gap-4">
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

      {/* AliExpress-style quick stats bar */}
      <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg text-xs text-gray-700">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-red-500">${product.discountPrice.toFixed(2)}</span>
          <span className="line-through">${product.price.toFixed(2)}</span>
          <Badge variant="outline" className="bg-red-50 border-red-100 text-red-500 text-[10px] px-1">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-gray-600">Sold: </span>
            <span className="font-medium">{product.soldCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Views: </span>
            <span className="font-medium">{product.viewCount}</span>
          </div>
        </div>
      </div>

      {/* Mobile App-Style Promotion Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-800">Flash Sale</span>
          </div>
          <div className="text-xs text-purple-700 bg-white px-2 py-1 rounded-full border border-purple-200">
            12:45:30 left
          </div>
        </div>
        <div className="mt-2 bg-white p-2 rounded-md">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] text-gray-500">
                  {i}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-600">
              <span className="text-red-500 font-bold">28 people</span> bought in last hour
            </div>
          </div>
          <div className="mt-1.5 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-gray-500">
            <span>67% claimed</span>
            <span>Sale ends in 12 hours</span>
          </div>
        </div>
      </div>

      {/* Product Tags - AliExpress style */}
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

      {/* Product Info */}
      <ModishInfo
        name={product.name}
        brand={product.brand}
        price={product.price}
        discountPrice={product.discountPrice}
        rating={product.rating}
        reviewCount={product.reviewCount}
        description={product.description}
      />
      
      {/* Product Key Features */}
      {product.features && (
        <ModishFeatures features={product.features} />
      )}
      
      {/* Enhanced Features Section */}
      <ModishEnhancedFeatures productId={product.id} />

      {/* Size Guide */}
      <ModishSizeGuide />

      {/* Enhanced Shipping & Seller Info */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Ships from: <span className="font-medium">{product.shipFrom}</span></span>
          </div>
          <span className="text-xs text-gray-600">to United States</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm">Delivery: <span className="font-medium">{product.estimatedDelivery}</span></span>
          </div>
          {product.freeShipping && (
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
                  <span className="ml-0.5">{product.sellerRating}% Positive</span>
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
      
      {/* Trending Products Section */}
      <ModishTrending />
      
      {/* Coupon Collection Section */}
      <div className="flex overflow-x-auto gap-2 pb-2 px-1 scrollbar-none">
        {[
          { code: 'EXTRA5', discount: '$5 OFF', min: '$50', color: 'bg-gradient-to-r from-red-500 to-orange-500' },
          { code: 'SAVE10', discount: '$10 OFF', min: '$100', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
          { code: 'NEW15', discount: '15% OFF', min: 'New Users', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
        ].map((coupon, index) => (
          <div 
            key={index}
            className="relative flex-shrink-0 w-[130px] h-[70px] rounded-lg overflow-hidden"
          >
            <div className={`absolute inset-0 ${coupon.color}`}></div>
            <div className="absolute inset-0 flex flex-col justify-between p-2 text-white">
              <div className="text-xs font-medium">{coupon.discount}</div>
              <div className="text-[10px] opacity-90">Min. spend: {coupon.min}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-light">Code: {coupon.code}</div>
                <button 
                  className="text-[10px] bg-white text-red-500 px-2 py-0.5 rounded-full font-medium"
                  onClick={() => handleCouponSelect(coupon.code)}
                >
                  {activeCoupon === coupon.code ? 'Collected' : 'Collect'}
                </button>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-4 flex items-center">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Guarantees Section */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <ShieldCheck className="h-5 w-5 text-blue-500" />, text: "90-Day Warranty" },
          { icon: <ThumbsUp className="h-5 w-5 text-green-500" />, text: "Authentic Product" },
          { icon: <CreditCard className="h-5 w-5 text-purple-500" />, text: "Buyer Protection" }
        ].map((guarantee, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-2 text-center">
            {guarantee.icon}
            <span className="text-xs text-gray-700 mt-1">{guarantee.text}</span>
          </div>
        ))}
      </div>

      {/* Product Options */}
      <ModishOptions
        colors={product.colors}
        selectedColor={selectedColor}
        onSelectColor={handleColorSelect}
        quantity={quantity}
        onUpdateQuantity={setQuantity}
        stock={100} // Replace with actual stock
        price={product.price}
        discountPrice={product.discountPrice}
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={handleSizeSelect}
      />

      {/* Payment Methods Section */}
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

      {/* Coupon Banner - AliExpress style */}
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
      
      {/* Social Share Bar */}
      <div className="px-3">
        <button 
          onClick={handleShare}
          className="w-full py-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center gap-2 text-blue-600"
        >
          <Smartphone className="h-4 w-4" />
          <span className="text-sm font-medium">Share This Product</span>
        </button>
      </div>

      {/* Tab Content Area - Improved with ID for scrolling */}
      <div id="tabContent" className="border-t border-gray-100 mt-2">
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

      {/* Shop Recommendations - AliExpress style */}
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

      {/* Recently Viewed Section */}
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
      
      {/* Customer Service Banner */}
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
</
