
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    gradient: "from-[#9b87f5]/80 to-[#7E69AB]/80",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#D6BCFA]/80 to-[#E5DEFF]/80",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#7E69AB]/80 to-[#9b87f5]/80",
  },
];

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div className="relative px-4 py-2">
      <Carousel 
        opts={{ 
          loop: true,
          align: "start",
          skipSnaps: false,
          startIndex: currentSlide,
        }}
        className="w-full"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl shadow-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[12000ms] hover:scale-100" 
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30" />
          <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30" />
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 transition-all duration-300 rounded-full cursor-pointer hover:bg-white",
                index === currentSlide 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/40"
              )}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};
