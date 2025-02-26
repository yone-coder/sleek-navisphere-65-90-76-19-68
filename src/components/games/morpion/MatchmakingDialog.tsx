
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
    
    const setupRoomSubscription = (roomId: string) => {
      console.log('Setting up room subscription for:', roomId);
      if (roomSubscription) {
        console.log('Unsubscribing from previous room subscription');
        roomSubscription.unsubscribe();
      }
      
      roomSubscription = roomService.subscribeToRoom(roomId, async (newRoom) => {
        console.log('Room update received:', newRoom);
        if (newRoom.status === 'playing' && newRoom.player2_id) {
          console.log('Match is ready to start');
          await handleMatchFound(roomId, isSubscribed);
        }
      });
    };

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

        searchTimerRef.current = setInterval(() => {
          setSearchTime(prev => prev + 1);
        }, 1000);

        const findMatch = async () => {
          if (!isSubscribed) return;

          try {
            const availableRoom = await roomService.findAvailableRoom(user.id);

            if (availableRoom) {
              console.log('Found available room:', availableRoom.id);
              currentRoomRef.current = availableRoom.id;
              setupRoomSubscription(availableRoom.id);
              
              try {
                const joinedRoom = await roomService.joinRoom(availableRoom.id, user.id);
                console.log('Successfully joined room:', joinedRoom);
              } catch (joinError) {
                console.error('Error joining room:', joinError);
                const newRoom = await roomService.createRoom(user.id);
                currentRoomRef.current = newRoom.id;
                setupRoomSubscription(newRoom.id);
              }
            } else {
              console.log('Creating new room');
              const room = await roomService.createRoom(user.id);
              currentRoomRef.current = room.id;
              setupRoomSubscription(room.id);
            }
          } catch (error) {
            console.error('Error in findMatch:', error);
            if (isSubscribed) {
              toast({
                title: "Error",
                description: "Failed to find a match. Please try again.",
                variant: "destructive"
              });
              onClose();
            }
          }
        };

        await findMatch();

        checkIntervalRef.current = setInterval(async () => {
          if (!currentRoomRef.current) {
            await findMatch();
          }
        }, 5000);

      } catch (error) {
        console.error('Error in matchmaking:', error);
        if (isSubscribed) {
          toast({
            title: "Error",
            description: "Failed to start matchmaking. Please try again.",
            variant: "destructive"
          });
          onClose();
        }
      }
    };

    const cleanup = async () => {
      console.log('Cleaning up matchmaking...');
      isSubscribed = false;
      
      if (searchTimerRef.current) clearInterval(searchTimerRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      
      if (roomSubscription) {
        console.log('Unsubscribing from room subscription');
        roomSubscription.unsubscribe();
      }
      
      if (currentRoomRef.current) {
        console.log('Cleaning up room:', currentRoomRef.current);
        try {
          await supabase
            .from('game_rooms')
            .delete()
            .eq('id', currentRoomRef.current)
            .eq('status', 'waiting');
          console.log('Room cleaned up successfully');
        } catch (error) {
          console.error('Error cleaning up room:', error);
        }
      }
    };

    startMatchmaking();
    return () => {
      cleanup().catch(error => {
        console.error('Error during cleanup:', error);
      });
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
