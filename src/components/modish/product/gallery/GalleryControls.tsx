
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type GalleryControlsProps = {
  onPrevImage: () => void;
  onNextImage: () => void;
  showVideo?: boolean;
};

export function GalleryControls({ onPrevImage, onNextImage, showVideo = false }: GalleryControlsProps) {
  return (
    <>
      <button
        onClick={onPrevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      
      <button
        onClick={onNextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </>
  );
}
