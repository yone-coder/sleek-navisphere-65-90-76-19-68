
import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColorOption = {
  name: string;
  value: string;
};

type ModishOptionsProps = {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  stock: number;
};

export function ModishOptions({
  colors,
  selectedColor,
  onSelectColor,
  quantity,
  onUpdateQuantity,
  stock
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
