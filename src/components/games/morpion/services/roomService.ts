
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
    
    // First get the room to verify it exists and is available
    const { data: rooms, error: checkError } = await supabase
      .from('game_rooms')
      .select()
      .eq('id', roomId)
      .eq('status', 'waiting')
      .is('player2_id', null);

    if (checkError || !rooms || rooms.length === 0) {
      console.error('Room not available');
      throw new Error('Room not available');
    }

    // Then update it
    const { data: updatedRooms, error: updateError } = await supabase
      .from('game_rooms')
      .update({
        player2_id: userId,
        status: 'playing'
      })
      .eq('id', roomId)
      .eq('status', 'waiting')
      .is('player2_id', null)
      .select();

    if (updateError || !updatedRooms || updatedRooms.length === 0) {
      console.error('Error updating room:', updateError);
      throw new Error('Room not available');
    }

    console.log('Successfully joined room:', roomId);
    return updatedRooms[0];
  },

  async findAvailableRoom(userId: string): Promise<GameRoom | null> {
    console.log('Finding available room for user:', userId);

    // Clean up any stale rooms first
    await supabase
      .from('game_rooms')
      .delete()
      .eq('player1_id', userId)
      .eq('status', 'waiting');

    // Find an available room
    const { data: rooms, error } = await supabase
      .from('game_rooms')
      .select()
      .eq('status', 'waiting')
      .is('player2_id', null)
      .neq('player1_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error finding available room:', error);
      throw error;
    }

    if (!rooms || rooms.length === 0) {
      console.log('No available rooms found');
      return null;
    }

    const availableRoom = rooms[0];
    console.log('Found available room:', availableRoom.id);
    return availableRoom;
  },

  subscribeToRoom(roomId: string, onUpdate: (room: GameRoom) => void) {
    console.log('Setting up subscription for room:', roomId);
    
    const channel = supabase.channel(`room:${roomId}`)
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

    console.log('Room subscription established');
    return channel;
  }
};
