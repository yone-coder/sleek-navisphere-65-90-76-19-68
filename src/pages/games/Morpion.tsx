
import React, { useState, useEffect } from 'react';
import { GameLobby } from '@/components/games/GameLobby';
import { GameSettings } from '@/components/games/morpion/GameSettings';
import { useMorpionGame } from '@/hooks/useMorpionGame';
import { supabase } from '@/integrations/supabase/client';
import type { GameRoom } from '@/types/game';
import type { Database } from '@/integrations/supabase/types';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

const Morpion = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
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
  } = useMorpionGame();

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
              board: Array.isArray(payload.new.board) ? payload.new.board as string[][] : [['', '', ''], ['', '', ''], ['', '', '']],
              created_at: payload.new.created_at,
              last_move: payload.new.last_move as { row: number; col: number } | null,
              time_left_x: payload.new.time_left_x,
              time_left_o: payload.new.time_left_o
            };
            
            if (Array.isArray(newGameRoom.board)) {
              setGameRoom(newGameRoom);
              setBoard(newGameRoom.board);
            }
          }
        )
        .subscribe();

      return () => {
        channel.unsubscribe();
      };
    }
  }, [gameRoom?.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <GameSettings
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
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
