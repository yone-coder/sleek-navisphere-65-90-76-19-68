
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CategorySliderProps {
  slides: Slide[];
}

export const CategorySlider = ({ slides }: CategorySliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="mb-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full overflow-hidden group">
                <div className="relative aspect-[3/1] w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-lg text-white/90">{slide.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm">
            {slides.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`
                  relative w-2 h-2 rounded-full 
                  transition-all duration-300 ease-spring
                  ${current === index 
                    ? "bg-white w-6" 
                    : "bg-white/60 hover:bg-white/80"
                  }
                  ${current === index 
                    ? "animate-[scale-in_0.2s_ease-out]" 
                    : ""}
                  group
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent
                `}
              >
                {current === index && (
                  <span className="absolute inset-0 rounded-full bg-white animate-pulse opacity-50" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
};
