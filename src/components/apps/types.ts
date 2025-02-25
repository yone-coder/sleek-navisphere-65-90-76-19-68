
import { LucideIcon } from "lucide-react";

export type IconComponent = LucideIcon | (() => JSX.Element);

export interface App {
  name: string;
  description: string;
  icon: IconComponent;
  route: string;
  color: string;
  category: string;
  status?: string;
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

export type AppCategory = (typeof appCategories)[number];

export interface AppControlsProps {
  selectedCategory: string;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: readonly string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}
