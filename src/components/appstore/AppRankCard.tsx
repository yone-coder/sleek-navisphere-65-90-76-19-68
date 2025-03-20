
import { Star, Download } from "lucide-react";
import { App } from "./types";

interface AppRankCardProps {
  app: App;
  rank: number;
}

export function AppRankCard({ app, rank }: AppRankCardProps) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition cursor-pointer">
      <span className="text-2xl font-bold text-gray-300 w-8 text-center">{rank}</span>
      
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{app.name}</h3>
        <p className="text-xs text-gray-500 truncate">{app.category}</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(app.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{app.downloads}</span>
        </div>
      </div>
      
      <button className="bg-gray-100 hover:bg-gray-200 text-xs font-medium py-1.5 px-4 rounded-full">
        GET
      </button>
    </div>
  );
}
