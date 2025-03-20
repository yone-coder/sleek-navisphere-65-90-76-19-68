
import React, { useState } from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams } from 'react-router-dom';
import { ModishFloatingActions } from '@/components/modish/ModishFloatingActions';
import { ProductTabs } from '@/components/product/ProductTabs';

const Modish = () => {
  const { id } = useParams();
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  // Dummy data for floating actions - these would come from product data in a real app
  const productPrice = 39.99;
  const originalPrice = 79.99;
  const stock = 68;

  // Dummy data for product tabs
  const productDescription = "This stylish product is made with premium materials to ensure durability and comfort. Perfect for everyday use, it combines modern design with practical functionality.";
  const productHighlights = [
    "Premium quality materials",
    "Lightweight and durable",
    "Water-resistant finish",
    "Available in multiple colors",
    "Ergonomic design for comfort"
  ];
  const productRating = 4.7;
  const productReviews = 241;

  const handleAddToCart = () => {
    console.log('Added to cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now clicked');
  };

  return (
    <div className="min-h-screen bg-white pb-[150px]">
      <ModishHeader />
      <ModishProductDetails productId={productId} />
      
      {/* Product tabs section */}
      <div className="px-4 mt-4 mb-6">
        <ProductTabs 
          description={productDescription}
          highlights={productHighlights}
          rating={productRating}
          reviews={productReviews}
        />
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
