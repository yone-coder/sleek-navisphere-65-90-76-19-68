
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

  // App-specific icons based on name - Updated to match Explore tab icons
  const getAppIcon = (appName: string) => {
    switch (appName.toLowerCase()) {
      case "chess":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77 13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.74,10.77 8.42,10 7,10A5,5 0 0,0 2,15A5,5 0 0,0 7,20H17A5,5 0 0,0 22,15A5,5 0 0,0 17,10Z" />
          </svg>
        );
      case "borlette":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,4V16H8.83L12,19.17L15.17,16H20V4H4M6,7H18V9H6V7M6,11H16V13H6V11Z" />
          </svg>
        );
      case "boltz":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M11,15H6L13,1V9H18L11,23V15Z" />
          </svg>
        );
      case "domus":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
          </svg>
        );
      case "evnto":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
          </svg>
        );
      case "careo":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        );
      case "druck":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5M17,15A2,2 0 0,0 15,17A2,2 0 0,0 17,19A2,2 0 0,0 19,17A2,2 0 0,0 17,15M17,5A2,2 0 0,0 15,7A2,2 0 0,0 17,9A2,2 0 0,0 19,7A2,2 0 0,0 17,5M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M7,15A2,2 0 0,0 5,17A2,2 0 0,0 7,19A2,2 0 0,0 9,17A2,2 0 0,0 7,15Z" />
          </svg>
        );
      case "activity":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M20.2,4.9C19,3.8 17.5,3.2 16,3.2C14.5,3.2 13,3.8 11.8,4.9L11,5.6L10.2,4.9C9,3.8 7.5,3.2 6,3.2C4.5,3.2 3,3.8 1.8,4.9C0.6,6 0,7.5 0,9C0,10.5 0.6,12 1.8,13.1L11,21.7L20.2,13.1C21.4,12 22,10.5 22,9C22,7.5 21.4,6 20.2,4.9M14.5,9C14.5,10.4 13.4,11.5 12,11.5C10.6,11.5 9.5,10.4 9.5,9C9.5,7.6 10.6,6.5 12,6.5C13.4,6.5 14.5,7.6 14.5,9Z" />
          </svg>
        );
      case "lernx":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
          </svg>
        );
      case "modish":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21" />
          </svg>
        );
      case "skilt":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
          </svg>
        );
      case "healr":
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path fill="currentColor" d="M10.5,15.97L10.91,18.41C10.65,18.55 10.23,18.68 9.67,18.8C9.1,18.93 8.43,19 7.66,19C5.45,18.96 3.79,18.3 2.68,17.04C1.56,15.77 1,14.16 1,12.21C1.05,9.9 1.72,8 3,6.5C4.32,5 6.16,4.25 8.5,4.25C10.24,4.25 11.64,4.79 12.68,5.87C13.76,6.94 14.32,8.35 14.38,10.11C14.38,12.08 13.78,13.64 12.58,14.79C11.38,15.93 10.12,15.97 10.5,15.97M8.5,6.25C7.1,6.25 6,6.74 5.18,7.69C4.32,8.64 3.87,9.75 3.87,11.03C3.87,12.47 4.26,13.67 5.03,14.62C5.8,15.57 6.9,16.04 8.32,16.04C9.5,16.04 10.35,15.56 10.88,14.63C11.41,13.69 11.68,12.46 11.68,10.97C11.68,9.52 11.25,8.36 10.41,7.47C9.56,6.59 8.5,6.25 8.5,6.25M21,11.5C21,12.39 20.39,13 19.5,13H17V15.5C17,16.39 16.39,17 15.5,17C14.61,17 14,16.39 14,15.5V13H11.5C10.61,13 10,12.39 10,11.5C10,10.61 10.61,10 11.5,10H14V7.5C14,6.61 14.61,6 15.5,6C16.39,6 17,6.61 17,7.5V10H19.5C20.39,10 21,10.61 21,11.5Z" />
          </svg>
        );
      // Add more app-specific icons as needed
      default:
        // Default icon for apps without specific icons
        return (
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path 
              fill="currentColor" 
              d="M12,2L4,5V11.1C4,16.6 7.1,21.7 12,23C16.9,21.7 20,16.6 20,11.1V5L12,2M15.5,14.5L12,18L8.5,14.5H10V10.5H14V14.5H15.5Z"
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
