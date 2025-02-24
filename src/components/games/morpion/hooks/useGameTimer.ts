
import { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

export const useGameTimer = (currentPlayer: 'X' | 'O', winner: string | null) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ X: 300, O: 300 });
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [inactivityTime, setInactivityTime] = useState(15);

  useEffect(() => {
    if (!winner && isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft(prev => ({
          ...prev,
          [currentPlayer]: Math.max(0, prev[currentPlayer] - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentPlayer, winner, isTimerRunning]);

  useEffect(() => {
    if (!winner && isTimerRunning) {
      const inactivityTimer = setInterval(() => {
        setInactivityTime(prev => {
          if (prev <= 0) {
            clearInterval(inactivityTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(inactivityTimer);
    }
  }, [currentPlayer, winner, isTimerRunning]);

  const resetTimer = () => {
    setTimeLeft({ X: 300, O: 300 });
    setIsTimerRunning(true);
    setInactivityTime(15);
  };

  return {
    timeLeft,
    setTimeLeft,
    isTimerRunning,
    setIsTimerRunning,
    inactivityTime,
    setInactivityTime,
    resetTimer
  };
};

