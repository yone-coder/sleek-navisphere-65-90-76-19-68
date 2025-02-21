
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart, GitCompare, ArrowLeft, Search, Send, Share2, ZoomIn, Award, ImageIcon, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

type ProductHeaderProps = {
  images: string[];
  name: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isWishlisted: boolean;
  onWishlistToggle: () => void;
};

export function ProductHeader({
  images,
  name,
  stockStatus,
  isWishlisted,
  onWishlistToggle
}: ProductHeaderProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setSelectedImage(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    <>
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

        <div 
          className={`
            max-w-3xl mx-auto px-4 py-3
            ${scrolled && scrollDirection === 'down' ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-300
          `}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`
                    relative flex-none w-20 aspect-square rounded-lg overflow-hidden
                    ${selectedImage === index 
                      ? 'ring-2 ring-[#0FA0CE] ring-offset-2' 
                      : 'opacity-70 hover:opacity-100'}
                    transition-all duration-300
                  `}
                  onClick={() => {
                    setSelectedImage(index);
                    api?.scrollTo(index);
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-[200px] mx-4">
              <h2 className="text-sm font-medium truncate text-gray-700 text-center">
                {name}
              </h2>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-full flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <Carousel
                opts={{
                  startIndex: selectedImage,
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${name} - View ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
