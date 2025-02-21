
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
    <section className="w-full py-8 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Popular Products</h2>
          <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="relative w-32 sm:w-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge 
                      className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-900 border-0 text-[10px] px-1.5 py-0.5"
                      variant="secondary"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="ml-0.5 text-xs font-medium text-gray-900">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={product.seller.image}
                        alt={product.seller.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-600">
                        {product.seller.name}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
