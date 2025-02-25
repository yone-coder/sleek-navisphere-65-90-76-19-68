
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameMode } from './types';
import { Bot, Globe, Users } from 'lucide-react';

interface GameMenuProps {
  onSelectMode: (mode: GameMode) => void;
}

const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  return (
    <div className="p-6 space-y-4">
      <Button
        onClick={() => onSelectMode('local')}
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 h-16 text-lg"
      >
        <Users className="h-6 w-6 mr-2" />
        Play Locally
      </Button>

      <Button
        onClick={() => onSelectMode('bot')}
        size="lg"
        className="w-full bg-purple-600 hover:bg-purple-700 h-16 text-lg"
      >
        <Bot className="h-6 w-6 mr-2" />
        VS Bot
      </Button>

      <Button
        onClick={() => onSelectMode('online')}
        size="lg"
        className="w-full bg-green-600 hover:bg-green-700 h-16 text-lg"
      >
        <Globe className="h-6 w-6 mr-2" />
        Play Online
      </Button>
    </div>
  );
};

export default GameMenu;
