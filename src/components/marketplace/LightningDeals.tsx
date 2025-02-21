
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
    <section className="w-full py-8 bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Lightning Deals</h2>
            <Timer className="w-5 h-5 text-blue-600" />
          </div>
          <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
            View All
          </button>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
              containScroll: "keepSnaps"
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-3">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-3 basis-[85%] sm:basis-[45%] md:basis-[35%] lg:basis-[28%]">
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full aspect-square object-cover"
                        />
                        <Badge 
                          className="absolute top-2 right-2 bg-red-500 text-white border-0"
                          variant="secondary"
                        >
                          {product.discount}% OFF
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
                            <Timer className="w-3.5 h-3.5" />
                            {product.timeLeft}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="max-w-7xl mx-auto relative">
              <CarouselPrevious className="hidden md:flex absolute -left-12 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm" />
              <CarouselNext className="hidden md:flex absolute -right-12 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
