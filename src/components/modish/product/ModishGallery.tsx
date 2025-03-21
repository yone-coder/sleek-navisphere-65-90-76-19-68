import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, PlayCircle, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type ModishGalleryProps = {
  images: string[];
  name: string;
  hasVideo?: boolean;
  hasAR?: boolean;
};

export function ModishGallery({ images, name, hasVideo = true, hasAR = true }: ModishGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { toast } = useToast();

  // Create zoom effect
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const zoomFactor = 1.8;

  // Tracking touch/mouse position
  const handleZoomMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!imageRefs.current[currentIndex] || !isZoomed) return;
    
    const img = imageRefs.current[currentIndex];
    const rect = img.getBoundingClientRect();
    
    // Get cursor position
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Calculate relative position (0-1)
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    
    setZoomPosition({ x, y });
  };

  const handleZoomStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsZoomed(true);
    handleZoomMove(e);
  };

  const handleZoomEnd = () => {
    setIsZoomed(false);
  };

  // Handling navigation
  const goToPrevImage = () => {
    if (showVideo) {
      setShowVideo(false);
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    if (showVideo) {
      setShowVideo(false);
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageClick = () => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleARClick = () => {
    toast({
      title: "AR View",
      description: "AR view is not available in this demo. In a real app, this would launch an AR experience.",
      duration: 3000,
    });
  };

  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNextImage();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      goToPrevImage();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

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
        {showVideo && (
          <div className="absolute inset-0 bg-black z-20 flex items-center justify-center">
            <div className="relative w-full h-full">
              <video 
                className="w-full h-full object-contain" 
                controls
                autoPlay
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              />
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-30 bg-black bg-opacity-50 text-white rounded-full p-1"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}

        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <div 
              key={index}
              className={cn(
                "absolute top-0 left-0 w-full h-full transition-opacity duration-300",
                currentIndex === index && !showVideo ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              onMouseDown={handleZoomStart}
              onMouseMove={handleZoomMove}
              onMouseUp={handleZoomEnd}
              onMouseLeave={handleZoomEnd}
              onTouchStart={handleZoomStart}
              onTouchMove={handleZoomMove}
              onTouchEnd={handleZoomEnd}
              onClick={handleImageClick}
            >
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={src}
                alt={`${name} - Image ${index + 1}`}
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
          ))}
        </div>

        {/* Video preview button */}
        {hasVideo && !showVideo && (
          <button
            onClick={handleVideoClick}
            className="absolute bottom-4 right-4 z-20 bg-black bg-opacity-70 text-white rounded-full p-1.5 shadow-lg"
            aria-label="Play video"
          >
            <PlayCircle className="h-5 w-5" />
          </button>
        )}

        {/* AR view button */}
        {hasAR && !showVideo && (
          <button
            onClick={handleARClick}
            className="absolute bottom-4 left-4 z-20 bg-black bg-opacity-70 text-white rounded-full p-1.5 shadow-lg"
            aria-label="View in AR"
          >
            <Smartphone className="h-5 w-5" />
          </button>
        )}

        {/* Navigation buttons */}
        <button
          onClick={goToPrevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        
        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Zoom indicator */}
        {!isZoomed && !showVideo && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full px-2 py-1 text-xs flex items-center">
            <ZoomIn className="h-3 w-3 mr-1" />
            <span>Tap to zoom</span>
          </div>
        )}

        {/* Indicator dots */}
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
      </div>

      {/* Thumbnails row */}
      <div className="flex overflow-x-auto scrollbar-none gap-2 mt-2 px-2 pb-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => { setCurrentIndex(index); setShowVideo(false); }}
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
            onClick={handleVideoClick}
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
            onClick={handleARClick}
            className="flex-shrink-0 w-12 h-12 border border-gray-200 rounded overflow-hidden relative bg-gray-100"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <span className="text-[8px] text-gray-500 mt-0.5">AR View</span>
            </div>
          </button>
        )}
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 z-30 flex flex-col gap-1.5">
        <Badge className="bg-red-500 text-white border-0">Hot Sale</Badge>
        <Badge className="bg-blue-500 text-white border-0">Free Shipping</Badge>
      </div>

      {/* Fullscreen view */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 left-4 z-60 bg-black bg-opacity-50 text-white rounded-full p-1"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
          
          <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  currentIndex === index
                    ? "bg-white w-4"
                    : "bg-gray-500"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
