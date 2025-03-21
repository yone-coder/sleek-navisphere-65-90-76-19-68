
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowDownLeft, ArrowUpRight, Bell, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface RecentApp {
  id: number;
  name: string;
  color: string;
  letter: string;
  time: string;
  type: 'app-usage';
}

export interface Transaction {
  id: number;
  type: 'transaction';
  subtype: 'sent' | 'received';
  amount: number;
  recipient?: string;
  sender?: string;
  date: string;
  time: string;
}

export interface ActivityItem {
  id: string;
  type: 'transaction' | 'notification' | 'app-usage';
  data: Transaction | RecentApp;
  time: number;
}

interface RecentActivitySectionProps {
  activities: ActivityItem[];
  className?: string;
}

export const RecentActivitySection = ({ activities, className = "" }: RecentActivitySectionProps) => {
  if (activities.length === 0) return null;
  
  return (
    <div className={cn("flex-shrink-0", className)}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-800">Recent Activity</h2>
        <Button variant="ghost" size="sm" className="text-xs text-blue-500">
          See all <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {activities.map((activity, index) => {
          if (activity.type === 'transaction') {
            const transaction = activity.data as Transaction;
            return (
              <motion.div 
                key={activity.id} 
                className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    transaction.subtype === "received" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {transaction.subtype === "received" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm line-clamp-1">
                      {transaction.subtype === "received" ? transaction.sender : transaction.recipient}
                    </p>
                    <p className="text-xs text-gray-400">
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className={`font-semibold whitespace-nowrap ${
                    transaction.subtype === "received" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.subtype === "received" ? "+" : "-"}${transaction.amount}
                  </p>
                </div>
              </motion.div>
            );
          } else if (activity.type === 'app-usage') {
            const app = activity.data as RecentApp;
            return (
              <motion.div 
                key={activity.id} 
                className="bg-white rounded-xl p-3 flex items-center shadow-sm border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`${app.color} w-10 h-10 rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                  <span className="text-white text-lg font-bold">{app.letter}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{app.name}</p>
                  <p className="text-xs text-gray-500">Used {app.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 ml-2">
                  <Play size={14} className="text-gray-500" />
                </Button>
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
