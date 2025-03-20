
import { Download, Check, Loader2, Star, Info } from "lucide-react";
import { App } from "./types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AppCardProps {
  app: App;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function AppCard({ app, onDownload, isDownloading = false }: AppCardProps) {
  const [showRating, setShowRating] = useState(false);
  
  return (
    <Dialog>
      <div className="space-y-2 group">
        <DialogTrigger className="w-full text-left">
          <div className="aspect-square rounded-[22%] overflow-hidden bg-gray-100 relative shadow-sm 
                       transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
            {app.inAppPurchases && (
              <span className="absolute top-1 right-1 text-[9px] bg-black/60 text-white px-1 py-0.5 rounded-sm">
                In-App
              </span>
            )}
          </div>
        </DialogTrigger>
        
        <div className="space-y-1">
          <h3 className="font-medium text-xs text-gray-900 truncate">{app.name}</h3>
          <p className="text-[10px] text-gray-500 truncate">{app.category}</p>
          
          <div 
            className="flex justify-between items-center"
            onMouseEnter={() => setShowRating(true)}
            onMouseLeave={() => setShowRating(false)}
          >
            <button 
              className="text-xs py-1 px-3 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium flex items-center justify-center w-14 h-7"
              onClick={(e) => {
                e.stopPropagation();
                onDownload && onDownload();
              }}
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
            
            {showRating ? (
              <div className="flex items-center gap-0.5 animate-fade-in">
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] text-gray-500">
                  {app.rating.toFixed(1)}
                </span>
              </div>
            ) : app.downloads.includes("B+") && (
              <span className="text-[10px] text-gray-500">
                {app.rating.toFixed(1)} ★
              </span>
            )}
          </div>
        </div>
      </div>
      
      <DialogContent className="w-[90%] max-w-md rounded-xl p-0 overflow-hidden border-0">
        <div className="bg-gray-50 p-4 flex items-start gap-4">
          <div className="w-20 h-20 rounded-[22%] overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{app.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{app.category}</p>
            <div className="flex gap-3 items-center">
              <button 
                className="text-sm py-1.5 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload && onDownload();
                }}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : app.price === 0 ? (
                  "GET"
                ) : (
                  `$${app.price.toFixed(2)}`
                )}
              </button>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{app.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500">Size</p>
              <p className="font-medium">{app.size || "Unknown"}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500">Age</p>
              <p className="font-medium">{app.age || "4+"}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-gray-500">Developer</p>
              <p className="font-medium truncate">{app.developer || "Unknown"}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">About</h3>
            <p className="text-sm text-gray-700">{app.description || "No description available."}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {app.inAppPurchases && (
              <Badge variant="outline">In-App Purchases</Badge>
            )}
            <Badge variant="outline">{app.downloads} Downloads</Badge>
            {app.reviews && (
              <Badge variant="outline">{(app.reviews / 1000000).toFixed(1)}M Reviews</Badge>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
