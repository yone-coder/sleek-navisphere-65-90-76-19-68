
import React from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams } from 'react-router-dom';
import { ModishFloatingActions } from '@/components/modish/ModishFloatingActions';

const Modish = () => {
  const { id } = useParams();
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  // Dummy data for floating actions - these would come from product data in a real app
  const productPrice = 39.99;
  const originalPrice = 79.99;
  const stock = 68;

  const handleAddToCart = () => {
    console.log('Added to cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now clicked');
  };

  return (
    <div className="min-h-screen bg-white pb-[150px] overflow-x-hidden">
      <ModishHeader />
      <div className="w-full mx-auto px-0">
        <ModishProductDetails productId={productId} />
      </div>
      <ModishFloatingActions 
        price={productPrice}
        originalPrice={originalPrice}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        stock={stock}
      />
    </div>
  );
};

export default Modish;
