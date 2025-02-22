
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Summer Games Festival",
    description: "Join the biggest gaming event of the summer",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    gradient: "from-[#9b87f5]/80 to-[#7E69AB]/80",
    cta: "Join Now",
  },
  {
    id: 2,
    title: "Championship Series",
    description: "Compete with the best players worldwide",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#D6BCFA]/80 to-[#E5DEFF]/80",
    cta: "Register",
  },
  {
    id: 3,
    title: "Premium Membership",
    description: "Unlock exclusive features and rewards",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#7E69AB]/80 to-[#9b87f5]/80",
    cta: "Learn More",
  },
];

export const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container py-2">
      <div className="w-full overflow-hidden rounded-2xl shadow-lg relative">
        <Carousel 
          opts={{ loop: true, align: "start" }} 
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id}>
                <div className="relative w-full aspect-[2/1] overflow-hidden group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[12000ms] group-hover:scale-100" 
                    style={{ backgroundImage: `url(${banner.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                    <div className="max-w-2xl space-y-4">
                      <h2 className="text-3xl md:text-4xl font-bold text-white opacity-90 tracking-tight animate-fade-in">
                        {banner.title}
                      </h2>
                      <p className="text-base md:text-lg text-white/80 animate-fade-in [animation-delay:200ms]">
                        {banner.description}
                      </p>
                      <Button 
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 animate-fade-in [animation-delay:400ms]"
                      >
                        {banner.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

