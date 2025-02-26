
import { useEffect } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SearchingState } from "./components/SearchingState";
import { FoundState } from "./components/FoundState";
import { ConnectingState } from "./components/ConnectingState";
import { useMatchmaking } from "./hooks/useMatchmaking";
import { roomService } from "./services/roomService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchmakingDialogProps {
  onClose: () => void;
}

export function MatchmakingDialog({ onClose }: MatchmakingDialogProps) {
  const { toast } = useToast();
  const {
    searchState,
    searchTime,
    searchTimerRef,
    checkIntervalRef,
    currentRoomRef,
    setSearchTime,
    handleMatchFound,
    setSearchState
  } = useMatchmaking(onClose);

  useEffect(() => {
    let isSubscribed = true;
    let roomSubscription: ReturnType<typeof supabase.channel>;
    
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

      // Start the search timer
      searchTimerRef.current = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);

      try {
        // Clean up any existing rooms
        await supabase
          .from('game_rooms')
          .delete()
          .eq('player1_id', user.id)
          .eq('status', 'waiting');

        // Try to find an available room
        const availableRoom = await roomService.findAvailableRoom(user.id);

        if (availableRoom) {
          const room = await roomService.joinRoom(availableRoom.id, user.id);
          currentRoomRef.current = room.id;
          await handleMatchFound(room.id, isSubscribed);
        } else {
          // Create new room if none available
          const room = await roomService.createRoom(user.id);
          currentRoomRef.current = room.id;
          
          roomSubscription = roomService.subscribeToRoom(room.id, (newRoom) => {
            if (newRoom.status === 'playing' && newRoom.player2_id) {
              handleMatchFound(room.id, isSubscribed);
            }
          });
        }
      } catch (error) {
        console.error('Error in matchmaking:', error);
        toast({
          title: "Error",
          description: "Failed to start matchmaking. Please try again.",
          variant: "destructive"
        });
        onClose();
      }
    };

    startMatchmaking();

    return () => {
      isSubscribed = false;
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      if (roomSubscription) roomSubscription.unsubscribe();
      
      // Clean up room if we created one
      if (currentRoomRef.current) {
        supabase
          .from('game_rooms')
          .delete()
          .eq('id', currentRoomRef.current)
          .eq('status', 'waiting')
          .then(() => {
            console.log('Cleaned up room:', currentRoomRef.current);
          });
      }
    };
  }, [onClose, toast, searchTimerRef, checkIntervalRef, currentRoomRef, handleMatchFound, setSearchTime]);

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Finding Match</DialogTitle>
        <DialogDescription>
          Connecting you with another player...
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-8 flex flex-col items-center justify-center gap-6">
        {searchState === "searching" && <SearchingState searchTime={searchTime} />}
        {searchState === "found" && <FoundState />}
        {searchState === "connecting" && <ConnectingState />}
      </div>
    </DialogContent>
  );
}
