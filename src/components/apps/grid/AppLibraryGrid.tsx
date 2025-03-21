
import React from "react";
import { Star, Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { App } from "../types";

interface AppLibraryGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  onInstall: (appName: string) => void;
  installingApps: string[];
}

export const AppLibraryGrid = ({
  apps,
  favorites,
  onToggleFavorite,
  onInstall,
  installingApps
}: AppLibraryGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {apps.map((app) => (
        <AppLibraryItem
          key={app.name}
          app={app}
          isInstalled={favorites.includes(app.name)}
          isInstalling={installingApps.includes(app.name)}
          onInstall={() => onInstall(app.name)}
        />
      ))}
    </div>
  );
};

interface AppLibraryItemProps {
  app: App;
  isInstalled: boolean;
  isInstalling: boolean;
  onInstall: () => void;
}

const AppLibraryItem = ({ app, isInstalled, isInstalling, onInstall }: AppLibraryItemProps) => {
  // Get gradient background based on app color
  const getGradient = (color: string) => {
    const colorMap: Record<string, string> = {
      'bg-purple-600': 'from-purple-500 via-purple-600 to-indigo-700',
      'bg-green-600': 'from-green-500 via-emerald-600 to-teal-700',
      'bg-blue-600': 'from-blue-500 via-blue-600 to-indigo-700',
      'bg-red-600': 'from-red-500 via-rose-600 to-red-700',
      'bg-yellow-600': 'from-yellow-500 via-amber-600 to-orange-700',
      'bg-indigo-600': 'from-indigo-500 via-indigo-600 to-violet-700',
      'bg-pink-600': 'from-pink-500 via-pink-600 to-rose-700',
      'bg-orange-600': 'from-orange-500 via-amber-600 to-yellow-700',
      'bg-teal-600': 'from-teal-500 via-teal-600 to-emerald-700',
      'bg-slate-800': 'from-slate-700 via-slate-800 to-gray-900',
      'bg-emerald-500': 'from-emerald-400 via-emerald-500 to-teal-600',
      // Add more colors as needed
    };
    
    return colorMap[color] || 'from-gray-700 via-gray-800 to-gray-900';
  };
  
  return (
    <motion.div
      className="flex flex-col items-center"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* App Icon */}
      <motion.div 
        className={`
          w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br
          ${getGradient(app.color)} relative
        `}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <app.icon className="w-1/2 h-1/2 text-white" />
        </div>
        
        {/* Badge for updates */}
        {app.updates > 0 && (
          <Badge className="absolute top-1 right-1 bg-red-500 text-white scale-90 h-5 min-w-5 flex items-center justify-center p-0">
            {app.updates}
          </Badge>
        )}
        
        {/* Install status */}
        {isInstalled && (
          <div className="absolute bottom-1 right-1 bg-black/60 rounded-full p-1">
            <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-500" />
          </div>
        )}
        
        {/* Installing indicator */}
        {isInstalling && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
      
      {/* App Name */}
      <p className="mt-2 text-[11px] text-gray-300 text-center truncate w-full">
        {app.name}
      </p>
    </motion.div>
  );
};
