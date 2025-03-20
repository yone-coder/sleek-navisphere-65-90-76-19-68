
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, ChevronLeft, ArrowLeft, Share2, Camera, ArrowDown, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white shadow-sm py-1.5" 
          : "bg-transparent py-2"
      )}
    >
      <div className="px-3 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-1">
          <button 
            onClick={handleGoBack}
            className="w-9 h-9 flex items-center justify-center text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center">
            <span className="font-bold text-red-500 text-lg">MODISH</span>
          </div>
        </div>

        {/* Search bar (expands on focus) */}
        <div 
          className={cn(
            "relative transition-all duration-300 flex items-center",
            searchFocused ? "flex-1 mx-2" : "w-[140px] mx-1"
          )}
        >
          <div className={cn(
            "bg-gray-100 rounded-full w-full flex items-center pr-2 pl-3 py-1.5 transition-all",
            searchFocused ? "border border-red-500" : "border border-transparent"
          )}>
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search products"
              className="bg-transparent w-full ml-2 text-sm outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchFocused && (
              <button className="ml-1">
                <Camera className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">2</span>
          </button>
          
          <button className="relative w-8 h-8 flex items-center justify-center text-gray-700">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
          </button>

          <button className="relative w-8 h-8 hidden md:flex items-center justify-center text-gray-700">
            <User className="w-5 h-5" />
          </button>
          
          <button className="w-8 h-8 flex md:hidden items-center justify-center text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Secondary navigation bar (category/filter) */}
      {scrolled && (
        <div className="bg-white px-3 py-1.5 border-t border-gray-100 overflow-x-auto scrollbar-none flex items-center gap-3">
          <button className="flex items-center whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            <span>All Categories</span>
            <ArrowDown className="ml-1 w-3 h-3" />
          </button>
          
          <button className="whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            Top Products
          </button>
          
          <button className="whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            Best Selling
          </button>
          
          <button className="whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            Price
          </button>
          
          <button className="whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            Ship From
          </button>
          
          <button className="whitespace-nowrap text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full">
            Filter
          </button>
        </div>
      )}
    </header>
  );
}
