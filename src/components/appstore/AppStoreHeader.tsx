
import { Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <h1 className="text-3xl font-bold text-gray-900">App Store</h1>
          <div className="flex items-center gap-3">
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
  );
}
