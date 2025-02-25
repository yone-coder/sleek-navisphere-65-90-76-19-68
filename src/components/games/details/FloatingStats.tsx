
import { Heart, Users, Trophy, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingStatsProps {
  currentPlayers?: number;
  totalPlayers?: number;
  className?: string;
}

export const FloatingStats = ({ currentPlayers, totalPlayers, className }: FloatingStatsProps) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-4 backdrop-blur-lg bg-background/80 border-t z-40",
      "md:bottom-auto md:top-24 md:right-4 md:left-auto md:rounded-lg md:border md:shadow-lg md:w-64",
      className
    )}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Current Players"
            value={currentPlayers?.toLocaleString() || "0"}
            icon={<Users className="w-4 h-4" />}
          />
          <StatItem
            label="Total Players"
            value={totalPlayers?.toLocaleString() || "0"}
            icon={<Trophy className="w-4 h-4" />}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Follow
          </Button>
          <Button variant="outline" size="icon" className="px-2">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="px-2">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const StatItem = ({ label, value, icon }: StatItemProps) => (
  <div className="space-y-1">
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-sm font-medium">{value}</p>
  </div>
);
