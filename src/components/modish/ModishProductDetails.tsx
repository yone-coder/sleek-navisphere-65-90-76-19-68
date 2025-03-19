
import React, { useState, useEffect } from 'react';
import { ModishGallery } from './product/ModishGallery';
import { ModishInfo } from './product/ModishInfo';
import { ModishOptions } from './product/ModishOptions';
import { ModishActions } from './product/ModishActions';
import { ModishReviews } from './product/ModishReviews';
import { ModishSimilar } from './product/ModishSimilar';
import { ModishFeatures } from './product/ModishFeatures';

// Sample product data
const products = {
  '1': {
    id: '1',
    name: 'Ergonomic Lounge Chair',
    brand: 'Moderno',
    price: 1299.99,
    discountPrice: 999.99,
    rating: 4.8,
    reviewCount: 142,
    description: 'Experience unparalleled comfort with our ergonomic lounge chair, crafted with premium materials and designed for long-lasting relaxation.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Charcoal', value: '#333333' },
      { name: 'Cream', value: '#F5F5DC' },
      { name: 'Navy', value: '#000080' },
      { name: 'Forest', value: '#228B22' },
    ],
    specifications: [
      { name: 'Dimensions', value: '31.5"W × 32.5"D × 41"H' },
      { name: 'Materials', value: 'Italian leather, walnut' },
      { name: 'Weight', value: '35 lbs' },
      { name: 'Warranty', value: '5 years' },
    ],
    features: [
      {
        title: '5-point ergonomic design',
        description: 'Scientifically engineered with 5 key support points to provide optimal posture and comfort for extended sitting periods.',
        icon: 'Design',
        color: 'blue',
        details: 'The 5-point design supports your neck, upper back, lower back, thighs, and feet in perfect alignment, reducing pressure and preventing pain.'
      },
      {
        title: 'Premium Italian leather upholstery',
        description: 'Wrapped in luxurious full-grain Italian leather that ages beautifully and becomes more comfortable over time.',
        icon: 'Layers',
        color: 'amber',
        details: 'Our leather is sourced from the finest tanneries in Italy, treated with natural oils for a buttery soft feel, and hand-selected for consistent quality.'
      },
      {
        title: 'Solid walnut frame construction',
        description: 'Built on a foundation of kiln-dried solid walnut for exceptional durability and timeless aesthetics.',
        icon: 'Armchair',
        color: 'brown',
        details: 'The walnut is sustainably harvested, precision-cut, and joined using traditional woodworking techniques that ensure stability for decades of use.'
      },
      {
        title: 'Memory foam cushioning',
        description: 'High-density memory foam that contours to your body and springs back when you stand up.',
        icon: 'Sofa',
        color: 'purple',
        details: 'Our proprietary foam formula combines the responsiveness of latex with the body-contouring benefits of memory foam, offering superior pressure relief.'
      },
      {
        title: 'Adjustable recline settings',
        description: 'Multiple recline positions that can be easily adjusted to match your preferred sitting angle.',
        icon: 'ThumbsUp',
        color: 'green',
        details: 'The patented reclining mechanism offers 5 distinct positions from upright to fully reclined, with a smooth transition between each setting.'
      },
    ],
    stock: 12,
    freeShipping: true,
    deliveryTime: '3-5 days',
  },
  '2': {
    id: '2',
    name: 'Modern Dining Chair',
    brand: 'Moderno',
    price: 499.99,
    discountPrice: 399.99,
    rating: 4.6,
    reviewCount: 98,
    description: 'Elevate your dining space with our sleek modern dining chair, featuring clean lines and exceptional craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552529242-27a5df0e969a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Walnut', value: '#8B4513' },
    ],
    specifications: [
      { name: 'Dimensions', value: '22"W × 24"D × 34"H' },
      { name: 'Materials', value: 'Oak, wool blend' },
      { name: 'Weight', value: '12 lbs' },
      { name: 'Warranty', value: '3 years' },
    ],
    features: [
      {
        title: 'Scandinavian design',
        description: 'Minimalist aesthetics inspired by Scandinavian design principles for timeless appeal.',
        icon: 'Design',
        color: 'blue',
        details: 'Our designers studied classical Scandinavian furniture to create a piece that combines modern sensibilities with timeless design elements.'
      },
      {
        title: 'Premium wool upholstery',
        description: 'Seat cushions wrapped in a luxurious wool blend for durability and comfort.',
        icon: 'Layers',
        color: 'amber',
        details: 'The wool blend is naturally stain-resistant, breathable, and designed to maintain its shape even after years of regular use.'
      },
      {
        title: 'Solid oak construction',
        description: 'Crafted from solid oak for exceptional durability and natural beauty.',
        icon: 'Armchair',
        color: 'brown',
        details: 'Each chair is made from sustainably harvested oak, carefully selected for its grain pattern and structural integrity.'
      },
    ],
    stock: 24,
    freeShipping: true,
    deliveryTime: '2-4 days',
  },
  '3': {
    id: '3',
    name: 'Executive Office Chair',
    brand: 'Moderno Pro',
    price: 899.99,
    discountPrice: 749.99,
    rating: 4.9,
    reviewCount: 175,
    description: 'Designed for professionals who demand excellence, our executive office chair combines ergonomic support with luxurious comfort for productive workdays.',
    images: [
      'https://images.unsplash.com/photo-1494346480775-936a9f0d0877?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444881421460-d838c3b98f95?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Brown', value: '#8B4513' },
      { name: 'Beige', value: '#F5F5DC' },
    ],
    specifications: [
      { name: 'Dimensions', value: '30"W × 28"D × 45"H' },
      { name: 'Materials', value: 'Premium leather, aluminum' },
      { name: 'Weight', value: '42 lbs' },
      { name: 'Warranty', value: '7 years' },
    ],
    features: [
      {
        title: 'Executive ergonomics',
        description: 'Advanced ergonomic design with multiple adjustment points for personalized comfort.',
        icon: 'Design',
        color: 'blue',
        details: 'The chair includes 12 adjustment points including headrest, lumbar support, armrests, seat height, and tilt tension for ultimate customization.'
      },
      {
        title: 'Top-grain leather',
        description: 'Upholstered in top-grain leather for a premium look and feel that improves with age.',
        icon: 'Layers',
        color: 'amber',
        details: 'Our leather undergoes a special tanning process that enhances durability while maintaining a soft, supple texture.'
      },
      {
        title: 'Aircraft-grade aluminum frame',
        description: 'Built with an aircraft-grade aluminum frame for exceptional strength and stability.',
        icon: 'Armchair',
        color: 'purple',
        details: 'The same aluminum alloy used in aerospace applications ensures this chair will maintain its structural integrity for decades.'
      },
      {
        title: 'Dynamic lumbar support',
        description: 'Intelligent lumbar support that adjusts to your movements for continuous back care.',
        icon: 'ThumbsUp',
        color: 'green',
        details: 'The patented dynamic support system automatically adjusts to your posture as you move throughout the day.'
      },
    ],
    stock: 8,
    freeShipping: true,
    deliveryTime: '3-5 days',
  },
};

type ModishProductDetailsProps = {
  productId: string;
};

export function ModishProductDetails({ productId }: ModishProductDetailsProps) {
  const [displayedProductId, setDisplayedProductId] = useState(productId);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  const productIds = Object.keys(products);
  const currentProduct = products[displayedProductId] || products['1'];
  
  // Set initial selected color when product changes
  useEffect(() => {
    if (currentProduct.colors && currentProduct.colors.length > 0) {
      setSelectedColor(currentProduct.colors[0].value);
    }
  }, [displayedProductId, currentProduct]);
  
  // Auto-rotate products
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setDisplayedProductId(prevId => {
          const currentIndex = productIds.indexOf(prevId);
          const nextIndex = (currentIndex + 1) % productIds.length;
          return productIds[nextIndex];
        });
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [productIds, isPaused]);
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  const goToNextProduct = () => {
    const currentIndex = productIds.indexOf(displayedProductId);
    const nextIndex = (currentIndex + 1) % productIds.length;
    setDisplayedProductId(productIds[nextIndex]);
  };
  
  const goToPrevProduct = () => {
    const currentIndex = productIds.indexOf(displayedProductId);
    const prevIndex = (currentIndex - 1 + productIds.length) % productIds.length;
    setDisplayedProductId(productIds[prevIndex]);
  };
  
  return (
    <div 
      className="pb-28 min-h-screen bg-gradient-to-b from-gray-50/50 to-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-16 right-5 bg-white/80 backdrop-blur-sm text-xs font-medium rounded-full px-2.5 py-1 z-10 shadow-sm border border-gray-100">
        {productIds.indexOf(displayedProductId) + 1}/{productIds.length}
      </div>
      
      <div className="absolute top-16 left-5 z-10 flex space-x-2">
        <button 
          onClick={goToPrevProduct}
          className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Previous product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <button 
          onClick={goToNextProduct}
          className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
          aria-label="Next product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      
      <ModishGallery images={currentProduct.images} name={currentProduct.name} />
      
      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-12">
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((productIds.indexOf(displayedProductId) + 1) / productIds.length) * 100}%` }}
          />
        </div>
        
        <ModishInfo
          name={currentProduct.name}
          brand={currentProduct.brand}
          price={currentProduct.price}
          discountPrice={currentProduct.discountPrice}
          rating={currentProduct.rating}
          reviewCount={currentProduct.reviewCount}
          description={currentProduct.description}
        />
        
        <ModishOptions
          colors={currentProduct.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          quantity={quantity}
          onUpdateQuantity={setQuantity}
          stock={currentProduct.stock}
        />
        
        <ModishActions
          product={currentProduct}
          selectedColor={selectedColor}
          quantity={quantity}
        />
        
        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-medium text-gray-900">Product Specifications</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentProduct.specifications.map((spec) => (
              <div key={spec.name} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">{spec.name}</span>
                <span className="text-sm font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <ModishFeatures features={currentProduct.features} />
        
        <ModishReviews rating={currentProduct.rating} reviewCount={currentProduct.reviewCount} />
        
        <ModishSimilar currentProductId={currentProduct.id} />
      </div>
    </div>
  );
}
