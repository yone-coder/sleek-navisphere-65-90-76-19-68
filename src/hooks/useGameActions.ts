
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import type { GameRoom } from '@/types/game';

export const useGameActions = (
  setGameRoom: (room: GameRoom | null) => void,
  setBoard: (board: string[][]) => void,
  setPlayerSymbol: (symbol: 'X' | 'O' | null) => void,
  setIsCreating: (value: boolean) => void,
  setIsJoining: (value: boolean) => void,
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  const { toast } = useToast();
  const [code, setCode] = useState('');

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

      const gameRoom = data as GameRoom;
      setGameRoom(gameRoom);
      setBoard(gameRoom.board);
      setCode(gameRoom.code);
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

      if (error) {
        toast({
          title: "Error",
          description: "Failed to join game. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const gameRoom = updatedRoom as GameRoom;
      setGameRoom(gameRoom);
      setBoard(gameRoom.board);
      setCode(gameRoom.code);
      setPlayerSymbol('O');
      toast({
        title: "Success",
        description: "Game joined successfully!",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleCellClick = async (
    gameRoom: GameRoom,
    board: string[][],
    playerSymbol: 'X' | 'O' | null,
    row: number,
    col: number
  ) => {
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
    const updatedGameRoom = {
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
    createGame,
    joinGame,
    handleCellClick,
  };
};
