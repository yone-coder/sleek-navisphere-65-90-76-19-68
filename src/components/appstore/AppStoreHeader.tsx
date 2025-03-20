
import { Search, User, Bell, Menu, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface AppStoreHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AppStoreHeader({ activeTab, setActiveTab }: AppStoreHeaderProps) {
  const tabs = [
    { id: "today", label: "Today" },
    { id: "games", label: "Games" },
    { id: "apps", label: "Apps" },
    { id: "arcade", label: "Arcade" }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 backdrop-blur-md border-b border-gray-200">
      <div className="px-4 pt-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <span className="hidden sm:inline">Categories</span>
                  <Menu className="w-5 h-5 sm:hidden" />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Games</DropdownMenuItem>
                <DropdownMenuItem>Entertainment</DropdownMenuItem>
                <DropdownMenuItem>Social</DropdownMenuItem>
                <DropdownMenuItem>Productivity</DropdownMenuItem>
                <DropdownMenuItem>Education</DropdownMenuItem>
                <DropdownMenuItem>Health & Fitness</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <span className="hidden sm:block text-gray-300">|</span>
            
            <h1 className="text-2xl font-bold text-gray-900 sm:ml-2">App Store</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-none pt-2 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-1 px-1 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "text-blue-500 border-b-2 border-blue-500" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for apps & games"
              className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
