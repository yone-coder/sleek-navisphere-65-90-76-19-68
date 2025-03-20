
import React from 'react';
import { Star } from 'lucide-react';

export type ModishSimilarProps = {
  currentProductId: string;
};

export function ModishSimilar({ currentProductId }: ModishSimilarProps) {
  // This is just a placeholder component - in a real app we would fetch similar products
  const similarProducts = [
    {
      id: 's1',
      name: 'Premium Bluetooth Earbuds',
      price: 59.99,
      discountPrice: 39.99,
      rating: 4.6,
      image: '/api/placeholder/120/120'
    },
    {
      id: 's2',
      name: 'Wireless Gaming Headset',
      price: 129.99,
      discountPrice: 89.99,
      rating: 4.7,
      image: '/api/placeholder/120/120'
    },
    {
      id: 's3',
      name: 'Noise Cancelling Earphones',
      price: 79.99,
      discountPrice: 59.99,
      rating: 4.5,
      image: '/api/placeholder/120/120'
    },
    {
      id: 's4',
      name: 'Studio Quality Headphones',
      price: 199.99,
      discountPrice: 149.99,
      rating: 4.9,
      image: '/api/placeholder/120/120'
    }
  ].filter(product => product.id !== currentProductId);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Similar Products</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {similarProducts.map(product => (
          <div key={product.id} className="border border-gray-100 rounded-lg p-2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-32 object-contain mb-2"
            />
            
            <div className="text-xs line-clamp-2 h-8 mb-1">
              {product.name}
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-red-500 font-medium">US ${product.discountPrice.toFixed(2)}</span>
              <span className="text-xs text-gray-500 line-through">US ${product.price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
