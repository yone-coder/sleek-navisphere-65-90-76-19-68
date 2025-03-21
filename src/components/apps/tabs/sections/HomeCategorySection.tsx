
import React from "react";
import { ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { App, AppCategory } from "../../types";

interface HomeCategorySectionProps {
  category: AppCategory;
  apps: App[];
  onAppClick: (app: App) => void;
  onToggleFavorite: (appName: string) => void;
  favorites: App[];
}

export function HomeCategorySection({ 
  category, 
  apps, 
  onAppClick, 
  onToggleFavorite,
  favorites
}: HomeCategorySectionProps) {
  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
        <button 
          className="flex items-center text-sm text-blue-500 font-medium"
          onClick={() => window.location.href = `/apps?category=${category}`}
        >
          See All <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {apps.map((app, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white shadow-sm relative"
            onClick={() => onAppClick(app)}
          >
            <div className={`h-12 w-12 rounded-xl ${app.color} flex items-center justify-center relative flex-shrink-0`}>
              {React.isValidElement(app.icon) ? (
                app.icon
              ) : (
                <app.icon className="h-6 w-6 text-white" />
              )}
              {app.updates > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {app.updates}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{app.name}</div>
              <div className="text-xs text-gray-500 truncate">{app.description}</div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-8 w-8 rounded-full opacity-0 hover:opacity-100 hover:bg-gray-100/50"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(app.name);
              }}
            >
              <Star className={`w-4 h-4 ${favorites.some(fav => fav.name === app.name) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
