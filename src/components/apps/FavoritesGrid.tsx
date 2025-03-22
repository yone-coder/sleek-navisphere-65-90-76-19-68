
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

  return (
    <div className="grid grid-cols-4 gap-6">
      {apps.map((app) => {
        // Determine if we should use the icon or letter
        const useIcon = showIcons && app.icon;
        const IconComponent = app.icon;
        
        return (
          <div key={app.id} className="flex flex-col items-center">
            <motion.div 
              className="relative"
              animate={activeAppId === app.id ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-xl ${app.color} flex items-center justify-center shadow-md`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAppTap(app.id)}
                onTouchStart={() => handleTouchStart(app.id)}
                onTouchEnd={handleTouchEnd}
              >
                {useIcon && IconComponent ? (
                  <IconComponent className="h-8 w-8 text-white" />
                ) : (
                  <span className="text-xl font-bold text-white">{app.letter || app.name.charAt(0)}</span>
                )}
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
