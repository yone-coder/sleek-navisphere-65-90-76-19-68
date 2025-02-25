
import { LucideIcon } from "lucide-react";

export interface App {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
  route: string;
  users?: string;
  rating?: number;
  status?: "new" | "popular" | "stable";
  updates: number;
  lastUsed?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

export type AppCategory = typeof import("./data/appCategories").appCategories[number];

export interface AppControlsProps {
  selectedCategory: AppCategory;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: readonly string[];
  onCategoryChange: (category: AppCategory) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}
