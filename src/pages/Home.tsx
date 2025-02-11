import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Trophy, Users, Radio, Gamepad, Video, List, MoreHorizontal, Calendar, Award, CheckCircle, XCircle, Clock } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

const tournaments = [
  {
    id: 1,
    title: "Winter Championship 2024",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=200&q=80",
    status: "ongoing",
    date: "Apr 15 - May 1",
    participants: 128,
    prizePool: "$10,000",
  },
  {
    id: 2,
    title: "Spring Tournament",
    banner: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=400&h=200&q=80",
    status: "upcoming",
    date: "May 5 - May 20",
    participants: 256,
    prizePool: "$15,000",
  },
  {
    id: 3,
    title: "Summer League",
    banner: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&h=200&q=80",
    status: "closed",
    date: "Mar 1 - Mar 15",
    participants: 64,
    prizePool: "$5,000",
  },
  {
    id: 4,
    title: "Regional Masters",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=200&q=80",
    status: "upcoming",
    date: "May 25 - Jun 10",
    participants: 32,
    prizePool: "$8,000",
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-[#F2FCE2] text-green-700";
      case "upcoming":
        return "bg-[#FEF7CD] text-yellow-700";
      case "closed":
        return "bg-[#FEC6A1] text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
        return CheckCircle;
      case "upcoming":
        return Clock;
      case "closed":
        return XCircle;
      default:
        return CheckCircle;
    }
  };
  
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

      <section className="py-6 px-6">
        <h2 className="text-2xl font-bold mb-6 px-2">Featured Tournaments</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {tournaments.map((tournament) => {
              const StatusIcon = getStatusIcon(tournament.status);
              return (
                <div
                  key={tournament.id}
                  className="group flex-none w-[300px] animate-fade-in"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-2px]">
                    <div className="relative h-[150px]">
                      <img
                        src={tournament.banner}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(tournament.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{tournament.status}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-3 text-left">{tournament.title}</h3>
                      <div className="flex flex-col gap-2 text-sm text-left">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{tournament.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{tournament.participants} Participants</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{tournament.prizePool} Prize Pool</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold">{t('nav.home')}</h1>
      </div>
    </div>
  );
}
