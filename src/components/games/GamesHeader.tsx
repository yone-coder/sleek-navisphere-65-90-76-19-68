
import { ChevronLeft, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface GamesHeaderProps {
  searchQuery: string;
  notifications: number;
  onSearchClick: () => void;
}

export const GamesHeader = ({ searchQuery, notifications, onSearchClick }: GamesHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for games"
          className="w-full pl-10 bg-gray-50 border-none"
          value={searchQuery}
          onClick={onSearchClick}
          readOnly
        />
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        className="relative h-8 w-8"
      >
        <Bell className="h-4 w-4" />
        {notifications > 0 && (
          <Badge 
            className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] font-medium text-white border-2 border-white"
          >
            {notifications}
          </Badge>
        )}
      </Button>
    </div>
  );
};
