
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, History, Scan, Sparkles, Settings, Filter } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RecentScreens } from "@/components/RecentScreens";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppsHeader = () => {
  const [notifications, setNotifications] = useState(3); // Mock notification count

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center gap-2">
          <RecentScreens>
            <Button variant="ghost" size="icon" className="relative">
              <History className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-blue-500 p-2 text-[10px] text-white">
                8
              </Badge>
            </Button>
          </RecentScreens>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 items-center gap-2 md:gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search apps, games, tournaments..."
              className="pl-8 bg-muted/50"
            />
          </div>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Filter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Scan className="h-5 w-5" />
          </Button>
        </div>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-[10px] text-white"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                Upgrade to Pro
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
