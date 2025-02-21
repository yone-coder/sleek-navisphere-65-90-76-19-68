
import { useState } from "react";
import { StarIcon, Heart, Share2, ShoppingCart, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  // Simulated product data - in a real app, this would come from an API
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
      "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=800&h=600&fit=crop",
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
    // Add to cart logic here
    console.log("Added to cart:", { product, quantity, selectedColor });
  };

  const handleBuyNow = () => {
    // Buy now logic here
    console.log("Buying now:", { product, quantity, selectedColor });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive" className="ml-2">
                  {product.discount}% OFF
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">
                Only {product.stock} items left in stock
              </span>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-8 h-8 rounded-full border-2
                      ${color === selectedColor 
                        ? "border-blue-500" 
                        : "border-transparent"
                      }
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>
              <Button
                className="flex-1"
                variant="secondary"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card className="p-4">{product.description}</Card>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <Card className="p-4">
                  <ul className="list-disc list-inside space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <Card className="p-4">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2">
                        <dt className="font-medium capitalize">{key}</dt>
                        <dd className="text-gray-600">{value}</dd>
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
