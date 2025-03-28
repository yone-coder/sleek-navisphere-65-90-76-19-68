
import { ChevronRight } from "lucide-react";
import { EnhancedAppCard } from "./EnhancedAppCard";
import { App } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { convertPlatformAppsToAppStore } from "./utils/appDataAdapter";
import { apps } from "@/components/apps/data/appsData";

// Convert platform apps to app store format
const convertedApps = convertPlatformAppsToAppStore(apps);

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
  // If no custom apps are provided, filter by type from the converted apps
  const displayApps = apps || convertedApps.filter(app => app.type === type).slice(0, 6);

  return (
    <motion.div 
      className="space-y-2.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          {displayApps.map((app, index) => (
            <motion.div 
              key={app.id} 
              className="min-w-[124px] max-w-[124px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <EnhancedAppCard 
                app={app} 
                onDownload={() => onAppDownload && onAppDownload(typeof app.id === 'number' ? app.id : parseInt(app.id))}
                isDownloading={downloadingApps.includes(typeof app.id === 'number' ? app.id : parseInt(app.id))}
                showRating={true}
                showSize={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
