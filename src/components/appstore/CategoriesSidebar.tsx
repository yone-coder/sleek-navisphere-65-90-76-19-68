
import React from "react";
import { 
  BookOpen, Camera, Code, Headphones, Heart, 
  LineChart, MessagesSquare, ShoppingBag, Sparkles, 
  Gamepad2, Grid3X3, Play, Store 
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All Apps", icon: Grid3X3 },
  { name: "Games", icon: Gamepad2 },
  { name: "Entertainment", icon: Play },
  { name: "Social", icon: MessagesSquare },
  { name: "Productivity", icon: LineChart },
  { name: "Education", icon: BookOpen },
  { name: "Utilities", icon: Code },
  { name: "Health & Fitness", icon: Heart },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Photo & Video", icon: Camera },
  { name: "Music", icon: Headphones },
  { name: "AR Apps", icon: Sparkles },
];

interface CategoriesSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoriesSidebar({ 
  isOpen, 
  setIsOpen, 
  activeCategory, 
  setActiveCategory 
}: CategoriesSidebarProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 space-y-0.5 overflow-y-auto h-[calc(100%-65px)]">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 w-full rounded-lg text-left",
                  activeCategory === category.name 
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                )}
                onClick={() => {
                  setActiveCategory(category.name);
                  setIsOpen(false);
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
