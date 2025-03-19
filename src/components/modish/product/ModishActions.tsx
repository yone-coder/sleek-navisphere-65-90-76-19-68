
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Share2, MessageCircle, CreditCard, Truck, Clock, RefreshCw } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import ModishCommentPanel from './ModishCommentPanel';
import { toast } from 'sonner';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: any) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}

type ModishActionsProps = {
  product: any;
  selectedColor: string;
  quantity: number;
};

export function ModishActions({ product, selectedColor, quantity }: ModishActionsProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showPaypalButtons, setShowPaypalButtons] = useState(false);
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  
  // Sample counters for social interactions
  const likeCount = liked ? 124 : 123;
  const commentCount = 47;
  const shareCount = 18;
  
  const handleLikeToggle = () => {
    setLiked(prev => !prev);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from MODISH`,
        url: window.location.href,
      }).catch(err => {
        toast.error('Failed to share');
      });
    } else {
      toast.info('Copy link to share', { description: window.location.href });
    }
  };

  const loadPayPalScript = () => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      initializePayPalButtons();
      return;
    }

    // Create PayPal script element
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD";
    script.async = true;
    script.onload = () => initializePayPalButtons();
    script.onerror = () => {
      toast.error('Failed to load PayPal');
      setShowPaypalButtons(false);
    };
    document.body.appendChild(script);
  };

  const initializePayPalButtons = () => {
    if (!paypalButtonsRef.current || !window.paypal) return;

    // Clear existing buttons if any
    paypalButtonsRef.current.innerHTML = '';
    
    window.paypal.Buttons({
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: product.name,
            amount: {
              value: (product.discountPrice * quantity).toFixed(2)
            }
          }]
        });
      },
      onApprove: (_data: any, actions: any) => {
        return actions.order.capture().then(function() {
          toast.success('Payment successful!');
          setShowPaypalButtons(false);
        });
      },
      onCancel: () => {
        toast.info('Payment cancelled');
        setShowPaypalButtons(false);
      },
      onError: () => {
        toast.error('Payment failed');
        setShowPaypalButtons(false);
      }
    }).render(paypalButtonsRef.current);
  };

  const handleBuyNowClick = () => {
    setShowPaypalButtons(true);
    // Load PayPal script when Buy Now is clicked
    loadPayPalScript();
  };

  useEffect(() => {
    // Cleanup function to remove PayPal script when component unmounts
    return () => {
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (paypalScript) {
        paypalScript.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        {/* Social interaction buttons with counters */}
        <button 
          onClick={handleLikeToggle}
          className={cn(
            "flex-1 h-12 rounded-full font-medium flex items-center justify-center gap-2 transition-colors border",
            liked 
              ? "bg-red-50 border-red-200 text-red-500" 
              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
          )}
        >
          <Heart className={cn("w-5 h-5", liked && "fill-red-500")} />
          <span>{likeCount}</span>
        </button>
        
        <Drawer open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
          <DrawerTrigger asChild>
            <button className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 h-12 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{commentCount}</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] rounded-t-[20px] p-0">
            <ModishCommentPanel onClose={() => setIsCommentsOpen(false)} />
          </DrawerContent>
        </Drawer>
        
        <button 
          onClick={handleShare}
          className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 h-12 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>{shareCount}</span>
        </button>
      </div>
      
      {!showPaypalButtons ? (
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          onClick={handleBuyNowClick}
        >
          <CreditCard className="w-4 h-4" />
          Buy Now · ${(product.discountPrice * quantity).toLocaleString()}
        </button>
      ) : (
        <div className="w-full space-y-2">
          <div ref={paypalButtonsRef} className="paypal-button-container" />
          <button 
            className="w-full border border-gray-300 text-gray-600 h-10 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 transition-colors"
            onClick={() => setShowPaypalButtons(false)}
          >
            Cancel
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-blue-50">
          <Truck className="w-5 h-5 text-blue-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Free Shipping</span>
          <span className="text-xs text-gray-500">For orders over $100</span>
        </div>
        
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-green-50">
          <RefreshCw className="w-5 h-5 text-green-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Easy Returns</span>
          <span className="text-xs text-gray-500">30-day money back</span>
        </div>
        
        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-purple-50">
          <Clock className="w-5 h-5 text-purple-600 mb-2" />
          <span className="text-sm font-medium text-gray-900">Fast Delivery</span>
          <span className="text-xs text-gray-500">{product.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}
