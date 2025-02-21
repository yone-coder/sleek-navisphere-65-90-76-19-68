
import { useState } from "react";
import { StarIcon, Heart, Send, ShoppingCart, ArrowLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate, useParams } from "react-router-dom";

// Mock product data - In a real app, this would come from an API
const productData = {
  "1": {
    id: "1",
    name: "Professional Gaming Chair",
    brand: "Pro Gaming Gear",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviews: 156,
    description: "Experience ultimate gaming comfort with our Professional Gaming Chair, crafted for those who demand excellence in their gaming setup. Features premium PU leather, ergonomic design, and advanced adjustability for extended gaming sessions.",
    highlights: [
      "Premium PU Leather Construction",
      "Ergonomic Design with Lumbar Support",
      "4D Adjustable Armrests",
      "360° Swivel Base",
      "Memory Foam Padding",
    ],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
    ],
  },
  "2": {
    // ... similar structure for product 2
  },
  "3": {
    id: "3",
    name: "Elite Gaming Chair Pro",
    brand: "Pro Gaming Gear",
    price: 399.99,
    originalPrice: 499.99,
    discount: 20,
    rating: 4.9,
    reviews: 203,
    description: "The Elite Gaming Chair Pro represents the pinnacle of gaming comfort and style. Engineered for professional gamers and enthusiasts who demand the very best in their setup.",
    highlights: [
      "Premium Italian PU Leather",
      "Advanced Ergonomic Design",
      "5D Adjustable Armrests",
      "Carbon Fiber Structure",
      "Premium Memory Foam",
    ],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
    ],
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? productData[id as keyof typeof productData] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Button onClick={() => navigate('/marketplace')}>
          Return to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Carousel className="w-full">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`${product.name} - View ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full pointer-events-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 pointer-events-auto">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden py-2">
            <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>🔥 Flash Sale: Get 25% off on all gaming chairs!</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Limited time offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Free shipping on orders over $500</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              {/* Duplicate items for smooth infinite scroll */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>🔥 Flash Sale: Get 25% off on all gaming chairs!</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Limited time offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Free shipping on orders over $500</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Product Description */}
      <div className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <p className="text-xl text-gray-600">{product.brand}</p>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between py-6 border-y border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                <Badge variant="destructive" className="ml-2">
                  {product.discount}% OFF
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
              <ul className="grid grid-cols-1 gap-3">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
