
import { Search, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExploreHeaderProps {
  updatesCount: number;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

export function ExploreHeader({ updatesCount, setIsSearchOpen, setIsDrawerOpen }: ExploreHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <h2 className="text-xl font-bold">Explore Apps</h2>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full relative"
        >
          <Bell className="h-5 w-5" />
          {updatesCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {updatesCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}
