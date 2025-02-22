
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
    gradient: "from-[#9b87f5]/80 to-[#7E69AB]/80",
  },
  {
    id: 2,
    title: "New Tournament",
    description: "Register now for the Championship Series",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#D6BCFA]/80 to-[#E5DEFF]/80",
  },
  {
    id: 3,
    title: "Limited Time Offer",
    description: "Get 50% off on premium subscriptions",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-[#7E69AB]/80 to-[#9b87f5]/80",
  },
];

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  const [notifications, setNotifications] = useState(3);
  const { language, setLanguage, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
  };

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
      <div className="container py-6">
        <div className="w-full overflow-hidden rounded-2xl shadow-lg">
          <Carousel 
            opts={{ loop: true, align: "start" }} 
            className="w-full"
          >
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={banner.id}>
                  <div className="relative w-full h-[240px] overflow-hidden group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[12000ms] group-hover:scale-100" 
                      style={{ backgroundImage: `url(${banner.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} transition-opacity duration-300`} />
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                      <div className="max-w-2xl space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white opacity-90 tracking-tight">
                          {banner.title}
                        </h2>
                        <p className="text-base md:text-lg text-white/80">
                          {banner.description}
                        </p>
                        <Button 
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
                        >
                          Learn More
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
