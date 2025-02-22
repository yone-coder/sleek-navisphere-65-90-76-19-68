
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Globe, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppsHeaderProps {
  onOpenSearch: () => void;
}

const banners = [
  {
    id: 1,
    title: "Summer Games Festival",
    description: "Join the biggest gaming event of the summer",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    gradient: "from-purple-500/80 to-indigo-500/80",
  },
  {
    id: 2,
    title: "New Tournament",
    description: "Register now for the Championship Series",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-rose-500/80 to-orange-500/80",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Get 50% off on premium subscriptions",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-emerald-500/80 to-teal-500/80",
  },
];

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  const [notifications, setNotifications] = useState(3);
  const { language, setLanguage, t } = useLanguage();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const languageDetails = {
    en: { name: "English", flag: "🇬🇧" },
    fr: { name: "Français", flag: "🇫🇷" },
    es: { name: "Español", flag: "🇪🇸" },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Banner Carousel */}
      <div className="w-full h-[280px] overflow-hidden">
        <Carousel opts={{ loop: true, align: "start" }} className="w-full h-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id} className="basis-full">
                <div className="relative w-full h-[280px] group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${banner.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-90">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl opacity-80">
                      {banner.description}
                    </p>
                    <Button 
                      className="mt-6 w-fit bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white" 
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header Content */}
      <div className="border-b border-border/40">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Left: Profile Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full hover:bg-muted/60 transition-colors duration-200 p-0.5"
                >
                  <Avatar className="h-full w-full ring-2 ring-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-3 py-2 gap-2 cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Middle: Search bar */}
          <div className="flex flex-1 items-center justify-center max-w-2xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors duration-200" />
              <Input
                placeholder="Search apps, games, tournaments..."
                className="pl-10 bg-muted/40 hover:bg-muted/60 transition-colors duration-200 cursor-pointer border-none h-11 text-sm"
                onClick={onOpenSearch}
                readOnly
              />
            </div>
          </div>

          {/* Right: Language & Notifications */}
          <div className="flex items-center gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full w-10 h-10 hover:bg-muted/60 transition-colors duration-200"
                >
                  <Globe className="h-5 w-5 text-muted-foreground/70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {Object.entries(languageDetails).map(([code, details]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className="flex items-center gap-2.5 px-3 py-2"
                  >
                    <span className="text-lg">{details.flag}</span>
                    <span className="font-medium text-sm">{details.name}</span>
                    {language === code && <Check className="ml-auto h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full w-10 h-10 hover:bg-muted/60 transition-colors duration-200"
            >
              <Bell className="h-5 w-5 text-muted-foreground/70" />
              {notifications > 0 && (
                <Badge 
                  className="absolute -right-0.5 -top-0.5 h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0.5 text-[11px] font-medium text-white border-2 border-background"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
