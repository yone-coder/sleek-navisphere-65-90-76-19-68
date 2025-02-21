
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type ProductOptionsProps = {
  colors: Array<{
    name: string;
    value: string;
    class: string;
    hex: string;
  }>;
  sizes: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
};

export function ProductOptions({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  quantity,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}: ProductOptionsProps) {
  return (
    <div className="space-y-6 py-4 border-t border-gray-100">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Color</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 capitalize">{selectedColor}</span>
            <div 
              className={`w-4 h-4 rounded-full ${
                colors.find(c => c.value === selectedColor)?.class
              }`}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`
                group relative w-7 h-7 rounded-full ${color.class}
                transition-all duration-300 
                ${selectedColor === color.value 
                  ? 'ring-2 ring-offset-2 ring-[#0FA0CE] scale-110' 
                  : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 hover:scale-110'
                }
              `}
              aria-label={`Select ${color.name} color`}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {color.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Size</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{selectedSize}</span>
            <Badge variant="secondary" className="text-[10px] px-1.5">
              {sizes.find(s => s.value === selectedSize)?.label}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onSizeChange(size.value)}
              className={`
                group relative w-9 h-9 rounded-lg border text-sm font-medium
                transition-all duration-300
                ${selectedSize === size.value
                  ? 'bg-[#0FA0CE] text-white border-transparent scale-110 shadow-[0_0_10px_rgba(15,160,206,0.3)]'
                  : 'bg-white text-gray-900 border-gray-200 hover:border-[#0FA0CE] hover:text-[#0FA0CE] hover:scale-105'
                }
              `}
            >
              {size.value}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-max">
                <div className="font-medium mb-0.5">{size.label}</div>
                <div className="text-gray-300 text-[10px]">{size.description}</div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5">
              {quantity} {quantity === 1 ? 'unit' : 'units'}
            </Badge>
            {quantity >= 5 && (
              <Badge className="text-[10px] px-1.5 bg-blue-50 text-blue-600 border border-blue-100">
                Bulk Order
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-50 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={`
                relative group h-8 w-8 rounded-l-lg text-gray-600 
                hover:text-gray-900 hover:bg-gray-100
                ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1) {
                  onQuantityChange(val);
                }
              }}
              className="w-12 h-8 text-center text-sm font-medium bg-transparent border-x border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0FA0CE] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              className="relative group h-8 w-8 rounded-r-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => onQuantityChange(quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-medium"
            onClick={() => onQuantityChange(1)}
          >
            Reset
          </Button>
        </div>
        {quantity >= 5 && (
          <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            Bulk order discount of 5% will be applied at checkout
          </p>
        )}
      </div>
    </div>
  );
}
