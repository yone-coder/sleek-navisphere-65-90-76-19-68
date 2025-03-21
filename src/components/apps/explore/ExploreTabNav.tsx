
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExploreTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ExploreTabNav({ activeTab, setActiveTab }: ExploreTabNavProps) {
  return (
    <div className="sticky top-16 z-10 bg-white py-2 mb-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
