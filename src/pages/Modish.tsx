
import React, { useState } from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { ModishFloatingActions } from '@/components/modish/ModishFloatingActions';
import { useToast } from '@/hooks/use-toast';

const Modish = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  // Dummy data for floating actions - these would come from product data in a real app
  const productPrice = 39.99;
  const originalPrice = 79.99;
  const stock = 68;

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure payment...",
      duration: 2000,
    });
    
    // Create mock product data for the checkout page
    const mockProduct = {
      name: "Stylish Modern Product",
      discountPrice: productPrice,
      originalPrice: originalPrice,
      images: ['/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png']
    };
    
    // Navigate to checkout page with product data
    navigate('/modish/checkout', { 
      state: { 
        product: mockProduct,
        selectedColor: "Black",
        quantity: 1
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-[150px] overflow-x-hidden">
      <ModishHeader />
      <div className="w-full mx-auto px-0 mt-14">
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
