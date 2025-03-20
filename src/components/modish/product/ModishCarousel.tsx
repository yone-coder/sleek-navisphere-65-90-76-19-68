
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn, Share2, Heart } from 'lucide-react';

type ModishCarouselProps = {
  images: string[];
};

export function ModishCarousel({ images }: ModishCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative mb-6">
      {/* Main image display with AliExpress styling */}
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-gray-100",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "h-[350px]"
      )}>
        <img
          src={images[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          className={cn(
            "w-full h-full object-contain transition-transform duration-300",
            isFullscreen ? "cursor-zoom-out object-contain" : "cursor-zoom-in"
          )}
          onClick={toggleFullscreen}
        />
        
        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        {/* AliExpress-style action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
            onClick={toggleFullscreen}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200">
            <Share2 className="w-4 h-4" />
          </button>
          
          <button className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        
        {/* Image counter */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {currentIndex + 1}/{images.length}
        </div>
      </div>
      
      {/* Thumbnails gallery - AliExpress style */}
      <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={cn(
              "shrink-0 h-16 w-16 border-2 rounded-md overflow-hidden transition-all",
              currentIndex === index ? "border-red-500" : "border-gray-200"
            )}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
