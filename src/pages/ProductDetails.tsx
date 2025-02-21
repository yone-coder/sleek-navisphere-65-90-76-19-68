import { useState } from "react";
import { StarIcon, Heart, Send, ShoppingCart, ArrowLeft, Search, CheckCircle, Users, GitCompare, CreditCard, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useNavigate, useParams } from "react-router-dom";

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
    ],
    stockStatus: 'Out of Stock'
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? productData[id as keyof typeof productData] : null;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: 'Black', value: 'black', class: 'bg-black', hex: '#000000' },
    { name: 'White', value: 'white', class: 'bg-white border border-gray-200', hex: '#FFFFFF' },
    { name: 'Racing Red', value: 'red', class: 'bg-red-500', hex: '#EF4444' },
    { name: 'Ocean Blue', value: 'blue', class: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Forest Green', value: 'green', class: 'bg-green-500', hex: '#22C55E' },
    { name: 'Royal Purple', value: 'purple', class: 'bg-purple-500', hex: '#A855F7' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-4 left-4 z-10">
          <div 
            className={`
              px-3 py-1.5 rounded-full backdrop-blur-md
              font-medium text-xs tracking-wide
              transition-all duration-300
              ${product.stockStatus === 'In Stock' 
                ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                : product.stockStatus === 'Low Stock'
                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'
                : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }
            `}
          >
            {product.stockStatus}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`h-9 w-9 rounded-lg backdrop-blur-md border-0 ${
              isWishlisted 
                ? 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30' 
                : 'bg-black/20 text-white hover:bg-black/30'
            } transition-all duration-300`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            className="h-9 w-9 rounded-lg backdrop-blur-md bg-black/20 border-0 text-white hover:bg-black/30 transition-all duration-300"
          >
            <GitCompare className="w-3.5 h-3.5" />
          </Button>
        </div>

      </div>

      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full pointer-events-auto"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 pointer-events-auto">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden py-2">
            <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>🔥 Flash Sale: Get 25% off on all gaming chairs!</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Limited time offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Free shipping on orders over $500</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>🔥 Flash Sale: Get 25% off on all gaming chairs!</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Limited time offer</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                <span>Free shipping on orders over $500</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-6 pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-medium text-gray-900 truncate pr-4 flex-1">{product.name}</h1>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-[#0FA0CE] whitespace-nowrap">{Math.round(product.price)} G</span>
                <span className="text-xs text-red-500 line-through whitespace-nowrap">{Math.round(product.originalPrice)} G</span>
                <Badge className="text-[10px] px-1.5 py-0.5 bg-[#FEF7CD] text-yellow-700 border-yellow-200">
                  {product.discount}% OFF
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
                  <AvatarFallback>PG</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-900">Pro Gaming Store</span>
                    <CheckCircle className="h-4 w-4 text-blue-500 fill-current" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>23.4k followers</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline"
                size="sm"
                className={`text-xs transition-all duration-300 ${
                  isFollowing 
                    ? 'bg-gray-50 text-gray-700' 
                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>

            <div className="space-y-6 py-4 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Color</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 capitalize">{selectedColor}</span>
                    <div 
                      className={`w-4 h-4 rounded-full ${
                        colors.find(c => c.value === selectedColor)?.class
                      }`}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`
                        group relative w-7 h-7 rounded-full ${color.class}
                        transition-all duration-300 
                        ${selectedColor === color.value 
                          ? 'ring-2 ring-offset-2 ring-[#0FA0CE] scale-110' 
                          : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 hover:scale-110'
                        }
                      `}
                      aria-label={`Select ${color.name} color`}
                    >
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                        {color.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-transparent border-t-gray-900" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Size</span>
                  <span className="text-sm text-gray-500">{selectedSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-12 h-12 rounded-xl border font-medium text-sm
                        transition-all duration-300
                        ${selectedSize === size
                          ? 'bg-[#0FA0CE] text-white border-transparent'
                          : 'bg-white text-gray-900 border-gray-200 hover:border-[#0FA0CE] hover:text-[#0FA0CE]'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 pb-4">
              <Button 
                className="flex-1 basis-0 bg-[#0FA0CE] hover:bg-[#0F8CBE] text-white text-sm h-9 px-4 rounded-lg shadow-sm transition-all duration-300"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Add to Cart
              </Button>
              
              <Button
                className="flex-1 basis-0 bg-red-500 hover:bg-red-600 text-white text-sm h-9 px-4 rounded-lg shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-red-500/25 hover:shadow-lg"
              >
                <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                Buy Now
              </Button>
            </div>

            <p className="text-xl text-gray-600">{product.brand}</p>

            <div className="flex items-center justify-between py-6 border-y border-gray-100">
              <div className="flex items-baseline gap-2">
                <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                <Badge variant="destructive" className="ml-2">
                  {product.discount}% OFF
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
              <ul className="grid grid-cols-1 gap-3">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Buy Now
              </Button>

              <Button 
                variant="outline" 
                size="icon"
                className={`shrink-0 ${
                  isWishlisted 
                    ? 'bg-pink-50 text-pink-600 border-pink-200' 
                    : 'text-gray-600'
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>

              <Button 
                variant="outline" 
                size="icon"
                className="shrink-0"
              >
                <GitCompare className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
