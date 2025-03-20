
import React, { useState, useEffect } from 'react';
import { ModishGallery } from './product/ModishGallery';
import { ModishInfo } from './product/ModishInfo';
import { ModishOptions } from './product/ModishOptions';
import { ModishActions } from './product/ModishActions';
import { ModishReviews } from './product/ModishReviews';
import { ModishSimilar } from './product/ModishSimilar';
import { ModishFeatures } from './product/ModishFeatures';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Eye } from 'lucide-react';

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
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: false },
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
  // Add more products as needed
};

// Recently viewed products placeholder
const recentlyViewedProducts = [
  {
    id: '2',
    name: 'Modern Accent Chair',
    price: 649.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Sculptural Lounge Chair',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&auto=format&fit=crop',
  },
];

type ModishProductDetailsProps = {
  productId: string;
};

export function ModishProductDetails({ productId }: ModishProductDetailsProps) {
  const product = products[productId] || products['1'];
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [viewCount, setViewCount] = useState(0);
  const [lastViewed, setLastViewed] = useState<string>('');
  
  // Simulate view counter
  useEffect(() => {
    // Random number between 10-50
    const randomViewers = Math.floor(Math.random() * 40) + 10;
    setViewCount(randomViewers);
    
    // Set a random time for "last viewed"
    const minutes = Math.floor(Math.random() * 30) + 1;
    setLastViewed(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
  }, []);
  
  return (
    <div className="pb-28 min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      <ModishGallery images={product.images} name={product.name} />
      
      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-12">
        {/* Live activity indicator */}
        <Card className="overflow-hidden border-gray-100">
          <CardContent className="p-0 flex items-center text-sm divide-x divide-gray-100">
            <div className="px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-gray-700">
                <strong>{viewCount}</strong> people viewing
              </span>
            </div>
            <div className="px-3 py-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Last viewed {lastViewed}</span>
            </div>
            <div className="px-3 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Updated today</span>
            </div>
          </CardContent>
        </Card>
      
        <ModishInfo
          name={product.name}
          brand={product.brand}
          price={product.price}
          discountPrice={product.discountPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
        />
        
        <ModishOptions
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          quantity={quantity}
          onUpdateQuantity={setQuantity}
          stock={product.stock}
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
        
        <ModishActions
          product={product}
          selectedColor={selectedColor}
          quantity={quantity}
          selectedSize={selectedSize}
        />
        
        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-medium text-gray-900">Product Specifications</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.specifications.map((spec) => (
              <div key={spec.name} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">{spec.name}</span>
                <span className="text-sm font-medium text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <ModishFeatures features={product.features} />
        
        <ModishReviews rating={product.rating} reviewCount={product.reviewCount} />
        
        {/* Recently Viewed Section */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium text-gray-900">Recently Viewed</h3>
          <div className="grid grid-cols-2 gap-4">
            {recentlyViewedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-gray-100 hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{product.name}</h4>
                  <p className="text-sm font-semibold mt-1">${product.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <ModishSimilar currentProductId={product.id} />
      </div>
    </div>
  );
}
