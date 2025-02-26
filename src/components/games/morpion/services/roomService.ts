
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GameRoom = Database['public']['Tables']['game_rooms']['Row'];

export const roomService = {
  async createRoom(userId: string): Promise<GameRoom> {
    console.log('Creating room for user:', userId);
    
    // First, clean up any existing rooms for this user
    const { error: cleanupError } = await supabase
      .from('game_rooms')
      .delete()
      .eq('player1_id', userId)
      .eq('status', 'waiting');

    if (cleanupError) {
      console.error('Error cleaning up existing rooms:', cleanupError);
    }

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

    console.log('Room created successfully:', room.id);
    return room;
  },

  async joinRoom(roomId: string, userId: string): Promise<GameRoom> {
    console.log('Attempting to join room:', roomId, 'for user:', userId);
    
    // Use a transaction to ensure atomicity
    const { data: room, error } = await supabase.rpc('join_game_room', {
      p_room_id: roomId,
      p_user_id: userId
    });

    if (error) {
      console.error('Error joining room:', error);
      throw error;
    }

    if (!room) {
      throw new Error('Failed to join room');
    }

    console.log('Successfully joined room:', roomId);
    return room as GameRoom;
  },

  async findAvailableRoom(userId: string): Promise<GameRoom | null> {
    console.log('Finding available room for user:', userId);

    // We'll use a stored procedure to handle this atomically
    const { data: room, error } = await supabase.rpc('find_available_room', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error finding available room:', error);
      throw error;
    }

    if (!room) {
      console.log('No available rooms found');
      return null;
    }

    console.log('Found available room:', room);
    return room as GameRoom;
  },

  subscribeToRoom(roomId: string, onUpdate: (room: GameRoom) => void) {
    console.log('Setting up subscription for room:', roomId);
    
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
