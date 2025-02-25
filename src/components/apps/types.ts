
import { LucideIcon } from "lucide-react";

export interface IconImage {
  component: 'img';
  props: {
    src: string;
    alt: string;
    className?: string;
  };
}

export type AppIcon = LucideIcon | IconImage;

export interface App {
  name: string;
  description: string;
  icon: AppIcon;
  route: string;
  color: string;
  category: string;
  status?: "new" | "popular";
  users?: string;
  lastUsed?: string;
  rating?: number;
  updates?: number;
}

export type AppItem = App;

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}
