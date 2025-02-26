
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GameRoom = Database['public']['Tables']['game_rooms']['Row'];

export const roomService = {
  async createRoom(userId: string): Promise<GameRoom> {
    const { data: room, error } = await supabase
      .from('game_rooms')
      .insert({
        player1_id: userId,
        status: 'waiting',
        board: Array(30).fill(null).map(() => Array(30).fill(null)),
        code: Math.random().toString(36).substring(7),
        current_player: 'X',
        time_left_x: 300,
        time_left_o: 300,
        winner: null,
        last_move: null
      })
      .select()
      .single();

    if (error) throw error;
    if (!room) throw new Error('Failed to create room');

    return room;
  },

  async joinRoom(roomId: string, userId: string): Promise<GameRoom> {
    const { data: room, error } = await supabase
      .from('game_rooms')
      .update({
        player2_id: userId,
        status: 'playing'
      })
      .eq('id', roomId)
      .eq('status', 'waiting')
      .is('player2_id', null)
      .select()
      .single();

    if (error) throw error;
    if (!room) throw new Error('Failed to join room');

    return room;
  },

  async findAvailableRoom(userId: string) {
    const { data: rooms } = await supabase
      .from('game_rooms')
      .select()
      .eq('status', 'waiting')
      .is('player2_id', null)
      .neq('player1_id', userId)
      .order('created_at', { ascending: true })
      .limit(1);

    return rooms?.[0] as GameRoom | undefined;
  },

  subscribeToRoom(roomId: string, onUpdate: (room: GameRoom) => void) {
    return supabase.channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_rooms',
          filter: `id=eq.${roomId}`
        },
        (payload) => {
          const newRoom = payload.new as GameRoom;
          if (newRoom) {
            onUpdate(newRoom);
          }
        }
      )
      .subscribe();
  }
};
