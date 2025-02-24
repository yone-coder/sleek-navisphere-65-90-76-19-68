
import { useRef, useEffect } from 'react';

export const useGameAudio = (soundEnabled: boolean, inactivityTime: number, winner: string | null) => {
  const moveAudioXRef = useRef(new Audio('/sounds/move-x.mp3'));
  const moveAudioORef = useRef(new Audio('/sounds/move-o.mp3'));
  const winAudioRef = useRef(new Audio('/sounds/win.mp3'));
  const warningAudioRef = useRef(new Audio('/sounds/warning.mp3'));

  // Initialize audio and handle warning sound
  useEffect(() => {
    // Set default volumes
    moveAudioXRef.current.volume = 0.6;
    moveAudioORef.current.volume = 0.6;
    winAudioRef.current.volume = 0.7;
    warningAudioRef.current.volume = 0.5;

    // Play warning sound when needed
    if (inactivityTime === 5 && soundEnabled && !winner) {
      warningAudioRef.current.play().catch(() => {
        console.log('Warning sound failed to play');
      });
    }
  }, [inactivityTime, soundEnabled, winner]);

  const playMoveSound = (player: 'X' | 'O') => {
    if (soundEnabled) {
      const audio = player === 'X' ? moveAudioXRef.current : moveAudioORef.current;
      audio.currentTime = 0; // Reset audio to start
      audio.play().catch(() => {
        console.log(`${player} move sound failed to play`);
      });
    }
  };

  const playWinSound = () => {
    if (soundEnabled) {
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      winAudioRef.current.play().catch(() => {
        console.log('Win sound failed to play');
      });
    }
  };

  return {
    playMoveSound,
    playWinSound
  };
};
