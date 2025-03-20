import React, { useState, useEffect } from 'react';
import { ModishGallery } from './product/ModishGallery';
import { ModishInfo } from './product/ModishInfo';
import { ModishOptions } from './product/ModishOptions';
import { ModishActions } from './product/ModishActions';
import { ModishReviews } from './product/ModishReviews';
import { ModishSimilar } from './product/ModishSimilar';
import { ModishFeatures } from './product/ModishFeatures';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertCircle, Clock, Eye, History, Shield, Star, TrendingUp, Truck, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const products = {
  '1': {
    id: '1',
    name: 'Ergonomic Lounge Chair',
    brand: 'Moderno',
    price: 1299.99,
    discountPrice: 999.99,
    rating: 4.8,
    reviewCount: 142,
    description: 'Experience unparalleled comfort with our ergonomic lounge chair, crafted with premium materials and designed for long-lasting relaxation.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Charcoal', value: '#333333' },
      { name: 'Cream', value: '#F5F5DC' },
      { name: 'Navy', value: '#000080' },
      { name: 'Forest', value: '#228B22' },
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: false },
    ],
    specifications: [
      { name: 'Dimensions', value: '31.5"W × 32.5"D × 41"H' },
      { name: 'Materials', value: 'Italian leather, walnut' },
      { name: 'Weight', value: '35 lbs' },
      { name: 'Warranty', value: '5 years' },
    ],
    features: [
      {
        title: '5-point ergonomic design',
        description: 'Scientifically engineered with 5 key support points to provide optimal posture and comfort for extended sitting periods.',
        icon: 'Design',
        color: 'blue',
        details: 'The 5-point design supports your neck, upper back, lower back, thighs, and feet in perfect alignment, reducing pressure and preventing pain.'
      },
      {
        title: 'Premium Italian leather upholstery',
        description: 'Wrapped in luxurious full-grain Italian leather that ages beautifully and becomes more comfortable over time.',
        icon: 'Layers',
        color: 'amber',
        details: 'Our leather is sourced from the finest tanneries in Italy, treated with natural oils for a buttery soft feel, and hand-selected for consistent quality.'
      },
      {
        title: 'Solid walnut frame construction',
        description: 'Built on a foundation of kiln-dried solid walnut for exceptional durability and timeless aesthetics.',
        icon: 'Armchair',
        color: 'brown',
        details: 'The walnut is sustainably harvested, precision-cut, and joined using traditional woodworking techniques that ensure stability for decades of use.'
      },
      {
        title: 'Memory foam cushioning',
        description: 'High-density memory foam that contours to your body and springs back when you stand up.',
        icon: 'Sofa',
        color: 'purple',
        details: 'Our proprietary foam formula combines the responsiveness of latex with the body-contouring benefits of memory foam, offering superior pressure relief.'
      },
      {
        title: 'Adjustable recline settings',
        description: 'Multiple recline positions that can be easily adjusted to match your preferred sitting angle.',
        icon: 'ThumbsUp',
        color: 'green',
        details: 'The patented reclining mechanism offers 5 distinct positions from upright to fully reclined, with a smooth transition between each setting.'
      },
    ],
    stock: 12,
    freeShipping: true,
    deliveryTime: '3-5 days',
  },
};

const recentlyViewedProducts = [
  {
    id: '2',
    name: 'Modern Accent Chair',
    price: 649.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Sculptural Lounge Chair',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop',
  },
];

type ModishProductDetailsProps = {
  productId: string;
};

export function ModishProductDetails({ productId }: ModishProductDetailsProps) {
  const product = products[productId] || products['1'];
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [viewCount, setViewCount] = useState(0);
  const [lastViewed, setLastViewed] = useState<string>('');
  const [peakViewers, setPeakViewers] = useState(0);
  const [popularity, setPopularity] = useState<string>('');
  const [stockTrend, setStockTrend] = useState<'increasing' | 'decreasing' | 'stable'>('stable');
  const [couponExpiry, setCouponExpiry] = useState<Date>(new Date(Date.now() + 3600000 * 8));
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [recentPurchases, setRecentPurchases] = useState<number>(0);
  const [showShippingInfo, setShowShippingInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const randomViewers = Math.floor(Math.random() * 40) + 10;
    setViewCount(randomViewers);
    
    const minutes = Math.floor(Math.random() * 30) + 1;
    setLastViewed(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
    
    setPeakViewers(randomViewers + Math.floor(Math.random() * 20) + 5);
    
    const popularityOptions = ['Rising fast', 'Popular choice', 'Trending'];
    setPopularity(popularityOptions[Math.floor(Math.random() * popularityOptions.length)]);
    
    const trends: Array<'increasing' | 'decreasing' | 'stable'> = ['increasing', 'decreasing', 'stable'];
    setStockTrend(trends[Math.floor(Math.random() * trends.length)]);
    
    setRecentPurchases(Math.floor(Math.random() * 200) + 50);
    
    const timerInterval = setInterval(() => {
      const now = new Date();
      const diff = couponExpiry.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timerInterval);
        setTimeRemaining("Expired");
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [couponExpiry]);
  
  useEffect(() => {
    const activityInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const activities = [
          `Someone in New York just purchased this item`,
          `${Math.floor(Math.random() * 5) + 1} people added this to cart in the last hour`,
          `${Math.floor(Math.random() * 3) + 1} people bought this together with another item`,
          `This item was just added to ${Math.floor(Math.random() * 7) + 2} wishlists`
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        toast(randomActivity, {
          duration: 4000,
          position: "bottom-right"
        });
      }
    }, 25000);
    
    return () => clearInterval(activityInterval);
  }, []);
  
  const toggleShippingInfo = () => {
    setShowShippingInfo(prev => !prev);
  };
  
  const formatMoney = (amount: number) => {
    return `US $${amount.toFixed(2)}`;
  };
  
  return (
    <div className="pb-28 min-h-screen bg-white">
      <div className="bg-gray-50 pb-4">
        <ModishGallery images={product.images} name={product.name} />
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-4 relative -mt-8">
        <div className="bg-[#ea384c] text-white p-3 rounded-t-lg shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium">US $</span>
              <span className="text-2xl font-bold">{product.discountPrice.toFixed(2)}</span>
              {product.discountPrice < product.price && (
                <span className="text-xs line-through opacity-80">US ${product.price.toFixed(2)}</span>
              )}
            </div>
            <div className="bg-yellow-400 text-[#ea384c] px-2 py-0.5 text-xs font-bold rounded">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs opacity-90">Limited time offer • {product.stock < 10 ? 'Almost gone!' : 'In high demand'}</div>
            <div className="text-xs bg-black/20 px-2 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Ends in: {timeRemaining}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-md p-2 mb-4">
          <div className="relative">
            <div className="w-16 h-10 bg-orange-500 flex items-center justify-center text-white font-bold rounded-l-md after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:border-r-[6px] after:border-r-white after:border-y-transparent after:border-y-[20px]">
              <span className="text-lg">-$10</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700">Extra $10 off with coupon</div>
            <div className="text-xs text-gray-500">Min. spend: ${(product.discountPrice * 1.5).toFixed(0)}</div>
          </div>
          <button className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full" 
            onClick={() => toast.success("Coupon applied!")}>
            Get
          </button>
        </div>
        
        <Card className="overflow-hidden border border-gray-200 mb-4 rounded-md shadow-sm">
          <CardContent className={`p-0 ${isMobile ? 'flex flex-col' : 'flex items-center'} text-xs divide-x-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100`}>
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                <Users className="w-3 h-3 text-[#ea384c]" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">
                  {viewCount} people viewing now
                </span>
                <div className="text-xs text-gray-500">Peak today: {peakViewers}</div>
              </div>
            </div>
            
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                <History className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">Last viewed {lastViewed}</span>
                <div className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 20} views today</div>
              </div>
            </div>
            
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-orange-500" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">{popularity}</span>
                <div className="text-xs text-gray-500">
                  {stockTrend === 'decreasing' && 'Selling fast!'}
                  {stockTrend === 'increasing' && 'Stock just updated'}
                  {stockTrend === 'stable' && 'Steady availability'}
                </div>
              </div>
            </div>
            
            {product.stock < 10 && (
              <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
                <div className="min-w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Limited stock</span>
                  <div className="text-xs text-gray-500">Only {product.stock} left</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="bg-green-50 border border-green-100 rounded-md p-2 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs text-gray-700">
            <span className="font-medium text-green-700">{recentPurchases}+ bought</span> in the past month
          </div>
        </div>
      
        <ModishInfo
          name={product.name}
          brand={product.brand}
          price={product.price}
          discountPrice={product.discountPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
        />
        
        <div className="mt-4 border border-gray-200 rounded-md divide-y">
          <div className="p-3 flex items-center justify-between" onClick={toggleShippingInfo}>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">Shipping</div>
                <div className="text-xs text-gray-500">
                  {product.freeShipping ? 'Free Shipping' : `$${(Math.random() * 10 + 5).toFixed(2)} Standard Shipping`}
                </div>
              </div>
            </div>
            <div className="text-xs text-blue-600">
              {showShippingInfo ? "Hide" : "Show options"}
            </div>
          </div>
          
          {showShippingInfo && (
            <div className="p-3 bg-gray-50">
              <div className="text-xs mb-2 font-medium">Shipping options:</div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <input type="radio" name="shipping" id="shipping-standard" defaultChecked />
                  <label htmlFor="shipping-standard" className="text-xs">Standard Shipping</label>
                </div>
                <div className="text-xs font-medium text-gray-700">
                  {product.freeShipping ? 'Free' : `$${(Math.random() * 10 + 5).toFixed(2)}`}
                </div>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <input type="radio" name="shipping" id="shipping-express" />
                  <label htmlFor="shipping-express" className="text-xs">Express Shipping</label>
                </div>
                <div className="text-xs font-medium text-gray-700">
                  ${(Math.random() * 15 + 10).toFixed(2)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Estimated delivery: {product.deliveryTime}
              </div>
            </div>
          )}
          
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">Buyer Protection</div>
                <div className="text-xs text-gray-500">
                  Money back guarantee • 30 day returns
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ModishOptions
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          quantity={quantity}
          onUpdateQuantity={setQuantity}
          stock={product.stock}
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
        
        <ModishActions
          product={product}
          selectedColor={selectedColor}
          quantity={quantity}
          selectedSize={selectedSize}
        />
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full flex justify-between">
              <TabsTrigger value="description" className="flex-1 text-xs">Description</TabsTrigger>
              <TabsTrigger value="specs" className="flex-1 text-xs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 text-xs">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description">
              <div className="space-y-3 mt-4">
                <h3 className="text-base font-medium text-gray-900">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description} Experience the pinnacle of design and craftsmanship with our premium furniture piece.
                  Built to last and designed for comfort, this item will elevate any space with its elegant aesthetics and functional excellence.
                </p>
                <ModishFeatures features={product.features} />
              </div>
            </TabsContent>
            
            <TabsContent value="specs">
              <div className="space-y-3 mt-4">
                <h3 className="text-base font-medium text-gray-900">Specifications</h3>
                <div className="grid grid-cols-1 gap-y-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.name} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{spec.name}</span>
                      <span className="text-sm font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <ModishReviews rating={product.rating} reviewCount={product.reviewCount} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4 pt-6 border-t border-gray-100 mt-6">
          <h3 className="text-base font-medium text-gray-900">You may also like</h3>
          <div className="grid grid-cols-2 gap-3">
            {recentlyViewedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#ea384c] text-white text-xs px-2 py-0.5">
                    SALE
                  </div>
                </div>
                <CardContent className="p-2">
                  <h4 className="text-xs text-gray-900 line-clamp-2">{product.name}</h4>
                  <div className="flex items-baseline mt-1 gap-1">
                    <span className="text-xs text-[#ea384c] font-semibold">US ${product.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-500 line-through">${(product.price * 1.25).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-2.5 h-2.5 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 ml-1">23 sold</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <ModishSimilar currentProductId={product.id} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center p-2 z-10 shadow-[0_-4px_12px_-6px_rgba(0,0,0,0.1)]">
        <div className="flex items-center divide-x divide-gray-200 flex-1">
          <button className="flex flex-col items-center justify-center p-2 w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">Store</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">Chat</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">Wishlist</span>
          </button>
          <button className="flex flex-col items-center justify-center p-2 w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="text-[10px] text-gray-600 mt-1">Cart</span>
          </button>
        </div>
        <div className="flex">
          <button 
            className="bg-orange-500 text-white font-medium px-4 py-2 rounded-l-md text-sm"
            onClick={() => toast.success("Added to cart!")}
          >
            Add to Cart
          </button>
          <button 
            className="bg-[#ea384c] text-white font-medium px-4 py-2 rounded-r-md text-sm"
            onClick={() => toast.success("Proceeding to checkout!")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
