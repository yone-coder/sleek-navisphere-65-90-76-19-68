
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

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

  return (
    <div className="space-y-6 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">You may also like</h3>
        <button className="text-sm font-medium text-blue-600 flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {similarProducts.map((product) => (
          <div key={product.id} className="group rounded-lg overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all duration-300">
            <div className="relative pt-[100%] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            <div className="p-3 space-y-2">
              <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h4>
              
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviewsCount})</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">${product.price.toLocaleString()}</span>
                <button className="text-xs font-medium text-blue-600 px-2 py-1 rounded-full hover:bg-blue-50 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
