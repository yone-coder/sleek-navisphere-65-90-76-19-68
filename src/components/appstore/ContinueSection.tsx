
import React from "react";
import { Clock, Download } from "lucide-react";
import { App } from "./types";
import { motion } from "framer-motion";
import { iconComponents } from "./utils/appDataAdapter";
import { getGradient } from "./utils/gradientUtils";

interface ContinueSectionProps {
  recentApps: App[];
}

export function ContinueSection({ recentApps }: ContinueSectionProps) {
  if (!recentApps.length) return null;

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-[20px] font-bold text-gray-900">Continue Where You Left Off</h2>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none -mx-3 px-3">
        <div className="flex gap-3" style={{ minWidth: "min-content" }}>
          {recentApps.map((app, index) => {
            const IconComponent = iconComponents[app.icon.name as string] || iconComponents.Store;
            const gradientClass = getGradient(app.icon.background || "bg-blue-500");

            return (
              <motion.div
                key={app.id}
                className="min-w-[260px] border border-gray-200 rounded-xl p-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex gap-3">
                  <div className={`w-16 h-16 rounded-[22%] bg-gradient-to-br ${gradientClass} flex-shrink-0 flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{app.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{app.category}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">Last used yesterday</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{app.rating.toFixed(1)} ★</span>
                  </div>
                  
                  <button className="flex items-center gap-1 text-xs font-medium text-blue-500">
                    <Download className="w-3.5 h-3.5" />
                    <span>Update</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
