
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Users, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type GameRoom = Database['public']['Tables']['game_rooms']['Row'];

interface MatchmakingDialogProps {
  onClose: () => void;
}

export function MatchmakingDialog({ onClose }: MatchmakingDialogProps) {
  const [searchState, setSearchState] = useState<"searching" | "found" | "connecting">("searching");
  const [searchTime, setSearchTime] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let timer: number;
    let roomSubscription: ReturnType<typeof supabase.channel>;
    let isSubscribed = true;
    let currentRoomId: string | null = null;
    
    const startMatchmaking = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to play online matches.",
          variant: "destructive"
        });
        onClose();
        return;
      }

      console.log('Starting matchmaking for user:', user.id);

      // Start the search timer
      timer = window.setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);

      // Clean up any existing rooms for this user
      await supabase
        .from('game_rooms')
        .delete()
        .eq('player1_id', user.id)
        .eq('status', 'waiting');

      // First try to join an existing room
      const { data: availableRooms } = await supabase
        .from('game_rooms')
        .select('*')
        .eq('status', 'waiting')
        .is('player2_id', null)
        .neq('player1_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1);

      if (availableRooms && availableRooms.length > 0) {
        const room = availableRooms[0];
        await joinRoom(room.id, user.id);
      } else {
        // Create a new room if no available rooms found
        await createRoom(user.id);
      }
    };

    const createRoom = async (userId: string) => {
      try {
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

        currentRoomId = room.id;
        console.log('Created new room:', room.id);
        
        // Set up subscription to wait for opponent
        subscribeToRoom(room.id, userId);

        // Start periodic check for opponent
        checkForOpponent(room.id, userId);
      } catch (error) {
        console.error('Error creating room:', error);
        toast({
          title: "Error",
          description: "Failed to create game room. Please try again.",
          variant: "destructive"
        });
        onClose();
      }
    };

    const checkForOpponent = async (roomId: string, userId: string) => {
      const interval = setInterval(async () => {
        if (!isSubscribed) {
          clearInterval(interval);
          return;
        }

        const { data: room } = await supabase
          .from('game_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (room && room.status === 'playing' && room.player2_id) {
          clearInterval(interval);
          await handleMatchFound(roomId);
        }
      }, 2000);

      // Store interval to clear it on cleanup
      timer = interval;
    };

    const joinRoom = async (roomId: string, userId: string) => {
      try {
        // Set up subscription before joining
        subscribeToRoom(roomId, userId);

        const { data: room, error } = await supabase
          .from('game_rooms')
          .update({
            player2_id: userId,
            status: 'playing'
          })
          .eq('id', roomId)
          .eq('status', 'waiting')
          .select()
          .single();

        if (error) throw error;
        if (!room) throw new Error('Failed to join room');

        currentRoomId = room.id;
        console.log('Joined room:', room.id);
        await handleMatchFound(room.id);
      } catch (error) {
        console.error('Error joining room:', error);
        toast({
          title: "Error",
          description: "Failed to join game room. Please try again.",
          variant: "destructive"
        });
        onClose();
      }
    };

    const subscribeToRoom = (roomId: string, userId: string) => {
      roomSubscription = supabase.channel(`room_${roomId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'game_rooms',
            filter: `id=eq.${roomId}`
          },
          async (payload: RealtimePostgresChangesPayload<GameRoom>) => {
            const newRoom = payload.new;
            console.log('Room update:', newRoom);
            
            if (newRoom && 
                newRoom.status === 'playing' && 
                newRoom.player1_id && 
                newRoom.player2_id &&
                (newRoom.player1_id === userId || newRoom.player2_id === userId)) {
              await handleMatchFound(roomId);
            }
          }
        )
        .subscribe();

      console.log('Subscribed to room:', roomId);
    };

    const handleMatchFound = async (roomId: string) => {
      if (!isSubscribed) return;
      
      try {
        const { data: room, error } = await supabase
          .from('game_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (error) throw error;
        if (!room) throw new Error('Room not found');

        console.log('Match found! Room:', room);
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
    };

    startMatchmaking();

    return () => {
      console.log('Cleaning up matchmaking...');
      isSubscribed = false;
      clearInterval(timer);
      
      if (roomSubscription) {
        roomSubscription.unsubscribe();
      }
      
      if (currentRoomId) {
        supabase
          .from('game_rooms')
          .delete()
          .eq('id', currentRoomId)
          .eq('status', 'waiting')
          .then(() => {
            console.log('Cleaned up waiting room:', currentRoomId);
          });
      }
    };
  }, [navigate, onClose, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Finding Match</DialogTitle>
        <DialogDescription>
          Connecting you with another player...
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-8 flex flex-col items-center justify-center gap-6">
        {searchState === "searching" && (
          <>
            <div className="relative">
              <motion.div
                className="w-32 h-32 rounded-full border-2 border-blue-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-blue-500/40"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-lg font-medium">Searching for opponents...</p>
              <p className="text-sm text-muted-foreground">Time elapsed: {formatTime(searchTime)}</p>
            </div>
          </>
        )}

        {searchState === "found" && (
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto"
            >
              <Users className="w-12 h-12 text-green-600" />
            </motion.div>
            <p className="text-lg font-medium text-green-600">Opponent Found!</p>
          </div>
        )}

        {searchState === "connecting" && (
          <div className="space-y-4 text-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <Gamepad2 className="w-12 h-12 text-blue-600" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium">Connecting players...</p>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Establishing connection</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
