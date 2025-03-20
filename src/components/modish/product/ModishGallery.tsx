
import React, { useState, useEffect } from 'react';
import { Maximize2, Heart, Play, Camera, Share2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type ModishGalleryProps = {
  images: string[];
  name: string;
};

export function ModishGallery({ images, name }: ModishGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showSellerPromo, setShowSellerPromo] = useState(true);
  const isMobile = useIsMobile();

  // Auto rotate images
  useEffect(() => {
    if (isFullscreen || isVideoPlaying) return;
    
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, images.length, isFullscreen, isVideoPlaying]);

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
    <div className="relative w-full mt-14">
      {/* Seller promo banner */}
      {showSellerPromo && (
        <div className="absolute top-2 left-0 right-0 z-10 px-3">
          <div className="bg-red-50 flex items-center justify-between px-3 py-2 rounded-lg border border-red-100 shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-800">Top-rated Seller</p>
                <p className="text-[10px] text-gray-600">98.7% Positive Feedback</p>
              </div>
            </div>
            <button 
              className="text-xs text-gray-400"
              onClick={() => setShowSellerPromo(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Main image carousel */}
      <div className="aspect-[4/3] md:aspect-square overflow-hidden relative bg-gray-50">
        <div 
          className="absolute inset-0 flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-full h-full"
            >
              <img 
                src={img} 
                alt={`${name} - ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}

          {/* Video placeholder */}
          <div className="flex-shrink-0 w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="relative">
              <img 
                src={images[0]} 
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlays and buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button 
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart className={cn("w-5 h-5", isWishlist && "fill-red-500 text-red-500")} />
          </button>
          
          <button 
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
            onClick={() => {/* Share functionality */}}
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          <button 
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Image counter indicator - MOVED TO BOTTOM RIGHT */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
            {activeIndex + 1}/{images.length + 1}
          </div>
        </div>
        
        {/* Discount tag */}
        <div className="absolute left-0 top-0 z-10">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1">
            -48%
          </div>
        </div>
        
        {/* Live viewers */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs flex items-center px-2 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></div>
            <span>127 viewing this now</span>
          </div>
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className={cn(
        "mt-2 flex gap-1.5 px-2 overflow-x-auto pb-2 pt-1 scrollbar-none",
        isMobile ? "justify-start" : "justify-center"
      )}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden transition-all duration-200 relative",
              idx === activeIndex 
                ? "ring-2 ring-red-500" 
                : "opacity-70 hover:opacity-100"
            )}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        
        {/* Video thumbnail */}
        <button
          onClick={() => setActiveIndex(images.length)}
          className={cn(
            "flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden transition-all duration-200 relative",
            images.length === activeIndex 
              ? "ring-2 ring-red-500" 
              : "opacity-70 hover:opacity-100"
          )}
        >
          <div className="w-full h-full bg-gray-100 relative">
            <img 
              src={images[0]} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
          </div>
        </button>
      </div>
      
      {/* Share to earn credits banner */}
      <div className="mx-3 mt-3">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-2.5 border border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-800">Share & earn</h4>
                <p className="text-[10px] text-gray-600">Get up to $10 in credits</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Share now
            </button>
          </div>
        </div>
      </div>
      
      {/* Fullscreen view */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white"
            onClick={goToPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-6 inset-x-0 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
