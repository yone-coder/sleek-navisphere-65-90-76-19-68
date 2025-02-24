
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
