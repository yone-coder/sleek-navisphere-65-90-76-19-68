
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Check, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { App } from "../types";

interface AppLibraryGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  installingApps?: string[];
  onInstall?: (appName: string) => void;
  viewMode?: "grid" | "list" | "folder";
}

export function AppLibraryGrid({ 
  apps, 
  favorites, 
  onToggleFavorite, 
  installingApps = [], 
  onInstall,
  viewMode = "grid" 
}: AppLibraryGridProps) {
  const navigate = useNavigate();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const handleAppClick = (app: App) => {
    if (app.name === "Chess") {
      navigate('/games/chess');
    } else if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route);
    }
  };

  const gridClassName = 
    viewMode === "folder" 
      ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-6 gap-x-3 p-4"
      : viewMode === "list"
      ? "flex flex-col gap-2 p-4"
      : "grid grid-cols-4 gap-y-6 gap-x-3 p-4";

  return (
    <div className={gridClassName}>
      {apps.map((app) => {
        const isInstalled = favorites.includes(app.name);
        const isInstalling = installingApps.includes(app.name);
        const isHovered = hoveredApp === app.name;

        return (
          <div
            key={app.name}
            className="flex flex-col items-center relative"
            onMouseEnter={() => setHoveredApp(app.name)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {/* App Icon */}
            <div
              className={`${app.color} w-[60px] h-[60px] rounded-[18px] flex items-center justify-center shadow-lg relative mb-1 cursor-pointer`}
              onClick={() => handleAppClick(app)}
            >
              <app.icon className="h-[32px] w-[32px] text-white" strokeWidth={1.5} />
              
              {/* Updates Badge */}
              {app.updates > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 bg-red-500 border-0 text-[10px] h-5 min-w-5 flex items-center justify-center p-0 rounded-full">
                  {app.updates}
                </Badge>
              )}
              
              {/* Installation Status Overlay */}
              {(isInstalled || isInstalling) && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                  {isInstalling ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>
              )}
            </div>
            
            {/* App Name */}
            <p className="text-xs font-medium text-gray-100 text-center max-w-[80px] truncate">
              {app.name}
            </p>
            
            {/* App Actions (visible on hover) */}
            {isHovered && !isInstalling && (
              <div className="absolute -right-2 top-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-gray-800/80 text-gray-100">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {isInstalled ? (
                      <DropdownMenuItem onClick={() => onToggleFavorite(app.name)}>
                        Remove from favorites
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onInstall && onInstall(app.name)}>
                        <Download className="mr-2 h-4 w-4" />
                        Install app
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleAppClick(app)}>
                      Open app
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
