
import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SellersList } from "@/components/marketplace/SellersList";

const locations = [
  { id: 1, name: "New York, USA", code: "NYC" },
  { id: 2, name: "London, UK", code: "LON" },
  { id: 3, name: "Paris, France", code: "PAR" },
  { id: 4, name: "Tokyo, Japan", code: "TYO" },
  { id: 5, name: "Sydney, Australia", code: "SYD" },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'home', label: 'Home' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'sports', label: 'Sports' },
  { id: 'beauty', label: 'Beauty' },
];

const categorySlides = {
  all: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Featured Collection",
      description: "Discover our latest arrivals",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Summer Sale",
      description: "Up to 50% off on selected items",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "New Season",
      description: "Spring collection now available",
    },
  ],
  electronics: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Tech Essentials",
      description: "Latest gadgets and accessories",
    },
  ],
  home: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Home Decor",
      description: "Transform your space",
    },
  ],
  fashion: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Summer Collection",
      description: "Fresh styles for the season",
    },
  ],
  sports: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Active Lifestyle",
      description: "Gear up for success",
    },
  ],
  beauty: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1500&h=500&q=80",
      title: "Beauty Essentials",
      description: "Self-care favorites",
    },
  ],
};

const Marketplace = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  useEffect(() => {
    setCurrent(0);
    api?.scrollTo(0);
  }, [selectedCategory, api]);

  const currentSlides = categorySlides[selectedCategory as keyof typeof categorySlides];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-9 gap-1 border-gray-200"
                >
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium truncate max-w-[100px]">
                    {selectedLocation.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[280px]">
                {locations.map((location) => (
                  <DropdownMenuItem
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{location.name}</span>
                    {selectedLocation.id === location.id && (
                      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 h-9 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs 
              defaultValue="all" 
              className="w-full"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <TabsList className="h-10 w-full justify-start gap-1.5 bg-transparent p-0 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="h-7 px-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="mb-8">
          <Carousel
            key={selectedCategory}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {currentSlides.map((slide) => (
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
                {currentSlides.map((_, index) => (
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

        <SellersList />
      </main>
    </div>
  );
};

export default Marketplace;
