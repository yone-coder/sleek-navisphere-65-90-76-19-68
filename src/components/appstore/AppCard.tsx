
import { Download, Check, Loader2, Star } from "lucide-react";
import { App } from "./types";

interface AppCardProps {
  app: App;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function AppCard({ app, onDownload, isDownloading = false }: AppCardProps) {
  return (
    <div className="space-y-2 group">
      <div className="aspect-square rounded-[22%] overflow-hidden bg-gray-100 relative shadow-sm">
        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
        {app.inAppPurchases && (
          <span className="absolute top-1 right-1 text-[9px] bg-black/60 text-white px-1 py-0.5 rounded-sm">
            In-App
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-xs text-gray-900 truncate">{app.name}</h3>
        <p className="text-[10px] text-gray-500 truncate">{app.category}</p>
        
        <div className="flex justify-between items-center">
          <button 
            className="text-xs py-1 px-3 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium"
            onClick={onDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 text-gray-700 animate-spin" />
            ) : app.price === 0 ? (
              "GET"
            ) : (
              `$${app.price.toFixed(2)}`
            )}
          </button>
          
          {app.downloads.includes("B+") && (
            <span className="text-[10px] text-gray-500">
              {app.rating.toFixed(1)} ★
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
