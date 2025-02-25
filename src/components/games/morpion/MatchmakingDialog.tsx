
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

      timer = window.setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);

      // Enable realtime for game_rooms table
      await supabase.from('game_rooms').select('*').limit(1);

      try {
        // Look for an existing room
        const { data: rooms } = await supabase
          .from('game_rooms')
          .select('*')
          .eq('status', 'waiting')
          .is('player2_id', null)
          .neq('player1_id', user.id)
          .order('created_at', { ascending: true });

        const existingRoom = rooms && rooms.length > 0 ? rooms[0] : null;

        if (existingRoom) {
          console.log('Found existing room:', existingRoom.id);
          currentRoomId = existingRoom.id;

          // Subscribe to room updates before joining
          roomSubscription = supabase.channel('game_room_' + existingRoom.id)
            .on('postgres_changes', {
              event: '*',
              schema: 'public',
              table: 'game_rooms',
              filter: `id=eq.${existingRoom.id}`,
            }, async (payload) => {
              console.log('Room update received:', payload);
              if (payload.new.status === 'playing' && 
                  payload.new.player2_id === user.id && 
                  payload.new.player1_id) {
                await handleMatchFound(existingRoom.id);
              }
            })
            .subscribe();

          // Try to join the room
          const { data: updatedRoom, error: joinError } = await supabase
            .from('game_rooms')
            .update({ 
              player2_id: user.id,
              status: 'playing'
            })
            .eq('id', existingRoom.id)
            .eq('status', 'waiting')
            .select()
            .single();

          if (joinError) {
            console.error('Error joining room:', joinError);
            throw joinError;
          }

          console.log('Successfully joined room:', updatedRoom);
          
        } else {
          console.log('Creating new room');
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

          console.log('Created new room:', newRoom);
          currentRoomId = newRoom.id;

          // Subscribe to room updates
          roomSubscription = supabase.channel('game_room_' + newRoom.id)
            .on('postgres_changes', {
              event: '*',
              schema: 'public',
              table: 'game_rooms',
              filter: `id=eq.${newRoom.id}`,
            }, async (payload) => {
              console.log('Room update received:', payload);
              if (payload.new.status === 'playing' && 
                  payload.new.player2_id && 
                  payload.new.player1_id === user.id) {
                await handleMatchFound(newRoom.id);
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
      
      try {
        // Verify room status
        const { data: room } = await supabase
          .from('game_rooms')
          .select('*')
          .eq('id', roomId)
          .single();

        if (!room || room.status !== 'playing' || !room.player1_id || !room.player2_id) {
          console.log('Invalid room state:', room);
          return;
        }

        console.log('Match confirmed! Room:', room);
        setSearchState("found");

        // Small delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!isSubscribed) return;
        
        setSearchState("connecting");
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (!isSubscribed) return;

        onClose();
        navigate(`/games/morpion?start=true&mode=online&roomId=${roomId}`);
        toast({
          title: "Match Found!",
          description: "Connected to opponent. Get ready to play!",
        });
      } catch (error) {
        console.error('Error confirming match:', error);
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
