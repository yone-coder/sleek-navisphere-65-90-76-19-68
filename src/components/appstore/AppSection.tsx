
import { ChevronRight } from "lucide-react";
import { AppCard } from "./AppCard";
import { appData } from "./data/appStoreData";
import { App } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface AppSectionProps {
  title: string;
  subtitle: string;
  type: "app" | "game" | "arcade";
  onAppDownload?: (appId: number) => void;
  downloadingApps?: number[];
  apps?: App[];
  highlight?: boolean;
}

export function AppSection({ 
  title, 
  subtitle, 
  type,
  onAppDownload,
  downloadingApps = [],
  apps,
  highlight = false
}: AppSectionProps) {
  const isMobile = useIsMobile();
  // If no custom apps are provided, filter by type
  const displayApps = apps || appData.filter(app => app.type === type).slice(0, 6);

  return (
    <motion.div 
      className={`space-y-2.5 rounded-xl ${highlight ? 'bg-gray-50 p-4 shadow-sm' : ''}`}
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
              <AppCard 
                app={app} 
                onDownload={() => onAppDownload && onAppDownload(app.id)}
                isDownloading={downloadingApps.includes(app.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
