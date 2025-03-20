
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModishCarousel } from '@/components/modish/product/ModishCarousel';
import { ModishInfo } from '@/components/modish/product/ModishInfo';
import { ModishOptions } from '@/components/modish/product/ModishOptions';
import { ModishDescription } from '@/components/modish/product/ModishDescription';
import { Badge } from '@/components/ui/badge';
import { Tag, Award, ShieldCheck, Clock, Truck, ChevronRight, Gift } from 'lucide-react';

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
  sellerRating?: number;
  shipFrom?: string;
  freeShipping?: boolean;
  estimatedDelivery?: string;
  soldCount?: number;
  viewCount?: number;
  tags?: string[];
  guarantees?: string[];
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
  const [showSimilarItems, setShowSimilarItems] = useState(false);

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
        ],
        sellerRating: 97.8,
        shipFrom: "United States",
        freeShipping: true,
        estimatedDelivery: "Aug 25 - Sep 5",
        soldCount: 1458,
        viewCount: 3892,
        tags: ["Best Seller", "Flash Deal", "New Arrival"],
        guarantees: ["90-Day Warranty", "Authentic Product", "Buyer Protection"]
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
    return <div className="p-4 flex items-center justify-center h-64">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
        <div className="h-4 w-48 rounded bg-gray-200"></div>
        <div className="h-3 w-32 rounded bg-gray-200"></div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-4">
      {/* Top Banner - AliExpress style */}
      <div className="bg-orange-50 p-2.5 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-orange-500" />
          <span className="text-xs font-medium text-orange-700">Limited Time Deal: Extra 15% OFF with code EXTRA15</span>
        </div>
        <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
          Ends in 02:45:30
        </div>
      </div>

      {/* Product Carousel */}
      <ModishCarousel images={product.images} />

      {/* AliExpress-style quick stats bar */}
      <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg text-xs text-gray-700">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-red-500">${product.discountPrice.toFixed(2)}</span>
          <span className="line-through">${product.price.toFixed(2)}</span>
          <Badge variant="outline" className="bg-red-50 border-red-100 text-red-500 text-[10px] px-1">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <span className="text-gray-600">Sold: </span>
            <span className="font-medium">{product.soldCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Views: </span>
            <span className="font-medium">{product.viewCount}</span>
          </div>
        </div>
      </div>

      {/* Product Tags - AliExpress style */}
      <div className="flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-hide">
        {product.tags?.map((tag, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`whitespace-nowrap px-2 py-1 text-xs font-medium ${
              index === 0 ? 'bg-red-50 text-red-600 border-red-100' : 
              index === 1 ? 'bg-orange-50 text-orange-600 border-orange-100' : 
              'bg-blue-50 text-blue-600 border-blue-100'
            }`}
          >
            {tag}
          </Badge>
        ))}
      </div>

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

      {/* Shipping & Seller Info - AliExpress style */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Shipping from: <span className="font-medium">{product.shipFrom}</span></span>
          </div>
          <span className="text-xs text-gray-600">to United States</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm">Estimated delivery: <span className="font-medium">{product.estimatedDelivery}</span></span>
          </div>
          {product.freeShipping && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Free Shipping
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-200">
          <span className="text-sm">Seller: <span className="font-medium">AudioTech Official Store</span></span>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-xs">
              Top Seller
            </Badge>
            <span className="text-xs text-green-600 font-medium">{product.sellerRating}% Positive</span>
          </div>
        </div>
      </div>
      
      {/* Guarantees - AliExpress style */}
      <div className="grid grid-cols-3 gap-2">
        {product.guarantees?.map((guarantee, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-2 text-center">
            <ShieldCheck className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-xs text-gray-700">{guarantee}</span>
          </div>
        ))}
      </div>

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

      {/* Coupon Banner - AliExpress style */}
      <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Store Coupon</div>
            <div className="text-xs text-gray-600">$5 OFF orders over $50</div>
          </div>
        </div>
        <button className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full">
          Collect
        </button>
      </div>

      {/* Product Description */}
      <ModishDescription description={product.description} />

      {/* Similar items toggle - AliExpress style */}
      <button 
        onClick={() => setShowSimilarItems(!showSimilarItems)}
        className="w-full flex items-center justify-between py-3 px-4 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-500" />
          <span className="font-medium">You May Also Like</span>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${showSimilarItems ? 'rotate-90' : ''}`} />
      </button>

      {/* Conditionally rendered similar items */}
      {showSimilarItems && (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <img 
                  src="/api/placeholder/200/200" 
                  alt="Similar product" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <div className="text-xs line-clamp-2 mb-1">Similar Bluetooth Speaker with Extra Features</div>
                <div className="text-red-500 text-sm font-medium">$49.99</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Shop Recommendations - AliExpress style */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">From This Shop</h3>
          <button className="text-xs text-blue-600">View Shop</button>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="shrink-0 w-20">
              <div className="h-20 w-20 rounded-lg bg-white border border-gray-200 overflow-hidden">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Shop item" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-xs text-red-500 font-medium mt-1">$29.99</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
