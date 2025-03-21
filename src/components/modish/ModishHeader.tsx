
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ModishHeaderSearch } from './header/ModishHeaderSearch';
import { ModishHeaderActions } from './header/ModishHeaderActions';
import { ModishDealsBanner } from './header/ModishDealsBanner';
import { ModishCategoryTabs } from './header/ModishCategoryTabs';

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled 
          ? "bg-white shadow-sm py-1" 
          : "bg-white py-1"
      )}
    >
      {/* Top navigation bar */}
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

        {/* Search bar */}
        <ModishHeaderSearch 
          searchFocused={searchFocused} 
          setSearchFocused={setSearchFocused} 
        />

        {/* Right section */}
        <ModishHeaderActions />
      </div>
      
      {/* Deals banner */}
      <ModishDealsBanner />
    </header>
  );
}
