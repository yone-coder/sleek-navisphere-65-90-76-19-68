
import React, { useState } from 'react';
import { X, Plus, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

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
  onToggleFavorite: (id: number) => void;
  onAppTap: (id: number) => void;
  onAppLongPress: (id: number) => void;
  activeAppId: number | null;
}

export const FavoritesGrid = ({ 
  apps, 
  editMode, 
  onToggleFavorite, 
  onAppTap, 
  onAppLongPress,
  activeAppId
}: FavoritesGridProps) => {
  const { toast } = useToast();

  if (apps.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <Heart size={48} />
        <p className="mt-4 text-center">No favorite apps found</p>
        <p className="text-sm text-center mt-2">Try adding some apps to favorites</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {apps.map(app => (
        <motion.div 
          key={app.id} 
          className="relative flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: activeAppId === app.id ? 1.1 : 1,
            boxShadow: activeAppId === app.id ? "0 10px 25px rgba(0,0,0,0.2)" : "none" 
          }}
          onTapStart={() => onAppLongPress(app.id)}
          onTap={() => onAppTap(app.id)}
        >
          <div className={`${app.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 active:scale-95`}>
            <span className="text-white text-xl font-bold">{app.letter}</span>
          </div>
          <span className="mt-2 text-xs text-center truncate w-full">{app.name}</span>
          
          <AnimatePresence>
            {editMode && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => onToggleFavorite(app.id)}
                className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 shadow-md transition-transform hover:scale-110"
              >
                <X size={10} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      
      {/* Add button (only in edit mode) */}
      {editMode && (
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-200">
            <Plus size={24} className="text-gray-400" />
          </div>
          <span className="mt-2 text-xs text-gray-500">Add</span>
        </motion.div>
      )}
    </div>
  );
};
