
import React from 'react';

interface GameSettingsProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const GameSettings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  zoom,
  setZoom,
  isTimerRunning,
  setIsTimerRunning,
  soundEnabled,
  setSoundEnabled
}: GameSettingsProps) => {
  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Game Settings</h2>

        <div className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Board Zoom
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="150"
                value={zoom}
                onChange={(e) => setZoom(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm font-medium w-10 text-right">{zoom}%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Game Timer
            </label>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`w-full px-3 md:px-4 py-2 rounded-lg font-medium transition duration-300 text-sm md:text-base
                ${isTimerRunning 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                }
              `}
            >
              {isTimerRunning ? 'Timer Running' : 'Timer Paused'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sound Effects
            </label>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-full px-3 md:px-4 py-2 rounded-lg font-medium transition duration-300 text-sm md:text-base
                ${soundEnabled 
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }
              `}
            >
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="bg-gray-100 text-gray-700 px-4 md:px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md font-medium text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
