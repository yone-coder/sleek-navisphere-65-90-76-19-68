
import React from 'react';
import { PlayCircle, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type GalleryThumbnailsProps = {
  images: string[];
  currentIndex: number;
  showVideo: boolean;
  hasVideo: boolean;
  hasAR: boolean;
  onThumbnailClick: (index: number) => void;
  onVideoClick: () => void;
  onARClick: () => void;
};

export function GalleryThumbnails({
  images,
  currentIndex,
  showVideo,
  hasVideo,
  hasAR,
  onThumbnailClick,
  onVideoClick,
  onARClick
}: GalleryThumbnailsProps) {
  return (
    <div className="flex overflow-x-auto scrollbar-none gap-2 mt-2 px-2 pb-2">
      {images.map((src, index) => (
        <button
          key={index}
          onClick={() => onThumbnailClick(index)}
          className={cn(
            "flex-shrink-0 w-12 h-12 border rounded overflow-hidden",
            currentIndex === index && !showVideo ? "border-red-500" : "border-gray-200"
          )}
        >
          <img
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
      
      {/* Video thumbnail */}
      {hasVideo && (
        <button
          onClick={onVideoClick}
          className={cn(
            "flex-shrink-0 w-12 h-12 border rounded overflow-hidden relative",
            showVideo ? "border-red-500" : "border-gray-200"
          )}
        >
          <img
            src={images[0]}
            alt="Video thumbnail"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-5 w-5 text-white" />
          </div>
        </button>
      )}
      
      {/* AR thumbnail */}
      {hasAR && (
        <button
          onClick={onARClick}
          className="flex-shrink-0 w-12 h-12 border border-gray-200 rounded overflow-hidden relative bg-gray-100"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Smartphone className="h-5 w-5 text-gray-500" />
            <span className="text-[8px] text-gray-500 mt-0.5">AR View</span>
          </div>
        </button>
      )}
    </div>
  );
}
