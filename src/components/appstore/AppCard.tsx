
import { Download, Check, Loader2, Star } from "lucide-react";
import { App } from "./types";

interface AppCardProps {
  app: App;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function AppCard({ app, onDownload, isDownloading = false }: AppCardProps) {
  // Function to determine background color based on app category
  const getCategoryColor = (category: string) => {
    const colors: {[key: string]: string} = {
      "Social Networking": "bg-blue-100",
      "Entertainment": "bg-purple-100",
      "Games": "bg-red-100",
      "Music": "bg-pink-100",
      "Graphics & Design": "bg-green-100",
    };
    
    return colors[category] || "bg-gray-100";
  };

  return (
    <div className="space-y-2 group">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative shadow-sm group-hover:shadow-md transition-shadow">
        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
        {app.inAppPurchases && (
          <span className="absolute top-1 right-1 text-[9px] bg-black/60 text-white px-1 py-0.5 rounded-sm">
            In-App Purchases
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-gray-900 truncate">{app.name}</h3>
        <p className="text-xs text-gray-500 truncate">{app.category}</p>
        
        <div className="flex items-center gap-1 mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(app.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({app.reviews.toLocaleString()})</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs py-0.5 px-2 rounded-full ${getCategoryColor(app.category)}`}>
            {app.price === 0 ? "FREE" : `$${app.price.toFixed(2)}`}
          </span>
          <button 
            className={`p-1.5 rounded-full ${
              isDownloading ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
            } transition`}
            onClick={onDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 text-gray-700 animate-spin" />
            ) : app.downloads.includes("B+") ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Download className="w-3.5 h-3.5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
