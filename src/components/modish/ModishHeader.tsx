
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ArrowLeft, Bell, Menu, ChevronDown, Camera, Mic, Tag, Clock, BarChart4, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

export function ModishHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white",
        scrolled 
          ? "shadow-sm py-1" 
          : "py-1"
      )}
      style={{ 
        borderBottomLeftRadius: isMobile ? '16px' : '0',
        borderBottomRightRadius: isMobile ? '16px' : '0',
      }}
    >
      {/* Top navigation bar - App-like style */}
      <div className="px-3 py-2 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleGoBack}
            className="w-8 h-8 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {!searchFocused && (
            <div className="font-bold text-red-500 text-base flex items-center">
              AliExpress
              <BarChart4 className="ml-1 w-4 h-4" />
            </div>
          )}
        </div>

        {/* Search bar - Enhanced app-like style */}
        <div 
          className={cn(
            "relative transition-all duration-200 flex items-center",
            searchFocused ? "flex-1 mx-2" : "w-[160px] mx-1"
          )}
        >
          <div className={cn(
            "bg-gray-100 rounded-full w-full flex items-center pr-2 pl-3 py-1.5 transition-all",
            searchFocused ? "border border-red-500" : "border border-transparent"
          )}>
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="bg-transparent w-full ml-2 text-xs outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <Camera className="w-4 h-4 text-gray-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search by image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <Mic className="w-4 h-4 text-gray-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Voice search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>

        {/* Right section - App-like style */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="relative w-8 h-8 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share product</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="relative w-8 h-8 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
                    5
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="relative w-8 h-8 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100">
                  <ShoppingBag className="w-5 h-5" />
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
                    3
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Shopping cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <button 
            className="w-8 h-8 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Deals banner - Modern app-like style */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white">Flash Sale</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-medium">Ends in 02:45:30</span>
        </div>
      </div>
      
      {/* Category menu - Modern app-like dropdown */}
      {showCategoryMenu && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 p-3 grid grid-cols-4 gap-3 rounded-b-xl">
          {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys', 'Automotive', 'Books'].map((category) => (
            <Button 
              key={category}
              variant="ghost" 
              className="flex flex-col items-center justify-center h-20 text-xs"
              onClick={() => setShowCategoryMenu(false)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                {category[0]}
              </div>
              {category}
            </Button>
          ))}
        </div>
      )}
      
      {/* Category tabs - App-like tabs with pill design - only show when scrolled */}
      {scrolled && (
        <div className="bg-white overflow-x-auto scrollbar-none">
          <div className="flex items-center px-2 py-1.5 gap-3 min-w-max">
            <button className="flex items-center whitespace-nowrap text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-full font-medium">
              <span>All Categories</span>
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-3 py-1.5 rounded-full bg-gray-50 font-medium">
              Top Products
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-3 py-1.5 rounded-full bg-gray-50 font-medium">
              Best Selling
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-3 py-1.5 rounded-full bg-gray-50 font-medium">
              Price
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-3 py-1.5 rounded-full bg-gray-50 font-medium">
              New Arrivals
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-3 py-1.5 rounded-full bg-gray-50 font-medium">
              Ship From
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
