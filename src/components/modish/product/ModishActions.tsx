
import React, { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, CreditCard, Truck, RefreshCw, Clock } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import ModishCommentPanel from './ModishCommentPanel';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type ModishActionsProps = {
  product: any;
  selectedColor: string;
  quantity: number;
};

// Define the benefit card data
const benefitCards = [
  {
    icon: <Truck className="w-5 h-5 text-blue-600 mb-2" />,
    title: "Free Shipping",
    description: "For orders over $100",
    bgColor: "bg-blue-50"
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-green-600 mb-2" />,
    title: "Easy Returns",
    description: "30-day money back",
    bgColor: "bg-green-50"
  },
  {
    icon: <Clock className="w-5 h-5 text-purple-600 mb-2" />,
    title: "Fast Delivery",
    description: (product) => product.deliveryTime,
    bgColor: "bg-purple-50"
  }
];

export function ModishActions({ product, selectedColor, quantity }: ModishActionsProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const navigate = useNavigate();
  
  // Sample counters for social interactions
  const likeCount = liked ? 124 : 123;
  const commentCount = 47;
  const shareCount = 18;
  
  // Effect to cycle through benefit cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % benefitCards.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
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

  const handleBuyNowClick = () => {
    // Navigate to checkout page with product details
    navigate('/modish/checkout', { 
      state: { 
        product, 
        selectedColor, 
        quantity 
      } 
    });
  };

  // Get the current benefit card
  const currentCard = benefitCards[currentCardIndex];
  const description = typeof currentCard.description === 'function' 
    ? currentCard.description(product) 
    : currentCard.description;

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
      
      <button 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        onClick={handleBuyNowClick}
      >
        <CreditCard className="w-4 h-4" />
        Buy Now · ${(product.discountPrice * quantity).toLocaleString()}
      </button>
      
      {/* Single rotating benefit card */}
      <div className="flex justify-center pt-4">
        <div className={`flex flex-col items-center text-center p-4 rounded-lg w-full transition-all duration-500 ${currentCard.bgColor}`}>
          {currentCard.icon}
          <span className="text-sm font-medium text-gray-900">{currentCard.title}</span>
          <span className="text-xs text-gray-500">{description}</span>
          
          {/* Card indicator dots */}
          <div className="flex gap-1.5 mt-2">
            {benefitCards.map((_, index) => (
              <div 
                key={index} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  currentCardIndex === index ? "bg-gray-700" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
