
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SellerCard } from "./SellerCard";

const sellers = [
  {
    id: 1,
    name: "Alex Rivera",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
    description: "Professional photographer specializing in portrait and landscape photography. Creating timeless memories through my lens.",
    followers: 12500,
    isTopSeller: true,
    isVerified: true,
    rating: 4.8,
    recentSales: 156,
    responseTime: "~1h",
    completion: 99,
  },
  {
    id: 2,
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    description: "Digital artist and illustrator with a passion for creating unique character designs and concept art.",
    followers: 18900,
    isTopSeller: true,
    isVerified: true,
    rating: 4.9,
    recentSales: 230,
    responseTime: "~30m",
    completion: 100,
  },
  {
    id: 3,
    name: "Marcus Kim",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    description: "Experienced graphic designer specializing in brand identity and logo design. Let's bring your vision to life.",
    followers: 8700,
    isTopSeller: false,
    isVerified: true,
    rating: 4.7,
    recentSales: 89,
    responseTime: "~3h",
    completion: 95,
  },
  {
    id: 4,
    name: "Emma Watson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    description: "UI/UX designer with a focus on creating intuitive and beautiful digital experiences. 5+ years of experience.",
    followers: 21300,
    isTopSeller: true,
    isVerified: true,
    rating: 4.9,
    recentSales: 312,
    responseTime: "~1h",
    completion: 98,
  },
  {
    id: 5,
    name: "David Park",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&q=80",
    description: "Motion designer and animator creating engaging visual content for brands and businesses.",
    followers: 15400,
    isTopSeller: false,
    isVerified: true,
    rating: 4.6,
    recentSales: 145,
    responseTime: "~2h",
    completion: 96,
  },
];

export const SellersList = () => {
  return (
    <section className="w-full overflow-hidden bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Featured Sellers</h2>
          <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full relative px-4"
      >
        <CarouselContent className="-ml-4">
          {sellers.map((seller) => (
            <CarouselItem key={seller.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <SellerCard seller={seller} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
        <CarouselNext className="hidden md:flex -right-4 bg-gray-800 border-gray-700 text-white hover:bg-gray-700" />
      </Carousel>
    </section>
  );
};
