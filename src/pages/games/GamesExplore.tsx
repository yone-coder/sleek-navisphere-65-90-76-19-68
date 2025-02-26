import React, { useState } from 'react';
import { games, categories } from '@/data/games';
import { motion } from 'framer-motion';
import { Command } from "cmdk";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  Gamepad2, 
  Trophy, 
  Users 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const categoryIcons = {
  'Action': Gamepad2,
  'Sports': Trophy,
  'Multiplayer': Users,
};

export default function GamesExplore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keep the header and search components visible during loading
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Always visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => navigate('/games-pages')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Command className="rounded-lg border shadow-none">
              <Command.Input 
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-10 pl-9"
                placeholder="Search games..."
              />
            </Command>
          </div>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="flex gap-2 px-4 pb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="flex items-center gap-1.5 whitespace-nowrap"
              >
                {categoryIcons[category] && React.createElement(categoryIcons[category], {
                  className: "w-4 h-4"
                })}
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Content with loading state */}
      <div className="pt-28 pb-20">
        {isLoading ? (
          <div className="px-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 space-y-4"
          >
            {games.map((game) => (
              <div key={game.id} className="flex items-center gap-4">
                <img
                  src={game.icon}
                  alt={game.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{game.title}</h3>
                  <p className="text-sm text-gray-500">{game.category.join(', ')}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => game.route && navigate(game.route)}
                >
                  <span>View</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
