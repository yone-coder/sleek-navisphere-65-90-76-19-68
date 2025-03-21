
import React from 'react';
import { ModishGallery } from './product/ModishGallery';
import { ModishInfo } from './product/ModishInfo';
import { ModishOptions } from './product/ModishOptions';
import { ModishActions } from './product/ModishActions';
import { ModishDescription } from './product/ModishDescription';
import { ModishReviews } from './product/ModishReviews';
import { ModishCommentPanel } from './product/ModishCommentPanel';
import { ModishSimilar } from './product/ModishSimilar';
import { ModishQuestions } from './product/ModishQuestions';
import { Separator } from '@/components/ui/separator';

// Dummy product data
const productData = {
  id: '1',
  name: 'Minimalist Modern Accent Chair for Living Room, Bedroom, Office',
  price: 79.99,
  discountPrice: 39.99,
  discountPercentage: 50,
  stock: 68,
  rating: 4.5,
  reviewCount: 1245,
  storeName: 'Modern Luxe Furniture Store',
  storeRating: 97.5,
  productSold: 5423,
  shipping: 'Free Shipping',
  deliveryDate: 'Delivery by Aug 25-30',
  images: [
    '/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png',
    '/lovable-uploads/7b6dfa3b-fe97-4083-8e4a-0640871dbc3f.png',
    '/lovable-uploads/44c5c93d-ace1-4feb-a49b-db4a8a02f987.png',
    '/lovable-uploads/9e449bdb-9bc8-4c07-833d-aba77900c9c6.png',
  ],
  colors: ['Black', 'White', 'Gray', 'Blue', 'Green'],
  sizes: ['Small', 'Medium', 'Large'],
  description: 'This elegant accent chair combines comfort and style with its minimalist design. Perfect for modern homes, it features premium upholstery and sturdy construction to enhance any room decor. The ergonomic design provides excellent back support.',
  specifications: [
    { name: 'Material', value: 'Premium Polyester Fabric' },
    { name: 'Dimensions', value: '27.5"W x 29.5"D x 31.5"H' },
    { name: 'Weight Capacity', value: '330 lbs' },
    { name: 'Assembly', value: 'Simple assembly required' },
    { name: 'Features', value: 'Stain-resistant, Easy to clean' },
  ]
};

export interface ModishProductDetailsProps {
  productId: string;
  price?: number;
  discountPrice?: number;
  headerHeight?: number;
}

export function ModishProductDetails({ 
  productId, 
  price, 
  discountPrice,
  headerHeight = 120  // Default value if headerHeight is not provided
}: ModishProductDetailsProps) {
  // In a real app, we would fetch the product data based on productId
  // For this demo, we'll use the dummy data
  
  // Update the product with any props passed in
  const product = {
    ...productData,
    ...(price !== undefined && { price }),
    ...(discountPrice !== undefined && { discountPrice }),
  };
  
  return (
    <div style={{ paddingTop: `${headerHeight}px` }}>
      <ModishGallery 
        images={product.images}
        name={product.name}
      />
      
      <div className="px-3 mt-3">
        <ModishInfo 
          name={product.name}
          price={product.price}
          discountPrice={product.discountPrice}
          discountPercentage={product.discountPercentage}
          rating={product.rating}
          reviewCount={product.reviewCount}
          productSold={product.productSold}
          shipping={product.shipping}
          deliveryDate={product.deliveryDate}
        />
        
        <Separator className="my-4" />
        
        <ModishOptions 
          colors={product.colors}
          sizes={product.sizes}
          stock={product.stock}
        />
        
        <Separator className="my-4" />
        
        <ModishActions />
        
        <Separator className="my-4" />
        
        <ModishDescription 
          description={product.description}
          specifications={product.specifications}
        />
        
        <Separator className="my-4" />
        
        <ModishReviews 
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        
        <Separator className="my-4" />
        
        <ModishQuestions />
        
        <Separator className="my-4" />
        
        <ModishSimilar />
        
        <Separator className="my-4" />
        
        <ModishCommentPanel />
      </div>
    </div>
  );
}
