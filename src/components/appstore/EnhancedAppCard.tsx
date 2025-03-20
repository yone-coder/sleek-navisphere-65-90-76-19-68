
import React from "react";
import { App } from "./types";
import { Download, Info, Star } from "lucide-react";
import { iconComponents } from "./utils/appDataAdapter";
import { getGradient } from "./utils/gradientUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EnhancedAppCardProps {
  app: App;
  onDownload?: () => void;
  isDownloading?: boolean;
  showRating?: boolean;
  showSize?: boolean;
}

export function EnhancedAppCard({ 
  app, 
  onDownload, 
  isDownloading = false,
  showRating = true,
  showSize = true
}: EnhancedAppCardProps) {
  // Determine whether the app is free or paid
  const isFree = app.price === 0;
  
  // Get the icon component
  const IconComponent = iconComponents[app.icon.name as string] || iconComponents.Store;
  const background = app.icon.background || "bg-blue-500";
  
  // Get the gradient based on the background color
  const gradientClass = getGradient(background);

  return (
    <div className="space-y-1">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {/* App Icon with the actual Lucide component and gradient background */}
        <div 
          className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
        >
          <IconComponent className="w-1/2 h-1/2 text-white" />
        </div>
        
        {/* Download button */}
        <button
          onClick={onDownload}
          className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm text-xs font-semibold py-1 px-2 rounded-full text-gray-800 hover:bg-white"
        >
          {isDownloading ? (
            <span className="inline-block animate-pulse">...</span>
          ) : isFree ? (
            "GET"
          ) : (
            `$${app.price.toFixed(2)}`
          )}
        </button>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-800 truncate" title={app.name}>{app.name}</h3>
        <p className="text-[10px] text-gray-500 truncate">{app.category}</p>
        
        {(showRating || showSize) && (
          <div className="flex items-center mt-1 gap-1">
            {showRating && (
              <div className="flex items-center">
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400 mr-0.5" />
                <span className="text-[10px] text-gray-500">{app.rating.toFixed(1)}</span>
              </div>
            )}
            
            {showRating && showSize && (
              <span className="text-[10px] text-gray-400">•</span>
            )}
            
            {showSize && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center text-[10px] text-gray-500">
                      <span>{app.size || "120 MB"}</span>
                      <Info className="w-2.5 h-2.5 ml-0.5 text-gray-400" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    <p>App size: {app.size || "120 MB"}</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
