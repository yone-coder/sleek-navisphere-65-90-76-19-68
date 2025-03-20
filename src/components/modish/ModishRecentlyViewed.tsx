
import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ModishRecentlyViewed() {
  const navigate = useNavigate();
  
  // Mock recently viewed products
  const recentProducts = [
    {
      id: '2',
      name: 'Wireless Earbuds',
      image: '/api/placeholder/100/100',
      price: 24.99,
      discountPrice: 19.99,
    },
    {
      id: '3',
      name: 'Smart Watch',
      image: '/api/placeholder/100/100',
      price: 59.99,
      discountPrice: 44.99,
    },
    {
      id: '4',
      name: 'Phone Case',
      image: '/api/placeholder/100/100',
      price: 14.99,
      discountPrice: 9.99,
    },
    {
      id: '5',
      name: 'Bluetooth Speaker',
      image: '/api/placeholder/100/100',
      price: 34.99,
      discountPrice: 29.99,
    }
  ];
  
  const handleProductClick = (productId: string) => {
    navigate(`/modish/${productId}`);
  };
  
  return (
    <div className="bg-white pt-2 pb-3">
      <div className="flex items-center justify-between px-3 py-1">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-800">Recently Viewed</span>
        </div>
        <button className="flex items-center text-xs text-gray-500">
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="flex overflow-x-auto scrollbar-none gap-3 mt-1 px-3 pb-2">
        {recentProducts.map((product) => (
          <div 
            key={product.id}
            className="flex-shrink-0 w-[80px]"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="w-[80px] h-[80px] bg-gray-100 rounded-md overflow-hidden border border-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1">
              <div className="text-xs text-red-500 font-medium">${product.discountPrice}</div>
              <div className="text-[10px] text-gray-400 line-through">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
