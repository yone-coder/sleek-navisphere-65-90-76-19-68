
import { useRef, useEffect, useCallback } from 'react';

export const useGameAudio = (soundEnabled: boolean, inactivityTime: number, winner: string | null) => {
  const moveAudioXRef = useRef<HTMLAudioElement | null>(null);
  const moveAudioORef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const warningAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements with online sound effects
  useEffect(() => {
    const createAudioElement = (src: string, volume: number) => {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.preload = 'auto';
      return audio;
    };

    // Create and preload audio elements
    moveAudioXRef.current = createAudioElement('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', 0.6);
    moveAudioORef.current = createAudioElement('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', 0.6);
    winAudioRef.current = createAudioElement('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', 0.7);
    warningAudioRef.current = createAudioElement('https://assets.mixkit.co/active_storage/sfx/953/953-preview.mp3', 0.5);

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
      try {
        warningAudioRef.current.currentTime = 0;
        warningAudioRef.current.play();
      } catch (error) {
        console.log('Warning sound failed to play:', error);
      }
    }
  }, [inactivityTime, soundEnabled, winner]);

  const playMoveSound = useCallback((player: 'X' | 'O') => {
    if (!soundEnabled) return;
    
    const audio = player === 'X' ? moveAudioXRef.current : moveAudioORef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      audio.play();
    } catch (error) {
      console.log(`${player} move sound failed to play:`, error);
    }
  }, [soundEnabled]);

  const playWinSound = useCallback(() => {
    if (!soundEnabled || !winAudioRef.current) return;

    try {
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      winAudioRef.current.currentTime = 0;
      winAudioRef.current.play();
    } catch (error) {
      console.log('Win sound failed to play:', error);
    }
  }, [soundEnabled]);

  return {
    playMoveSound,
    playWinSound
  };
};
