
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TournamentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TAB_ITEMS = ["overview", "participants", "rules", "matches", "brackets", "faqs", "schedule", "roadmap"];

export function TournamentTabs({ activeTab, onTabChange }: TournamentTabsProps) {
  return (
    <div className="px-4 py-1">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <div className="w-full overflow-x-auto no-scrollbar">
          <TabsList className="w-full h-auto inline-flex whitespace-nowrap">
            {TAB_ITEMS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-shrink-0"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
