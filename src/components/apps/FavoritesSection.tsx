
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

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
        </div>
      </div>
      <div className="relative">
        <ScrollArea className="w-full">
          <div className="flex pb-4">
            {favoriteApps.map((app) => (
              <div key={app.name} className="flex-none w-[120px] px-2 first:pl-0 last:pr-4">
                <Button
                  variant="ghost"
                  className="relative flex flex-col items-center gap-3 p-4 h-auto w-full group rounded-xl"
                  onClick={() => navigate(app.route)}
                >
                  <div 
                    className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}
                  >
                    <app.icon className="w-7 h-7 text-white" />
                    {app.updates > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
                        {app.updates}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center line-clamp-2">
                    {app.name}
                  </span>
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
