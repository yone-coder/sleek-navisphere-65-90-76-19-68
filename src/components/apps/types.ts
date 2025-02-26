
import { LucideIcon } from "lucide-react";

export type IconComponent = LucideIcon | (() => JSX.Element);

export interface App {
  name: string;
  description: string;
  icon: LucideIcon;  // Changed from IconComponent to LucideIcon
  route: string;
  color: string;
  category: string;
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

export type AppCategory = "All" | "Shopping" | "Finance" | "Entertainment" | "Gaming" | "Analytics" | "Social" | "Communication" | "System" | "Education" | "Work" | "Business" | "Content" | "Nonprofit" | "Food" | "Services" | "Real Estate";

export interface AppControlsProps {
  selectedCategory: AppCategory;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: AppCategory[];
  onCategoryChange: (category: AppCategory) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}

export type AppItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  route: string;
  color: string;
  category: string;
  status?: "new" | "popular";
  users?: string;
  lastUsed?: string;
  rating?: number;
  updates?: number;
};
