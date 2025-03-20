
import { Home, Gamepad2, Grid3X3, Sparkles } from "lucide-react";

interface AppStoreTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AppStoreTabs({ activeTab, setActiveTab }: AppStoreTabsProps) {
  const tabs = [
    { id: "today", label: "Today", icon: Home },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "apps", label: "Apps", icon: Grid3X3 },
    { id: "arcade", label: "Arcade", icon: Sparkles }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center pt-2 pb-2 flex-1 ${
                activeTab === tab.id ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className={`h-6 w-6 ${activeTab === tab.id ? "text-blue-500" : "text-gray-500"}`} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
