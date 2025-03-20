
import { AppRankCard } from "./AppRankCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Award, TrendingUp } from "lucide-react";
import { convertPlatformAppsToAppStore } from "./utils/appDataAdapter";
import { apps } from "@/components/apps/data/appsData";

// Convert platform apps to app store format
const convertedApps = convertPlatformAppsToAppStore(apps);

interface TopChartsProps {
  type: "app" | "game";
  limit?: number;
}

export function TopCharts({ type, limit = 10 }: TopChartsProps) {
  // Get top apps by rating
  const topRated = convertedApps
    .filter(app => app.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  // Get top apps by downloads (mock data)
  const topDownloaded = convertedApps
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
    <motion.div 
      className="bg-gray-50 rounded-xl p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-3">
        <h2 className="text-[20px] font-bold text-gray-900">Top Charts</h2>
        <p className="text-xs text-gray-500">Popular {type === "app" ? "apps" : "games"} right now</p>
      </div>

      <Tabs defaultValue="top" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-3 bg-gray-100">
          <TabsTrigger value="top" className="data-[state=active]:bg-white flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Top Rated</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-white flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trending</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="top" className="mt-0">
          <div className="grid grid-cols-1 gap-0.5">
            {topRated.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AppRankCard key={app.id} app={app} rank={index + 1} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 gap-0.5">
            {topDownloaded.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AppRankCard key={app.id} app={app} rank={index + 1} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
