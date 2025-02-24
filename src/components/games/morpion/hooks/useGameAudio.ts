
import { useRef, useEffect, useCallback } from 'react';

export const useGameAudio = (soundEnabled: boolean, inactivityTime: number, winner: string | null) => {
  const moveAudioXRef = useRef(new Audio('/sounds/move-x.mp3'));
  const moveAudioORef = useRef(new Audio('/sounds/move-o.mp3'));
  const winAudioRef = useRef(new Audio('/sounds/win.mp3'));
  const warningAudioRef = useRef(new Audio('/sounds/warning.mp3'));

  // Initialize audio volumes
  useEffect(() => {
    moveAudioXRef.current.volume = 0.6;
    moveAudioORef.current.volume = 0.6;
    winAudioRef.current.volume = 0.7;
    warningAudioRef.current.volume = 0.5;
  }, []); // Run only once on mount

  // Handle warning sound
  useEffect(() => {
    if (!soundEnabled || !inactivityTime || winner) return;

    if (inactivityTime === 5) {
      warningAudioRef.current.play().catch(() => {
        console.log('Warning sound failed to play');
      });
    }
  }, [inactivityTime, soundEnabled, winner]);

  const playMoveSound = useCallback((player: 'X' | 'O') => {
    if (!soundEnabled) return;
    
    const audio = player === 'X' ? moveAudioXRef.current : moveAudioORef.current;
    audio.currentTime = 0; // Reset audio to start
    audio.play().catch(() => {
      console.log(`${player} move sound failed to play`);
    });
  }, [soundEnabled]);

  const playWinSound = useCallback(() => {
    if (!soundEnabled) return;

    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 100]);
    }
    winAudioRef.current.play().catch(() => {
      console.log('Win sound failed to play');
    });
  }, [soundEnabled]);

  return {
    playMoveSound,
    playWinSound
  };
};
