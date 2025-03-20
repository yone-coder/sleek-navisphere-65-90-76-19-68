
import React, { useState } from 'react';
import { Ruler, Info, Check, ChevronDown, ChevronRight, Search, Smartphone, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Size = {
  name: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  weight: number;
  description: string;
};

export function ModishSizeGuide() {
  const [expanded, setExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>("medium");
  const [measurementUnit, setMeasurementUnit] = useState<'in' | 'cm'>('in');
  const [showComparisonTool, setShowComparisonTool] = useState(false);
  const [referenceObject, setReferenceObject] = useState<string>("phone");
  const { toast } = useToast();

  // Mock size data
  const sizes: Record<string, Size> = {
    small: {
      name: "Small",
      dimensions: {
        width: 3.5,
        height: 5.8,
        depth: 2.1,
      },
      weight: 0.6,
      description: "Compact size, perfect for travel or personal listening"
    },
    medium: {
      name: "Medium",
      dimensions: {
        width: 4.7,
        height: 7.2,
        depth: 2.8,
      },
      weight: 0.9,
      description: "Standard size, great for everyday use"
    },
    large: {
      name: "Large",
      dimensions: {
        width: 5.9,
        height: 9.1,
        depth: 3.5,
      },
      weight: 1.2,
      description: "Larger size for enhanced audio quality"
    }
  };

  // Reference objects for size comparison
  const referenceObjects = {
    phone: { name: "Smartphone", width: 2.8, height: 5.8, depth: 0.3 },
    card: { name: "Credit Card", width: 3.4, height: 2.1, depth: 0.03 },
    can: { name: "Soda Can", width: 2.6, height: 4.8, depth: 2.6 },
    mug: { name: "Coffee Mug", width: 3.5, height: 3.8, depth: 3.5 }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
  
  const toggleUnit = () => {
    setMeasurementUnit(prev => prev === 'in' ? 'cm' : 'in');
  };
  
  const formatDimension = (value: number): string => {
    if (measurementUnit === 'cm') {
      return (value * 2.54).toFixed(1);
    }
    return value.toFixed(1);
  };
  
  const formatWeight = (value: number): string => {
    if (measurementUnit === 'cm') {
      // If we're in metric, convert lbs to kg
      return (value * 0.454).toFixed(1);
    }
    return value.toFixed(1);
  };
  
  const getWeightUnit = (): string => {
    return measurementUnit === 'cm' ? 'kg' : 'lbs';
  };
  
  const toggleComparisonTool = () => {
    setShowComparisonTool(!showComparisonTool);
  };
  
  const handleReferenceChange = (reference: string) => {
    setReferenceObject(reference);
  };
  
  const handleFindInStore = () => {
    toast({
      title: "Find In Store",
      description: "This feature would help users find the product in physical stores",
      duration: 2000,
    });
  };

  const getSelectedSizeData = () => {
    return selectedSize ? sizes[selectedSize] : null;
  };
  
  const selectedSizeData = getSelectedSizeData();
  const referenceData = referenceObjects[referenceObject as keyof typeof referenceObjects];

  return (
    <div className="mt-4">
      <div 
        className="bg-gray-50 rounded-lg p-3 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-800">Size & Dimensions</span>
          </div>
          {expanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="bg-white p-3 border border-gray-200 rounded-lg mt-2 animate-fade-in">
          {/* Size selector */}
          <div className="flex gap-2 mb-4">
            {Object.keys(sizes).map((size) => (
              <button
                key={size}
                className={cn(
                  "flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-colors",
                  selectedSize === size
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleSizeClick(size)}
              >
                {sizes[size].name}
                {selectedSize === size && <Check className="h-4 w-4 ml-1 inline-block" />}
              </button>
            ))}
          </div>
          
          {/* Unit toggle */}
          <div className="flex justify-end mb-3">
            <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
              <button
                className={cn(
                  "px-3 py-1 text-xs font-medium",
                  measurementUnit === 'in'
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                )}
                onClick={toggleUnit}
              >
                in
              </button>
              <button
                className={cn(
                  "px-3 py-1 text-xs font-medium",
                  measurementUnit === 'cm'
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                )}
                onClick={toggleUnit}
              >
                cm
              </button>
            </div>
          </div>
          
          {/* Dimensions display */}
          {selectedSizeData && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <div className="text-xs text-gray-500">Width</div>
                  <div className="font-medium">{formatDimension(selectedSizeData.dimensions.width)} {measurementUnit}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <div className="text-xs text-gray-500">Height</div>
                  <div className="font-medium">{formatDimension(selectedSizeData.dimensions.height)} {measurementUnit}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded-md text-center">
                  <div className="text-xs text-gray-500">Depth</div>
                  <div className="font-medium">{formatDimension(selectedSizeData.dimensions.depth)} {measurementUnit}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <div className="text-xs text-gray-500">Weight</div>
                <div className="font-medium">{formatWeight(selectedSizeData.weight)} {getWeightUnit()}</div>
              </div>
              
              <div className="p-2">
                <div className="text-sm">{selectedSizeData.description}</div>
              </div>
            </div>
          )}
          
          {/* Size comparison tool */}
          <div className="mt-4 border-t border-gray-200 pt-3">
            <button
              className="flex items-center justify-between w-full text-left text-sm font-medium text-blue-600"
              onClick={toggleComparisonTool}
            >
              <div className="flex items-center gap-1.5">
                <Smartphone className="h-4 w-4" />
                <span>Compare with everyday objects</span>
              </div>
              {showComparisonTool ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {showComparisonTool && selectedSizeData && (
              <div className="mt-3 animate-fade-in">
                {/* Reference object selector */}
                <div className="grid grid-cols-4 gap-1 mb-3">
                  {(Object.keys(referenceObjects) as Array<keyof typeof referenceObjects>).map((key) => (
                    <button
                      key={key}
                      className={cn(
                        "py-1 px-2 text-xs rounded-md border transition-colors",
                        referenceObject === key
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : "bg-white border-gray-200 text-gray-600"
                      )}
                      onClick={() => handleReferenceChange(key)}
                    >
                      {referenceObjects[key].name}
                    </button>
                  ))}
                </div>
                
                {/* Visual comparison */}
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="relative">
                    {/* Product size representation */}
                    <div 
                      className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30 rounded-md z-10"
                      style={{
                        width: `${selectedSizeData.dimensions.width * 20}px`,
                        height: `${selectedSizeData.dimensions.height * 10}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-blue-700 font-medium whitespace-nowrap">
                        {selectedSizeData.name} Size
                      </div>
                    </div>
                    
                    {/* Reference object representation */}
                    <div 
                      className="border-2 border-gray-400 bg-gray-200 bg-opacity-40 rounded-md"
                      style={{
                        width: `${referenceData.width * 20}px`,
                        height: `${referenceData.height * 10}px`,
                        margin: '60px auto',
                      }}
                    >
                      <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                        {referenceData.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Size comparison data */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">Comparison</div>
                    <div className="text-sm font-medium">
                      {selectedSizeData.dimensions.width > referenceData.width ? "Wider" : "Narrower"} by {formatDimension(Math.abs(selectedSizeData.dimensions.width - referenceData.width))} {measurementUnit}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="text-xs text-gray-500">Height</div>
                    <div className="text-sm font-medium">
                      {selectedSizeData.dimensions.height > referenceData.height ? "Taller" : "Shorter"} by {formatDimension(Math.abs(selectedSizeData.dimensions.height - referenceData.height))} {measurementUnit}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-3 gap-1 text-xs text-gray-500">
                  <Info className="h-3 w-3" />
                  <span>Approximate visual representation. Not drawn to exact scale.</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Find in store button */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={handleFindInStore}
            >
              <Search className="h-4 w-4 mr-2" />
              Find In-Store
            </Button>
          </div>
          
          {/* Size recommendation */}
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2 flex items-center">
            <ThumbsUp className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <div className="text-xs text-green-700">
              Most customers find the <span className="font-medium">Medium</span> size perfect for everyday use.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
