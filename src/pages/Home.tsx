
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Build Something Amazing",
    description: "Create extraordinary experiences with our powerful platform",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=2000&q=80",
    cta: "Get Started",
  },
  {
    id: 2,
    title: "Innovative Solutions",
    description: "Discover cutting-edge features that drive success",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=2000&q=80",
    cta: "Learn More",
  },
  {
    id: 3,
    title: "Join the Future",
    description: "Be part of the next generation of digital innovation",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=2000&q=80",
    cta: "Join Now",
  },
];

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen animate-fade-in">
      <section className="relative w-full h-[80vh] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="relative w-full h-[80vh]">
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-screen-xl mx-auto">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl animate-fade-in [animation-delay:200ms]">
                    {slide.description}
                  </p>
                  <Button
                    size="lg"
                    className="w-fit animate-fade-in [animation-delay:400ms] group"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 sm:left-8" />
          <CarouselNext className="right-4 sm:right-8" />
        </Carousel>
      </section>

      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold">{t('nav.home')}</h1>
      </div>
    </div>
  );
}
