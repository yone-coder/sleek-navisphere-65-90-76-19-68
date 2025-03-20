
import React, { useState } from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { ModishFloatingActions } from '@/components/modish/ModishFloatingActions';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Modish = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  // Create more complete product object
  const product = {
    id: productId,
    name: "Noise Cancelling Wireless Bluetooth Headphones with Microphone",
    price: 199.99,
    discountPrice: 149.99,
    brand: "AudioTech",
    description: "Experience premium sound quality with our latest noise cancelling headphones. Perfect for work, travel, or everyday use. Features include Bluetooth 5.0, 30-hour battery life, and comfortable over-ear design.",
    rating: 4.8,
    reviewCount: 1245,
    stock: 68,
    images: ['/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png', '/api/placeholder/400/400', '/api/placeholder/400/400'],
    deliveryTime: "2-4 business days",
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#0000FF" },
        { name: "Red", value: "#FF0000" }
      ],
      sizes: [
        { name: "One Size", available: true }
      ]
    },
    highlights: [
      "Active Noise Cancellation technology reduces ambient noise",
      "30-hour battery life on a single charge",
      "Premium memory foam ear cushions for extended comfort",
      "Built-in microphone with voice assistant support",
      "Fast charging - 5 minutes charge for 3 hours of playback",
      "Bluetooth 5.0 with seamless connectivity"
    ],
    specifications: {
      brand: "AudioTech",
      model: "ATH-NC700",
      color: "Black",
      connectivity: "Bluetooth 5.0, 3.5mm jack",
      batteryLife: "30 hours",
      weight: "250g",
      warranty: "2 years"
    }
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
    <div className="min-h-screen bg-gray-50 pb-[80px] md:pb-[150px] overflow-x-hidden">
      <ModishHeader />
      <div className="w-full mx-auto px-0 mt-14">
        <ModishProductDetails product={product} />
      </div>
      <ModishFloatingActions 
        price={product.discountPrice}
        originalPrice={product.price}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        stock={product.stock}
      />
    </div>
  );
};

export default Modish;
