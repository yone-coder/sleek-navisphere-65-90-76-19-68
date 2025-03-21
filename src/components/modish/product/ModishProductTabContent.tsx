
import React from 'react';
import { ModishDescription } from './ModishDescription';
import { ModishReviews } from './ModishReviews';
import { ModishQuestions } from './ModishQuestions';
import { ModishSimilar } from './ModishSimilar';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin } from 'lucide-react';

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
  features?: { title: string; description: string; icon: string; color: string; details: string; }[];
};

type ModishProductTabContentProps = {
  activeTab: string;
  productId: string;
  product: Product;
};

export function ModishProductTabContent({ activeTab, productId, product }: ModishProductTabContentProps) {
  return (
    <div id="tabContent" className="border-t border-gray-100 mt-2 pt-8">
      {activeTab === 'description' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Product Description</h2>
          <ModishDescription description={product.description} />
        </div>
      )}
      
      {activeTab === 'specs' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Product Specifications</h2>
          <div className="bg-gray-50 rounded-lg p-4 divide-y divide-gray-100">
            {[
              { name: "Brand", value: product.brand },
              { name: "Model", value: "BT-500" },
              { name: "Connectivity", value: "Bluetooth 5.0" },
              { name: "Battery Life", value: "Up to 10 hours" },
              { name: "Charging", value: "USB-C" },
              { name: "Water Resistance", value: "IPX7" },
              { name: "Weight", value: "350g" },
              { name: "Dimensions", value: "120 × 80 × 40 mm" },
            ].map((spec, index) => (
              <div key={index} className="flex py-3 first:pt-0 last:pb-0">
                <span className="text-sm text-gray-500 w-1/3">{spec.name}</span>
                <span className="text-sm text-gray-800 w-2/3">{spec.value}</span>
              </div>
            ))}
          </div>
          
          <h3 className="text-base font-medium text-gray-800 mt-5 mb-3">Technical Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { feature: "360° Sound", icon: "🔊" },
              { feature: "Water Resistant", icon: "💧" },
              { feature: "Voice Control", icon: "🎤" },
              { feature: "Long Battery", icon: "🔋" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'shipping' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Shipping Information</h2>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Ship from: {product.shipFrom}</span>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                International
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-500" />
              <span className="text-sm">Estimated delivery: <span className="font-medium">{product.estimatedDelivery}</span></span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <h3 className="font-medium text-sm mb-2">Shipping Options</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 rounded-md bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Standard Shipping</p>
                      <p className="text-xs text-gray-500">7-15 business days</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{product.freeShipping ? "Free" : "$4.99"}</p>
                </div>
                
                <div className="flex justify-between items-center p-2 rounded-md bg-white border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Express Shipping</p>
                      <p className="text-xs text-gray-500">3-7 business days</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">$12.99</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <h3 className="font-medium text-sm mb-2">Shipping Policies</h3>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-500 text-lg leading-none">•</span>
                  <span>Free standard shipping on orders over $50</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-500 text-lg leading-none">•</span>
                  <span>Processing time: 1-2 business days</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-500 text-lg leading-none">•</span>
                  <span>All orders are trackable via the provided tracking number</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'reviews' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Reviews</h2>
          <ModishReviews productId={productId} />
        </div>
      )}
      
      {activeTab === 'questions' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Questions & Answers</h2>
          <ModishQuestions productId={productId} />
        </div>
      )}
      
      {activeTab === 'similar' && (
        <div className="p-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Similar Products</h2>
          <ModishSimilar currentProductId={productId} />
        </div>
      )}
    </div>
  );
}
