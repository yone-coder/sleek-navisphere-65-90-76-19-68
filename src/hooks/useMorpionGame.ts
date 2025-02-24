
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import type { GameRoom } from '@/types/game';

export const useMorpionGame = () => {
  const [code, setCode] = useState('');
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O' | null>(null);
  const [timeLeftX, setTimeLeftX] = useState<number | null>(null);
  const [timeLeftO, setTimeLeftO] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const createGame = async () => {
    setIsCreating(true);
    try {
      const { data, error } = await supabase
        .from('game_rooms')
        .insert({
          status: 'waiting',
          current_player: 'X',
          board: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
          code: Math.random().toString(36).substring(2, 8).toUpperCase()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating game:', error);
        toast({
          title: "Error",
          description: "Failed to create game. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setGameRoom(data as GameRoom);
      setBoard((data as GameRoom).board);
      setCode((data as GameRoom).code);
      setPlayerSymbol('X');
      toast({
        title: "Success",
        description: "Game created successfully!",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const joinGame = async (joinCode: string) => {
    setIsJoining(true);
    try {
      const { data: existingRoom, error: roomError } = await supabase
        .from('game_rooms')
        .select('*')
        .eq('code', joinCode)
        .single();

      if (roomError || !existingRoom) {
        toast({
          title: "Error",
          description: "Game room not found.",
          variant: "destructive",
        });
        return;
      }

      if (existingRoom.status !== 'waiting') {
        toast({
          title: "Error",
          description: "This game has already started or finished.",
          variant: "destructive",
        });
        return;
      }

      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      const { data: updatedRoom, error } = await supabase
        .from('game_rooms')
        .update({ 
          player2_id: userId, 
          status: 'playing' 
        })
        .eq('code', joinCode)
        .select()
        .single();

      if (error || !updatedRoom) {
        toast({
          title: "Error",
          description: "Failed to join game. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setGameRoom(updatedRoom as GameRoom);
      setBoard((updatedRoom as GameRoom).board);
      setCode((updatedRoom as GameRoom).code);
      setPlayerSymbol('O');
      toast({
        title: "Success",
        description: "Game joined successfully!",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (!gameRoom || gameRoom.status !== 'playing' || board[row][col] !== '') {
      return;
    }

    if (gameRoom.current_player !== playerSymbol) {
      toast({
        title: "Not your turn",
        description: "Please wait for your turn.",
        variant: "destructive",
      });
      return;
    }

    const newBoard = board.map((rowArray, i) =>
      i === row ? rowArray.map((cell, j) => (j === col ? playerSymbol : cell)) : rowArray
    );

    setBoard(newBoard);

    const nextPlayer = gameRoom.current_player === 'X' ? 'O' : 'X';

    const updatedGameRoom: GameRoom = {
      ...gameRoom,
      board: newBoard,
      current_player: nextPlayer,
      last_move: { row, col },
    };

    setGameRoom(updatedGameRoom);

    const { error } = await supabase
      .from('game_rooms')
      .update({
        board: newBoard,
        current_player: nextPlayer,
        last_move: { row, col },
      })
      .eq('id', gameRoom.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating game room:', error);
      toast({
        title: "Error",
        description: "Failed to make move. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error);
      });
    }
  };

  return {
    code,
    gameRoom,
    board,
    playerSymbol,
    isCreating,
    isJoining,
    audioRef,
    timeLeftX,
    timeLeftO,
    setTimeLeftX,
    setTimeLeftO,
    createGame,
    joinGame,
    handleCellClick,
  };
};
