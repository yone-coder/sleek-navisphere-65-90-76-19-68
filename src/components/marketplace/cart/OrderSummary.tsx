
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export const OrderSummary = ({ subtotal, discount, shipping, total }: OrderSummaryProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50/50 px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield className="h-3.5 w-3.5" />
          <span>Secure checkout with buyer protection</span>
        </div>
      </div>
    </div>
  );
};

export const CheckoutButton = ({ total }: { total: number }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/95">
      <Button 
        className="w-full h-12 text-base flex items-center justify-between px-6"
        onClick={() => navigate('/checkout')}
      >
        <span className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Proceed to Checkout
        </span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <p className="text-xs text-center text-gray-500 mt-2">
        Free shipping on orders over $500
      </p>
    </div>
  );
};
