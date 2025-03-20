
import { ChevronRight } from "lucide-react";
import { AppCard } from "./AppCard";
import { appData } from "./data/appStoreData";
import { App } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSectionProps {
  title: string;
  subtitle: string;
  type: "app" | "game" | "arcade";
  onAppDownload?: (appId: number) => void;
  downloadingApps?: number[];
  apps?: App[];
}

export function AppSection({ 
  title, 
  subtitle, 
  type,
  onAppDownload,
  downloadingApps = [],
  apps
}: AppSectionProps) {
  const isMobile = useIsMobile();
  // If no custom apps are provided, filter by type
  const displayApps = apps || appData.filter(app => app.type === type).slice(0, 6);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-blue-500 text-sm font-medium">
          See All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-2 -mx-3 px-3">
        <div className="flex gap-3" style={{ minWidth: "min-content" }}>
          {displayApps.map((app) => (
            <div key={app.id} className="min-w-[124px] max-w-[124px]">
              <AppCard 
                app={app} 
                onDownload={() => onAppDownload && onAppDownload(app.id)}
                isDownloading={downloadingApps.includes(app.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
