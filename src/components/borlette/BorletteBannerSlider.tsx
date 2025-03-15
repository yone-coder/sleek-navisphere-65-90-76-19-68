
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
    title: "New York Evening Draw",
    time: "6:30 PM",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#000000]/70 to-[#333333]/70",
    accent: "#8B5CF6"
  },
  {
    id: 2,
    title: "Florida Midday Special",
    time: "1:30 PM",
    image: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#222222]/70 to-[#444444]/70",
    accent: "#D946EF"
  },
  {
    id: 3,
    title: "Georgia Jackpot",
    time: "10:30 PM",
    image: "https://images.unsplash.com/photo-1564329494258-6577bab5d9d0?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#111111]/70 to-[#333333]/70",
    accent: "#F97316"
  },
];

export const BorletteBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [autoplay]);

  return (
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
            <div className="relative w-full aspect-[2/1] overflow-hidden rounded-xl shadow-md">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${banner.image})` }}
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r",
                banner.gradient
              )} />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-medium">{banner.title}</h3>
                <p className="text-sm opacity-90">Today at {banner.time}</p>
                <div 
                  className="absolute top-0 right-0 m-4 px-2 py-1 text-xs font-medium rounded-full"
                  style={{ backgroundColor: banner.accent }}
                >
                  LIVE
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Controls */}
      <div className="hidden sm:block">
        <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30" />
        <CarouselNext className="right-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30" />
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {banners.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 rounded-full cursor-pointer transition-all duration-300",
              index === currentSlide 
                ? "w-6 bg-white" 
                : "w-1.5 bg-white/40"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </Carousel>
  );
};
