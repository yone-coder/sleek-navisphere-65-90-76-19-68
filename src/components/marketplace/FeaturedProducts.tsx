
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    name: "Professional Gaming Headset",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop",
    price: 199.99,
    rating: 4.8,
    reviews: 2456,
    category: "Audio"
  },
  {
    id: 2,
    name: "Ergonomic Gaming Chair",
    image: "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=800&h=600&fit=crop",
    price: 349.99,
    rating: 4.9,
    reviews: 1823,
    category: "Furniture"
  },
  {
    id: 3,
    name: "4K Gaming Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    price: 599.99,
    rating: 4.7,
    reviews: 3102,
    category: "Displays"
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop",
    price: 159.99,
    rating: 4.6,
    reviews: 2789,
    category: "Peripherals"
  },
  {
    id: 5,
    name: "Pro Gaming Mouse",
    image: "https://images.unsplash.com/photo-1586349906319-47f3ab5f7b9f?w=800&h=600&fit=crop",
    price: 89.99,
    rating: 4.8,
    reviews: 1956,
    category: "Peripherals"
  },
  {
    id: 6,
    name: "Streaming Microphone Kit",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&h=600&fit=crop",
    price: 249.99,
    rating: 4.7,
    reviews: 1432,
    category: "Audio"
  }
];

export const FeaturedProducts = () => {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 py-2">
      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto px-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">Featured Products</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium">
              View All
            </button>
          </div>
        </div>

        {/* Scrolling Container */}
        <div className="relative w-full overflow-x-auto pb-6 scroll-smooth">
          <div className="flex gap-4 px-4 w-max min-w-full">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex-none w-[160px] sm:w-[200px] transform transition-all duration-300 hover:translate-y-[-4px] group"
              >
                <Card className="overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge 
                        className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-sm text-gray-900 border-0 text-[10px] px-1.5 py-0.5"
                        variant="secondary"
                      >
                        {product.category}
                      </Badge>
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-xs text-gray-900 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1.5">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="ml-0.5 text-[10px] font-medium text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">
                          ({product.reviews.toLocaleString()})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <button className="text-[10px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-1">
            <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
