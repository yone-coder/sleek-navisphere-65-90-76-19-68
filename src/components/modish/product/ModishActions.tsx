import React, { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, CreditCard, Truck, RefreshCw, Clock, ChevronLeft, ChevronRight, ShieldCheck, Info, Tag, Copy, Facebook, Twitter, Bookmark, Mail, ShoppingBag, DollarSign, Percent, Headphones, Gift, Star, PlusSquare, Layers } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import ModishCommentPanel from './ModishCommentPanel';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

type ModishActionsProps = {
  product: any;
  selectedColor: string;
  quantity: number;
  selectedSize?: string;
};

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
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);
  const [isInstallmentDrawerOpen, setIsInstallmentDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const likeCount = liked ? 124 : 123;
  const commentCount = 47;
  const shareCount = 18;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % benefitCards.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  
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

    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} from MODISH`,
      url: window.location.href,
    };

    if (option === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`;
      return;
    }

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        toast.error('Failed to share');
      });
    } else {
      toast.info('Copy link to share', { description: window.location.href });
    }
  };

  const handleAddToCart = () => {
    if (isMobile) {
      setIsCartDrawerOpen(true);
    } else {
      toast.success(`Added to cart: ${product.name}`, {
        description: `${quantity} × $${product.discountPrice} in ${selectedColor}${selectedSize ? `, Size: ${selectedSize}` : ''}`,
        action: {
          label: "View Cart",
          onClick: () => navigate('/modish/checkout')
        }
      });
    }
  };

  const handleBuyNowClick = () => {
    navigate('/modish/checkout', { 
      state: { 
        product, 
        selectedColor, 
        quantity,
        selectedSize
      } 
    });
  };

  const currentCard = benefitCards[currentCardIndex];
  const description = typeof currentCard.description === 'function' 
    ? currentCard.description(product) 
    : currentCard.description;

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % benefitCards.length);
  };

  const goToPrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + benefitCards.length) % benefitCards.length);
  };

  const handleActionClick = (actionLink: string) => {
    toast.info(`Navigating to ${actionLink.replace('#', '')}`);
  };

  const calculateMonthlyPayment = () => {
    const price = product.discountPrice * quantity;
    return {
      three: (price / 3).toFixed(2),
      six: (price / 6).toFixed(2),
      twelve: (price / 12).toFixed(2)
    };
  };

  const installments = calculateMonthlyPayment();

  const renderMobileBottomBar = () => {
    if (!isMobile) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={() => setIsContactDrawerOpen(true)}
            className="p-2 flex flex-col items-center justify-center text-gray-700"
          >
            <Headphones className="w-5 h-5" />
            <span className="text-xs mt-1">Contact</span>
          </button>
          
          <button 
            onClick={handleSaveToggle}
            className={cn(
              "p-2 flex flex-col items-center justify-center",
              isSaved ? "text-blue-600" : "text-gray-700"
            )}
          >
            <Bookmark className={cn("w-5 h-5", isSaved && "fill-blue-600")} />
            <span className="text-xs mt-1">Wishlist</span>
          </button>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white h-10 rounded-lg font-medium flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
          
          <button 
            onClick={handleBuyNowClick}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-10 rounded-lg font-medium flex items-center justify-center"
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Buy Now
          </button>
        </div>
      </div>
    );
  };

  const renderMainActions = () => {
    if (isMobile) {
      return (
        <div className="space-y-4 mb-20">
          <div className="flex gap-3">
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
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-3 border border-yellow-100 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-amber-800 font-medium text-sm">Best Price Guarantee</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Percent className="w-3.5 h-3.5 text-red-500" />
                  <p className="text-xs text-red-500 font-medium">You save ${(product.regularPrice - product.discountPrice).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsInstallmentDrawerOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-indigo-100 bg-indigo-50 text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">Pay in installments</h4>
                <p className="text-xs text-gray-600">As low as ${installments.three}/month</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-2 p-3 rounded-lg border border-purple-100 bg-purple-50">
            <Star className="w-5 h-5 text-purple-500 fill-purple-500" />
            <div>
              <p className="text-xs text-gray-700">Earn <span className="text-purple-600 font-medium">{Math.round(product.discountPrice * 2)} points</span> with this purchase</p>
            </div>
          </div>
          
          <div className="pt-2">
            <Card className="relative overflow-hidden min-h-[130px]">
              <div className={`absolute top-0 left-0 right-0 h-1 ${currentCard.accent} transition-all duration-300`}></div>
              
              <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm border border-gray-100">
                <Info className="w-3.5 h-3.5" />
              </div>
              
              <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
                {currentCardIndex + 1}/{benefitCards.length}
              </div>
              
              <CardContent className={`p-0 ${currentCard.bgColor} transition-all duration-300`}>
                <div className="p-4 pb-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className={`w-7 h-7 rounded-full ${currentCard.iconBg} flex items-center justify-center`}>
                      {React.cloneElement(currentCard.icon, { className: 'w-4 h-4' })}
                    </div>
                    <h3 className={`text-base font-semibold ${currentCard.accentColor}`}>{currentCard.title}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{description}</p>
                  
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
    
    return (
      <div className="space-y-6">
        <div className="flex gap-3">
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
        
        <div className="flex gap-3">
          <button 
            className="flex-1 border border-blue-200 bg-blue-50 text-blue-600 h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
          
          <button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            onClick={handleBuyNowClick}
          >
            <CreditCard className="w-4 h-4" />
            Buy Now · ${(product.discountPrice * quantity).toLocaleString()}
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-medium text-gray-800">Pay in installments</h4>
            </div>
            <button 
              className="text-xs text-blue-600 font-medium"
              onClick={() => setIsInstallmentDrawerOpen(true)}
            >
              See all options
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded p-2 shadow-sm">
              <div className="text-xs text-gray-500">3 months</div>
              <div className="font-medium text-gray-800">${installments.three}/mo</div>
            </div>
            <div className="bg-white rounded p-2 shadow-sm">
              <div className="text-xs text-gray-500">6 months</div>
              <div className="font-medium text-gray-800">${installments.six}/mo</div>
            </div>
            <div className="bg-white rounded p-2 shadow-sm">
              <div className="text-xs text-gray-500">12 months</div>
              <div className="font-medium text-gray-800">${installments.twelve}/mo</div>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Card className="relative overflow-hidden min-h-[130px]">
            <div className={`absolute top-0 left-0 right-0 h-1 ${currentCard.accent} transition-all duration-300`}></div>
            
            <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm border border-gray-100">
              <Info className="w-3.5 h-3.5" />
            </div>
            
            <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
              {currentCardIndex + 1}/{benefitCards.length}
            </div>
            
            <CardContent className={`p-0 ${currentCard.bgColor} transition-all duration-300`}>
              <div className="p-4 pb-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className={`w-7 h-7 rounded-full ${currentCard.iconBg} flex items-center justify-center`}>
                    {React.cloneElement(currentCard.icon, { className: 'w-4 h-4' })}
                  </div>
                  <h3 className={`text-base font-semibold ${currentCard.accentColor}`}>{currentCard.title}</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-1">{description}</p>
                
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
  };

  return (
    <>
      {renderMainActions()}
      {renderMobileBottomBar()}
      
      <Drawer open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen}>
        <DrawerContent className="rounded-t-[20px]">
          <div className="p-4 pb-8">
            <div className="text-center mb-4">
              <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-700">Added to Cart</h3>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{quantity} × ${product.discountPrice}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{selectedColor}</span>
                  {selectedSize && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Size: {selectedSize}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsCartDrawerOpen(false)}
                className="py-3 px-4 border border-gray-200 rounded-lg text-gray-700 font-medium"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => navigate('/modish/checkout')}
                className="py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
              >
                View Cart
              </button>
            </div>
            
            <div className="mt-5">
              <h4 className="font-medium mb-3">Frequently Bought Together</h4>
              <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-28">
                    <div className="relative border border-gray-200 rounded-lg p-1 mb-1">
                      <img 
                        src={`https://picsum.photos/200?random=${item}`} 
                        alt={`Suggestion ${item}`}
                        className="w-full h-28 object-cover rounded"
                      />
                      <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm">
                        <PlusSquare className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <div className="text-xs font-medium">$29.99</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      <Drawer open={isInstallmentDrawerOpen} onOpenChange={setIsInstallmentDrawerOpen}>
        <DrawerContent className="rounded-t-[20px]">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Payment Options</h3>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Installment Plans</h4>
                <div className="text-sm text-blue-600">Total: ${(product.discountPrice * quantity).toFixed(2)}</div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <h5 className="font-medium">Pay in 3 months</h5>
                  </div>
                  <div className="pl-7">
                    <div className="text-sm">${installments.three}/month</div>
                    <div className="text-xs text-gray-500 mt-0.5">No interest, no credit check</div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <h5 className="font-medium">Pay in 6 months</h5>
                  </div>
                  <div className="pl-7">
                    <div className="text-sm">${installments.six}/month</div>
                    <div className="text-xs text-gray-500 mt-0.5">No interest, quick approval</div>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <h5 className="font-medium">Pay in 12 months</h5>
                  </div>
                  <div className="pl-7">
                    <div className="text-sm">${installments.twelve}/month</div>
                    <div className="text-xs text-gray-500 mt-0.5">4.9% APR, subject to approval</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Other Payment Methods</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-gray-200 rounded-lg p-2 text-center">
                  <img 
                    src="https://picsum.photos/40?random=1" 
                    alt="Visa"
                    className="w-8 h-8 object-contain mx-auto mb-1"
                  />
                  <div className="text-xs">Credit Card</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-2 text-center">
                  <img 
                    src="https://picsum.photos/40?random=2" 
                    alt="PayPal"
                    className="w-8 h-8 object-contain mx-auto mb-1"
                  />
                  <div className="text-xs">PayPal</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-2 text-center">
                  <img 
                    src="https://picsum.photos/40?random=3" 
                    alt="Apple Pay"
                    className="w-8 h-8 object-contain mx-auto mb-1"
                  />
                  <div className="text-xs">Apple Pay</div>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      <Drawer open={isContactDrawerOpen} onOpenChange={setIsContactDrawerOpen}>
        <DrawerContent className="rounded-t-[20px]">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Contact Seller</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="https://picsum.photos/100?random=10" 
                  alt="Seller"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Fashion Store Official</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span>
                  Online now
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="text-sm font-medium mb-1">Response Rate</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Usually responds within 2 hours</div>
                  <div className="text-green-600 font-medium text-sm">98%</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Chat Now</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">Call Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Common Questions</h4>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 text-sm">
                  Do you offer international shipping?
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 text-sm">
                  How long is the warranty period?
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 text-sm">
                  Are there any discounts for bulk orders?
                </button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
