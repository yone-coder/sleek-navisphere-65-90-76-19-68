
export interface App {
  id: number;
  name: string;
  icon: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  size: string;
  age: string;
  price: number;
  developer: string;
  type: "app" | "game" | "arcade";
  downloads: string;
  inAppPurchases: boolean;
}
