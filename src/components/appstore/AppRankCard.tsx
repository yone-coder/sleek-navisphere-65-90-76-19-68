
import { Star, Download, Info } from "lucide-react";
import { App } from "./types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface AppRankCardProps {
  app: App;
  rank: number;
}

export function AppRankCard({ app, rank }: AppRankCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Dialog>
      <DialogTrigger className="w-full text-left">
        <div 
          className="flex items-center gap-3 py-2 px-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={`text-xl font-bold ${isHovered ? 'text-blue-500' : 'text-gray-300'} w-6 text-center transition-colors`}>
            {rank}
          </span>
          
          <div className="w-12 h-12 rounded-[22%] overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
            <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-xs truncate">{app.name}</h3>
            <p className="text-[10px] text-gray-500 truncate">{app.category}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-medium">{app.rating.toFixed(1)}</span>
              </div>
              {app.age && (
                <Badge variant="outline" className="h-4 text-[10px] font-normal px-1 py-0">
                  {app.age}
                </Badge>
              )}
              {isHovered && app.downloads && (
                <span className="text-[9px] text-gray-500 animate-fade-in flex items-center">
                  <Download className="w-2.5 h-2.5 mr-0.5" />
                  {app.downloads}
                </span>
              )}
            </div>
          </div>
          
          <button 
            className={`${isHovered ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'} text-xs font-medium py-1.5 px-3 rounded-full transition`}
            onClick={(e) => e.stopPropagation()}
          >
            {app.price === 0 ? "GET" : `$${app.price.toFixed(2)}`}
          </button>
        </div>
      </DialogTrigger>
      
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
              >
                {app.price === 0 ? "GET" : `$${app.price.toFixed(2)}`}
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
