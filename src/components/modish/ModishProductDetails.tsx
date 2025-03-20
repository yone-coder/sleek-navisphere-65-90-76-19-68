
import React, { useState, useEffect, useRef } from 'react';
import { ModishGallery } from './product/ModishGallery';
import { ModishInfo } from './product/ModishInfo';
import { ModishOptions } from './product/ModishOptions';
import { ModishActions } from './product/ModishActions';
import { ModishReviews } from './product/ModishReviews';
import { ModishSimilar } from './product/ModishSimilar';
import { ModishFeatures } from './product/ModishFeatures';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, Box, Check, Clock, Eye, Gift, Globe, Heart, 
  History, Info, Lock, MessageCircle, Package, Percent, RefreshCw, 
  Shield, ShieldCheck, Star, Truck, TrendingUp, Users, Zap
} from 'lucide-react';
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
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(false);
  const [salesCount, setSalesCount] = useState<number>(0);
  const [bundleDiscount, setBundleDiscount] = useState<number>(15);
  const [showBundleOptions, setShowBundleOptions] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [sellerRating, setSellerRating] = useState<number>(0);
  const [hasFrequentlyBought, setHasFrequentlyBought] = useState<boolean>(true);
  const [showReviewImageModal, setShowReviewImageModal] = useState<boolean>(false);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);
  const [showQuickLogin, setShowQuickLogin] = useState<boolean>(false);
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const productSectionRef = useRef<HTMLDivElement>(null);
  
  // Newly added states
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');
  const [shippingDiscount, setShippingDiscount] = useState<number>(0);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [installmentOptions, setInstallmentOptions] = useState<boolean>(false);
  const [buyerProtectionDays, setBuyerProtectionDays] = useState<number>(60);
  const [flashSale, setFlashSale] = useState<{active: boolean, endsIn: string, discount: number}>({
    active: true,
    endsIn: '03:45:12',
    discount: 30
  });
  const [soldProgress, setSoldProgress] = useState<number>(65);
  const [similarItemsCount, setSimilarItemsCount] = useState<number>(0);
  const [returns, setReturns] = useState<{free: boolean, days: number}>({
    free: true,
    days: 15
  });
  const [sellerSince, setSellerSince] = useState<string>('');
  const [showReturnPolicy, setShowReturnPolicy] = useState<boolean>(false);
  
  // New additional states for enhanced features
  const [customerQuestions, setCustomerQuestions] = useState<{
    id: string;
    question: string;
    askedAt: string;
    answer?: string;
    answeredAt?: string;
    helpful: number;
  }[]>([
    {
      id: '1',
      question: 'Is this suitable for outdoor use?',
      askedAt: '2 months ago',
      answer: 'This item is designed for indoor use only. For outdoor options, please check our garden furniture collection.',
      answeredAt: '1 month ago',
      helpful: 12
    },
    {
      id: '2',
      question: 'Does this come with assembly instructions?',
      askedAt: '3 weeks ago',
      answer: 'Yes, detailed assembly instructions are included in the box. There\'s also a QR code for video instructions.',
      answeredAt: '2 weeks ago',
      helpful: 8
    }
  ]);
  
  const [reviewDistribution, setReviewDistribution] = useState<{
    stars: number;
    count: number;
    percentage: number;
  }[]>([
    { stars: 5, count: 98, percentage: 69 },
    { stars: 4, count: 32, percentage: 23 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ]);
  
  const [videoReviews, setVideoReviews] = useState<{
    id: string;
    thumbnail: string;
    duration: string;
  }[]>([
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop',
      duration: '0:32'
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&auto=format&fit=crop',
      duration: '1:15'
    }
  ]);
  
  const [recentSearch, setRecentSearch] = useState<{
    term: string;
    count: number;
  }[]>([
    { term: 'ergonomic chair', count: 5642 },
    { term: 'lounge chair leather', count: 3891 },
    { term: 'modern furniture', count: 12504 }
  ]);
  
  const [showColorDetails, setShowColorDetails] = useState<boolean>(false);
  const [colorDetails, setColorDetails] = useState<{
    color: string;
    name: string;
    inventory: number;
    popular: boolean;
  }[]>([
    { color: '#333333', name: 'Charcoal', inventory: 42, popular: true },
    { color: '#F5F5DC', name: 'Cream', inventory: 28, popular: false },
    { color: '#000080', name: 'Navy', inventory: 15, popular: false },
    { color: '#228B22', name: 'Forest', inventory: 8, popular: false }
  ]);
  
  const [hasCouponCode, setHasCouponCode] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('EXTRA10');
  
  const [showPromotionHistory, setShowPromotionHistory] = useState<boolean>(false);
  const [promotionHistory, setPromotionHistory] = useState<{
    date: string;
    discount: string;
  }[]>([
    { date: 'Oct 15 - Oct 20', discount: '25% OFF' },
    { date: 'Sep 1 - Sep 10', discount: '15% OFF + Free Shipping' },
    { date: 'Aug 12 - Aug 18', discount: 'Buy One Get One 50% OFF' }
  ]);
  
  const [fulfillmentOptions, setFulfillmentOptions] = useState<{
    id: string;
    name: string;
    description: string;
    timeframe: string;
    price: number;
    isSelected: boolean;
  }[]>([
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Regular postal service',
      timeframe: '10-20 days',
      price: 0,
      isSelected: true
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Expedited courier service',
      timeframe: '5-8 days',
      price: 14.99,
      isSelected: false
    },
    {
      id: 'priority',
      name: 'Priority Shipping',
      description: 'Premium delivery service',
      timeframe: '3-5 days',
      price: 24.99,
      isSelected: false
    }
  ]);
  
  const [showBulkDiscount, setShowBulkDiscount] = useState<boolean>(false);
  const [bulkDiscounts, setBulkDiscounts] = useState<{
    quantity: number;
    discount: number;
    totalPrice: number;
  }[]>([
    { quantity: 2, discount: 5, totalPrice: 1899.98 },
    { quantity: 5, discount: 10, totalPrice: 4499.96 },
    { quantity: 10, discount: 15, totalPrice: 8499.92 }
  ]);
  
  const [showProductVideo, setShowProductVideo] = useState<boolean>(false);
  const [warrantyOptions, setWarrantyOptions] = useState<{
    id: string;
    name: string;
    duration: string;
    price: number;
    isSelected: boolean;
  }[]>([
    {
      id: 'basic',
      name: 'Basic Warranty',
      duration: '1 year',
      price: 0,
      isSelected: true
    },
    {
      id: 'extended',
      name: 'Extended Warranty',
      duration: '3 years',
      price: 99.99,
      isSelected: false
    },
    {
      id: 'premium',
      name: 'Premium Protection',
      duration: '5 years',
      price: 199.99,
      isSelected: false
    }
  ]);
  
  const [showGlobalShipping, setShowGlobalShipping] = useState<boolean>(false);
  const [regionShipping, setRegionShipping] = useState<{
    region: string;
    price: number;
    time: string;
  }[]>([
    { region: 'United States', price: 0, time: '7-14 days' },
    { region: 'Canada', price: 24.99, time: '10-18 days' },
    { region: 'Europe', price: 39.99, time: '14-21 days' },
    { region: 'Australia', price: 49.99, time: '14-28 days' },
    { region: 'Asia', price: 44.99, time: '14-24 days' }
  ]);
  
  const [showCustomerPhotos, setShowCustomerPhotos] = useState<boolean>(false);
  const [customerPhotos, setCustomerPhotos] = useState<{
    id: string;
    image: string;
    reviewer: string;
  }[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&auto=format&fit=crop',
      reviewer: 'John M.'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&auto=format&fit=crop',
      reviewer: 'Sarah T.'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=300&auto=format&fit=crop',
      reviewer: 'Michael R.'
    }
  ]);
  
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
    
    setSalesCount(Math.floor(Math.random() * 5000) + 1000);
    setWishlistCount(Math.floor(Math.random() * 300) + 50);
    setSellerRating(4 + Math.random());
    setLoyaltyPoints(Math.floor(quantity * product.discountPrice * 0.05));
    setQuestionCount(Math.floor(Math.random() * 50) + 5);
    
    // Random delivery date between 7-21 days from now
    const deliveryDays = Math.floor(Math.random() * 14) + 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    setEstimatedDelivery(`${deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(deliveryDate.getTime() + 3*86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
    
    setShippingDiscount(Math.floor(Math.random() * 5) + 3);
    setSimilarItemsCount(Math.floor(Math.random() * 40) + 15);
    
    // Random date between 1-5 years ago
    const years = Math.floor(Math.random() * 4) + 1;
    const sellerStartDate = new Date();
    sellerStartDate.setFullYear(sellerStartDate.getFullYear() - years);
    setSellerSince(sellerStartDate.getFullYear().toString());
    
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
  }, [couponExpiry, quantity, product.discountPrice]);
  
  useEffect(() => {
    const activityInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const activities = [
          `Someone in New York just purchased this item`,
          `${Math.floor(Math.random() * 5) + 1} people added this to cart in the last hour`,
          `${Math.floor(Math.random() * 3) + 1} people bought this together with another item`,
          `This item was just added to ${Math.floor(Math.random() * 7) + 2} wishlists`,
          `New review: "Great quality, fast shipping!"`,
          `Someone in Tokyo is viewing this right now`,
          `This item is trending in your region!`,
          `Only ${Math.floor(Math.random() * 8) + 3} left at this price!`,
          `${Math.floor(Math.random() * 20) + 10} people have this in their cart`
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
  
  const toggleBundleOptions = () => {
    setShowBundleOptions(prev => !prev);
  };
  
  const handleWishlist = () => {
    setIsWishlisted(prev => !prev);
    if (!isWishlisted) {
      setWishlistCount(prev => prev + 1);
      toast.success("Added to your Wishlist!");
    } else {
      setWishlistCount(prev => prev - 1);
      toast("Removed from your Wishlist");
    }
  };
  
  const toggleReturnPolicy = () => {
    setShowReturnPolicy(prev => !prev);
  };
  
  const toggleSizeGuide = () => {
    setShowSizeGuide(prev => !prev);
  };
  
  const toggleInstallmentOptions = () => {
    setInstallmentOptions(prev => !prev);
  };
  
  const formatMoney = (amount: number) => {
    return `US $${amount.toFixed(2)}`;
  };
  
  const handleScrollToReviews = () => {
    setActiveTab("reviews");
    setTimeout(() => {
      if (productSectionRef.current) {
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };
  
  // New handler functions
  const toggleColorDetails = () => {
    setShowColorDetails(prev => !prev);
  };
  
  const togglePromotionHistory = () => {
    setShowPromotionHistory(prev => !prev);
  };
  
  const toggleBulkDiscount = () => {
    setShowBulkDiscount(prev => !prev);
  };
  
  const toggleProductVideo = () => {
    setShowProductVideo(prev => !prev);
  };
  
  const toggleGlobalShipping = () => {
    setShowGlobalShipping(prev => !prev);
  };
  
  const toggleCustomerPhotos = () => {
    setShowCustomerPhotos(prev => !prev);
  };
  
  const handleFulfillmentSelect = (id: string) => {
    setFulfillmentOptions(prev => 
      prev.map(option => ({
        ...option,
        isSelected: option.id === id
      }))
    );
  };
  
  const handleWarrantySelect = (id: string) => {
    setWarrantyOptions(prev => 
      prev.map(option => ({
        ...option,
        isSelected: option.id === id
      }))
    );
  };
  
  const applyCouponCode = () => {
    setHasCouponCode(true);
    toast.success(`Coupon ${couponCode} applied successfully!`);
  };
  
  return (
    <div className="pb-28 min-h-screen bg-white" ref={productSectionRef}>
      <div className="bg-gray-50 pb-4">
        <ModishGallery images={product.images} name={product.name} />
      </div>
      
      <div className="max-w-2xl mx-auto px-4 py-4 relative -mt-8">
        {/* Flash Sale Indicator */}
        {flashSale.active && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-t-lg mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold">FLASH SALE</span>
            </div>
            <div className="text-xs">
              Ends in: <span className="font-mono font-bold">{flashSale.endsIn}</span>
            </div>
          </div>
        )}
        
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
          
          {/* Sale Progress Indicator */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs opacity-90">Almost gone! {soldProgress}% sold</div>
              <div className="text-xs opacity-90">{product.stock} left</div>
            </div>
            <Progress value={soldProgress} className="h-1.5 bg-white/20" />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs opacity-90">Limited time offer • {product.stock < 10 ? 'Almost gone!' : 'In high demand'}</div>
            <div className="text-xs bg-black/20 px-2 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Ends in: {timeRemaining}</span>
            </div>
          </div>
        </div>
        
        {/* Loyalty Points */}
        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-4">
          <div className="text-amber-600">
            <Star className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700">Earn {loyaltyPoints} coins</div>
            <div className="text-xs text-gray-500">Use for future purchases</div>
          </div>
        </div>
        
        {/* Coupons */}
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-md p-2 mb-4">
          <div className="relative min-w-16">
            <div className="w-16 h-10 bg-orange-500 flex items-center justify-center text-white font-bold rounded-l-md after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:border-r-[6px] after:border-r-white after:border-y-transparent after:border-y-[20px]">
              <span className="text-lg">-$10</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700">Extra $10 off with coupon</div>
            <div className="text-xs text-gray-500">Min. spend: ${(product.discountPrice * 1.5).toFixed(0)}</div>
          </div>
          <button className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full" 
            onClick={() => {
              setShowCouponModal(true);
              toast.success("Coupon applied!");
            }}>
            Get
          </button>
        </div>
        
        {/* New - Coupon Code Input */}
        <div className="border border-gray-200 rounded-md p-2 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-700">Have a coupon code?</div>
            {hasCouponCode && (
              <div className="text-xs text-green-600">
                Coupon {couponCode} applied!
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter code" 
              className="flex-1 px-3 py-1.5 border border-gray-300 text-xs rounded-md"
              defaultValue={couponCode}
              disabled={hasCouponCode}
            />
            <button 
              className={`text-xs font-medium px-3 py-1.5 rounded-md ${hasCouponCode ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'}`}
              onClick={applyCouponCode}
              disabled={hasCouponCode}
            >
              {hasCouponCode ? 'Applied' : 'Apply'}
            </button>
          </div>
          <button 
            className="text-xs text-blue-600 mt-1.5"
            onClick={togglePromotionHistory}
          >
            {showPromotionHistory ? 'Hide promotion history' : 'View promotion history'}
          </button>
          
          {showPromotionHistory && (
            <div className="mt-2 border-t border-gray-200 pt-2 space-y-1.5">
              <div className="text-xs font-medium text-gray-700">Previous Promotions</div>
              {promotionHistory.map((promo, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-gray-600">{promo.date}</span>
                  <span className="text-[#ea384c] font-medium">{promo.discount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Store Promotions */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-md p-2 mb-4">
          <div className="text-blue-600">
            <Percent className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700">Store Promotion</div>
            <div className="text-xs text-gray-500">Buy 2 items, get 5% off • Buy 3, get {bundleDiscount}% off</div>
          </div>
          <button 
            className="text-blue-600 text-xs font-medium"
            onClick={toggleBundleOptions}
          >
            {showBundleOptions ? "Hide" : "View"}
          </button>
        </div>
        
        {showBundleOptions && (
          <div className="border border-blue-100 rounded-md p-2 mb-4 bg-blue-50/50">
            <div className="text-xs font-medium text-gray-700 mb-2">Bundle offers:</div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="bundle" id="bundle-2" />
                  <label htmlFor="bundle-2" className="text-xs">2 items: 5% off</label>
                </div>
                <span className="text-xs font-medium text-blue-600">Save ${((product.discountPrice * 2) * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="radio" name="bundle" id="bundle-3" defaultChecked />
                  <label htmlFor="bundle-3" className="text-xs">3 items: {bundleDiscount}% off</label>
                </div>
                <span className="text-xs font-medium text-blue-600">Save ${((product.discountPrice * 3) * (bundleDiscount/100)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Bulk Purchase Discounts */}
        <div className="border border-gray-200 rounded-md p-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-indigo-500" />
              <span>Bulk Purchase Discount</span>
            </div>
            <button 
              className="text-xs text-blue-600"
              onClick={toggleBulkDiscount}
            >
              {showBulkDiscount ? 'Hide' : 'View'}
            </button>
          </div>
          
          {showBulkDiscount && (
            <div className="mt-2 border-t border-gray-200 pt-2">
              <div className="text-xs text-gray-500 mb-2">Purchase more units for bigger discounts:</div>
              <div className="space-y-2">
                {bulkDiscounts.map((discount, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium">
                        {discount.quantity}x
                      </div>
                      <span>{discount.quantity} units</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-green-600 font-medium">{discount.discount}% off</span>
                      <span className="text-gray-500">${discount.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-2 bg-indigo-100 text-indigo-700 py-1.5 rounded-md text-xs font-medium">
                Select Bulk Purchase
              </button>
            </div>
          )}
        </div>
        
        {/* Product Warranty Option */}
        <div className="border border-gray-200 rounded-md p-2 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-500" />
              <span>Product Warranty</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {warrantyOptions.map((warranty) => (
              <div 
                key={warranty.id} 
                className={`border rounded-md p-2 text-xs flex items-center gap-2 ${warranty.isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => handleWarrantySelect(warranty.id)}
              >
                <input 
                  type="radio" 
                  name="warranty" 
                  id={`warranty-${warranty.id}`} 
                  checked={warranty.isSelected}
                  onChange={() => handleWarrantySelect(warranty.id)}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{warranty.name}</div>
                  <div className="text-gray-500">{warranty.duration} coverage</div>
                </div>
                <div className="font-medium">
                  {warranty.price === 0 ? 'Included' : `+$${warranty.price.toFixed(2)}`}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Global Shipping Information */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md p-2 mb-4">
          <div className="text-green-600">
            <Globe className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-700">Ships to 200+ Countries</div>
            <div className="text-xs text-gray-500">Free shipping to United States</div>
          </div>
          <button 
            className="text-green-600 text-xs font-medium"
            onClick={toggleGlobalShipping}
          >
            {showGlobalShipping ? 'Hide' : 'Check'}
          </button>
        </div>
        
        {showGlobalShipping && (
          <div className="border border-green-100 rounded-md p-2 mb-4 bg-green-50/50">
            <div className="text-xs font-medium text-gray-700 mb-2">Shipping rates by region:</div>
            <div className="max-h-40 overflow-y-auto">
              {regionShipping.map((region, index) => (
                <div key={index} className="flex items-center justify-between py-1.5 border-b border-green-100 last:border-0">
                  <span className="text-xs text-gray-700">{region.region}</span>
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-700">
                      {region.price === 0 ? 'Free' : `$${region.price.toFixed(2)}`}
                    </div>
                    <div className="text-xs text-gray-500">{region.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Customer Photo Submissions */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md p-2 mb-4">
          <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-purple-500" />
            <span>Customer Photos ({customerPhotos.length})</span>
          </div>
          <button 
            className="text-xs text-blue-600"
            onClick={toggleCustomerPhotos}
          >
            {showCustomerPhotos ? 'Hide' : 'View'}
          </button>
        </div>
        
        {showCustomerPhotos && (
          <div className="border border-gray-200 rounded-md p-2 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {customerPhotos.map((photo) => (
                <div key={photo.id} className="min-w-[100px] max-w-[100px]">
                  <div className="aspect-square rounded-md overflow-hidden">
                    <img src={photo.image} alt="Customer Photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-1">{photo.reviewer}</div>
                </div>
              ))}
              <div className="min-w-[100px] max-w-[100px] border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-purple-600">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </div>
                <span className="text-xs text-purple-600">Upload your photos</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Product Activity Card */}
        <Card className="overflow-hidden border border-gray-200 mb-4 rounded-md shadow-sm">
          <CardContent className={`p-0 ${isMobile ? 'flex flex-col' : 'flex items-center'} text-xs divide-x-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100`}>
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                <Eye className="w-3 h-3 text-[#ea384c]" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">
                  {viewCount} people viewing
                </span>
                <div className="text-xs text-gray-500">Peak today: {peakViewers}</div>
              </div>
            </div>
            
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                <Box className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">{salesCount} sold</span>
                <div className="text-xs text-gray-500">
                  <button onClick={handleScrollToReviews} className="text-blue-600">
                    {product.rating} ★ ({product.reviewCount} reviews)
                  </button>
                </div>
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
            
            <div className={`${isMobile ? 'w-full' : ''} px-3 py-2 flex items-center gap-2`}>
              <div className="min-w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center">
                <Heart className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <span className="text-gray-700 font-medium">{wishlistCount} wishlist</span>
                <div className="text-xs text-gray-500">
                  <button 
                    className={isWishlisted ? "text-red-500" : "text-blue-600"} 
                    onClick={handleWishlist}
                  >
                    {isWishlisted ? "Added ❤" : "Add to wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Search Trends */}
        <div className="border border-gray-200 rounded-md p-2 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-700">Popular Searches</div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recentSearch.map((search, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-full px-2 py-1 text-xs flex items-center gap-1 whitespace-nowrap"
              >
                <span className="text-gray-800">{search.term}</span>
                <span className="text-gray-500 text-[10px]">{search.count}+</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Purchases Indicator */}
        <div className="bg-green-50 border border-green-100 rounded-md p-2 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
          <div className="text-xs text-gray-700">
            <span className="font-medium text-green-700">{recentPurchases}+ bought</span> in the past month
          </div>
        </div>
        
        {/* Free Returns Banner */}
        {returns.free && (
          <div className="bg-blue-50 border border-blue-100 rounded-md p-2 mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <RefreshCw className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 text-xs text-gray-700">
              <span className="font-medium text-blue-700">Free Returns</span> within {returns.days} days
            </div>
            <button 
              className="text-blue-600 text-xs font-medium" 
              onClick={toggleReturnPolicy}
            >
              More
            </button>
          </div>
        )}
        
        {showReturnPolicy && (
          <div className="border border-blue-100 rounded-md p-3 mb-4 bg-blue-50/50 text-xs space-y-2">
            <h4 className="font-medium text-gray-800">Return Policy</h4>
            <p className="text-gray-600">Return for refund within {returns.days} days, buyer pays return shipping.</p>
            <div className="flex items-start gap-2 mt-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <p className="text-gray-600 flex-1">Item must be returned in the same condition as received.</p>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <p className="text-gray-600 flex-1">Contact seller within 7 days of receiving item to initiate return.</p>
            </div>
          </div>
        )}
      
        <ModishInfo
          name={product.name}
          brand={product.brand}
          price={product.price}
          discountPrice={product.discountPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
        />
        
        {/* Seller Info */}
        <div className="mt-4 border border-gray-200 rounded-md mb-4">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Seller" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">{product.brand} Official Store</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>Seller since {sellerSince}</span> • 
                  <span className="flex items-center">{sellerRating.toFixed(1)} <Star className="w-3 h-3 text-yellow-400 ml-0.5" /></span>
                </div>
              </div>
            </div>
            <button className="text-xs text-blue-600 border border-blue-600 rounded-full px-3 py-1">
              Visit Store
            </button>
          </div>
          
          {/* Seller Statistics */}
          <div className="px-3 pb-3 pt-0">
            <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
              <div className="flex flex-col p-1">
                <span className="text-lg font-semibold text-gray-800">98.7%</span>
                <span className="text-xs text-gray-500">Positive Feedback</span>
              </div>
              <div className="flex flex-col p-1">
                <span className="text-lg font-semibold text-gray-800">21h</span>
                <span className="text-xs text-gray-500">Response Time</span>
              </div>
              <div className="flex flex-col p-1">
                <span className="text-lg font-semibold text-gray-800">1.2K</span>
                <span className="text-xs text-gray-500">Followers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Section */}
        <div className="mt-4 border border-gray-200 rounded-md divide-y">
          <div className="p-3 flex items-center justify-between" onClick={toggleShippingInfo}>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">Shipping</div>
                <div className="text-xs text-gray-500">
                  {product.freeShipping ? 'Free Shipping' : `$${(Math.random() * 10 + 5).toFixed(2)} Standard Shipping`}
                  <span className="ml-1 text-blue-600">to United States</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-blue-600">
              {showShippingInfo ? "Hide" : "Show options"}
            </div>
          </div>
          
          {showShippingInfo && (
            <div className="p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium">Estimated delivery:</span>
                <span className="text-xs font-medium">{estimatedDelivery}</span>
              </div>
              <div className="text-xs mb-2 font-medium">Shipping options:</div>
              {fulfillmentOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`flex items-center justify-between py-1.5 border-b border-gray-100 ${option.isSelected ? 'bg-blue-50 border-blue-100 rounded' : ''}`}
                  onClick={() => handleFulfillmentSelect(option.id)}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="shipping" 
                      id={`shipping-${option.id}`} 
                      checked={option.isSelected}
                      onChange={() => handleFulfillmentSelect(option.id)}
                    />
                    <label htmlFor={`shipping-${option.id}`} className="text-xs flex flex-col">
                      <span>{option.name}</span>
                      <span className="text-gray-500">{option.timeframe}</span>
                    </label>
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                  </div>
                </div>
              ))}
              
              {/* International Shipping Note */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-xs text-gray-500">
                    <span className="font-medium block">International shipping</span>
                    Ships to 200+ countries with tracking number
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Buyer Protection */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">Buyer Protection</div>
                <div className="text-xs text-gray-500">
                  Full refund if item is not as described • {buyerProtectionDays}-day buyer protection
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-800">Payment Options</div>
                <div className="flex gap-2 mt-1">
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Visa" className="h-5 w-auto" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196561.png" alt="MasterCard" className="h-5 w-auto" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196565.png" alt="PayPal" className="h-5 w-auto" />
                  <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="American Express" className="h-5 w-auto" />
                  <button 
                    className="text-xs text-blue-600"
                    onClick={toggleInstallmentOptions}
                  >
                    + Installment plans
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {installmentOptions && (
            <div className="p-3 bg-gray-50">
              <div className="text-xs mb-2 font-medium">Installment payment options:</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="installment" id="pay-4" defaultChecked />
                    <label htmlFor="pay-4" className="text-xs">Pay in 4 interest-free installments</label>
                  </div>
                  <span className="text-xs font-medium">${(product.discountPrice / 4).toFixed(2)}/payment</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="installment" id="monthly" />
                    <label htmlFor="monthly" className="text-xs">Monthly payments with credit</label>
                  </div>
                  <span className="text-xs font-medium">From ${(product.discountPrice / 12).toFixed(2)}/mo</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Options */}
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
        
        {/* Color Details - New Feature */}
        <div className="mt-2 mb-4">
          <button 
            className="text-xs text-blue-600 flex items-center gap-1"
            onClick={toggleColorDetails}
          >
            <Info className="w-3 h-3" /> Color inventory details
          </button>
          
          {showColorDetails && (
            <div className="mt-2 border border-gray-200 rounded-md p-2 bg-gray-50">
              <div className="text-xs font-medium text-gray-700 mb-2">Color Inventory Status</div>
              <div className="space-y-1.5">
                {colorDetails.map((color, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.color }}
                      ></div>
                      <span className="text-xs text-gray-700">{color.name}</span>
                      {color.popular && (
                        <span className="bg-orange-100 text-orange-600 text-[9px] px-1 rounded">Popular</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {color.inventory > 0 ? `${color.inventory} in stock` : 'Out of stock'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Size Guide Button */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 mb-4">
            <button 
              className="text-xs text-blue-600 flex items-center gap-1"
              onClick={toggleSizeGuide}
            >
              <Info className="w-3 h-3" /> Size Guide
            </button>
          </div>
        )}
        
        {showSizeGuide && (
          <div className="border border-gray-200 rounded-md p-3 mb-4 text-xs">
            <h4 className="font-medium text-gray-800 mb-2">Size Chart</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest (in)</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (in)</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">S</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">36-38</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">28-30</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">27</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">M</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">38-40</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">30-32</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">28</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">L</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">40-42</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">32-34</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">29</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">XL</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">42-44</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">34-36</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-700">30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-gray-500">Measurements may vary by 1-2 inches</div>
          </div>
        )}
        
        {/* Product Video Demonstration */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md p-2 mb-4">
          <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
              <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84Z" />
            </svg>
            <span>Product Video</span>
          </div>
          <button 
            className="text-xs text-blue-600"
            onClick={toggleProductVideo}
          >
            {showProductVideo ? 'Hide' : 'View video'}
          </button>
        </div>
        
        {showProductVideo && (
          <div className="border border-gray-200 rounded-md mb-4 overflow-hidden">
            <div className="aspect-video bg-black relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <img 
                src={product.images[0]} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div className="p-2 bg-gray-50">
              <div className="text-xs font-medium text-gray-800">Product demonstration video</div>
              <div className="text-xs text-gray-500">See this product in action</div>
            </div>
          </div>
        )}
        
        {/* Buy It With */}
        {hasFrequentlyBought && (
          <div className="mt-6 border border-gray-200 rounded-md p-3 mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Frequently bought together</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[8px] px-1">Selected</div>
              </div>
              <div className="text-lg font-bold text-gray-400">+</div>
              <div className="relative w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop" alt="Cushion" className="w-full h-full object-cover" />
                <input type="checkbox" className="absolute top-1 left-1" defaultChecked />
              </div>
              <div className="text-lg font-bold text-gray-400">+</div>
              <div className="relative w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                <img src="https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=800&auto=format&fit=crop" alt="Side Table" className="w-full h-full object-cover" />
                <input type="checkbox" className="absolute top-1 left-1" defaultChecked />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">Price for all: <span className="font-bold text-[#ea384c]">US ${(product.discountPrice * 2.7).toFixed(2)}</span></div>
              <div className="text-xs text-gray-500">Save US ${(product.discountPrice * 0.3).toFixed(2)}</div>
            </div>
            <button className="bg-[#ea384c] text-white w-full py-2 rounded-full text-sm font-medium">
              Add 3 items to cart
            </button>
          </div>
        )}
        
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
              <TabsTrigger value="questions" className="flex-1 text-xs">Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description">
              <div className="space-y-3 mt-4">
                <h3 className="text-base font-medium text-gray-900">Product Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description} Experience the pinnacle of design and craftsmanship with our premium furniture piece.
                  Built to last and designed for comfort, this item will elevate any space with its elegant aesthetics and functional excellence.
                </p>
                <div className="relative overflow-hidden" style={{ maxHeight: showAllFeatures ? 'none' : '300px' }}>
                  <ModishFeatures features={product.features} />
                  {!showAllFeatures && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>
                {!showAllFeatures && (
                  <button 
                    className="w-full text-center py-2 text-sm text-blue-600"
                    onClick={() => setShowAllFeatures(true)}
                  >
                    Show more
                  </button>
                )}
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
            
            <TabsContent value="reviews" id="reviews-section">
              {/* Enhanced Review Distribution */}
              <div className="border border-gray-200 rounded-md p-3 mb-4 mt-4">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-md">
                    <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    {reviewDistribution.map((rating) => (
                      <div key={rating.stars} className="flex items-center gap-2">
                        <div className="text-xs text-gray-500 w-7">{rating.stars} ★</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: `${rating.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 w-8">{rating.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Video Reviews */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="text-xs font-medium text-gray-700 mb-2">Customer Video Reviews</div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {videoReviews.map((video) => (
                      <div key={video.id} className="min-w-[120px] max-w-[120px]">
                        <div className="aspect-video bg-gray-100 rounded-md overflow-hidden relative">
                          <img src={video.thumbnail} alt="Video review" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/80">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="min-w-[120px] max-w-[120px] border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-2 aspect-video">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-400 mb-1">
                        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs text-gray-500">Add a video</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <ModishReviews rating={product.rating} reviewCount={product.reviewCount} />
            </TabsContent>
            
            <TabsContent value="questions">
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">Questions & Answers</h3>
                  <span className="text-sm text-gray-500">{questionCount} questions</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <form className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ask a question about this product..."
                      className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button className="bg-[#ea384c] text-white px-3 py-2 rounded-md text-sm">Ask</button>
                  </form>
                </div>
                
                <div className="space-y-4">
                  {customerQuestions.map((qa) => (
                    <div key={qa.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{qa.question}</p>
                          <p className="text-xs text-gray-500">Asked {qa.askedAt}</p>
                        </div>
                      </div>
                      {qa.answer && (
                        <div className="ml-6 bg-gray-50 p-2 rounded-md">
                          <p className="text-sm text-gray-800">{qa.answer}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-500">Seller response • {qa.answeredAt}</p>
                            <div className="text-xs text-gray-500">Helpful? ({qa.helpful})</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button className="w-full text-center py-2 text-sm text-blue-600 border border-blue-600 rounded-md">
                    See all {questionCount} questions
                  </button>
                </div>
              </div>
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
        
        {/* Recently Viewed Section */}
        <div className="space-y-4 pt-6 border-t border-gray-100 mt-6 pb-16">
          <h3 className="text-base font-medium text-gray-900">Recently Viewed</h3>
          <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar">
            {recentlyViewedProducts.concat(recentlyViewedProducts).map((product, index) => (
              <div key={`${product.id}-${index}`} className="min-w-[120px] max-w-[120px]">
                <div className="aspect-square overflow-hidden rounded-md relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xs text-gray-900 mt-1 line-clamp-1">{product.name}</h4>
                <div className="text-xs text-[#ea384c] font-medium">US ${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
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
          <button 
            className="flex flex-col items-center justify-center p-2 w-1/4"
            onClick={handleWishlist}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${isWishlisted ? "text-red-500" : "text-gray-600"}`}>
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

      {/* Quick style for hiding scrollbars */}
      <style>
      {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
      </style>
    </div>
  );
}
