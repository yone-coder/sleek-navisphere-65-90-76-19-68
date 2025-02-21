
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { GalleryThumbnails } from "./GalleryThumbnails";
import { FullscreenView } from "./FullscreenView";
import { GalleryControls } from "./gallery/GalleryControls";
import { GalleryActions } from "./gallery/GalleryActions";
import { GalleryImage } from "./gallery/GalleryImage";
import { GalleryProgressBar } from "./gallery/GalleryProgressBar";
import { GalleryKeyboardHint } from "./gallery/GalleryKeyboardHint";

type ProductGalleryProps = {
  images: string[];
  name: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isWishlisted: boolean;
  onWishlistToggle: () => void;
};

export function ProductGallery({
  images,
  name,
  stockStatus,
  isWishlisted,
  onWishlistToggle
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setSelectedImage(api.selectedScrollSnap());
      setCurrentProgress((api.selectedScrollSnap() / (images.length - 1)) * 100);
    });

    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [api, images.length]);

  const handleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: `Check out ${name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      api?.scrollNext();
    } else if (e.key === 'ArrowLeft') {
      api?.scrollPrev();
    } else if (e.key === 'f') {
      setIsFullscreen(true);
    } else if (e.key === 'Escape') {
      if (isZoomed) setIsZoomed(false);
      else if (isFullscreen) setIsFullscreen(false);
    }
  };

  return (
    <div 
      className="relative bg-gradient-to-b from-gray-50 to-white"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <GalleryProgressBar progress={currentProgress} />
      <GalleryKeyboardHint show={showHint} />

      <Carousel 
        className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]"
        setApi={setApi}
        opts={{
          startIndex: selectedImage,
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <GalleryImage
                image={image}
                name={name}
                index={index}
                total={images.length}
                stockStatus={stockStatus}
                isZoomed={isZoomed}
                mousePosition={mousePosition}
                onZoom={setIsZoomed}
                onMouseMove={handleZoom}
                onMouseLeave={() => setIsZoomed(false)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <GalleryControls api={api ?? null} />
        <GalleryActions
          isWishlisted={isWishlisted}
          onWishlistToggle={onWishlistToggle}
          onShare={handleShare}
          onFullscreen={() => setIsFullscreen(true)}
        />
      </Carousel>

      <GalleryThumbnails
        images={images}
        selectedImage={selectedImage}
        onSelect={(index) => {
          setSelectedImage(index);
          api?.scrollTo(index);
        }}
      />

      {isFullscreen && (
        <FullscreenView
          images={images}
          name={name}
          selectedImage={selectedImage}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
}
