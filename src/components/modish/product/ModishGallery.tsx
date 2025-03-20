
import React, { useState, useEffect } from 'react';
import { Heart, Play, Share2, Award, ChevronLeft, ChevronRight, ShoppingBag, Clock, Users, Eye, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type ModishGalleryProps = {
  images: string[];
  name: string;
};

export function ModishGallery({ images, name }: ModishGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showSellerPromo, setShowSellerPromo] = useState(true);
  const isMobile = useIsMobile();

  // Auto rotate images
  useEffect(() => {
    if (isFullscreen) return;
    
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, images.length, isFullscreen]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Close promo banner after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSellerPromo(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full">
      {/* Main image carousel - AliExpress style */}
      <div className="aspect-[1/1] overflow-hidden relative bg-white">
        {/* Navigation arrows - AliExpress style */}
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          onClick={goToPrev}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          onClick={goToNext}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
        
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-full h-full"
              onClick={() => setIsFullscreen(true)}
            >
              <img 
                src={img} 
                alt={`${name} - ${idx + 1}`}
                className="w-full h-full object-contain cursor-zoom-in"
              />
            </div>
          ))}
        </div>
        
        {/* Top action bar - AliExpress style */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button 
            className="bg-white/90 rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart className={cn("w-5 h-5", isWishlist && "fill-red-500 text-red-500")} />
          </button>
          
          <button 
            className="bg-white/90 rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
            onClick={() => {/* Share functionality */}}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Discount badge - AliExpress style */}
        <div className="absolute left-3 top-3 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -48% OFF
          </div>
        </div>
        
        {/* Image pagination - AliExpress style */}
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center items-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                idx === activeIndex 
                  ? "bg-white w-3" 
                  : "bg-white/50"
              )}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Live stats - AliExpress style */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-black/60 backdrop-blur-sm text-white text-xs flex items-center px-2 py-1 rounded-full">
            <Users className="w-3 h-3 mr-1" />
            <span>127 viewing</span>
          </div>
        </div>
      </div>
      
      {/* Thumbnails - AliExpress style */}
      <div className={cn(
        "mt-2 flex gap-1.5 px-2 pb-2 scrollbar-none overflow-x-auto",
        isMobile ? "justify-start" : "justify-center"
      )}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "flex-shrink-0 w-14 h-14 border overflow-hidden transition-all",
              idx === activeIndex 
                ? "border-red-500" 
                : "border-transparent opacity-70"
            )}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Quick stats - AliExpress style */}
      <div className="mt-2 flex items-center justify-between px-3 py-2 border-t border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>1.2K+ sold</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Ships in 24hrs</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          <span>5.7K views</span>
        </div>
      </div>
      
      {/* Limited time offer - AliExpress style */}
      <div className="mx-3 mt-3">
        <div className="bg-red-50 rounded-md p-2.5 border border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-red-500" />
            <div>
              <h4 className="text-xs font-medium text-gray-800">Limited Time Offer</h4>
              <p className="text-[10px] text-red-500">Ends in 01:22:45</p>
            </div>
          </div>
          <button className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded">
            Get Now
          </button>
        </div>
      </div>
      
      {/* Fullscreen view - AliExpress style */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 bg-white/20 rounded-full p-2 text-white"
            onClick={() => setIsFullscreen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img 
            src={images[activeIndex]} 
            alt={`${name} - fullscreen`}
            className="max-w-full max-h-full object-contain"
          />
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white"
            onClick={goToPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-6 inset-x-0 flex justify-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full mx-1 transition-all",
                  idx === activeIndex 
                    ? "bg-white" 
                    : "bg-white/50"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
