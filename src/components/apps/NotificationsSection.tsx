
import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Notification {
  id: number;
  app: string;
  message: string;
  time: string;
  color: string;
}

interface NotificationsSectionProps {
  notifications: Notification[];
  className?: string;
}

export const NotificationsSection = ({ notifications, className = "" }: NotificationsSectionProps) => {
  if (notifications.length === 0) return null;
  
  return (
    <div className={cn("flex-shrink-0 px-1", className)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-800">Notifications</h2>
        <Button variant="ghost" size="sm" className="text-xs text-blue-500">
          See all <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <motion.div 
            key={notification.id} 
            className="bg-white rounded-xl p-2 flex items-center shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`${notification.color} w-10 h-10 rounded-lg flex items-center justify-center mr-2 shadow-sm`}>
              <Bell size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.app}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{notification.message}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
