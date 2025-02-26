
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GameRoom = Database['public']['Tables']['game_rooms']['Row'];

export const roomService = {
  async createRoom(userId: string): Promise<GameRoom> {
    // First, clean up any existing rooms for this user
    await supabase
      .from('game_rooms')
      .delete()
      .eq('player1_id', userId)
      .eq('status', 'waiting');

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

    if (error) {
      console.error('Error creating room:', error);
      throw error;
    }
    if (!room) throw new Error('Failed to create room');

    return room;
  },

  async joinRoom(roomId: string, userId: string): Promise<GameRoom> {
    // First verify the room exists and is available
    const { data: existingRoom } = await supabase
      .from('game_rooms')
      .select()
      .eq('id', roomId)
      .eq('status', 'waiting')
      .is('player2_id', null)
      .single();

    if (!existingRoom) {
      throw new Error('Room not available');
    }

    const { data: room, error } = await supabase
      .from('game_rooms')
      .update({
        player2_id: userId,
        status: 'playing'
      })
      .eq('id', roomId)
      .select()
      .single();

    if (error) {
      console.error('Error joining room:', error);
      throw error;
    }
    if (!room) throw new Error('Failed to join room');

    return room;
  },

  async findAvailableRoom(userId: string): Promise<GameRoom | undefined> {
    // First clean up any stale rooms
    await supabase
      .from('game_rooms')
      .delete()
      .eq('status', 'waiting')
      .eq('player1_id', userId);

    const { data: rooms, error } = await supabase
      .from('game_rooms')
      .select()
      .eq('status', 'waiting')
      .is('player2_id', null)
      .neq('player1_id', userId)
      .order('created_at', { ascending: true })
      .limit(1);

    if (error) {
      console.error('Error finding available room:', error);
      throw error;
    }

    return rooms?.[0];
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
            console.log('Room update received:', newRoom);
            onUpdate(newRoom);
          }
        }
      )
      .subscribe();
  }
};
