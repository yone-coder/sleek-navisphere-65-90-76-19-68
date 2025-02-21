import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  seller: {
    name: string;
    image: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "Professional Gaming Chair",
    image: "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=800&h=600&fit=crop",
    price: 299.99,
    rating: 4.8,
    reviews: 156,
    category: "Gaming Furniture",
    seller: {
      name: "Pro Gaming Gear",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    }
  },
  {
    id: 2,
    name: "Gaming Desktop PC",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop",
    price: 1299.99,
    rating: 4.9,
    reviews: 234,
    category: "Gaming PCs",
    seller: {
      name: "Tech Haven",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  },
  {
    id: 3,
    name: "RGB Gaming Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=600&fit=crop",
    price: 149.99,
    rating: 4.7,
    reviews: 189,
    category: "Peripherals",
    seller: {
      name: "Gaming Essentials",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop"
    }
  },
  {
    id: 4,
    name: "4K Gaming Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    price: 499.99,
    rating: 4.9,
    reviews: 312,
    category: "Displays",
    seller: {
      name: "Display Pro",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  }
];

export const ProductGrid = () => {
  return (
    <section className="w-full py-2 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">Popular Products</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 transition-colors text-xs font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative flex-none w-full"
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
                      className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm text-gray-900 border-0 text-[10px] px-1.5 py-0.5"
                      variant="secondary"
                    >
                      {product.category}
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
                      </div>
                      <div className="flex items-center gap-1 text-[8px]">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-2 h-2 fill-current" />
                          <span className="ml-0.5 font-medium text-gray-900">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
