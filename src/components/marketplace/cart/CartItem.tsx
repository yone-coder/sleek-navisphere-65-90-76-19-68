
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  color,
  size,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium truncate">{name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {color} · {size}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 -mt-2 text-gray-400 hover:text-gray-600"
              onClick={() => onRemove(id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center bg-gray-50 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-l-lg text-gray-500"
                onClick={() => onQuantityChange(id, quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-lg text-gray-500"
                onClick={() => onQuantityChange(id, quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            <span className="font-semibold">${price * quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
