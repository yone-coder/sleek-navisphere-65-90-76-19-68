
import { Grid2X2, Clock, Star } from "lucide-react";
import type { Category } from "../types";

export const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2 },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "popular", label: "Popular", icon: Star },
  { id: "favorites", label: "Favorites", icon: Star }
];
