
import { Star, Clock, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { App } from "../types";

interface AppGridItemProps {
  app: App;
  isFavorite: boolean;
  onToggleFavorite: (appName: string) => void;
  onClick: () => void;
}

export const AppGridItem = ({ app, isFavorite, onToggleFavorite, onClick }: AppGridItemProps) => {
  // Function to get colorful gradient based on app color
  const getGradient = (color: string) => {
    switch(color) {
      case 'bg-purple-600':
        return 'from-purple-500 via-purple-400 to-indigo-500';
      case 'bg-green-600':
        return 'from-green-400 via-emerald-500 to-teal-400';
      case 'bg-slate-800':
        return 'from-slate-700 via-slate-800 to-gray-900';
      case 'bg-zinc-800':
        return 'from-zinc-700 via-zinc-800 to-neutral-900';
      case 'bg-emerald-500':
        return 'from-emerald-400 via-green-500 to-teal-500';
      case 'bg-indigo-500':
        return 'from-indigo-400 via-blue-500 to-violet-500';
      case 'bg-purple-500':
        return 'from-purple-400 via-fuchsia-500 to-pink-500';
      case 'bg-pink-500':
        return 'from-pink-400 via-rose-500 to-red-400';
      case 'bg-orange-500':
        return 'from-orange-400 via-amber-500 to-yellow-400';
      case 'bg-yellow-500':
        return 'from-yellow-300 via-amber-400 to-orange-400';
      case 'bg-blue-500':
        return 'from-blue-400 via-cyan-500 to-sky-500';
      case 'bg-cyan-500':
        return 'from-cyan-400 via-teal-500 to-blue-400';
      case 'bg-sky-500':
        return 'from-sky-400 via-blue-500 to-indigo-400';
      case 'bg-amber-500':
        return 'from-amber-400 via-yellow-500 to-orange-400';
      case 'bg-rose-500':
        return 'from-rose-400 via-pink-500 to-red-500';
      case 'bg-violet-500':
        return 'from-violet-400 via-purple-500 to-indigo-500';
      case 'bg-gray-600':
        return 'from-gray-500 via-slate-600 to-neutral-700';
      case 'bg-red-500':
        return 'from-red-400 via-rose-500 to-pink-500';
      case 'bg-teal-500':
        return 'from-teal-400 via-cyan-500 to-emerald-400';
      default:
        return 'from-blue-500 via-cyan-500 to-sky-500';
    }
  };

  return (
    <motion.div 
      className="relative w-full overflow-hidden" 
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${getGradient(app.color)} flex items-center justify-center relative shadow-md`}>
          <app.icon className="w-8 h-8 text-white" />
          {app.updates > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
              {app.updates}
            </Badge>
          )}
        </div>
        <div className="text-center w-full overflow-hidden mt-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{app.name}</span>
            {app.rating && (
              <div className="flex items-center gap-1 text-xs text-yellow-500 flex-shrink-0">
                <Star className="w-3 h-3 fill-yellow-400" />
                {app.rating}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2 px-2">{app.description}</p>
          {app.lastUsed && (
            <div className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{app.lastUsed}</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 left-0 flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full hover:bg-white/80 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleFavorite(app.name);
          }}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </Button>
      </div>
      {app.users && (
        <div className="absolute bottom-0 right-0 left-0 flex justify-end p-2">
          <Badge variant="outline" className="text-[10px] bg-white/80 backdrop-blur-sm">
            <Download className="w-3 h-3 mr-1" />
            {app.users}
          </Badge>
        </div>
      )}
    </motion.div>
  );
};
