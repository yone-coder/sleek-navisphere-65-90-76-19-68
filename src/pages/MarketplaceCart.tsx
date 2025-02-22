import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ChevronRight, Tag, CreditCard, Gift, Shield, Truck, PackageCheck, Store, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
  seller: {
    name: string;
    verified: boolean;
  };
  deliveryEstimate: string;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
}

const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Gaming Chair XR-500",
    price: 299,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300",
    quantity: 1,
    color: "Black",
    size: "Standard",
    seller: {
      name: "Pro Gaming Store",
      verified: true
    },
    deliveryEstimate: "2-4 days",
    stockStatus: "in_stock"
  },
  {
    id: "2",
    name: "Mechanical Keyboard K95",
    price: 159,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300",
    quantity: 2,
    color: "RGB",
    size: "Full",
    seller: {
      name: "Pro Gaming Store",
      verified: true
    },
    deliveryEstimate: "1-2 days",
    stockStatus: "low_stock"
  }
];

export default function MarketplaceCart() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [savingForLater, setSavingForLater] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal - discount + shipping;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setSavingForLater(true);
    setTimeout(() => {
      setItems(items.filter(item => item.id !== id));
      setSavingForLater(false);
    }, 500);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "summer10") {
      setIsPromoApplied(true);
    }
  };

  const getStockStatusBadge = (status: CartItem["stockStatus"]) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>;
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Out of Stock</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 max-w-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Shopping Cart ({totalItems} items)</h1>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100">
          <div className="h-full bg-primary transition-all duration-300"
               style={{ width: items.length ? "50%" : "25%" }} />
        </div>
      </div>

      {/* Content */}
      <div className="pt-[60px] pb-[140px]">
        {items.length > 0 ? (
          <div className="px-4 py-6 space-y-6 max-w-xl mx-auto">
            {/* Delivery Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-gray-600">All items will arrive between Feb 20 - Feb 24</p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-fade-in"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      {getStockStatusBadge(item.stockStatus)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {item.color} · {item.size}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                            <Store className="h-3.5 w-3.5" />
                            <span>{item.seller.name}</span>
                            {item.seller.verified && (
                              <Badge variant="secondary" className="h-4">Verified</Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 -mr-2 -mt-2 text-gray-400 hover:text-gray-600"
                          onClick={() => removeItem(item.id)}
                          disabled={savingForLater}
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
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-lg text-gray-500"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">${item.price * item.quantity}</span>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Delivery in {item.deliveryEstimate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={applyPromoCode}
                  disabled={isPromoApplied}
                >
                  {isPromoApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {isPromoApplied && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <Badge className="h-4 bg-green-100 text-green-600 hover:bg-green-100">10% OFF</Badge>
                  Promo code applied successfully!
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
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
                    <div className="text-right">
                      <span className="text-lg">${total}</span>
                      {shipping === 0 && (
                        <p className="text-xs text-green-600">Free shipping applied</p>
                      )}
                    </div>
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
          </div>
        ) : (
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
        )}
      </div>

      {/* Checkout Button */}
      {items.length > 0 && (
        <div className="fixed bottom-12 left-0 right-0 p-3 bg-gradient-to-t from-white via-white to-white/95">
          <div className="max-w-xl mx-auto">
            <Button 
              className="w-full h-10 text-base flex items-center justify-between px-6"
              onClick={() => navigate('/checkout')}
            >
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Proceed to Checkout
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-center text-gray-500 mt-1.5">
              Free shipping on orders over $500
            </p>
          </div>
        </div>
      )}

      <MarketplaceNav />
    </div>
  );
}
