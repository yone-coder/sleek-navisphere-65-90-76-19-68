
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type GalleryImageProps = {
  src: string;
  alt: string;
  isActive: boolean;
  isZoomed: boolean;
  zoomPosition: { x: number; y: number };
  zoomFactor: number;
  onZoomStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onZoomMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onZoomEnd: () => void;
  onClick: () => void;
  showVideo: boolean;
  imageRef: React.Ref<HTMLImageElement>;
};

export function GalleryImage({
  src,
  alt,
  isActive,
  isZoomed,
  zoomPosition,
  zoomFactor,
  onZoomStart,
  onZoomMove,
  onZoomEnd,
  onClick,
  showVideo,
  imageRef
}: GalleryImageProps) {
  return (
    <div 
      className={cn(
        "absolute top-0 left-0 w-full h-full transition-opacity duration-300",
        isActive && !showVideo ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      onMouseDown={onZoomStart}
      onMouseMove={onZoomMove}
      onMouseUp={onZoomEnd}
      onMouseLeave={onZoomEnd}
      onTouchStart={onZoomStart}
      onTouchMove={onZoomMove}
      onTouchEnd={onZoomEnd}
      onClick={onClick}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-transform",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        style={
          isZoomed
            ? {
                transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                transform: `scale(${zoomFactor})`,
              }
            : undefined
        }
      />
    </div>
  );
}
