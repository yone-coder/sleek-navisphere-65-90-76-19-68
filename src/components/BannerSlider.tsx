
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Clock, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const banners = [
  {
    id: 1,
    title: "Summer Games Festival",
    description: "Join the biggest gaming event of the summer! Compete with players worldwide and win amazing prizes.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    gradient: "from-[#9b87f5]/80 to-[#7E69AB]/80",
    cta: "Join Now",
    badges: ["Featured", "Live Now"],
    stats: {
      participants: 1250,
      prizePool: "$50,000",
      startDate: "2024-06-15",
    },
    featured: true,
  },
  {
    id: 2,
    title: "Championship Series",
    description: "The ultimate test of skill and strategy. Enter the arena and prove your worth in this prestigious tournament.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#D6BCFA]/80 to-[#E5DEFF]/80",
    cta: "Register",
    badges: ["Popular", "Registration Open"],
    stats: {
      participants: 850,
      prizePool: "$25,000",
      startDate: "2024-07-01",
    },
    featured: false,
  },
  {
    id: 3,
    title: "Premium Membership",
    description: "Get exclusive access to premium tournaments, special rewards, and unique in-game items with our premium membership.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#7E69AB]/80 to-[#9b87f5]/80",
    cta: "Learn More",
    badges: ["Special Offer", "Limited Time"],
    stats: {
      participants: 5000,
      prizePool: "Unlimited",
      startDate: "2024-05-30",
    },
    featured: false,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl shadow-lg group">
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[12000ms] group-hover:scale-100" 
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r",
                  banner.gradient
                )} />
                
                {/* Content Container */}
                <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16">
                  <div className="w-full max-w-2xl space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 animate-fade-in [animation-delay:100ms]">
                      {banner.featured && (
                        <Badge className="bg-yellow-500/80 text-white gap-1">
                          <Star className="h-3 w-3" /> Featured
                        </Badge>
                      )}
                      {banner.badges.map((badge, i) => (
                        <Badge 
                          key={i}
                          variant="secondary" 
                          className="bg-white/20 text-white backdrop-blur-sm"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white opacity-90 tracking-tight animate-fade-in">
                        {banner.title}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-white/80 animate-fade-in [animation-delay:200ms] line-clamp-2">
                        {banner.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-white/90 text-sm animate-fade-in [animation-delay:300ms]">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{banner.stats.participants.toLocaleString()} Participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span>{banner.stats.prizePool} Prize Pool</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Starts {formatDate(banner.stats.startDate)}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 animate-fade-in [animation-delay:400ms] group"
                    >
                      <span>{banner.cta}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
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
