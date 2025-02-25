
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GameTabNavProps {
  tabs: string[];
}

export const GameTabNav = ({ tabs }: GameTabNavProps) => {
  return (
    <div className="px-4 py-1">
      <div className="w-full overflow-x-auto no-scrollbar">
        <TabsList className="w-full h-auto inline-flex whitespace-nowrap">
          {tabs.map((tab) => (
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
    </div>
  );
};
