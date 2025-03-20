
import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ModishSimilarProps = {
  currentProductId: string;
};

export function ModishSimilar({ currentProductId }: ModishSimilarProps) {
  // Mock similar products data
  const similarProducts = [
    {
      id: '2',
      name: 'Modern Accent Chair',
      price: 649.99,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
      rating: 4.6,
      reviewsCount: 98,
    },
    {
      id: '3',
      name: 'Sculptural Lounge Chair',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop',
      rating: 4.9,
      reviewsCount: 64,
    },
    {
      id: '4',
      name: 'Minimalist Recliner Chair',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop',
      rating: 4.7,
      reviewsCount: 112,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentProduct = similarProducts[currentIndex];

  // Auto-rotate products
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % similarProducts.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [similarProducts.length, isPaused]);

  // Navigation functions
  const goToNextProduct = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % similarProducts.length);
  }, [similarProducts.length]);

  const goToPrevProduct = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + similarProducts.length) % similarProducts.length);
  }, [similarProducts.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">You may also like</h3>
        <button className="text-sm font-medium text-blue-600 flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-300">
          <div className="relative pt-[80%] overflow-hidden">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / similarProducts.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="p-4 space-y-2">
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {currentProduct.name}
            </h4>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{currentProduct.rating}</span>
              <span className="text-xs text-gray-500">({currentProduct.reviewsCount})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">${currentProduct.price.toLocaleString()}</span>
              <button className="text-xs font-medium text-blue-600 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </Card>
        
        <button 
          onClick={goToPrevProduct}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all duration-200 z-10"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button 
          onClick={goToNextProduct}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-all duration-200 z-10"
          aria-label="Next product"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <div className="flex justify-center mt-3 gap-1.5">
          {similarProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-blue-500 scale-110" : "bg-gray-300"
              )}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
