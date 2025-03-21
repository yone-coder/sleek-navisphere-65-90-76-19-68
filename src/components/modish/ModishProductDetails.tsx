
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
import { ModishPaymentMethods } from '@/components/modish/product/ModishPaymentMethods';
import { ModishBuyNowPayLater } from '@/components/modish/product/ModishBuyNowPayLater';
import { ModishStoreCoupon } from '@/components/modish/product/ModishStoreCoupon';
import { ModishPersonalizationOptions } from '@/components/modish/product/ModishPersonalizationOptions';
import { ModishProductTabContent } from '@/components/modish/product/ModishProductTabContent';
import { ModishTabsNavigation } from '@/components/modish/product/ModishTabsNavigation';
import { ModishShopSection } from '@/components/modish/product/ModishShopSection';
import { ModishRecentlyViewed } from '@/components/modish/product/ModishRecentlyViewed';
import { ModishCustomerSupport } from '@/components/modish/product/ModishCustomerSupport';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ShoppingBag } from 'lucide-react';
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

      <ModishTabsNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        ref={tabsNavRef} 
      />

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

      <ModishPersonalizationOptions />

      <ModishPaymentMethods />

      <ModishBuyNowPayLater price={product.discountPrice} />

      <ModishStoreCoupon />
      
      <ModishShareButton onShare={handleShare} />

      <ModishProductTabContent 
        activeTab={activeTab} 
        productId={productId} 
        product={product} 
      />

      <ModishShopSection />
      
      <ModishRecentlyViewed />
      
      <ModishCustomerSupport />
    </div>
  );
}
