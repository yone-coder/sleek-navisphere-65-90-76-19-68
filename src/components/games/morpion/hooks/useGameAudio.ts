
import { useRef, useEffect } from 'react';

export const useGameAudio = (soundEnabled: boolean, inactivityTime: number, winner: string | null) => {
  const moveAudioRef = useRef(new Audio('/api/placeholder/audio'));
  const winAudioRef = useRef(new Audio('/api/placeholder/audio'));
  const warningAudioRef = useRef(new Audio('/api/placeholder/audio'));

  useEffect(() => {
    if (inactivityTime === 5 && soundEnabled && !winner) {
      warningAudioRef.current.play().catch(() => {});
    }
  }, [inactivityTime, soundEnabled, winner]);

  const playMoveSound = () => {
    if (soundEnabled) {
      moveAudioRef.current.play().catch(() => {});
    }
  };

  const playWinSound = () => {
    if (soundEnabled) {
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      winAudioRef.current.play().catch(() => {});
    }
  };

  return {
    playMoveSound,
    playWinSound
  };
};

