
import React from 'react';
import { Volume2, VolumeX, Undo2, RotateCcw, Settings2 } from 'lucide-react';

interface GameControlsProps {
  soundEnabled: boolean;
  gameHistory: any[];
  onToggleSound: () => void;
  onUndo: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
  moves: number;
  timeLeft: { [key: string]: number };
}

const GameControls: React.FC<GameControlsProps> = ({
  soundEnabled,
  gameHistory,
  onToggleSound,
  onUndo,
  onReset,
  onOpenSettings,
  moves,
  timeLeft
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-white shadow-md px-2 md:px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-1 md:gap-2">
        <button 
          onClick={onToggleSound}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
        >
          {soundEnabled ? <Volume2 size={14} className="md:w-4 md:h-4" /> : <VolumeX size={14} className="md:w-4 md:h-4" />}
        </button>

        <button 
          onClick={onUndo}
          disabled={gameHistory.length === 0}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition duration-300
            ${gameHistory.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'}
          `}
        >
          <Undo2 size={14} className="md:w-4 md:h-4" />
        </button>

        <button 
          onClick={onReset}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
        >
          <RotateCcw size={14} className="md:w-4 md:h-4" />
        </button>

        <button 
          onClick={onOpenSettings}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
        >
          <Settings2 size={14} className="md:w-4 md:h-4" />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
          <span className="font-medium">Moves:</span> {moves}
        </div>

        <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
          <div className="flex gap-4">
            <div>
              <span className="text-sm text-gray-500">Win Rate:</span>
              <span className="ml-2 font-medium">
                {Math.round((moves > 0 ? (moves - gameHistory.length) / moves : 0) * 100)}%
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Avg Time/Move:</span>
              <span className="ml-2 font-medium">
                {moves > 1 ? Math.round((300 - timeLeft['X']) / moves) : 0}s
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden text-sm bg-white px-2 py-1 rounded shadow-sm">
        <span className="font-medium">{moves}</span> moves
      </div>
    </div>
  );
};

export default GameControls;
