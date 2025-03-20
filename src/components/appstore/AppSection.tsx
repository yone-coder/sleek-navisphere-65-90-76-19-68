
import { ChevronRight, Download, Check, Loader2 } from "lucide-react";
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
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-blue-500 text-xs sm:text-sm font-medium">
          See All
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-thin pb-3 sm:pb-4 -mx-2 px-2">
        <div className="flex gap-3 sm:gap-4" style={{ minWidth: "min-content" }}>
          {displayApps.map((app) => (
            <div key={app.id} className="min-w-[120px] max-w-[120px] sm:min-w-[140px] sm:max-w-[140px]">
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
