
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
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.error('Authentication error:', authError);
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
        searchTimerRef.current = setInterval(() => {
          setSearchTime(prev => prev + 1);
        }, 1000);

        // Try to find an available room first
        const availableRoom = await roomService.findAvailableRoom(user.id);
        console.log('Available room search result:', availableRoom);

        if (availableRoom) {
          console.log('Found available room, attempting to join:', availableRoom.id);
          try {
            const room = await roomService.joinRoom(availableRoom.id, user.id);
            currentRoomRef.current = room.id;
            await handleMatchFound(room.id, isSubscribed);
          } catch (joinError) {
            console.error('Failed to join room:', joinError);
            // If joining fails, create a new room
            const newRoom = await roomService.createRoom(user.id);
            currentRoomRef.current = newRoom.id;
            setupRoomSubscription(newRoom.id);
          }
        } else {
          console.log('No available room, creating new room');
          const room = await roomService.createRoom(user.id);
          currentRoomRef.current = room.id;
          setupRoomSubscription(room.id);
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

    const setupRoomSubscription = (roomId: string) => {
      console.log('Setting up room subscription for:', roomId);
      roomSubscription = roomService.subscribeToRoom(roomId, (newRoom) => {
        console.log('Room update received:', newRoom);
        if (newRoom.status === 'playing' && newRoom.player2_id) {
          handleMatchFound(roomId, isSubscribed);
        }
      });
    };

    startMatchmaking();

    return () => {
      console.log('Cleaning up matchmaking...');
      isSubscribed = false;
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      if (roomSubscription) roomSubscription.unsubscribe();
      
      // Clean up room if we created one
      if (currentRoomRef.current) {
        console.log('Cleaning up room:', currentRoomRef.current);
        supabase
          .from('game_rooms')
          .delete()
          .eq('id', currentRoomRef.current)
          .eq('status', 'waiting')
          .then(() => {
            console.log('Room cleaned up successfully');
          })
          .catch((error) => {
            console.error('Error cleaning up room:', error);
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
