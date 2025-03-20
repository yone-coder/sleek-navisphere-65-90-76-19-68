import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModishCarousel } from '@/components/modish/product/ModishCarousel';
import { ModishInfo } from '@/components/modish/product/ModishInfo';
import { ModishOptions } from '@/components/modish/product/ModishOptions';
import { ModishDescription } from '@/components/modish/product/ModishDescription';
import { ModishReviews } from '@/components/modish/product/ModishReviews';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  colors: { name: string; value: string; }[];
  sizes?: { name: string; available: boolean; }[];
};

type ModishProductDetailsProps = {
  productId: string;
  price: number;
  discountPrice: number;
};

export function ModishProductDetails({ productId, price, discountPrice }: ModishProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Mock API call - replace with actual API endpoint
    const fetchProduct = async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock product data
      const mockProduct: Product = {
        id: productId,
        name: "High-Quality Bluetooth Speaker",
        brand: "AudioTech",
        price: price,
        discountPrice: discountPrice,
        rating: 4.5,
        reviewCount: 120,
        description: "Experience superior sound quality with this portable Bluetooth speaker. Perfect for indoor and outdoor use.",
        images: [
          '/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400'
        ],
        colors: [
          { name: "Black", value: "#000000" },
          { name: "White", value: "#FFFFFF" },
          { name: "Blue", value: "#0000FF" }
        ],
        sizes: [
          { name: "S", available: true },
          { name: "M", available: true },
          { name: "L", available: false },
          { name: "XL", available: true }
        ]
      };

      setProduct(mockProduct);
    };

    fetchProduct();
  }, [productId, price, discountPrice]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Product Carousel */}
      <ModishCarousel images={product.images} />

      {/* Product Info */}
      <ModishInfo
        name={product.name}
        brand={product.brand}
        price={product.price}
        discountPrice={product.discountPrice}
        rating={product.rating}
        reviewCount={product.reviewCount}
        description={product.description}
      />

      {/* Product Options */}
      <ModishOptions
        colors={product.colors}
        selectedColor={selectedColor}
        onSelectColor={handleColorSelect}
        quantity={quantity}
        onUpdateQuantity={setQuantity}
        stock={100} // Replace with actual stock
        price={product.price}
        discountPrice={product.discountPrice}
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={handleSizeSelect}
      />

      {/* Product Description */}
      <ModishDescription description={product.description} />

      {/* Product Reviews */}
      <ModishReviews productId={productId} />
    </div>
  );
}
