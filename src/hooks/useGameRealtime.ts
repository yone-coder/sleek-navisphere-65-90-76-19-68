
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GameRoom } from '@/types/game';
import type { Database } from '@/integrations/supabase/types';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export const useGameRealtime = (
  gameRoom: GameRoom | null,
  setGameRoom: (room: GameRoom) => void,
  setBoard: (board: string[][]) => void
) => {
  useEffect(() => {
    if (!gameRoom?.id) return;

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
          
          setGameRoom(newGameRoom);
          setBoard(newGameRoom.board);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [gameRoom?.id]);
};
