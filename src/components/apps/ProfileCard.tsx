
import React from 'react';
import { User, Bell, Settings, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const ProfileCard = () => {
  return (
    <motion.div 
      className="w-full p-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center gap-1">
            <h1 className="text-base font-semibold text-gray-800">Welcome back</h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-yellow-500 text-lg"
            >
              👋
            </motion.div>
          </div>
          <p className="text-xs text-gray-500">Let's explore your apps</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button 
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 relative"
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={18} className="text-gray-700" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center px-1 text-[10px]">
            3
          </Badge>
        </motion.button>
        
        <motion.button 
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={18} className="text-gray-700" />
        </motion.button>
      </div>
    </motion.div>
  );
};
