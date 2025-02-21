
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Heart, GitCompare, Share2, Maximize2, ChevronLeft, ChevronRight, Award, ImageIcon, ZoomIn, ZoomOut, ShieldCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { GalleryThumbnails } from "./GalleryThumbnails";
import { FullscreenView } from "./FullscreenView";
import { cn } from "@/lib/utils";

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

    // Auto-hide the hint after 3 seconds
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-[#0FA0CE] transition-all duration-300 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      {showHint && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fade-in">
          <div className="bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Use arrow keys to navigate
          </div>
        </div>
      )}

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
            <CarouselItem key={index} className="relative group">
              <div 
                className={cn(
                  "relative w-full h-full overflow-hidden transition-all duration-300",
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
                  !isZoomed && "group-hover:scale-[1.02]"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleZoom}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300",
                    isZoomed ? 'scale-150' : 'scale-100'
                  )}
                  style={isZoomed ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  } : undefined}
                />
                
                {!isZoomed && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>

              <div className="absolute top-4 left-4 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                  <Award className="w-3.5 h-3.5" />
                  Premium Quality
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                    <ImageIcon className="w-3.5 h-3.5" />
                    {index + 1}/{images.length}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Product
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-50">
                <div 
                  className={cn(
                    "px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg",
                    "font-medium text-xs tracking-wide animate-in fade-in-50",
                    "border transition-all duration-300",
                    stockStatus === 'In Stock' && "bg-green-500/10 text-green-500 border-green-500/20",
                    stockStatus === 'Low Stock' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 animate-pulse",
                    stockStatus === 'Out of Stock' && "bg-red-500/10 text-red-500 border-red-500/20"
                  )}
                >
                  {stockStatus}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-50">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-50">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollPrev()}
            className={cn(
              "h-12 w-12 rounded-full pointer-events-auto",
              "bg-black/20 text-white backdrop-blur-sm",
              "hover:bg-black/30 hover:scale-110",
              "transition-all duration-300 shadow-lg",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollNext()}
            className={cn(
              "h-12 w-12 rounded-full pointer-events-auto",
              "bg-black/20 text-white backdrop-blur-sm",
              "hover:bg-black/30 hover:scale-110",
              "transition-all duration-300 shadow-lg",
              "opacity-0 group-hover:opacity-100"
            )}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "h-10 w-10 rounded-lg backdrop-blur-md border-0 shadow-lg",
              "transition-all duration-300 hover:scale-110",
              isWishlisted 
                ? "bg-pink-500/20 text-pink-500 hover:bg-pink-500/30" 
                : "bg-black/20 text-white hover:bg-black/30"
            )}
            onClick={onWishlistToggle}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "h-10 w-10 rounded-lg backdrop-blur-md border-0",
              "bg-black/20 text-white hover:bg-black/30",
              "transition-all duration-300 hover:scale-110",
              "shadow-lg"
            )}
          >
            <GitCompare className="w-4 h-4" />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "h-10 w-10 rounded-lg backdrop-blur-md border-0",
              "bg-black/20 text-white hover:bg-black/30",
              "transition-all duration-300 hover:scale-110",
              "shadow-lg"
            )}
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "h-10 w-10 rounded-lg backdrop-blur-md border-0",
              "bg-black/20 text-white hover:bg-black/30",
              "transition-all duration-300 hover:scale-110",
              "shadow-lg"
            )}
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
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
