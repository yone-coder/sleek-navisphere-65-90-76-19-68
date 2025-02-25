
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameMode } from './types';
import { Bot, Globe, Users, Timer } from 'lucide-react';

interface GameMenuProps {
  onSelectMode: (mode: GameMode) => void;
}

const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  return (
    <div className="p-4 sm:p-6 space-y-4 w-full max-w-lg mx-auto">
      <div className="grid gap-3">
        <Button
          onClick={() => onSelectMode('local')}
          size="lg"
          className="w-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
            h-14 sm:h-16 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
            flex items-center justify-center space-x-2 sm:space-x-3 group"
        >
          <Users className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
          <span>Player vs Player (Local)</span>
        </Button>

        <Button
          onClick={() => onSelectMode('bot')}
          size="lg"
          className="w-full bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700
            h-14 sm:h-16 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
            flex items-center justify-center space-x-2 sm:space-x-3 group"
        >
          <Bot className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
          <span>Player vs Bot (AI)</span>
        </Button>

        <Button
          onClick={() => onSelectMode('online')}
          size="lg"
          className="w-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
            h-14 sm:h-16 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
            flex items-center justify-center space-x-2 sm:space-x-3 group"
        >
          <Globe className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
          <span>Online Multiplayer (PvP)</span>
        </Button>

        <Button
          onClick={() => onSelectMode('blitz')}
          size="lg"
          className="w-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
            h-14 sm:h-16 text-base sm:text-lg font-medium rounded-xl shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out transform hover:scale-[1.02]
            flex items-center justify-center space-x-2 sm:space-x-3 group
            animate-fade-in"
        >
          <Timer className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
          <span>Blitz Mode (Speed Morpion)</span>
        </Button>
      </div>
    </div>
  );
};

export default GameMenu;
