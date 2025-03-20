
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Truck, 
  Shield, 
  Calendar, 
  Info, 
  MessageSquare,
  Users,
  Award,
  Clock,
  Package,
  Ruler
} from 'lucide-react';
import { ModishGallery } from '@/components/modish/product/ModishGallery';
import { ModishInfo } from '@/components/modish/product/ModishInfo';
import { ModishOptions } from '@/components/modish/product/ModishOptions';
import { ModishActions } from '@/components/modish/product/ModishActions';
import { ModishDescription } from '@/components/modish/product/ModishDescription';
import { ModishFeatures } from '@/components/modish/product/ModishFeatures';
import { ModishSizeGuide } from '@/components/modish/product/ModishSizeGuide';
import { ModishReviews } from '@/components/modish/product/ModishReviews';
import { ModishSimilar } from '@/components/modish/product/ModishSimilar';
import { ModishTrending } from '@/components/modish/product/ModishTrending';
import { ModishQuestions } from '@/components/modish/product/ModishQuestions';
import { ModishTabs } from '@/components/modish/product/ModishTabs';
import { DescriptionTab } from '@/components/product/tabs/DescriptionTab';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Define product type
type ProductType = {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  brand: string;
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
};

type ModishProductDetailsProps = {
  product: ProductType;
}

export function ModishProductDetails({ product }: ModishProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  // Extended product data - in a real app more would come from an API call
  const extendedProduct = {
    ...product,
    highlights: [
      "Active Noise Cancellation technology reduces ambient noise",
      "30-hour battery life on a single charge",
      "Premium memory foam ear cushions for extended comfort",
      "Built-in microphone with voice assistant support",
      "Fast charging - 5 minutes charge for 3 hours of playback",
      "Bluetooth 5.0 with seamless connectivity"
    ],
    specifications: {
      brand: product.brand,
      model: "ATH-NC700",
      color: "Black",
      connectivity: "Bluetooth 5.0, 3.5mm jack",
      batteryLife: "30 hours",
      weight: "250g",
      warranty: "2 years"
    },
    shipping: {
      methods: [
        { name: "Standard Shipping", price: 4.99, days: "3-5" },
        { name: "Express Shipping", price: 9.99, days: "1-2" },
        { name: "Free Shipping", price: 0, days: "5-7", minimumOrder: 50 }
      ],
      returns: "30-day free returns",
      warranty: "2-year manufacturer warranty"
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#0000FF" },
        { name: "Red", value: "#FF0000" }
      ],
      sizes: [
        { name: "One Size", available: true }
      ]
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specs', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping & Returns' },
    { id: 'reviews', label: 'Reviews', count: product.reviewCount },
    { id: 'questions', label: 'Q&A', count: 57 },
    { id: 'size-guide', label: 'Size Guide' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // Scroll to content and announce tab change
    document.getElementById('tab-content')?.scrollIntoView({ behavior: 'smooth' });
    
    toast({
      title: `Viewing ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`,
      duration: 1500,
    });
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleUpdateQuantity = (qty: number) => {
    setQuantity(qty);
  };

  return (
    <div className="pb-6">
      {/* Product Gallery */}
      <ModishGallery images={product.images} name={product.name} />
      
      {/* Product Info */}
      <div className="px-4 py-3">
        <ModishInfo 
          name={product.name}
          brand={product.brand}
          price={product.price}
          discountPrice={product.discountPrice}
          rating={product.rating}
          reviewCount={product.reviewCount}
          description={product.description}
        />
        
        {/* Quick stats bar */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span>2.4k+ bought this</span>
          </div>
          <div className="flex items-center">
            <Award className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span>Top Seller</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span>Fast Delivery</span>
          </div>
        </div>
        
        {/* Limited time offer */}
        <div className="mt-3">
          <div className="border border-red-100 bg-red-50 rounded-md px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500">DEAL</Badge>
              <div>
                <p className="text-gray-700 text-xs">Limited time offer</p>
                <p className="text-red-500 text-xs font-medium">Extra 10% off today</p>
              </div>
            </div>
            <div className="text-xs text-red-500 font-bold">05:34:21</div>
          </div>
        </div>
      </div>
      
      {/* Options Selection */}
      <div className="px-4 mt-2">
        <ModishOptions
          colors={extendedProduct.variants.colors}
          selectedColor={selectedColor}
          onSelectColor={handleColorSelect}
          quantity={quantity}
          onUpdateQuantity={handleUpdateQuantity}
          stock={product.stock}
          price={product.price}
          discountPrice={product.discountPrice}
          sizes={extendedProduct.variants.sizes}
          selectedSize={selectedSize}
          onSelectSize={handleSizeSelect}
        />
      </div>
      
      {/* Shipping Information */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Truck className="h-4 w-4 text-gray-500" />
          <div>
            <span>Ships to United States </span>
            <span className="text-green-600">Free</span>
            <span> on orders above $50</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
          <Package className="h-4 w-4 text-gray-500" />
          <div>
            <span>Estimated delivery: </span>
            <span className="font-medium">Aug 24 - Aug 26</span>
          </div>
        </div>
      </div>
      
      {/* Warranty and Returns */}
      <div className="px-4 mt-4 flex gap-3">
        <div className="flex-1 flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1.5">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-xs">2-Year Warranty</span>
        </div>
        
        <div className="flex-1 flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1.5">
          <Calendar className="h-4 w-4 text-green-500" />
          <span className="text-xs">30-Day Returns</span>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="sticky top-[97px] bg-white z-10 mt-6">
        <ModishTabs 
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>
      
      {/* Tab Content */}
      <div id="tab-content" className="px-4 py-4">
        {activeTab === 'description' && (
          <DescriptionTab 
            description={product.description}
            highlights={extendedProduct.highlights}
          />
        )}
        
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technical Specifications</h3>
            <div className="space-y-2">
              {Object.entries(extendedProduct.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-100 py-2">
                  <div className="w-1/3 text-gray-500 capitalize">{key}</div>
                  <div className="w-2/3 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'shipping' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-medium mb-3">Shipping Options</h3>
              <div className="space-y-3">
                {extendedProduct.shipping.methods.map((method, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">Estimated delivery: {method.days} business days</div>
                      {method.minimumOrder && (
                        <div className="text-xs text-green-600">Free for orders over ${method.minimumOrder}</div>
                      )}
                    </div>
                    <div className="font-medium">
                      {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Returns & Warranty</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Returns Policy</div>
                    <div className="text-sm text-gray-600">{extendedProduct.shipping.returns}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Warranty Information</div>
                    <div className="text-sm text-gray-600">{extendedProduct.shipping.warranty}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <ModishReviews productId={product.id} />
        )}
        
        {activeTab === 'questions' && (
          <ModishQuestions productId={product.id} />
        )}
        
        {activeTab === 'size-guide' && (
          <ModishSizeGuide />
        )}
      </div>
      
      {/* Trending Products */}
      <div className="mt-6 px-4">
        <ModishTrending />
      </div>
      
      {/* Similar Products */}
      <div className="mt-6 px-4">
        <ModishSimilar currentProductId={product.id} />
      </div>
      
      {/* Product Actions */}
      <ModishActions />
    </div>
  );
}
