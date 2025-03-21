
import React from 'react';
import { PlayCircle, Smartphone, ZoomIn } from 'lucide-react';

type GalleryFeatureButtonsProps = {
  hasVideo: boolean;
  hasAR: boolean;
  showVideo: boolean;
  isZoomed: boolean;
  onVideoClick: () => void;
  onARClick: () => void;
};

export function GalleryFeatureButtons({ 
  hasVideo, 
  hasAR, 
  showVideo, 
  isZoomed,
  onVideoClick, 
  onARClick 
}: GalleryFeatureButtonsProps) {
  return (
    <>
      {/* Video preview button */}
      {hasVideo && !showVideo && (
        <button
          onClick={onVideoClick}
          className="absolute bottom-4 right-4 z-20 bg-black bg-opacity-70 text-white rounded-full p-1.5 shadow-lg"
          aria-label="Play video"
        >
          <PlayCircle className="h-5 w-5" />
        </button>
      )}

      {/* AR view button */}
      {hasAR && !showVideo && (
        <button
          onClick={onARClick}
          className="absolute bottom-4 left-4 z-20 bg-black bg-opacity-70 text-white rounded-full p-1.5 shadow-lg"
          aria-label="View in AR"
        >
          <Smartphone className="h-5 w-5" />
        </button>
      )}

      {/* Zoom indicator */}
      {!isZoomed && !showVideo && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs flex items-center">
          <ZoomIn className="h-3 w-3 mr-1" />
          <span>Tap to zoom</span>
        </div>
      )}
    </>
  );
}
