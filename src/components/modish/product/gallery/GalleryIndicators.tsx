
import React from 'react';
import { cn } from '@/lib/utils';

type GalleryIndicatorsProps = {
  images: string[];
  currentIndex: number;
  showVideo: boolean;
  hasVideo: boolean;
};

export function GalleryIndicators({ images, currentIndex, showVideo, hasVideo }: GalleryIndicatorsProps) {
  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
      {images.map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all",
            currentIndex === index && !showVideo
              ? "bg-red-500 w-4"
              : "bg-gray-300"
          )}
        />
      ))}
      {hasVideo && (
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all",
            showVideo ? "bg-red-500 w-4" : "bg-gray-300"
          )}
        />
      )}
    </div>
  );
}
