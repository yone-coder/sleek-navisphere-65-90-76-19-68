
import { useState } from "react";
import { StarIcon, Heart, Send, ShoppingCart, AlertCircle, ArrowLeft, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "1",
    name: "Professional Gaming Chair",
    brand: "Pro Gaming Gear",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviews: 156,
    stock: 5,
    colors: ["black", "red", "blue"],
    images: [
      "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600854964509-99661b5e9e6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd68b?w=800&h=800&fit=crop",
    ],
    description: "Experience ultimate gaming comfort with our Professional Gaming Chair...",
    features: [
      "Ergonomic Design",
      "Adjustable Armrests",
      "Premium Materials",
      "360° Swivel",
    ],
    specifications: {
      dimensions: "67 x 30 x 30 inches",
      weight: "45 lbs",
      material: "Premium PU Leather",
      maxWeight: "300 lbs",
    },
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity, selectedColor });
  };

  const handleBuyNow = () => {
    console.log("Buying now:", { product, quantity, selectedColor });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Sleek Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
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

      <div className="pt-16">
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
              {/* Duplicate items for smooth infinite scroll */}
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

      {/* Product Info */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 font-medium">{product.brand}</p>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-gray-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    {product.discount}% OFF
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
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
                <span className="text-sm font-medium text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm bg-orange-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-orange-700 font-medium">
                  Only {product.stock} items left in stock
                </span>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        w-10 h-10 rounded-full border-2 transition-all duration-200
                        ${color === selectedColor 
                          ? "border-blue-500 scale-110 shadow-lg" 
                          : "border-transparent hover:scale-105"
                        }
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="hover:bg-gray-100"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="hover:bg-gray-100"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 h-12 text-base font-medium"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  className="flex-1 h-12 text-base font-medium"
                  variant="secondary"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl p-1">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <Card className="p-6 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  {product.description}
                </Card>
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <Card className="p-6 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <ul className="list-disc list-inside space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-6">
                <Card className="p-6 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                  <dl className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4">
                        <dt className="font-medium capitalize text-gray-600">{key}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
