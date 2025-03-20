
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, ArrowLeft, Bell, Menu, ChevronDown, Camera, Mic, Tag, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function ModishHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 modish-header",
        scrolled 
          ? "bg-white shadow-sm py-1" 
          : "bg-white py-1"
      )}
    >
      {/* Top navigation bar - AliExpress style */}
      <div className="px-3 py-1 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleGoBack}
            className="w-8 h-8 flex items-center justify-center text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {!searchFocused && (
            <div className="font-bold text-red-500 text-base">
              AliExpress
            </div>
          )}
        </div>

        {/* Search bar - AliExpress style */}
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
              placeholder="Search on AliExpress"
              className="bg-transparent w-full ml-2 text-xs outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <div className="flex items-center gap-2">
                <button className="ml-1">
                  <Camera className="w-4 h-4 text-gray-500" />
                </button>
                <button className="ml-1">
                  <Mic className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right section - AliExpress style */}
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
            <Heart className="w-5 h-5" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
              2
            </Badge>
          </button>
          
          <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
            <ShoppingBag className="w-5 h-5" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
              3
            </Badge>
          </button>
          
          <button className="w-8 h-8 flex items-center justify-center text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Deals banner - AliExpress style */}
      <div className="px-3 py-1.5 bg-red-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-red-500" />
          <span className="text-xs font-medium text-red-700">Flash Deals</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-xs text-red-700">Ends in 02:45:30</span>
        </div>
      </div>
      
      {/* Category tabs - AliExpress style - only show when scrolled */}
      {scrolled && (
        <div className="bg-white overflow-x-auto scrollbar-none shadow-sm">
          <div className="flex items-center px-2 py-1.5 gap-3 min-w-max">
            <button className="flex items-center whitespace-nowrap text-xs bg-red-50 text-red-500 px-2.5 py-1 rounded-full">
              <span>All Categories</span>
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
              Top Products
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
              Best Selling
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
              Price
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
              New Arrivals
            </button>
            
            <button className="whitespace-nowrap text-xs text-gray-700 px-2.5 py-1 rounded-full">
              Ship From
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
