
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, Tag } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  timeLeft: string;
  discount: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Gaming Headset Pro",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
    price: 89.99,
    originalPrice: 199.99,
    timeLeft: "2h 45m",
    discount: 55,
  },
  {
    id: 2,
    name: "4K Ultra HD Gaming Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
    price: 299.99,
    originalPrice: 499.99,
    timeLeft: "5h 20m",
    discount: 40,
  },
  {
    id: 3,
    name: "RGB Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop",
    price: 79.99,
    originalPrice: 159.99,
    timeLeft: "1h 15m",
    discount: 50,
  },
  {
    id: 4,
    name: "Pro Gaming Mouse",
    image: "https://images.unsplash.com/photo-1586349906319-47f3ab5f7b9f?w=300&h=300&fit=crop",
    price: 49.99,
    originalPrice: 89.99,
    timeLeft: "3h 30m",
    discount: 45,
  },
  {
    id: 5,
    name: "Gaming Chair Deluxe",
    image: "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=300&h=300&fit=crop",
    price: 199.99,
    originalPrice: 399.99,
    timeLeft: "4h 10m",
    discount: 50,
  },
  {
    id: 6,
    name: "Streaming Microphone Kit",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&h=300&fit=crop",
    price: 129.99,
    originalPrice: 249.99,
    timeLeft: "6h 25m",
    discount: 48,
  },
  {
    id: 7,
    name: "Gaming Desk Setup",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=300&h=300&fit=crop",
    price: 159.99,
    originalPrice: 299.99,
    timeLeft: "2h 15m",
    discount: 47,
  },
  {
    id: 8,
    name: "RGB LED Strip Kit",
    image: "https://images.unsplash.com/photo-1633006606017-f1b6f0f3b34a?w=300&h=300&fit=crop",
    price: 29.99,
    originalPrice: 59.99,
    timeLeft: "1h 55m",
    discount: 50,
  },
  {
    id: 9,
    name: "Gaming Console Bundle",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
    price: 449.99,
    originalPrice: 699.99,
    timeLeft: "5h 45m",
    discount: 36,
  },
  {
    id: 10,
    name: "Surround Sound System",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop",
    price: 299.99,
    originalPrice: 599.99,
    timeLeft: "3h 50m",
    discount: 50,
  },
];

export const LightningDeals = () => {
  return (
    <section className="w-full py-2 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]">
      {/* Header with consistent padding */}
      <div className="px-4 md:px-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">Lightning Deals</h2>
            <Timer className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <button className="text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium">
            View All
          </button>
        </div>
      </div>

      {/* Scroll container with edge padding */}
      <div className="w-full overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <div className="flex gap-3 px-4 md:px-6 w-max min-w-full">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex-none w-[160px] sm:w-[200px]"
              >
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                      <Badge 
                        className="absolute top-1.5 right-1.5 bg-red-500 text-white border-0 text-[10px] px-1.5 py-0.5"
                        variant="secondary"
                      >
                        {product.discount}% OFF
                      </Badge>
                    </div>
                    <div className="p-1.5">
                      <h3 className="font-medium text-[10px] text-gray-900 mb-1 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-[8px] text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[8px] font-medium text-blue-600">
                          <Timer className="w-2 h-2" />
                          {product.timeLeft}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation arrows floating over content */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-1">
            <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 pointer-events-auto">
              <Timer className="w-4 h-4" />
            </button>
            <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-50 pointer-events-auto">
              <Timer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
