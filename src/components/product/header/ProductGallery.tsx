
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Heart, GitCompare, Share2, Maximize2, ChevronLeft, ChevronRight, Award, ImageIcon } from "lucide-react";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { GalleryThumbnails } from "./GalleryThumbnails";
import { FullscreenView } from "./FullscreenView";

type ProductGalleryProps = {
  images: string[];
  name: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  scrolled: boolean;
  scrollDirection: 'up' | 'down';
};

export function ProductGallery({
  images,
  name,
  stockStatus,
  isWishlisted,
  onWishlistToggle,
  scrolled,
  scrollDirection
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative bg-gray-50">
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
            <CarouselItem key={index} className="relative">
              <div 
                className={`
                  relative w-full h-full overflow-hidden
                  ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}
                `}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleZoom}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  className={`
                    w-full h-full object-cover transition-transform duration-200
                    ${isZoomed ? 'scale-150' : 'scale-100 hover:scale-105'}
                  `}
                  style={isZoomed ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                  } : undefined}
                />
              </div>

              <div className="absolute top-4 left-4 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs">
                  <Award className="w-3.5 h-3.5" />
                  Premium Quality
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs">
                    <ImageIcon className="w-3.5 h-3.5" />
                    {index + 1}/{images.length}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-10">
                <div 
                  className={`
                    px-3 py-1.5 rounded-full backdrop-blur-md
                    font-medium text-xs tracking-wide
                    transition-all duration-300
                    ${stockStatus === 'In Stock' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                      : stockStatus === 'Low Stock'
                      ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'
                      : 'bg-red-500/10 text-red-500 border border-red-500/20'
                    }
                  `}
                >
                  {stockStatus}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => api?.scrollNext()}
            className="h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`h-9 w-9 rounded-lg backdrop-blur-md border-0 ${
              isWishlisted 
                ? 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30' 
                : 'bg-black/20 text-white hover:bg-black/30'
            } transition-all duration-300`}
            onClick={onWishlistToggle}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className="h-9 w-9 rounded-lg backdrop-blur-md bg-black/20 border-0 text-white hover:bg-black/30 transition-all duration-300"
          >
            <GitCompare className="w-3.5 h-3.5" />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className="h-9 w-9 rounded-lg backdrop-blur-md bg-black/20 border-0 text-white hover:bg-black/30 transition-all duration-300"
            onClick={handleShare}
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className="h-9 w-9 rounded-lg backdrop-blur-md bg-black/20 border-0 text-white hover:bg-black/30 transition-all duration-300"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-3.5 h-3.5" />
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
        scrolled={scrolled}
        scrollDirection={scrollDirection}
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
