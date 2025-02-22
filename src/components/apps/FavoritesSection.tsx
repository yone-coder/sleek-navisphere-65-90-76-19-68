
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface FavoritesSectionProps {
  favoriteApps: Array<{
    name: string;
    icon: any;
    color: string;
    route: string;
    updates?: number;
  }>;
}

export const FavoritesSection = ({ favoriteApps }: FavoritesSectionProps) => {
  const navigate = useNavigate();

  if (favoriteApps.length === 0) return null;

  // Create groups of 4 apps
  const groups = favoriteApps.reduce((acc, app, i) => {
    const groupIndex = Math.floor(i / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(app);
    return acc;
  }, [] as typeof favoriteApps[]);

  return (
    <div className="mb-8 -mx-4 sm:-mx-6 md:-mx-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
        </div>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 px-4 sm:px-6 md:px-8">
          {groups.map((group, groupIndex) => (
            <div 
              key={groupIndex} 
              className="flex-none w-[320px] first:ml-0 animate-fade-in"
              style={{ 
                animationDelay: `${groupIndex * 100}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <div className="grid grid-cols-4 gap-4">
                {group.map((app) => (
                  <Button
                    key={app.name}
                    variant="ghost"
                    className="relative flex flex-col items-center gap-3 p-4 h-auto hover:scale-105 transition-transform duration-200 group rounded-xl hover:bg-gray-50"
                    onClick={() => navigate(app.route)}
                  >
                    <div 
                      className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative transition-transform duration-200 group-hover:shadow-lg group-hover:-translate-y-1`}
                    >
                      <app.icon className="w-10 h-10 text-white transition-transform duration-200 group-hover:scale-110" />
                      {app.updates > 0 && (
                        <Badge 
                          className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5 animate-bounce"
                          style={{ animationDuration: '2s' }}
                        >
                          {app.updates}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center line-clamp-2 group-hover:text-gray-900 transition-colors duration-200">
                      {app.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="px-4 sm:px-6 md:px-8 hover:bg-gray-200 transition-colors duration-200"
        />
      </ScrollArea>
    </div>
  );
};

