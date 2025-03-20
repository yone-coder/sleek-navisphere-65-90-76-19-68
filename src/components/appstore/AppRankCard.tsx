
import { Star } from "lucide-react";
import { App } from "./types";
import { Badge } from "@/components/ui/badge";

interface AppRankCardProps {
  app: App;
  rank: number;
}

export function AppRankCard({ app, rank }: AppRankCardProps) {
  return (
    <div className="flex items-center gap-3 py-2 hover:bg-gray-100 rounded-lg transition cursor-pointer">
      <span className="text-xl font-bold text-gray-300 w-6 text-center">{rank}</span>
      
      <div className="w-12 h-12 rounded-[22%] overflow-hidden flex-shrink-0 bg-gray-100">
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
        </div>
      </div>
      
      <button className="bg-gray-100 hover:bg-gray-200 text-xs font-medium py-1.5 px-3 rounded-full transition">
        {app.price === 0 ? "GET" : `$${app.price.toFixed(2)}`}
      </button>
    </div>
  );
}
