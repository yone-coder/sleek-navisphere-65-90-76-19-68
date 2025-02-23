
import { Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegisterBarProps {
  currentParticipants: number;
  maxParticipants: number;
}

export function RegisterBar({ currentParticipants, maxParticipants }: RegisterBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 backdrop-blur-lg bg-background/80 border-t border-border/40">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {currentParticipants}/{maxParticipants}
          </span>
        </div>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white gap-2"
        >
          <Trophy className="h-4 w-4" />
          Register Now
        </Button>
      </div>
    </div>
  );
}
