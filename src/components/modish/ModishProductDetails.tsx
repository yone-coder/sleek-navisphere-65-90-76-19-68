
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useHeaderHeight } from '@/hooks/use-header-height';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ModishGallery } from '@/components/modish/product/ModishGallery';
import { ModishReviews } from '@/components/modish/product/ModishReviews';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  options: {
    color: string[];
    size: string[];
  };
};

interface ModishProductDetailsProps {
  productId: string;
  price: number;
  discountPrice?: number;
  headerHeight?: number;
}

export function ModishProductDetails({ productId, price, discountPrice, headerHeight = 0 }: ModishProductDetailsProps) {
  const [product, setProduct] = useState<Product>({
    id: productId,
    name: "Awesome Speaker",
    description: "Experience sound like never before with our Awesome Speaker. Feel the deep bass and crystal-clear highs.",
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
    ],
    price: price,
    discountPrice: discountPrice,
    options: {
      color: ["Black", "White", "Blue"],
      size: ["Small", "Medium", "Large"],
    },
  });
  const [activeTab, setActiveTab] = useState('description');
  const [isAddToCartFloatingVisible, setIsAddToCartFloatingVisible] = useState(false);
  const headerSpacerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [colorSelectModalOpen, setColorSelectModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerSpacerRef.current) {
        const rect = headerSpacerRef.current.getBoundingClientRect();
        setIsAddToCartFloatingVisible(rect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mock loading state
  const loading = false;

  return (
    <div 
      className="pb-20"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Header Spacer - Required for floating add to cart */}
      <div ref={headerSpacerRef}></div>

      {/* Toolbar spacer - Required for fixed toolbar */}
      <div className="block md:hidden h-12"></div>
      
      <ModishGallery 
        images={product.images}
        name={product.name}
      />
      
      {/* Realtime alert */}
      <div className="sticky top-[calc(var(--header-height)+10px)] z-40">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <Badge className="w-full justify-center rounded-none border-0 bg-secondary text-secondary-foreground">
            Hurry Up! 32 people are currently viewing this product
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 sm:py-6 lg:py-8 space-y-2">
          {/* Name and Price */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-800 text-xl font-bold sm:text-2xl">
                {product.name}
              </h1>
              <p className="text-gray-500 text-sm">
                Brand: <span className="font-medium">Awesome</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
              {product.discountPrice && (
                <span className="text-red-500 line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="text-gray-800 text-lg font-bold">
                ${(product.discountPrice || product.price).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Color */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 text-sm font-medium">Color</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm">
                      Select Color
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[400px]">
                    <SheetHeader>
                      <SheetTitle>Select Color</SheetTitle>
                      <SheetDescription>
                        Choose your prefered color.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-4">
                      {product.options.color.map((color) => (
                        <Button
                          key={color}
                          variant="outline"
                          className={cn(
                            "justify-start rounded-md text-sm",
                            selectedColor === color ? "bg-secondary" : ""
                          )}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {selectedColor && (
                <p className="text-gray-500 text-sm mt-1">
                  Selected color: <span className="font-medium">{selectedColor}</span>
                </p>
              )}
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-gray-600 text-sm font-medium">Size</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm">
                      Select Size
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[400px]">
                    <SheetHeader>
                      <SheetTitle>Select Size</SheetTitle>
                      <SheetDescription>
                        Choose your prefered size.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-4">
                      {product.options.size.map((size) => (
                        <Button
                          key={size}
                          variant="outline"
                          className={cn(
                            "justify-start rounded-md text-sm",
                            selectedSize === size ? "bg-secondary" : ""
                          )}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {selectedSize && (
                <p className="text-gray-500 text-sm mt-1">
                  Selected size: <span className="font-medium">{selectedSize}</span>
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
              Add to cart
            </Button>
            <Button variant="outline" size="lg">
              Add to wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="border-b">
            <nav className="flex gap-4" aria-label="Tabs">
              <button
                type="button"
                className={cn(
                  "py-4 px-1 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none transition-colors",
                  activeTab === 'description'
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                type="button"
                className={cn(
                  "py-4 px-1 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none transition-colors",
                  activeTab === 'reviews'
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                type="button"
                className={cn(
                  "py-4 px-1 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none transition-colors",
                  activeTab === 'questions'
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('questions')}
              >
                Questions
              </button>
              <button
                type="button"
                className={cn(
                  "py-4 px-1 font-medium text-sm whitespace-nowrap border-b-2 focus:outline-none transition-colors",
                  activeTab === 'shipping'
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-2 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-4 sm:py-6 lg:py-8">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                {product.description}
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Features</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>High-quality sound</li>
                      <li>Deep bass</li>
                      <li>Crystal-clear highs</li>
                      <li>Wireless connection</li>
                      <li>Long battery life</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Specifications</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Dimensions: 10 x 5 x 3 inches</li>
                      <li>Weight: 1.2 pounds</li>
                      <li>Battery life: Up to 12 hours</li>
                      <li>Wireless range: Up to 30 feet</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        
        {activeTab === 'reviews' && (
          <div className="p-3">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Reviews</h2>
            <ModishReviews 
              productId={productId}
            />
          </div>
        )}
        
          {activeTab === 'questions' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Questions & Answers
              </h2>
              <p className="text-gray-700">
                No questions yet. Be the first to ask!
              </p>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Shipping Information
              </h2>
              <p className="text-gray-700">
                We ship worldwide! Delivery times vary depending on your
                location.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Add to Cart Button */}
      {isAddToCartFloatingVisible && isMobile && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 z-50">
          <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to cart
          </Button>
        </div>
      )}

      {/* Size Guide Modal */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="sm">
            View Size Guide
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>Size Guide</SheetTitle>
            <SheetDescription>
              Find your perfect fit.
            </SheetDescription>
          </SheetHeader>
          <p>This is a mock size guide.</p>
        </SheetContent>
      </Sheet>

      {/* Color Select Modal */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="sm">
            Select Color
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>Select Color</SheetTitle>
            <SheetDescription>
              Choose your prefered color.
            </SheetDescription>
          </SheetHeader>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-4">
            {product.options.color.map((color) => (
              <Button
                key={color}
                variant="outline"
                className={cn(
                  "justify-start rounded-md text-sm",
                  selectedColor === color ? "bg-secondary" : ""
                )}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
