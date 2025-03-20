
import { Star, Download, Info } from "lucide-react";
import { App } from "./types";
import { Badge } from "@/components/ui/badge";

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
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{app.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{app.size}</span>
          {app.age && (
            <>
              <span className="text-xs text-gray-500">•</span>
              <Badge variant="outline" className="h-4 text-[10px] font-normal px-1 py-0">
                {app.age}
              </Badge>
            </>
          )}
        </div>
      </div>
      
      <button className="bg-gray-100 hover:bg-gray-200 text-xs font-medium py-1.5 px-4 rounded-full transition">
        {app.price === 0 ? "GET" : `$${app.price.toFixed(2)}`}
      </button>
    </div>
  );
}
