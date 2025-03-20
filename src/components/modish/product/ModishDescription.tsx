
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModishDescriptionProps = {
  description: string;
};

export function ModishDescription({ description }: ModishDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  // Sample specifications for a product - this would come from API in real app
  const specifications = [
    { name: "Brand", value: "AudioTech" },
    { name: "Model", value: "BT-500" },
    { name: "Connectivity", value: "Bluetooth 5.0" },
    { name: "Battery Life", value: "Up to 10 hours" },
    { name: "Charging", value: "USB-C" },
    { name: "Water Resistance", value: "IPX7" },
    { name: "Weight", value: "350g" },
    { name: "Dimensions", value: "120 × 80 × 40 mm" },
  ];

  return (
    <div className="p-3 border-t border-gray-100 mt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Product Details</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-full hover:bg-gray-100"
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      <div className={cn(
        "mt-3 text-gray-700 transition-all overflow-hidden",
        expanded ? "max-h-[1000px]" : "max-h-[180px]"
      )}>
        {/* Product description */}
        <div className="mb-5">
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
        
        {/* Product specifications - AliExpress style */}
        <div className="mt-5">
          <h3 className="text-base font-medium text-gray-800 mb-3">Specifications</h3>
          <div className="bg-gray-50 rounded-lg p-3.5 divide-y divide-gray-100">
            {specifications.map((spec, index) => (
              <div key={index} className="flex py-2.5 first:pt-0 last:pb-0">
                <span className="text-sm text-gray-500 w-1/3">{spec.name}</span>
                <span className="text-sm text-gray-800 w-2/3">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Packaging & Shipping - AliExpress style */}
        <div className="mt-5">
          <h3 className="text-base font-medium text-gray-800 mb-3">Packaging & Shipping</h3>
          <div className="bg-gray-50 rounded-lg p-3.5">
            <p className="text-sm text-gray-700 mb-2">
              Each unit is carefully packaged to ensure safe delivery. 
              The package includes the speaker, USB-C charging cable, user manual, and a carrying pouch.
            </p>
            <p className="text-sm text-gray-700">
              Standard shipping takes 10-20 business days. Express shipping (3-7 days) available at checkout.
            </p>
          </div>
        </div>
      </div>
      
      {!expanded && (
        <div className="relative">
          <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-1 mx-auto mt-2 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            View More <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
