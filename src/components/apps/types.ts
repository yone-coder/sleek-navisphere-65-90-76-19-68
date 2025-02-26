
import { LucideIcon } from "lucide-react";

// Make AppCategory a string literal union type
export type AppCategory = 
  | "All" 
  | "Shopping" 
  | "Finance" 
  | "Entertainment" 
  | "Gaming" 
  | "Analytics" 
  | "Social" 
  | "Communication" 
  | "System" 
  | "Education" 
  | "Work" 
  | "Business" 
  | "Content" 
  | "Nonprofit" 
  | "Food" 
  | "Services" 
  | "Real Estate";

export type IconComponent = LucideIcon;

export interface App {
  name: string;
  description: string;
  icon: IconComponent;
  route: string;
  color: string;
  category: AppCategory;
  status?: "new" | "popular";
  users?: string;
  lastUsed?: string;
  rating?: number;
  updates?: number;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

export interface AppControlsProps {
  selectedCategory: AppCategory;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: readonly AppCategory[]; // Updated to accept readonly array
  onCategoryChange: (category: AppCategory) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}

export type AppItem = App;
