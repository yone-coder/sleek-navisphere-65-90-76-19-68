
import React, { useState, useEffect, useRef } from 'react';
import { Settings2, Undo2, RotateCcw, Volume2, VolumeX, Clock } from 'lucide-react';
import { GameLobby } from '@/components/games/GameLobby';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import type { GameRoom } from '@/types/game';
import type { Database } from '@/integrations/supabase/types';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

const Morpion = () => {
  const [code, setCode] = useState('');
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

      if (error) {
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

  useEffect(() => {
    if (gameRoom?.id) {
      const channel = supabase.channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'game_rooms',
            filter: `id=eq.${gameRoom.id}`
          },
          (payload: RealtimePostgresChangesPayload<Database['public']['Tables']['game_rooms']['Row']>) => {
            if (!payload.new) return;
            
            const newGameRoom: GameRoom = {
              id: payload.new.id,
              code: payload.new.code,
              status: payload.new.status as GameRoom['status'],
              player1_id: payload.new.player1_id,
              player2_id: payload.new.player2_id,
              current_player: payload.new.current_player as 'X' | 'O',
              winner: payload.new.winner,
              board: Array.isArray(payload.new.board) ? payload.new.board as string[][] : [],
              created_at: payload.new.created_at,
              last_move: payload.new.last_move as GameRoom['last_move'],
              time_left_x: payload.new.time_left_x,
              time_left_o: payload.new.time_left_o
            };
            
            setGameRoom(newGameRoom);
            if (Array.isArray(payload.new.board)) {
              setBoard(payload.new.board as string[][]);
            }
          }
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [gameRoom?.id]);

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

    setGameRoom(prevGameRoom => {
      if (!prevGameRoom) return null;
      return {
        ...prevGameRoom,
        board: newBoard,
        current_player: nextPlayer,
        last_move: { row, col },
      };
    });

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

  return (
    <div className="container mx-auto px-4 py-8">
      <GameLobby
        gameRoom={gameRoom}
        board={board}
        playerSymbol={playerSymbol}
        isMuted={isMuted}
        showSettings={showSettings}
        isLoading={isLoading}
        isCreating={isCreating}
        isJoining={isJoining}
        audioRef={audioRef}
        createGame={createGame}
        joinGame={joinGame}
        handleCellClick={handleCellClick}
        setIsMuted={setIsMuted}
        setShowSettings={setShowSettings}
        setIsLoading={setIsLoading}
        setIsCreating={setIsCreating}
        setIsJoining={setIsJoining}
        setTimeLeftX={setTimeLeftX}
        setTimeLeftO={setTimeLeftO}
      />
    </div>
  );
};

export default Morpion;
