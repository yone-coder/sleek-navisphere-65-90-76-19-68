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
        .insert([
          {
            status: 'waiting',
            current_player: 'X',
            board: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
          },
        ])
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

  const joinGame = async (code: string) => {
    setIsJoining(true);
    try {
      const { data: existingRoom, error: roomError } = await supabase
        .from('game_rooms')
        .select('*')
        .eq('code', code)
        .single();

      if (roomError) {
        console.error('Error fetching game room:', roomError);
        toast({
          title: "Error",
          description: "Failed to fetch game room. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!existingRoom) {
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

      // Update the game room to add the player
      const { data, error } = await supabase
        .from('game_rooms')
        .update({ player2_id: supabase.auth.getUser().then(({ data }) => data.user?.id), status: 'playing' })
        .eq('code', code)
        .select()
        .single();

      if (error) {
        console.error('Error joining game:', error);
        toast({
          title: "Error",
          description: "Failed to join game. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setGameRoom(data as GameRoom);
      setBoard((data as GameRoom).board);
      setCode((data as GameRoom).code);
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
          (payload: RealtimePostgresChangesPayload<{
            id: string;
            code: string;
            status: 'waiting' | 'playing' | 'finished';
            player1_id: string | null;
            player2_id: string | null;
            current_player: 'X' | 'O';
            winner: string | null;
            board: string[][];
            created_at: string;
            last_move: { row: number; col: number } | null;
            time_left_x: number;
            time_left_o: number;
          }>) => {
            const newGameRoom: GameRoom = {
              id: payload.new.id,
              code: payload.new.code,
              status: payload.new.status,
              player1_id: payload.new.player1_id,
              player2_id: payload.new.player2_id,
              current_player: payload.new.current_player,
              winner: payload.new.winner,
              board: Array.isArray(payload.new.board) ? payload.new.board : [],
              created_at: payload.new.created_at,
              last_move: payload.new.last_move,
              time_left_x: payload.new.time_left_x,
              time_left_o: payload.new.time_left_o
            };
            
            setGameRoom(newGameRoom);
            if (Array.isArray(payload.new.board)) {
              setBoard(payload.new.board);
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
        variant: "warning",
      });
      return;
    }

    const newBoard = board.map((rowArray, i) =>
      i === row ? rowArray.map((cell, j) => (j === col ? playerSymbol : cell)) : rowArray
    );

    setBoard(newBoard);

    // Optimistically update the local state
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

    // Update the game room in the database
    const { data: updatedRoom, error } = await supabase
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
    <GameLobby
      code={code}
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
  );
};

export default Morpion;
