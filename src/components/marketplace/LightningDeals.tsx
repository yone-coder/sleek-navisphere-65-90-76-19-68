import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3] py-6">
      <div className="relative">
        {/* Refined Header */}
        <div className="mx-auto px-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Lightning Deals</h2>
              <Timer className="w-4 h-4 text-blue-600" />
            </div>
            <button className="text-blue-600 hover:text-blue-700 transition-all text-sm font-medium hover:scale-105">
              View All
            </button>
          </div>
        </div>

        {/* Enhanced Scrolling Container */}
        <div className="relative w-full overflow-x-auto pb-8 scroll-smooth">
          <div className="flex gap-5 px-6 w-max min-w-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative flex-none w-[200px] transform transition-all duration-300 hover:translate-y-[-4px]"
              >
                <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-40 object-cover transition-transform hover:scale-105"
                      />
                      <Badge 
                        className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm text-white border-0 text-xs px-2 py-0.5"
                        variant="secondary"
                      >
                        {product.discount}% OFF
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-900 mb-2 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
                          <Timer className="w-3 h-3" />
                          {product.timeLeft}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Refined Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
