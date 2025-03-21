
import React, { useState, useEffect, useRef } from 'react';
import { ModishHeader } from '@/components/modish/ModishHeader';
import { ModishProductDetails } from '@/components/modish/ModishProductDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { ModishFloatingActions } from '@/components/modish/ModishFloatingActions';
import { ModishRecentlyViewed } from '@/components/modish/ModishRecentlyViewed';
import { ModishStoreBanner } from '@/components/modish/ModishStoreBanner';
import { useToast } from '@/hooks/use-toast';

const Modish = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const headerHeightRef = useRef<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Default to product ID 1 if none is provided
  const productId = id || '1';

  // Dummy data for floating actions - these would come from product data in a real app
  const productPrice = 79.99;  // Original price
  const discountPrice = 39.99;  // Discounted price
  const stock = 68;

  // Setup header height measurement
  useEffect(() => {
    const measureHeaderHeight = () => {
      const headerElement = headerRef.current;
      if (headerElement) {
        const height = headerElement.getBoundingClientRect().height;
        headerHeightRef.current = height;
      }
    };

    // Measure immediately and after a delay to catch any post-render adjustments
    measureHeaderHeight();
    
    // Also measure after a brief delay
    const timeoutId = setTimeout(measureHeaderHeight, 100);
    
    // Also measure on window resize
    window.addEventListener('resize', measureHeaderHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureHeaderHeight);
    };
  }, []);

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
      discountPrice: discountPrice,
      originalPrice: productPrice,
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
      <div ref={headerRef}>
        <ModishHeader />
      </div>
      
      <div className="w-full mx-auto px-0">
        <ModishProductDetails 
          productId={productId} 
          price={productPrice}
          discountPrice={discountPrice}
          headerHeight={headerHeightRef.current}
        />
      </div>
      
      {/* Store Banner Section */}
      <div className="px-3 mt-4">
        <ModishStoreBanner />
      </div>
      
      {/* Recently Viewed Products Section */}
      <div className="mt-4">
        <ModishRecentlyViewed />
      </div>
      
      <ModishFloatingActions 
        price={productPrice}
        originalPrice={productPrice}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        stock={stock}
      />
    </div>
  );
};

export default Modish;
