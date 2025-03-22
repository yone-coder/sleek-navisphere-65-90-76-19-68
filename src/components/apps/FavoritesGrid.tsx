
import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

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
  apps, 
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

  // App-specific icons based on name
  const getAppIcon = (appName: string) => {
    switch (appName) {
      case "Chess":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3 M12,17c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1 S12.55,17,12,17 M12,10c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,10,12,10 M18,10c-0.55,0-1-0.45-1-1s0.45-1,1-1 s1,0.45,1,1S18.55,10,18,10 M18,17c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S18.55,17,18,17 M6,10c-0.55,0-1-0.45-1-1 s0.45-1,1-1s1,0.45,1,1S6.55,10,6,10 M6,17c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S6.55,17,6,17" />
            <path fill="currentColor" d="M18,6h-3.5l-1-1.5L12,6H6l1.5,3L6,15h12l-1.5-6L18,6z" />
          </svg>
        );
      case "Borlette":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M13 7.5h5v2h-5zm0 7h5v2h-5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM11 6H6v5h5V6zm-1 4H7V7h3v3zm1 3H6v5h5v-5zm-1 4H7v-3h3v3z" />
          </svg>
        );
      case "Boltz":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M15.5,14.09l-1.41,1.41L12,13.42L9.91,15.5 L8.5,14.09L10.59,12L8.5,9.91L9.91,8.5L12,10.59l2.09-2.09l1.41,1.41L13.42,12L15.5,14.09z" />
          </svg>
        );
      case "Domus":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M17,16h2V4h-8v2h6V16z M13,15l-1-4H9.5v2H7.5v-2H6v-1h1.5V8h2v1.5H11l1,4H13z M3,14V8h2v6H3z M19,20v2h-1h-5v-2H8v2H3 v-2H2V3h1v2h5V3h5v2h5V3h1v17H19z" />
          </svg>
        );
      case "Evnto":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
          </svg>
        );
      case "Careo":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        );
      case "Druck":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M19,8H5V6H19M16,19H8V14H16M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
          </svg>
        );
      case "Activity":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M3.5,18.49L9.5,12.48L13.5,16.48L22,6.92L20.59,5.51L13.5,13.48L9.5,9.48L2,16.99L3.5,18.49Z" />
          </svg>
        );
      default:
        // Fallback to hexagon icon
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path 
              fill="currentColor" 
              d="M12,2L3,7v10l9,5l9-5V7L12,2z M12,4.236l6,3.317v7.882l-6,3.333l-6-3.333V7.553l6-3.317z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {apps.map((app) => {
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
                {getAppIcon(app.name)}
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
