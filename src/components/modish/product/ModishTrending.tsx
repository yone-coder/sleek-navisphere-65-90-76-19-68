
import React, { useState, useEffect } from 'react';
import { TrendingUp, ChevronRight, ChevronLeft, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
  rating: number;
  reviewCount: number;
  isHot: boolean;
}

export function ModishTrending() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  
  // Load trending products (mock data)
  useEffect(() => {
    // Simulated API fetch
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Noise Cancelling Headphones',
        price: 199.99,
        discountPrice: 149.99,
        image: '/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png',
        rating: 4.8,
        reviewCount: 256,
        isHot: true,
      },
      {
        id: '2',
        name: 'Smart Watch with Heart Rate Monitor',
        price: 129.99,
        discountPrice: 99.99,
        image: '/api/placeholder/300/300',
        rating: 4.6,
        reviewCount: 189,
        isHot: true,
      },
      {
        id: '3',
        name: 'Waterproof Portable Bluetooth Speaker',
        price: 89.99,
        discountPrice: 69.99,
        image: '/api/placeholder/300/300',
        rating: 4.7,
        reviewCount: 213,
        isHot: false,
      },
      {
        id: '4',
        name: 'Wireless Charging Pad',
        price: 49.99,
        discountPrice: 39.99,
        image: '/api/placeholder/300/300',
        rating: 4.5,
        reviewCount: 174,
        isHot: false,
      }
    ];
    
    setTrendingProducts(mockProducts);
  }, []);
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingProducts.length) % trendingProducts.length);
  };

  const handleAddToCart = (productId: string) => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
      duration: 2000,
    });
  };

  const handleWishlist = (productId: string) => {
    toast({
      title: "Added to wishlist",
      description: "Item has been added to your wishlist",
      duration: 2000,
    });
  };

  const handleQuickView = (productId: string) => {
    toast({
      title: "Quick view",
      description: "Opening quick view",
      duration: 2000,
    });
  };

  if (trendingProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <h3 className="font-medium text-gray-900">Trending Now</h3>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={handlePrev}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 bg-white shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={handleNext}
            className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 bg-white shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isHot && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">Hot</Badge>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button 
                      onClick={() => handleWishlist(product.id)}
                      className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>
                    <button 
                      onClick={() => handleQuickView(product.id)}
                      className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-500 font-medium">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-gray-500 text-xs line-through">${product.price.toFixed(2)}</span>
                    <Badge className="bg-red-50 text-red-500 border-red-100">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                    size="sm"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {trendingProducts.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
