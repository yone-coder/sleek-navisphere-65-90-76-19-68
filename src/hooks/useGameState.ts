
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import type { GameRoom } from '@/types/game';

export const useGameState = () => {
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null);
  const [timeLeftX, setTimeLeftX] = useState<number | null>(null);
  const [timeLeftO, setTimeLeftO] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  return {
    gameRoom,
    setGameRoom,
    board,
    setBoard,
    isMuted,
    setIsMuted,
    showSettings,
    setShowSettings,
    isLoading,
    setIsLoading,
    isCreating,
    setIsCreating,
    isJoining,
    setIsJoining,
    playerSymbol,
    setPlayerSymbol,
    timeLeftX,
    setTimeLeftX,
    timeLeftO,
    setTimeLeftO,
    audioRef
  };
};
