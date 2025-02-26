
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type GameRoom = Database['public']['Tables']['game_rooms']['Row'];

export const useMatchmaking = (onClose: () => void) => {
  const [searchState, setSearchState] = useState<"searching" | "found" | "connecting">("searching");
  const [searchTime, setSearchTime] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const searchTimerRef = useRef<ReturnType<typeof setInterval>>();
  const checkIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const currentRoomRef = useRef<string | null>(null);

  const handleMatchFound = useCallback(async (roomId: string, isSubscribed: boolean) => {
    if (!isSubscribed) return;
    
    try {
      const { data: roomData, error } = await supabase
        .from('game_rooms')
        .select()
        .eq('id', roomId)
        .single();

      if (error) {
        console.error('Error fetching room:', error);
        throw error;
      }
      if (!roomData) {
        console.error('Room not found:', roomId);
        throw new Error('Room not found');
      }

      if (!('status' in roomData) || !('player1_id' in roomData) || !('player2_id' in roomData)) {
        console.error('Invalid room data structure:', roomData);
        throw new Error('Invalid room data structure');
      }

      const room = roomData as GameRoom;
      
      if (room.status !== 'playing') {
        console.log('Room not in playing state:', room);
        return;
      }

      setSearchState("found");

      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isSubscribed) return;
      
      setSearchState("connecting");
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isSubscribed) return;

      onClose();
      navigate(`/games/morpion?start=true&mode=online&roomId=${roomId}`);
      toast({
        title: "Match Found!",
        description: "Connected to opponent. Get ready to play!",
      });
    } catch (error) {
      console.error('Error handling match:', error);
      toast({
        title: "Error",
        description: "Failed to connect to game. Please try again.",
        variant: "destructive"
      });
      onClose();
    }
  }, [navigate, onClose, toast]);

  return {
    searchState,
    searchTime,
    searchTimerRef,
    checkIntervalRef,
    currentRoomRef,
    setSearchTime,
    handleMatchFound,
    setSearchState
  };
};
