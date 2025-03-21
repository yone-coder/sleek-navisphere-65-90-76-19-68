
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

type UseGalleryProps = {
  images: string[];
  hasVideo?: boolean;
};

export function useGallery({ images, hasVideo = false }: UseGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
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

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setShowVideo(false);
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

  return {
    currentIndex,
    isFullscreen,
    showVideo,
    isZoomed,
    zoomPosition,
    zoomFactor,
    imageRefs,
    setCurrentIndex,
    setIsFullscreen,
    setShowVideo,
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
  };
}
