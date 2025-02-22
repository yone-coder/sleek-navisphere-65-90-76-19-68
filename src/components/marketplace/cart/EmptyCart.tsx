
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
          alt="Empty cart"
          className="w-full h-48 object-cover rounded-2xl mb-6"
        />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button
          className="w-full"
          onClick={() => navigate('/marketplace')}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
