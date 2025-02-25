import { motion } from "framer-motion";
import { App } from "./types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode: "grid" | "list";
}

export const AppGrid = ({ apps, favorites, onToggleFavorite, viewMode }: AppGridProps) => {
  const renderIcon = (icon: App["icon"]) => {
    if ('component' in icon && icon.component === 'img') {
      return <img {...icon.props} />;
    }
    const IconComponent = icon;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className={cn(
      "grid gap-4",
      viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
    )}>
      {apps.map((app) => (
        <motion.div
          key={app.name}
          className={cn(
            "rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col",
            viewMode === "list" ? "flex-row items-center gap-4" : ""
          )}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className={cn(
            "p-4 flex flex-col flex-1",
            viewMode === "list" ? "flex-row items-center gap-4" : ""
          )}>
            <div className="relative">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white",
                app.color
              )}>
                {renderIcon(app.icon)}
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-1">{app.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{app.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50 px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium rounded-md h-auto px-2 py-1 hover:bg-gray-100"
              onClick={() => window.open(app.route, "_blank")}
            >
              Open
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-7 w-7 rounded-md hover:bg-gray-100",
                favorites.includes(app.name) ? "text-yellow-500" : "text-gray-400"
              )}
              onClick={() => onToggleFavorite(app.name)}
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
