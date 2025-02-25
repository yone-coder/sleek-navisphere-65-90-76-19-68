
import { LucideIcon } from "lucide-react";

export type IconComponent = LucideIcon;

export interface ImageIcon {
  component: 'img';
  props: {
    src: string;
    alt: string;
    className?: string;
  };
}

export interface App {
  name: string;
  description: string;
  icon: LucideIcon | ImageIcon;
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
