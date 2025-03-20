
import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorOption = {
  name: string;
  value: string;
};

type SizeOption = {
  name: string;
  available: boolean;
};

type ModishOptionsProps = {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  stock: number;
  sizes?: SizeOption[];
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
};

export function ModishOptions({
  colors,
  selectedColor,
  onSelectColor,
  quantity,
  onUpdateQuantity,
  stock,
  sizes = [],
  selectedSize = '',
  onSelectSize = () => {}
}: ModishOptionsProps) {
  // Determine stock status
  const stockStatus = 
    stock === 0 ? 'Out of stock' :
    stock < 5 ? `Only ${stock} left` :
    'In stock';
  
  const stockStatusColor = 
    stock === 0 ? 'text-red-600 bg-red-50' :
    stock < 5 ? 'text-amber-600 bg-amber-50' :
    'text-green-600 bg-green-50';

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Color</h3>
          <span className="text-sm text-gray-500">
            {colors.find(c => c.value === selectedColor)?.name}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              className={cn(
                "w-9 h-9 rounded-full relative transition-all duration-300",
                selectedColor === color.value 
                  ? "ring-2 ring-offset-2 ring-black scale-110" 
                  : "hover:scale-110"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => onSelectColor(color.value)}
              aria-label={`Select ${color.name}`}
            >
              {selectedColor === color.value && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className={`w-4 h-4 ${getContrastColor(color.value)}`} />
                </span>
              )}
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Size Selection - New Feature */}
      {sizes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Size</h3>
            <span className="text-sm text-gray-500">
              {selectedSize || 'Select a size'}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.name}
                className={cn(
                  "h-9 min-w-[40px] px-3 rounded-md transition-all duration-200 font-medium text-sm",
                  !size.available && "opacity-40 cursor-not-allowed",
                  selectedSize === size.name
                    ? "bg-gray-900 text-white" 
                    : size.available 
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                      : "bg-gray-100 text-gray-400"
                )}
                onClick={() => size.available && onSelectSize(size.name)}
                disabled={!size.available}
              >
                {size.name}
              </button>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 italic">
            {selectedSize ? 'Size selected' : 'Please select a size'}
          </p>
        </div>
      )}
      
      {/* Quantity Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Quantity</h3>
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            stockStatusColor
          )}>
            {stockStatus}
          </span>
        </div>
        
        <div className="flex items-center">
          <button
            className="w-9 h-9 rounded-l-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors disabled:opacity-50"
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-9 flex items-center justify-center border-y border-gray-200 bg-white text-gray-900 font-medium">
            {quantity}
          </div>
          
          <button
            className="w-9 h-9 rounded-r-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors disabled:opacity-50"
            onClick={() => onUpdateQuantity(Math.min(stock, quantity + 1))}
            disabled={quantity >= stock}
          >
            <Plus className="w-4 h-4" />
          </button>
          
          <span className="ml-4 text-sm text-gray-500">
            {quantity === 1 ? '1 item' : `${quantity} items`}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors, black for light colors
  return luminance > 0.5 ? 'text-black' : 'text-white';
}
