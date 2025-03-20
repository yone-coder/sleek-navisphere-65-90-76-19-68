
import { ChevronRight } from "lucide-react";
import { AppCard } from "./AppCard";
import { appData } from "./data/appStoreData";

interface AppSectionProps {
  title: string;
  subtitle: string;
  type: "app" | "game" | "arcade";
}

export function AppSection({ title, subtitle, type }: AppSectionProps) {
  const apps = appData.filter(app => app.type === type).slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-blue-500 text-sm font-medium">
          See All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-4">
        <div className="flex gap-4" style={{ minWidth: "min-content" }}>
          {apps.map((app) => (
            <div key={app.id} className="min-w-[140px] max-w-[140px]">
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
