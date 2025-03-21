
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';

export interface SuggestedApp {
  id: number;
  name: string;
  color: string;
  letter: string;
  icon?: LucideIcon;
  reason: string;
}

interface SuggestedAppsSectionProps {
  title: string;
  description: string;
  apps: SuggestedApp[];
}

export const SuggestedAppsSection = ({ title, description, apps }: SuggestedAppsSectionProps) => {
  if (apps.length === 0) return null;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-blue-500 h-6 px-2">
          View All <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="flex space-x-3">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            className="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center">
              <div className={`${app.color} w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                {app.icon ? 
                  <app.icon className="text-white" size={20} /> : 
                  <span className="text-white text-lg font-semibold">{app.letter}</span>
                }
              </div>
              <div>
                <p className="text-sm font-medium">{app.name}</p>
                <p className="text-xs text-gray-500">{app.reason}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
