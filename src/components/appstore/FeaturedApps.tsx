
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { apps } from "@/components/apps/data/appsData";
import { iconComponents } from "./utils/appDataAdapter";
import { getGradient } from "./utils/gradientUtils";
import { ScreenshotPreview } from "./ScreenshotPreview";

export function FeaturedApps() {
  // Find some highlighted apps from the Apps page data
  const appChoices = apps.filter(app => app.rating && app.rating > 4.8);
  
  // Pick a game and an app if possible
  const gameApp = appChoices.find(app => app.category === "Gaming") || appChoices[0];
  const nonGameApp = appChoices.find(app => app.category !== "Gaming") || appChoices[1] || appChoices[0];
  
  // Get the icon components for the featured apps
  const gameIconName = gameApp?.icon?.name || "Gamepad2";
  const appIconName = nonGameApp?.icon?.name || "Store";
  
  const GameIcon = iconComponents[gameIconName];
  const AppIcon = iconComponents[appIconName];
  
  // Mock screenshots for preview
  const mockScreenshots = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];
  
  const featuredApps = [
    {
      id: 1,
      title: "GAME OF THE DAY",
      name: gameApp?.name || "Winnr",
      description: gameApp?.description || "Compete in tournaments and win prizes",
      icon: GameIcon,
      color: gameApp?.color || "bg-blue-500",
      gradient: getGradient(gameApp?.color || "bg-blue-500"),
      screenshots: mockScreenshots
    },
    {
      id: 2,
      title: "APP OF THE DAY",
      name: nonGameApp?.name || "Shopr",
      description: nonGameApp?.description || "Your ultimate marketplace for buying and selling",
      icon: AppIcon,
      color: nonGameApp?.color || "bg-pink-500",
      gradient: getGradient(nonGameApp?.color || "bg-pink-500"),
      screenshots: mockScreenshots
    }
  ];

  return (
    <div className="space-y-3">
      {featuredApps.map((app, index) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="overflow-hidden rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <div className={`bg-gradient-to-r from-${app.gradient.split(' ')[0].replace('from-', '')} to-${app.gradient.split(' ')[2].replace('to-', '')} p-3 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              <span className="text-xs font-medium relative z-10 bg-white/30 px-2 py-1 rounded-full">{app.title}</span>
            </div>
            <div className="p-3 bg-white">
              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-16 rounded-[22%] bg-gradient-to-br ${app.gradient} overflow-hidden flex-shrink-0 shadow-md flex items-center justify-center`}>
                      {app.icon && <app.icon className="w-8 h-8 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-500">{app.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 font-medium">
                      See more
                      <ChevronRight className="w-3.5 h-3.5 inline-block ml-0.5" />
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="mr-1">4.9</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1">(2.3k)</span>
                    </div>
                  </div>
                </div>
                
                {/* Add screenshot preview */}
                <div className="hidden sm:block w-24">
                  <ScreenshotPreview screenshots={app.screenshots} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
