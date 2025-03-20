
import React from "react";
import { App } from "./types";
import { Download, Star } from "lucide-react";
import { iconComponents } from "./utils/appDataAdapter";
import { getGradient } from "./utils/gradientUtils";

interface AppRankCardProps {
  app: App;
  rank: number;
  onDownload?: () => void;
}

export function AppRankCard({ app, rank, onDownload }: AppRankCardProps) {
  const isFree = app.price === 0;
  
  // Get the icon component
  const IconComponent = iconComponents[app.icon.name as string] || iconComponents.Store;
  const background = app.icon.background || "bg-blue-500";
  
  // Get the gradient based on the background color
  const gradientClass = getGradient(background);

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group">
      <span className="text-lg font-bold text-gray-400 w-5 text-center">{rank}</span>
      
      <div className={`w-12 h-12 rounded-[20%] bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden flex-shrink-0`}>
        <IconComponent className="w-7 h-7 text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{app.name}</h3>
        <p className="text-xs text-gray-500 truncate">{app.category}</p>
        <div className="flex items-center mt-0.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${
                  i < Math.floor(app.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 ml-1">{app.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <button 
        onClick={onDownload}
        className="bg-gray-100 text-xs font-semibold py-1 px-3 rounded-full text-gray-800 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
      >
        {isFree ? (
          <>
            <Download className="w-3 h-3" />
            <span>GET</span>
          </>
        ) : (
          `$${app.price.toFixed(2)}`
        )}
      </button>
    </div>
  );
}
