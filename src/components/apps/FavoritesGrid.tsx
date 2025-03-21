
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FavoriteApp {
  id: number;
  name: string;
  color: string;
  letter: string;
  favorite: boolean;
}

interface FavoritesGridProps {
  apps: FavoriteApp[];
  editMode: boolean;
  activeAppId: number | null;
  onToggleFavorite: (id: number) => void;
  onAppTap: (id: number) => void;
  onAppLongPress: (id: number) => void;
}

export const FavoritesGrid = ({ 
  apps, 
  editMode, 
  activeAppId,
  onToggleFavorite, 
  onAppTap,
  onAppLongPress
}: FavoritesGridProps) => {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
          <span className="text-gray-400 text-2xl">?</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">No favorites found</p>
        <p className="text-xs text-gray-500 max-w-xs">
          Your favorite apps will appear here. Browse and mark apps as favorites to add them.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <AnimatePresence>
        {apps.map((app) => (
          <motion.div
            key={app.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: activeAppId === app.id ? 1.1 : 1,
              rotate: editMode ? [-2, 2, -2] : 0,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              layout: { type: "spring", stiffness: 200, damping: 20 },
              rotate: { repeat: editMode ? Infinity : 0, duration: 0.3 }
            }}
            className="relative flex flex-col items-center"
            whileHover={{ scale: editMode ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onTouchStart={() => {
              const timer = setTimeout(() => onAppLongPress(app.id), 500);
              return () => clearTimeout(timer);
            }}
            onClick={() => onAppTap(app.id)}
          >
            <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-md mb-1`}>
              <span className="text-white text-xl font-bold">{app.letter}</span>
            </div>
            
            {editMode && (
              <motion.button
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(app.id);
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <X size={14} />
              </motion.button>
            )}
            
            <span className="text-xs text-center line-clamp-1 w-full">{app.name}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
