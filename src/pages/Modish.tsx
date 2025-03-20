
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

  // Product data
  const productPrice = 199.99;  // Original price
  const discountPrice = 149.99;  // Discounted price
  const stock = 68;

  // Create more complete product object
  const product = {
    id: productId,
    name: "Noise Cancelling Wireless Bluetooth Headphones with Microphone",
    price: productPrice,
    discountPrice: discountPrice,
    brand: "AudioTech",
    description: "Experience premium sound quality with our latest noise cancelling headphones. Perfect for work, travel, or everyday use. Features include Bluetooth 5.0, 30-hour battery life, and comfortable over-ear design.",
    rating: 4.8,
    reviewCount: 1245,
    stock: stock,
    images: ['/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png', '/api/placeholder/400/400', '/api/placeholder/400/400']
  };

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
      name: product.name,
      discountPrice: product.discountPrice,
      originalPrice: product.price,
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
        <ModishProductDetails product={product} />
      </div>
      <ModishFloatingActions 
        price={discountPrice}
        originalPrice={productPrice}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        stock={stock}
      />
    </div>
  );
};

export default Modish;
