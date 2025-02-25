
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Users, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    let isSubscribed = true; // Track component mount state
    let currentRoomId: string | null = null;
    
    const startMatchmaking = async () => {
      // Get current user
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

      // Start the search timer
      timer = window.setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);

      try {
        // First try to join an existing room
        const { data: existingRoom, error: findError } = await supabase
          .from('game_rooms')
          .select()
          .eq('status', 'waiting')
          .is('player2_id', null)
          .neq('player1_id', user.id) // Don't join own room
          .order('created_at', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (findError) throw findError;

        if (existingRoom) {
          console.log('Found existing room:', existingRoom.id);
          currentRoomId = existingRoom.id;

          // Join existing room
          const { error: joinError } = await supabase
            .from('game_rooms')
            .update({ 
              player2_id: user.id,
              status: 'playing'
            })
            .eq('id', existingRoom.id)
            .eq('status', 'waiting'); // Ensure room is still waiting

          if (joinError) {
            console.error('Error joining room:', joinError);
            throw joinError;
          }

          // Subscribe to room updates to confirm join
          roomSubscription = supabase.channel('game_room_' + existingRoom.id)
            .on('postgres_changes', {
              event: 'UPDATE',
              schema: 'public',
              table: 'game_rooms',
              filter: `id=eq.${existingRoom.id}`,
            }, async (payload) => {
              console.log('Room updated:', payload);
              if (payload.new.status === 'playing' && payload.new.player2_id === user.id) {
                handleMatchFound(existingRoom.id);
              }
            })
            .subscribe();
          
        } else {
          // Create new room
          const { data: newRoom, error: createError } = await supabase
            .from('game_rooms')
            .insert({
              player1_id: user.id,
              status: 'waiting',
              board: Array(30).fill(null).map(() => Array(30).fill(null)),
              code: Math.random().toString(36).substring(7),
              current_player: 'X'
            })
            .select()
            .single();

          if (createError) throw createError;

          if (!isSubscribed) return;

          console.log('Created new room:', newRoom.id);
          currentRoomId = newRoom.id;

          // Subscribe to room updates
          roomSubscription = supabase.channel('game_room_' + newRoom.id)
            .on('postgres_changes', {
              event: 'UPDATE',
              schema: 'public',
              table: 'game_rooms',
              filter: `id=eq.${newRoom.id}`,
            }, async (payload) => {
              console.log('Room updated:', payload);
              if (payload.new.status === 'playing' && payload.new.player2_id) {
                handleMatchFound(newRoom.id);
              }
            })
            .subscribe();
        }
      } catch (error) {
        console.error('Matchmaking error:', error);
        if (isSubscribed) {
          toast({
            title: "Matchmaking Error",
            description: "Failed to find or create a game. Please try again.",
            variant: "destructive"
          });
          onClose();
        }
      }
    };

    const handleMatchFound = async (roomId: string) => {
      if (!isSubscribed || roomId !== currentRoomId) return;
      
      // Double check the room status
      const { data: room } = await supabase
        .from('game_rooms')
        .select()
        .eq('id', roomId)
        .single();

      if (!room || room.status !== 'playing') {
        console.log('Invalid room state:', room);
        return;
      }

      setSearchState("found");
      console.log('Match found! Room ID:', roomId);
      
      setTimeout(() => {
        if (!isSubscribed) return;
        setSearchState("connecting");
        
        setTimeout(() => {
          if (!isSubscribed) return;
          onClose();
          navigate(`/games/morpion?start=true&mode=online&roomId=${roomId}`);
          toast({
            title: "Match Found!",
            description: "Connected to opponent. Get ready to play!",
          });
        }, 1500);
      }, 1000);
    };

    // Start the matchmaking process
    startMatchmaking();

    // Cleanup function
    return () => {
      isSubscribed = false;
      clearInterval(timer);
      if (roomSubscription) {
        roomSubscription.unsubscribe();
      }
      // Clean up any waiting room we created
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
