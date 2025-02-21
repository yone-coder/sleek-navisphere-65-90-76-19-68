
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart, GitCompare, ArrowLeft, Search, Send, Share2, ZoomIn, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You would typically show a toast here
    }
  };

  return (
    <>
      <div className="relative">
        {/* Main Image Carousel */}
        <Carousel 
          className="w-full"
          setApi={setApi}
          opts={{
            startIndex: selectedImage,
            loop: true,
          }}
          onSelect={(api) => {
            setSelectedImage(api.selectedScrollSnap());
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <img
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  className="object-cover w-full h-full cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                />
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs">
                    <Award className="w-3.5 h-3.5" />
                    Premium Quality
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Carousel Navigation */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <CarouselPrevious className="pointer-events-auto bg-white/80 backdrop-blur-sm hover:bg-white" />
            <CarouselNext className="pointer-events-auto bg-white/80 backdrop-blur-sm hover:bg-white" />
          </div>

          {/* Stock Status Badge */}
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

          {/* Action Buttons */}
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
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Carousel>

        {/* Thumbnail Navigation */}
        <div className="absolute left-4 right-4 bottom-16">
          <ScrollArea>
            <div className="flex gap-2 pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`relative flex-none w-16 h-16 rounded-lg overflow-hidden ${
                    selectedImage === index 
                      ? 'ring-2 ring-[#0FA0CE] ring-offset-2' 
                      : 'opacity-70 hover:opacity-100'
                  } transition-all duration-300`}
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

      {/* Header Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full pointer-events-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 pointer-events-auto">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={images[selectedImage]}
            alt={`${name} - View ${selectedImage + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full p-2"
            onClick={() => setIsFullscreen(false)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
