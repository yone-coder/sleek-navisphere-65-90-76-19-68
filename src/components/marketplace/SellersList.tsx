
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
    id: "1",
    name: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
    rating: 4.8,
    verified: true,
    premium: true,
    productsCount: 156,
    reviewsCount: 432,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    rating: 4.9,
    verified: true,
    premium: true,
    productsCount: 230,
    reviewsCount: 567,
  },
  {
    id: "3",
    name: "Marcus Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    rating: 4.7,
    verified: true,
    premium: false,
    productsCount: 89,
    reviewsCount: 245,
  },
  {
    id: "4",
    name: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    rating: 4.9,
    verified: true,
    premium: true,
    productsCount: 312,
    reviewsCount: 789,
  },
  {
    id: "5",
    name: "David Park",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&q=80",
    rating: 4.6,
    verified: true,
    premium: false,
    productsCount: 145,
    reviewsCount: 324,
  },
];

export const SellersList = () => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-semibold text-gray-900">Featured Sellers</h2>
        <button className="text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {sellers.map((seller) => (
            <CarouselItem key={seller.id} className="pl-4 basis-auto">
              <SellerCard seller={seller} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};
