
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type ModishGalleryProps = {
  images: string[];
  name: string;
};

export function ModishGallery({ images, name }: ModishGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full mt-0">
      <div className="aspect-square overflow-hidden relative">
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
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Fullscreen button */}
        <button 
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
          onClick={() => setIsFullscreen(true)}
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        
        {/* Navigation indicators */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === activeIndex 
                  ? "bg-white scale-125 shadow-sm" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
          onClick={goToPrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm text-gray-700 hover:bg-white transition-colors"
          onClick={goToNext}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Thumbnails with improved mobile layout */}
      <div className={cn(
        "mt-4 flex gap-2 px-4 overflow-x-auto pb-3 scrollbar-none",
        isMobile ? "justify-start" : "justify-center"
      )}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300",
              idx === activeIndex 
                ? "ring-2 ring-black ring-offset-2" 
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
