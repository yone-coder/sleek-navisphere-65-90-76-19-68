
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Trophy, Users, Radio, Gamepad, Video, List, MoreHorizontal } from "lucide-react";

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

const quickActions = [
  { icon: Trophy, label: "Tournaments", color: "#9b87f5" },
  { icon: Users, label: "Teams", color: "#9b87f5" },
  { icon: Gamepad, label: "Games", color: "#9b87f5" },
  { icon: Video, label: "Streams", color: "#9b87f5" },
  { icon: Radio, label: "Lives", color: "#9b87f5" },
  { icon: Users, label: "Friends", color: "#9b87f5" },
  { icon: List, label: "Rankings", color: "#9b87f5" },
  { icon: MoreHorizontal, label: "More", color: "#7E69AB" },
];

export default function Home() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  return (
    <div className="min-h-screen animate-fade-in pt-[60px]">
      <section className="relative w-full h-[calc(100vw*500/1500)] max-h-[500px] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
          setApi={setApi}
          onSelect={() => {
            setActiveIndex(api?.selectedScrollSnap() || 0);
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div 
              className="flex gap-3 relative transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(${activeIndex === slides.length - 1 ? 0 : activeIndex * -12}px)`
              }}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out transform
                    ${activeIndex === index 
                      ? "bg-[#9b87f5] scale-125 shadow-lg animate-scale-in" 
                      : "bg-white/60 hover:bg-white/80 hover:scale-110"
                    }`}
                  onClick={() => {
                    api?.scrollTo(index);
                  }}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </section>

      <section className="py-6 px-6">
        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const isMoreButton = index === quickActions.length - 1;
            return (
              <button
                key={index}
                className={`group flex flex-col items-center gap-2 ${
                  index >= 4 ? 'mt-4' : ''
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-active:scale-95 ${
                    isMoreButton ? 'bg-[#7E69AB]' : ''
                  }`}
                >
                  <Icon 
                    className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                      isMoreButton ? 'text-white' : 'text-[#9b87f5]'
                    }`}
                    strokeWidth={1.5} 
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold">{t('nav.home')}</h1>
      </div>
    </div>
  );
}
