
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type ModishGalleryProps = {
  images: string[];
  name: string;
};

export function ModishGallery({ images, name }: ModishGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile } = useIsMobile();
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={cn(
      "relative bg-white", 
      isMobile ? "h-[400px]" : "h-[450px]"
    )}>
      {/* Main image */}
      <div className="h-full w-full relative overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-300 flex items-center justify-center",
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={image}
              alt={`${name} - Image ${index + 1}`}
              className="object-contain h-full w-full"
            />
          </div>
        ))}
        
        {/* Fullscreen button */}
        <button
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
          aria-label="View fullscreen"
        >
          <Expand className="h-5 w-5 text-gray-700" />
        </button>
        
        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
        
        {/* Image indicator dots for mobile */}
        {isMobile && (
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === activeIndex ? "bg-red-500" : "bg-gray-300"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Thumbnails - Only on desktop */}
      {!isMobile && (
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2 px-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "h-16 w-16 border-2 rounded overflow-hidden transition-colors",
                index === activeIndex ? "border-red-500" : "border-transparent"
              )}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
