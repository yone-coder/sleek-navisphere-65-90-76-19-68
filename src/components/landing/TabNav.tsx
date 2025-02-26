
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, Bell, MessageCircle, HelpCircle } from 'lucide-react';

interface TabNavProps {
  activeTab: string;
}

export function TabNav({ activeTab }: TabNavProps) {
  return (
    <div className="relative">
      <ScrollArea className="w-full">
        <TabsList className="w-max inline-flex h-16 items-center justify-start gap-2 rounded-lg bg-transparent p-1">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative whitespace-nowrap"
          >
            <Info className="w-4 h-4 mr-2" />
            Overview
            {activeTab === "overview" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="updates"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative whitespace-nowrap"
          >
            <Bell className="w-4 h-4 mr-2" />
            Updates
            <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">2</span>
            {activeTab === "updates" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="comments"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comments
            <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">12</span>
            {activeTab === "comments" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="faqs"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative whitespace-nowrap"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
            {activeTab === "faqs" && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      
      {/* Gradient Fade Effect */}
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    </div>
  );
}
