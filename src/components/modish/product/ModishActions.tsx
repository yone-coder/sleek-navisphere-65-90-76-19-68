import React, { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, CreditCard, Truck, RefreshCw, Clock, ChevronLeft, ChevronRight, ShieldCheck, Info, Tag, Copy, Facebook, Twitter, Bookmark, Mail } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import ModishCommentPanel from './ModishCommentPanel';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

type ModishActionsProps = {
  product: any;
  selectedColor: string;
  quantity: number;
  selectedSize?: string;
};

// Enhanced benefit card data with more details
const benefitCards = [
  {
    icon: <Truck className="w-5 h-5 text-blue-600" />,
    title: "Free Shipping",
    description: "For orders over $100",
    details: "All orders are processed within 24 hours. Premium shipping options available at checkout.",
    actionLabel: "Shipping Policy",
    actionLink: "#shipping-policy",
    bgColor: "bg-blue-50",
    accent: "border-blue-300",
    accentColor: "text-blue-700",
    iconBg: "bg-blue-100"
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-green-600" />,
    title: "Easy Returns",
    description: "30-day money back",
    details: "No questions asked returns for all unworn items in original packaging. Fast refund processing.",
    actionLabel: "Return Process",
    actionLink: "#return-process",
    bgColor: "bg-green-50",
    accent: "border-green-300",
    accentColor: "text-green-700",
    iconBg: "bg-green-100"
  },
  {
    icon: <Clock className="w-5 h-5 text-purple-600" />,
    title: "Fast Delivery",
    description: (product) => product.deliveryTime,
    details: "Order before 2PM for same-day processing. Track your package in real-time through our app.",
    actionLabel: "Track Order",
    actionLink: "#track-order",
    bgColor: "bg-purple-50",
    accent: "border-purple-300",
    accentColor: "text-purple-700",
    iconBg: "bg-purple-100"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-orange-600" />,
    title: "Quality Guarantee",
    description: "100% Authentic",
    details: "Every product is verified for authenticity and quality before shipping to ensure your satisfaction.",
    actionLabel: "Our Standards",
    actionLink: "#quality-standards",
    bgColor: "bg-orange-50",
    accent: "border-orange-300",
    accentColor: "text-orange-700",
    iconBg: "bg-orange-100"
  },
  {
    icon: <Tag className="w-5 h-5 text-red-600" />,
    title: "Price Match",
    description: "Found it cheaper?",
    details: "If you find the same product at a lower price elsewhere, we'll match it and give an extra 5% off.",
    actionLabel: "Learn More",
    actionLink: "#price-match",
    bgColor: "bg-red-50",
    accent: "border-red-300",
    accentColor: "text-red-700",
    iconBg: "bg-red-100"
  }
];

// Share options for the new share drawer
const shareOptions = [
  { icon: <Copy className="w-5 h-5" />, label: "Copy Link", action: "copy" },
  { icon: <Facebook className="w-5 h-5 text-blue-600" />, label: "Facebook", action: "facebook" },
  { icon: <Twitter className="w-5 h-5 text-blue-400" />, label: "Twitter", action: "twitter" },
  { icon: <Mail className="w-5 h-5 text-orange-500" />, label: "Email", action: "email" }
];

export function ModishActions({ product, selectedColor, quantity, selectedSize }: ModishActionsProps) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  // Removed showCardDetails state since we're keeping all cards expanded by default now
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

  const handleSaveToggle = () => {
    setIsSaved(prev => !prev);
    toast.success(isSaved ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = (option = 'default') => {
    if (option === 'default') {
      setIsShareDrawerOpen(true);
      return;
    }
    
    if (option === 'copy') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success('Link copied to clipboard');
      });
      return;
    }

    // Handle other share options
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} from MODISH`,
      url: window.location.href,
    };

    if (option === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`;
      return;
    }

    // Default share for other platforms
    if (navigator.share) {
      navigator.share(shareData).catch(err => {
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
        quantity,
        selectedSize
      } 
    });
  };

  // Get the current benefit card
  const currentCard = benefitCards[currentCardIndex];
  const description = typeof currentCard.description === 'function' 
    ? currentCard.description(product) 
    : currentCard.description;

  // Handle manual card navigation
  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % benefitCards.length);
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + benefitCards.length) % benefitCards.length);
  };

  const handleActionClick = (actionLink: string) => {
    // In a real app, this would navigate to the specific policy or action page
    toast.info(`Navigating to ${actionLink.replace('#', '')}`);
  };

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
        
        <Drawer open={isShareDrawerOpen} onOpenChange={setIsShareDrawerOpen}>
          <DrawerTrigger asChild>
            <button 
              onClick={() => handleShare()}
              className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 h-12 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>{shareCount}</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="rounded-t-[20px]">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 text-center">Share this product</h3>
              <div className="grid grid-cols-2 gap-3">
                {shareOptions.map((option) => (
                  <button 
                    key={option.action}
                    onClick={() => handleShare(option.action)}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        
        {/* Save to wishlist button */}
        <button 
          onClick={handleSaveToggle}
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-colors border",
            isSaved 
              ? "bg-blue-50 border-blue-200 text-blue-600" 
              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
          )}
        >
          <Bookmark className={cn("w-5 h-5", isSaved && "fill-blue-600")} />
        </button>
      </div>
      
      <button 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        onClick={handleBuyNowClick}
      >
        <CreditCard className="w-4 h-4" />
        Buy Now · ${(product.discountPrice * quantity).toLocaleString()}
      </button>
      
      {/* Modified benefit card to always show details */}
      <div className="pt-2">
        <Card className="relative overflow-hidden min-h-[130px]">
          <div className={`absolute top-0 left-0 right-0 h-1 ${currentCard.accent} transition-all duration-300`}></div>
          
          {/* Info icon (kept for consistency but no longer toggles) */}
          <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm border border-gray-100">
            <Info className="w-3.5 h-3.5" />
          </div>
          
          {/* Card counter indicator */}
          <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
            {currentCardIndex + 1}/{benefitCards.length}
          </div>
          
          <CardContent className={`p-0 ${currentCard.bgColor} transition-all duration-300`}>
            <div className="p-4 pb-10 text-center">
              {/* Icon and title on the same horizontal line */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-full ${currentCard.iconBg} flex items-center justify-center`}>
                  {React.cloneElement(currentCard.icon, { className: 'w-4 h-4' })}
                </div>
                <h3 className={`text-base font-semibold ${currentCard.accentColor}`}>{currentCard.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{description}</p>
              
              {/* Always show expanded content */}
              <div className="mt-1">
                <p className="text-xs text-gray-700 mb-1.5">{currentCard.details}</p>
                <button 
                  onClick={() => handleActionClick(currentCard.actionLink)}
                  className={`text-xs font-medium ${currentCard.accentColor} underline`}
                >
                  {currentCard.actionLabel}
                </button>
              </div>
            </div>
            
            {/* Navigation buttons at bottom right */}
            <div className="absolute bottom-2 right-2 flex gap-1 z-10">
              <button 
                onClick={goToPrevCard} 
                className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              
              <button 
                onClick={goToNextCard} 
                className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200 overflow-hidden">
              <div 
                className="h-full bg-gray-700 transition-all duration-300" 
                style={{ width: `${((currentCardIndex + 1) / benefitCards.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
