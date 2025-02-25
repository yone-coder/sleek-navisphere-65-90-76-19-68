
import { Grid2X2, Clock, Star, ActivitySquare, ShoppingCart, Wallet, Play, Gamepad2, BarChart3, Users, MessageCircle, Settings, GraduationCap, Briefcase, Building2, FileText, Heart, Globe } from "lucide-react";
import type { Category } from "@/components/apps/types";

export const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2 },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "popular", label: "Popular", icon: Star },
  { id: "favorites", label: "Favorites", icon: Star }
];

export const appCategories = [
  "All",
  "Shopping",
  "Finance",
  "Entertainment",
  "Gaming",
  "Analytics",
  "Social",
  "Communication",
  "System",
  "Education",
  "Work",
  "Business",
  "Content",
  "Nonprofit",
  "Food",
  "Services",
  "Real Estate"
];
