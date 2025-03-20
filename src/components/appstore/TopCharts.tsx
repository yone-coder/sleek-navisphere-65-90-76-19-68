
import { AppRankCard } from "./AppRankCard";
import { appData } from "./data/appStoreData";

interface TopChartsProps {
  type: "app" | "game";
}

export function TopCharts({ type }: TopChartsProps) {
  // Filter apps by type and sort by rating to get top apps
  const topApps = appData
    .filter(app => app.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Top Charts</h2>
        <p className="text-sm text-gray-500">Popular {type === "app" ? "apps" : "games"} right now</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {topApps.map((app, index) => (
          <AppRankCard key={app.id} app={app} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
