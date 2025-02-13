
import React, { useEffect, useState } from 'react';
import { CalendarIcon, Users, Trophy, DollarSign } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TournamentCardProps {
  className?: string;
}

export const TournamentCard = ({ className }: TournamentCardProps) => {
  const [countdown, setCountdown] = useState('');
  const targetDate = new Date('2025-02-12T17:45:00').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Event Started");
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("max-w-md rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl", className)}>
      {/* Tournament Image */}
      <div className="relative">
        <img
          src="https://storage.googleapis.com/a1aa/image/1KrFqMU9yacw7XaUF67L6MaKLpXyjGHzZqDa24FBdig.jpg"
          alt="Banner image for the 2025 Summer Championship showing a vibrant gaming scene with players and spectators"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 m-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {countdown}
        </div>
        <div className="absolute top-0 right-0 m-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Premium Event
        </div>
        <div className="absolute bottom-0 left-0 m-4 flex items-center space-x-2">
          <img
            src="https://storage.googleapis.com/a1aa/image/RW76eSv1bI06GoXLZPNVQlLvVFuloRbfcxmSiTYAc8E.jpg"
            alt="Profile image of a chess piece"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex items-center bg-black bg-opacity-50 px-2 py-0.5 rounded-lg backdrop-blur">
            <span className="text-white font-semibold">Chess</span>
          </div>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          2025 Summer Championship
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          The premier summer gaming event featuring the latest titles and top competitors from around the world.
        </p>

        {/* Details Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <CalendarIcon className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-xs">Feb 12, 25 • 5:45 PM - Feb 28, 25 • 5:45 PM</span>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-sm">128/256 Participants</span>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">128 left</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>

        {/* Prize & Entry */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Prize Pool</span>
              <p className="font-bold text-gray-800 dark:text-white">$10,000</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Entry Fee</span>
              <p className="font-bold text-gray-800 dark:text-white">$75.00</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
            Register Now
          </button>
          <button className="flex-1 bg-transparent hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-medium py-2 px-4 border border-blue-600 rounded-lg transition-colors duration-300 dark:hover:bg-gray-700 dark:border-blue-400">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
