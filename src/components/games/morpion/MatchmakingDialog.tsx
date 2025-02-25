
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Users, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MatchmakingDialogProps {
  onClose: () => void;
}

export function MatchmakingDialog({ onClose }: MatchmakingDialogProps) {
  const [searchState, setSearchState] = useState<"searching" | "found" | "connecting">("searching");
  const [searchTime, setSearchTime] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);

    // Simulate finding a match after a random time between 5-15 seconds
    const matchTimeout = setTimeout(() => {
      setSearchState("found");
      
      // Simulate connection process
      setTimeout(() => {
        setSearchState("connecting");
        
        // Navigate to game after connection
        setTimeout(() => {
          const roomId = Math.random().toString(36).substring(7);
          onClose();
          navigate(`/games/morpion?start=true&mode=online&roomId=${roomId}`);
          toast({
            title: "Match Found!",
            description: "Connected to opponent. Get ready to play!",
          });
        }, 1500);
      }, 1000);
    }, Math.random() * 10000 + 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(matchTimeout);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Finding Match</DialogTitle>
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
