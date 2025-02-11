
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { UseEmblaCarouselType } from 'embla-carousel-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1500&h=500&q=80",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1500&h=500&q=80",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=1500&h=500&q=80",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <div className="min-h-screen animate-fade-in pt-[60px]">
      <section className="relative w-full h-[calc(100vw*500/1500)] max-h-[500px] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
          onSelect={(api: UseEmblaCarouselType[1]) => {
            if (api) {
              setActiveIndex(api.selectedScrollSnap());
            }
          }}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? "bg-white w-4 scale-100" 
                    : "bg-white/50 hover:bg-white/75 scale-90 hover:scale-100"
                }`}
                onClick={() => {
                  const carousel = document.querySelector('[role="region"]') as HTMLElement;
                  const api = carousel?.__embla__;
                  if (api) {
                    api.scrollTo(index);
                  }
                }}
              />
            ))}
          </div>
        </Carousel>
      </section>

      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold">{t('nav.home')}</h1>
      </div>
    </div>
  );
}
