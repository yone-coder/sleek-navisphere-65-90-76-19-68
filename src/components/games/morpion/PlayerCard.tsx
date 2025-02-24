
import React from 'react';
import { Clock } from 'lucide-react';
import Avatar from './Avatar';
import { formatTime } from './utils';
import { TimeLeft } from './types';

interface PlayerCardProps {
  player: string;
  symbol: 'X' | 'O';
  isTop: boolean;
  currentPlayer: 'X' | 'O';
  timeLeft: TimeLeft;
  inactivityTime: number;
}

const PlayerCard = ({ 
  player, 
  symbol, 
  isTop, 
  currentPlayer, 
  timeLeft, 
  inactivityTime 
}: PlayerCardProps) => {
  const hasPhoto = !player.toLowerCase().includes('guest');

  return (
    <div className={`
      flex items-center gap-2 md:gap-3 p-1 md:p-2 rounded-lg
      ${currentPlayer === symbol ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-white'}
      transition-all duration-300 shadow-md
    `}>
      <div className="relative">
        <Avatar 
          name={player} 
          size="sm"
          hasPhoto={hasPhoto} 
        />
        <div className={`
          absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full 
          flex items-center justify-center
          ${symbol === 'X' ? 'bg-black text-white' : 'bg-red-500 text-white'}
          ring-2 ring-white
        `}>
          <span className="text-[10px] md:text-xs font-bold">{symbol}</span>
        </div>
        <div className="text-[10px] md:text-xs font-medium mt-0.5 text-center">
          {formatTime(timeLeft[symbol])}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-bold text-xs md:text-sm truncate max-w-[60px] md:max-w-[80px]">
            {player}
          </span>
          {symbol === currentPlayer && (
            <div className={`
              text-[10px] px-1 py-0.5 rounded-full font-medium hidden md:flex items-center gap-1
              ${inactivityTime <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}
            `}>
              <Clock size={8} className={inactivityTime <= 5 ? 'animate-pulse' : ''} />
              <span>{inactivityTime}s</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] md:text-xs text-gray-600">
            {isTop ? 'Opponent' : 'You'}
          </span>
          {symbol === currentPlayer && (
            <div className={`
              md:hidden text-[10px] px-1 py-0.5 rounded-full font-medium flex items-center gap-1
              ${inactivityTime <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}
            `}>
              <Clock size={8} className={inactivityTime <= 5 ? 'animate-pulse' : ''} />
              <span>{inactivityTime}s</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
