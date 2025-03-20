import React from 'react';
import { Plus, Minus, Check, AlertCircle, HelpCircle } from 'lucide-react';
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
  price: number;
  discountPrice: number;
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
  price,
  discountPrice,
  sizes = [],
  selectedSize = '',
  onSelectSize = () => {}
}: ModishOptionsProps) {
  // Determine stock status
  const stockStatus = 
    stock === 0 ? 'Out of stock' :
    stock < 5 ? `Only ${stock} left` :
    stock < 20 ? `Limited supply` :
    'In stock';
  
  const stockStatusColor = 
    stock === 0 ? 'text-red-600 bg-red-50' :
    stock < 5 ? 'text-amber-600 bg-amber-50' :
    'text-green-600 bg-green-50';

  return (
    <div className="space-y-5 px-3">
      {/* Specification label */}
      <div className="text-sm font-medium text-gray-700 pb-1 border-b border-gray-100">Specifications</div>
      
      {/* Color Selection - AliExpress style */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-800">Color:</span>
            <span className="text-sm text-gray-500">
              {colors.find(c => c.value === selectedColor)?.name}
            </span>
          </div>
          {!selectedColor && (
            <div className="flex items-center text-xs text-red-500 gap-0.5">
              <AlertCircle className="h-3 w-3" />
              <span>Select a color</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              className={cn(
                "transition-all duration-200 relative overflow-hidden",
                selectedColor === color.value 
                  ? "ring-1 ring-black" 
                  : "border border-gray-300",
                "w-16 h-16 rounded-md"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() => onSelectColor(color.value)}
              aria-label={`Select ${color.name}`}
            >
              {selectedColor === color.value && (
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-black flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Size Selection - AliExpress style */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-800">Size:</span>
              <span className="text-sm text-gray-500">
                {selectedSize || 'Select size'}
              </span>
            </div>
            {!selectedSize && (
              <div className="flex items-center text-xs text-red-500 gap-0.5">
                <AlertCircle className="h-3 w-3" />
                <span>Select a size</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => size.available && onSelectSize(size.name)}
                disabled={!size.available}
                className={cn(
                  "px-3 py-2 rounded border transition-all min-w-[50px]",
                  !size.available && "opacity-50 bg-gray-100 text-gray-400 border-gray-200",
                  selectedSize === size.name
                    ? "border-black bg-black text-white" 
                    : size.available 
                      ? "border-gray-300 hover:border-gray-500" 
                      : "border-gray-200"
                )}
              >
                <span className="text-sm">{size.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <HelpCircle className="h-3 w-3" />
            <span>Size guide</span>
          </div>
        </div>
      )}
      
      {/* Quantity Selection - AliExpress style */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">Quantity:</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-sm",
            stockStatusColor
          )}>
            {stockStatus}
          </span>
        </div>
        
        <div className="flex items-center">
          <button
            className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </button>
          
          <input
            type="number"
            className="w-12 h-8 border-t border-b border-gray-300 text-center text-sm outline-none"
            value={quantity}
            readOnly
          />
          
          <button
            className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
            onClick={() => onUpdateQuantity(Math.min(stock, quantity + 1))}
            disabled={quantity >= stock}
          >
            <Plus className="w-3 h-3" />
          </button>
          
          <span className="ml-3 text-xs text-gray-500">
            {stock > 0 ? (
              <>Available: <span className="text-gray-800">{stock}</span></>
            ) : (
              "Out of stock"
            )}
          </span>
        </div>
      </div>
      
      {/* Total price - AliExpress style */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">Total Price:</span>
          <div className="flex items-baseline">
            <span className="text-xs text-red-500">US $</span>
            <span className="text-lg font-bold text-red-500">{(discountPrice * quantity).toFixed(2)}</span>
          </div>
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
