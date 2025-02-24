
import React from 'react';
import { formatTime } from './utils';
import { TimeLeft } from './types';

interface WinnerPopupProps {
  showWinnerPopup: boolean;
  winner: string;
  player1: string;
  player2: string;
  moves: number;
  timeLeft: TimeLeft;
  lastMove: { row: number; col: number } | null;
  resetGame: () => void;
  setShowWinnerPopup: (show: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
}

const WinnerPopup = ({
  showWinnerPopup,
  winner,
  player1,
  player2,
  moves,
  timeLeft,
  lastMove,
  resetGame,
  setShowWinnerPopup,
  setIsSettingsOpen
}: WinnerPopupProps) => {
  if (!winner || !showWinnerPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-md w-full">
        <div className="text-center">
          <div className="text-4xl md:text-6xl mb-2 md:mb-4">
            {winner === 'X' ? '🏆' : '🎉'}
          </div>
          <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800">
            {winner === 'X' ? player1 : player2} Wins!
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Game completed in {moves} moves and {formatTime(300 - timeLeft[winner])}
          </p>

          <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="text-left">
                <div className="text-xs md:text-sm text-gray-500">Total Time</div>
                <div className="font-medium">{formatTime(300 - timeLeft['X'] + 300 - timeLeft['O'])}</div>
              </div>
              <div className="text-left">
                <div className="text-xs md:text-sm text-gray-500">Avg Move Time</div>
                <div className="font-medium">{Math.round((300 - timeLeft[winner]) / moves)}s</div>
              </div>
              <div className="text-left">
                <div className="text-xs md:text-sm text-gray-500">Winning Streak</div>
                <div className="font-medium">1</div>
              </div>
              <div className="text-left">
                <div className="text-xs md:text-sm text-gray-500">Best Move</div>
                <div className="font-medium">
                  ({lastMove?.row}, {lastMove?.col})
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 md:gap-4 justify-center">
            <button 
              onClick={() => {
                setShowWinnerPopup(false);
                resetGame();
              }}
              className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-blue-600 transition duration-300 shadow-md font-medium text-sm md:text-base"
            >
              Play Again
            </button>
            <button 
              onClick={() => {
                setShowWinnerPopup(false);
                setIsSettingsOpen(true);
              }}
              className="bg-gray-100 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-gray-200 transition duration-300 shadow-md font-medium text-sm md:text-base"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerPopup;

