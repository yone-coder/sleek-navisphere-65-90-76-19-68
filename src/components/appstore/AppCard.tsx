
import React from "react";
import { App } from "./types";
import { Download } from "lucide-react";
import { iconComponents } from "./utils/appDataAdapter";

interface AppCardProps {
  app: App;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function AppCard({ app, onDownload, isDownloading = false }: AppCardProps) {
  // Determine whether the app is free or paid
  const isFree = app.price === 0;
  
  // Get the icon component
  const IconComponent = iconComponents[app.icon.name as string] || iconComponents.Store;
  const background = app.icon.background || "bg-blue-500";

  return (
    <div className="space-y-1">
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {/* App Icon with the actual Lucide component */}
        <div 
          className={`w-full h-full ${background.replace('bg-', 'bg-')} flex items-center justify-center`}
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
      </div>
    </div>
  );
}
