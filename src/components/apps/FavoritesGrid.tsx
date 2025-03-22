
import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { apps } from '@/components/apps/data/appsData';

interface FavoriteApp {
  id: number;
  name: string;
  color: string;
  letter?: string;
  icon?: React.ElementType;
  favorite: boolean;
}

interface FavoritesGridProps {
  apps: FavoriteApp[];
  editMode: boolean;
  onToggleFavorite: (id: number) => void;
  onAppTap: (id: number) => void;
  onAppLongPress?: (id: number) => void;
  activeAppId?: number | null;
  showIcons?: boolean;
}

export const FavoritesGrid: React.FC<FavoritesGridProps> = ({ 
  apps: favoriteApps, 
  editMode, 
  onToggleFavorite, 
  onAppTap,
  onAppLongPress,
  activeAppId,
  showIcons = false
}) => {
  let touchTimeout: NodeJS.Timeout;
  
  const handleTouchStart = (id: number) => {
    touchTimeout = setTimeout(() => {
      onAppLongPress && onAppLongPress(id);
    }, 500);
  };
  
  const handleTouchEnd = () => {
    clearTimeout(touchTimeout);
  };

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

  // Find the correct icon from the original app data
  const findAppIcon = (appName: string) => {
    const appData = apps.find(app => app.name === appName);
    return appData?.icon;
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {favoriteApps.map((app) => {
        // Find the original app data to get the icon
        const Icon = findAppIcon(app.name);
        
        return (
          <div key={app.id} className="flex flex-col items-center">
            <motion.div 
              className="relative"
              animate={activeAppId === app.id ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${getGradient(app.color)} flex items-center justify-center shadow-md`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAppTap(app.id)}
                onTouchStart={() => handleTouchStart(app.id)}
                onTouchEnd={handleTouchEnd}
              >
                {Icon && <Icon className="h-8 w-8 text-white" />}
              </motion.div>
              
              {editMode && (
                <motion.div 
                  className="absolute -top-2 -left-2 h-5 w-5 bg-black bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(app.id);
                  }}
                >
                  <X className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </motion.div>
            <p className="text-xs mt-1 text-center">{app.name}</p>
          </div>
        )
      })}
    </div>
  );
};
