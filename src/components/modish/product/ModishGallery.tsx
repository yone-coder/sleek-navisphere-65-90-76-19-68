
import React, { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { useGallery } from './gallery/useGallery';
import { GalleryControls } from './gallery/GalleryControls';
import { GalleryIndicators } from './gallery/GalleryIndicators';
import { GalleryImage } from './gallery/GalleryImage';
import { GalleryVideo } from './gallery/GalleryVideo';
import { GalleryFeatureButtons } from './gallery/GalleryFeatureButtons';
import { GalleryFullscreen } from './gallery/GalleryFullscreen';
import { GalleryThumbnails } from './gallery/GalleryThumbnails';
import { GalleryBadges } from './gallery/GalleryBadges';

type ModishGalleryProps = {
  images: string[];
  name: string;
  hasVideo?: boolean;
  hasAR?: boolean;
};

export function ModishGallery({ images, name, hasVideo = true, hasAR = true }: ModishGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    currentIndex,
    isFullscreen,
    showVideo,
    isZoomed,
    zoomPosition,
    zoomFactor,
    imageRefs,
    handleZoomMove,
    handleZoomStart,
    handleZoomEnd,
    goToPrevImage,
    goToNextImage,
    handleImageClick,
    handleCloseFullscreen,
    handleVideoClick,
    handleARClick,
    handleThumbnailClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useGallery({ images, hasVideo });

  return (
    <div className="relative bg-white">
      {/* Main gallery container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[300px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Video overlay */}
        <GalleryVideo 
          isActive={showVideo} 
          onClose={() => goToPrevImage()} 
        />

        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <GalleryImage
              key={index}
              src={src}
              alt={`${name} - Image ${index + 1}`}
              isActive={currentIndex === index}
              isZoomed={isZoomed}
              zoomPosition={zoomPosition}
              zoomFactor={zoomFactor}
              onZoomStart={handleZoomStart}
              onZoomMove={handleZoomMove}
              onZoomEnd={handleZoomEnd}
              onClick={handleImageClick}
              showVideo={showVideo}
              imageRef={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>

        <GalleryFeatureButtons 
          hasVideo={hasVideo}
          hasAR={hasAR}
          showVideo={showVideo}
          isZoomed={isZoomed}
          onVideoClick={handleVideoClick}
          onARClick={handleARClick}
        />

        {/* Navigation buttons */}
        <GalleryControls 
          onPrevImage={goToPrevImage}
          onNextImage={goToNextImage}
          showVideo={showVideo}
        />

        {/* Indicator dots */}
        <GalleryIndicators 
          images={images} 
          currentIndex={currentIndex} 
          showVideo={showVideo} 
          hasVideo={hasVideo} 
        />
      </div>

      {/* Thumbnails row */}
      <GalleryThumbnails 
        images={images}
        currentIndex={currentIndex}
        showVideo={showVideo}
        hasVideo={hasVideo}
        hasAR={hasAR}
        onThumbnailClick={handleThumbnailClick}
        onVideoClick={handleVideoClick}
        onARClick={handleARClick}
      />

      {/* Badges */}
      <GalleryBadges />

      {/* Fullscreen view */}
      <GalleryFullscreen 
        isOpen={isFullscreen}
        images={images}
        currentIndex={currentIndex}
        productName={name}
        onClose={handleCloseFullscreen}
        onChangeImage={(index) => handleThumbnailClick(index)}
      />
    </div>
  );
}
