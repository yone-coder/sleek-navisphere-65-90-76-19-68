
import { useRef, useEffect, useCallback } from 'react';

export const useGameAudio = (soundEnabled: boolean, inactivityTime: number, winner: string | null) => {
  const moveAudioXRef = useRef<HTMLAudioElement | null>(null);
  const moveAudioORef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const warningAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements with online sound effects
  useEffect(() => {
    // Create new audio elements with online sources
    moveAudioXRef.current = new Audio('https://cdn.freesound.org/previews/242/242501_1627374-lq.mp3');
    moveAudioORef.current = new Audio('https://cdn.freesound.org/previews/242/242503_1627374-lq.mp3');
    winAudioRef.current = new Audio('https://cdn.freesound.org/previews/277/277021_5324223-lq.mp3');
    warningAudioRef.current = new Audio('https://cdn.freesound.org/previews/411/411642_5121236-lq.mp3');

    // Set volumes
    if (moveAudioXRef.current) moveAudioXRef.current.volume = 0.6;
    if (moveAudioORef.current) moveAudioORef.current.volume = 0.6;
    if (winAudioRef.current) winAudioRef.current.volume = 0.7;
    if (warningAudioRef.current) warningAudioRef.current.volume = 0.5;

    // Preload audio files
    const preloadAudio = async () => {
      try {
        await Promise.all([
          moveAudioXRef.current?.load(),
          moveAudioORef.current?.load(),
          winAudioRef.current?.load(),
          warningAudioRef.current?.load()
        ]);
        console.log('Audio files loaded successfully');
      } catch (error) {
        console.error('Error loading audio files:', error);
      }
    };

    preloadAudio();

    // Cleanup
    return () => {
      moveAudioXRef.current = null;
      moveAudioORef.current = null;
      winAudioRef.current = null;
      warningAudioRef.current = null;
    };
  }, []); // Run only once on mount

  // Handle warning sound
  useEffect(() => {
    if (!soundEnabled || !inactivityTime || winner || !warningAudioRef.current) return;

    if (inactivityTime === 5) {
      const playWarning = async () => {
        try {
          await warningAudioRef.current?.play();
        } catch (error) {
          console.log('Warning sound failed to play:', error);
        }
      };
      playWarning();
    }
  }, [inactivityTime, soundEnabled, winner]);

  const playMoveSound = useCallback(async (player: 'X' | 'O') => {
    if (!soundEnabled) return;
    
    const audio = player === 'X' ? moveAudioXRef.current : moveAudioORef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.log(`${player} move sound failed to play:`, error);
    }
  }, [soundEnabled]);

  const playWinSound = useCallback(async () => {
    if (!soundEnabled || !winAudioRef.current) return;

    try {
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      await winAudioRef.current.play();
    } catch (error) {
      console.log('Win sound failed to play:', error);
    }
  }, [soundEnabled]);

  return {
    playMoveSound,
    playWinSound
  };
};
