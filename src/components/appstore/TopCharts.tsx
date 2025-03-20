
import { AppRankCard } from "./AppRankCard";
import { appData } from "./data/appStoreData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TopChartsProps {
  type: "app" | "game";
  limit?: number;
}

export function TopCharts({ type, limit = 10 }: TopChartsProps) {
  // Get top apps by rating
  const topRated = appData
    .filter(app => app.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  // Get top apps by downloads (mock data)
  const topDownloaded = appData
    .filter(app => app.type === type)
    .sort((a, b) => {
      // Convert download strings to numbers for comparison
      const aVal = a.downloads.includes("B+") ? 1000000000 : 
                  a.downloads.includes("M+") ? 1000000 : 1000;
      const bVal = b.downloads.includes("B+") ? 1000000000 : 
                  b.downloads.includes("M+") ? 1000000 : 1000;
      return bVal - aVal;
    })
    .slice(0, limit);

  return (
    <div className="bg-gray-50 rounded-xl p-3 shadow-sm">
      <div className="mb-3">
        <h2 className="text-[20px] font-bold text-gray-900">Top Charts</h2>
        <p className="text-xs text-gray-500">Popular {type === "app" ? "apps" : "games"} right now</p>
      </div>

      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-3 bg-gray-100">
          <TabsTrigger value="top">Top Rated</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="top" className="mt-0">
          <div className="grid grid-cols-1 gap-0.5">
            {topRated.map((app, index) => (
              <AppRankCard key={app.id} app={app} rank={index + 1} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 gap-0.5">
            {topDownloaded.map((app, index) => (
              <AppRankCard key={app.id} app={app} rank={index + 1} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
