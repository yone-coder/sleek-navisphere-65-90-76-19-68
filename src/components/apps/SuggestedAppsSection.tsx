
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface SuggestedApp {
  id: number;
  name: string;
  icon?: React.ElementType;
  color: string;
  letter: string;
  reason: string;
}

interface SuggestedAppsSectionProps {
  title: string;
  description: string;
  apps: SuggestedApp[];
  className?: string;
}

export const SuggestedAppsSection = ({ title, description, apps, className = "" }: SuggestedAppsSectionProps) => {
  // Ensure we only display 4 apps maximum
  const displayApps = apps.slice(0, 4);
  
  return (
    <div className={`w-full px-0 ${className}`}>
      <div className="flex justify-between items-center mb-2 px-1">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-blue-500">
          See all <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 px-1">
        {displayApps.map((app, index) => {
          const Icon = app.icon;
          
          return (
            <motion.div
              key={app.id}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex flex-col items-center">
                <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-md mb-1`}>
                  {Icon ? (
                    <Icon className="h-6 w-6 text-white" />
                  ) : (
                    <span className="text-white text-2xl font-bold">{app.letter}</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium line-clamp-1">{app.name}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
