
import React, { useState } from 'react';
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Star, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'florida', name: 'Florida', color: '#8B5CF6', draws: 3 },
  { id: 'georgia', name: 'Georgia', color: '#D946EF', draws: 2 },
  { id: 'new-york', name: 'New York', color: '#F97316', draws: 4 },
  { id: 'france', name: 'France', color: '#0EA5E9', draws: 2 },
  { id: 'tennessee', name: 'Tennessee', color: '#10B981', draws: 2 },
  { id: 'texas', name: 'Texas', color: '#EF4444', draws: 3 },
  { id: 'california', name: 'California', color: '#F59E0B', draws: 1 },
  { id: 'illinois', name: 'Illinois', color: '#6366F1', draws: 2 },
];

interface BorletteCategoriesProps {
  showFavoritesOnly?: boolean;
}

export const BorletteCategories = ({ showFavoritesOnly = false }: BorletteCategoriesProps) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (categoryId: string) => {
    setFavorites(prev => {
      if (prev.includes(categoryId)) {
        toast({
          title: "Removed from favorites",
          description: `${categories.find(c => c.id === categoryId)?.name} removed from your favorites`,
          duration: 3000,
        });
        return prev.filter(id => id !== categoryId);
      } else {
        toast({
          title: "Added to favorites",
          description: `${categories.find(c => c.id === categoryId)?.name} added to your favorites`,
          duration: 3000,
        });
        return [...prev, categoryId];
      }
    });
  };

  const displayedCategories = showFavoritesOnly
    ? categories.filter(category => favorites.includes(category.id))
    : categories;

  return (
    <div className="grid grid-cols-2 gap-3">
      {displayedCategories.length === 0 && showFavoritesOnly && (
        <div className="col-span-2 text-center py-8 text-gray-500">
          No favorites added yet. Star categories to add them here.
        </div>
      )}
      
      {displayedCategories.map((category) => (
        <Card 
          key={category.id}
          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-gray-50"
        >
          <CardContent className="p-0">
            <div className="relative aspect-[3/2] p-4 flex flex-col justify-end">
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(45deg, ${category.color}22, ${category.color}11)`,
                  borderLeft: `4px solid ${category.color}`
                }} 
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(category.id);
                }}
                className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
              >
                <Star 
                  className={cn(
                    "h-4 w-4",
                    favorites.includes(category.id) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-400"
                  )} 
                />
              </Button>
              
              <h3 className="relative text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <div className="relative flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {category.draws} daily drawings
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Info className="h-3 w-3 text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        View {category.name} lottery information and statistics
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
