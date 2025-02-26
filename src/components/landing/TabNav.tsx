
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
    <div className="relative px-4 py-2">
      <ScrollArea className="w-full">
        <TabsList className="w-max inline-flex h-14 items-center justify-start gap-2 rounded-xl bg-gray-50/50 p-2 backdrop-blur-sm border border-gray-100">
          <TabsTrigger 
            value="overview"
            className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <Info className="w-4 h-4" />
              {activeTab === "overview" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-sm font-medium">Overview</span>
          </TabsTrigger>

          <TabsTrigger 
            value="updates"
            className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <Bell className="w-4 h-4" />
              {activeTab === "updates" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-sm font-medium">Updates</span>
            <Badge 
              variant="secondary" 
              className="h-4 px-1.5 text-xs bg-primary/5 text-primary border-0"
            >
              2
            </Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="comments"
            className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <MessageCircle className="w-4 h-4" />
              {activeTab === "comments" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-sm font-medium">Comments</span>
            <Badge 
              variant="secondary" 
              className="h-4 px-1.5 text-xs bg-primary/5 text-primary border-0"
            >
              12
            </Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="faqs"
            className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <HelpCircle className="w-4 h-4" />
              {activeTab === "faqs" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-sm font-medium">FAQs</span>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      {/* Subtle gradient edges */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    </div>
  );
}
