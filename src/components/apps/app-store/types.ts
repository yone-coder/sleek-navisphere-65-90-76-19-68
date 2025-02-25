
import { App, Category } from "../types";

export interface AppStoreData {
  apps: App[];
  categories: Category[];
  appCategories: string[];
  activeTab: string;
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortBy: "name" | "rating" | "users";
  favorites: string[];
  showUpdatesOnly: boolean;
}

export interface AppFilterProps {
  selectedCategory: string;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}

export interface AppDisplayProps {
  apps: App[];
  activeTab: string;
  selectedCategory: string;
  viewMode: "grid" | "list";
  sortBy: "name" | "rating" | "users";
  showUpdatesOnly: boolean;
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
}
