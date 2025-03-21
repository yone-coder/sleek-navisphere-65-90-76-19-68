
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface QuickAction {
  icon: any;
  label: string;
  color: string;
  action: () => void;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
}

export const QuickActionsGrid = ({ actions }: QuickActionsGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={action.action}
        >
          <div className={`h-12 w-12 rounded-full ${action.color} flex items-center justify-center mb-1 shadow-md`}>
            <action.icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs text-gray-700">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
