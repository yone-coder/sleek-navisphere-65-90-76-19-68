
import { ArrowLeft, GamepadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GameHeaderNavProps {
  title: string;
  gameType: string;
  status?: string;
}

export const GameHeaderNav = ({ title, gameType, status }: GameHeaderNavProps) => {
  const navigate = useNavigate();

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'maintenance':
        return 'Maintenance';
      case 'upcoming':
        return 'Coming Soon';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20';
      case 'maintenance':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20';
      case 'offline':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-border/40">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-foreground/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-base font-medium truncate max-w-[200px]">
            {title || "Game Details"}
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GamepadIcon className="h-3 w-3" />
            <span>{gameType}</span>
          </div>
        </div>
      </div>
      <Badge 
        variant="outline"
        className={cn(
          "text-[10px] px-1.5 py-0.5 animate-pulse transition-colors duration-300",
          getStatusColor(status)
        )}
      >
        {getStatusText(status)}
      </Badge>
    </div>
  );
};
