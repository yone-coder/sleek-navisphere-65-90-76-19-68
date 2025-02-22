
import { useState } from "react";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";
import { CartHeader } from "@/components/marketplace/cart/CartHeader";
import { CartItem } from "@/components/marketplace/cart/CartItem";
import { PromoCodeSection } from "@/components/marketplace/cart/PromoCodeSection";
import { OrderSummary, CheckoutButton } from "@/components/marketplace/cart/OrderSummary";
import { EmptyCart } from "@/components/marketplace/cart/EmptyCart";

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
    }
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
    }
  }
];

export default function MarketplaceCart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "summer10") {
      setIsPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <CartHeader itemCount={items.length} />

      <div className="pt-[60px] pb-[180px]">
        {items.length > 0 ? (
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <PromoCodeSection
              promoCode={promoCode}
              isPromoApplied={isPromoApplied}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={applyPromoCode}
            />

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>

      {items.length > 0 && <CheckoutButton total={total} />}
      <MarketplaceNav />
    </div>
  );
}
