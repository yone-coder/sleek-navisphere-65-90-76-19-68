
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Heart, GitCompare, ArrowLeft, Search, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <img
                  src={image}
                  alt={`${name} - View ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

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
        </div>
      </div>

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
    </>
  );
}
