
import { Download } from "lucide-react";
import { App } from "./types";

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <div className="space-y-2">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative shadow-sm">
        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-gray-900 truncate">{app.name}</h3>
        <p className="text-xs text-gray-500 truncate">{app.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-gray-100 py-0.5 px-2 rounded-full">{app.price === 0 ? "FREE" : `$${app.price.toFixed(2)}`}</span>
          <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Download className="w-3.5 h-3.5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
