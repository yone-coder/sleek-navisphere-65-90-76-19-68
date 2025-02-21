import { useState } from "react";
import { ShoppingCart, CreditCard, BadgePercent, ShieldCheck, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductOptions } from "@/components/product/ProductOptions";
import { ProductTabs } from "@/components/product/ProductTabs";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  images: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

const productData: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Professional Gaming Chair",
    brand: "Pro Gaming Gear",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviews: 156,
    description: "Experience ultimate gaming comfort with our Professional Gaming Chair, crafted for those who demand excellence in their gaming setup. Features premium PU leather, ergonomic design, and advanced adjustability for extended gaming sessions.",
    highlights: [
      "Premium PU Leather Construction",
      "Ergonomic Design with Lumbar Support",
      "4D Adjustable Armrests",
      "360° Swivel Base",
      "Memory Foam Padding",
    ],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
    ],
    stockStatus: 'Low Stock'
  },
  "2": {
    id: "2",
    name: "Ergonomic Gaming Chair",
    brand: "Pro Gaming Gear",
    price: 349.99,
    originalPrice: 449.99,
    discount: 22,
    rating: 4.7,
    reviews: 142,
    description: "The Ergonomic Gaming Chair combines style with ultimate comfort. Perfect for long gaming sessions with its advanced ergonomic features.",
    highlights: [
      "High-Quality PU Leather",
      "Ergonomic Design",
      "Adjustable Armrests",
      "Premium Base",
      "Neck Support Pillow",
    ],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
    ],
    stockStatus: 'In Stock'
  },
  "3": {
    id: "3",
    name: "Elite Gaming Chair Pro",
    brand: "Pro Gaming Gear",
    price: 399.99,
    originalPrice: 499.99,
    discount: 20,
    rating: 4.9,
    reviews: 203,
    description: "The Elite Gaming Chair Pro represents the pinnacle of gaming comfort and style. Engineered for professional gamers and enthusiasts who demand the very best in their setup.",
    highlights: [
      "Premium Italian PU Leather",
      "Advanced Ergonomic Design",
      "5D Adjustable Armrests",
      "Carbon Fiber Structure",
      "Premium Memory Foam",
    ],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop",
    ],
    stockStatus: 'Out of Stock'
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const product = id ? productData[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Button onClick={() => navigate('/marketplace')}>
          Return to Marketplace
        </Button>
      </div>
    );
  }

  const colors = [
    { name: 'Black', value: 'black', class: 'bg-black', hex: '#000000' },
    { name: 'White', value: 'white', class: 'bg-white border border-gray-200', hex: '#FFFFFF' },
    { name: 'Racing Red', value: 'red', class: 'bg-red-500', hex: '#EF4444' },
    { name: 'Ocean Blue', value: 'blue', class: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Forest Green', value: 'green', class: 'bg-green-500', hex: '#22C55E' },
    { name: 'Royal Purple', value: 'purple', class: 'bg-purple-500', hex: '#A855F7' },
  ];

  const sizes = [
    { value: 'S', label: 'Small', description: 'Height: < 170cm' },
    { value: 'M', label: 'Medium', description: 'Height: 170-180cm' },
    { value: 'L', label: 'Large', description: 'Height: 180-190cm' },
    { value: 'XL', label: 'Extra Large', description: 'Height: > 190cm' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <ProductHeader
        images={product.images}
        name={product.name}
        stockStatus={product.stockStatus}
        isWishlisted={isWishlisted}
        onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
      />

      <div className="flex-1 bg-white pb-36">
        <div className="max-w-3xl mx-auto px-6 pt-4 w-full">
          <div className="space-y-4">
            <ProductInfo
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              isFollowing={isFollowing}
              onFollowToggle={() => setIsFollowing(!isFollowing)}
            />

            <ProductOptions
              colors={colors}
              sizes={sizes}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
              onQuantityChange={setQuantity}
            />

            <div className="mt-8">
              <ProductTabs
                description={product.description}
                highlights={product.highlights}
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="flex items-center gap-1.5 text-gray-600">
                <BadgePercent className="w-3.5 h-3.5 text-green-600" />
                <span>5% bulk discount</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>2 year warranty</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>24h delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Truck className="w-3.5 h-3.5 text-purple-600" />
                <span>Free shipping</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">{Math.round(product.price)} G</span>
                <span className="text-sm text-gray-500 line-through">{Math.round(product.originalPrice)} G</span>
                <span className="text-xs font-medium text-green-600">Save {Math.round(product.originalPrice - product.price)} G</span>
              </div>
              <div className="text-xs text-gray-500">
                {quantity} {quantity === 1 ? 'item' : 'items'} selected
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                className="flex-1 bg-[#0FA0CE] hover:bg-[#0F8CBE] text-white text-sm h-11 px-4 rounded-lg shadow-sm transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm h-11 px-4 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-red-500/25 hover:shadow-lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
