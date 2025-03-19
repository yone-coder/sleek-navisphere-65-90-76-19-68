
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModishHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <h1 className={cn(
          "font-bold tracking-widest transition-all duration-300 uppercase",
          scrolled ? "text-gray-900 text-lg" : "text-gray-800 text-xl"
        )}>
          MODISH
        </h1>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
            <Search className="w-4.5 h-4.5" />
          </button>
          
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-700 hover:bg-white transition-colors">
            <Heart className="w-4.5 h-4.5" />
          </button>
          
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-700 hover:bg-white transition-colors relative">
            <ShoppingBag className="w-4.5 h-4.5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
