
import { Bell, ChevronDown, Menu, Store, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppStoreHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AppStoreHeader({ activeTab, setActiveTab }: AppStoreHeaderProps) {
  const isMobile = useIsMobile();
  const tabs = [
    { id: "today", label: "Today" },
    { id: "games", label: "Games" },
    { id: "apps", label: "Apps" },
    { id: "arcade", label: "Arcade" }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      {/* Main Header Content */}
      <div className="px-3 py-2 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 p-1 rounded-full">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Entertainment</DropdownMenuItem>
                <DropdownMenuItem>Social</DropdownMenuItem>
                <DropdownMenuItem>Productivity</DropdownMenuItem>
                <DropdownMenuItem>Education</DropdownMenuItem>
                <DropdownMenuItem>Health & Fitness</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center gap-1.5">
              <Store className="h-6 w-6 text-blue-500" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">App Store</h1>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-full hover:bg-gray-100 transition relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Avatar className="h-7 w-7 border border-gray-200">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="mt-2">
          <div className="flex gap-5 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap font-medium text-sm ${
                  activeTab === tab.id 
                    ? "text-blue-500 border-b-2 border-blue-500 pb-1" 
                    : "text-gray-600 hover:text-gray-900 pb-1"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
