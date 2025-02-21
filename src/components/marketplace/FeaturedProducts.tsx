
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
    <div className="w-full overflow-hidden bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl px-6 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our handpicked selection of premium gaming gear
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative w-full overflow-x-auto pb-8 scroll-smooth">
          <div className="flex gap-6 px-6 w-max min-w-full">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex-none w-[300px] transform transition-all duration-300 hover:translate-y-[-4px] group"
              >
                <Card className="overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Badge 
                        className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 border-0 text-xs px-2 py-1"
                        variant="secondary"
                      >
                        {product.category}
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-3">
            <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-700 hover:bg-white hover:scale-105 transition-all pointer-events-auto">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
