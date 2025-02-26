
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
        <TabsList className="w-max inline-flex h-16 items-center justify-start gap-4 rounded-lg bg-transparent p-1">
          <TabsTrigger 
            value="overview"
            className="group data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative py-3 px-4 whitespace-nowrap transition-all duration-300 hover:bg-gray-50/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Info className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                <motion.div
                  className="absolute -inset-1 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={activeTab === "overview" ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="font-medium">Overview</span>
            </div>
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
            className="group data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative py-3 px-4 whitespace-nowrap transition-all duration-300 hover:bg-gray-50/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                <motion.div
                  className="absolute -inset-1 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={activeTab === "updates" ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="font-medium">Updates</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15">
                2 New
              </Badge>
            </div>
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
            className="group data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative py-3 px-4 whitespace-nowrap transition-all duration-300 hover:bg-gray-50/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                <motion.div
                  className="absolute -inset-1 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={activeTab === "comments" ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="font-medium">Comments</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15">
                12
              </Badge>
            </div>
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
            className="group data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary relative py-3 px-4 whitespace-nowrap transition-all duration-300 hover:bg-gray-50/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <HelpCircle className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" />
                <motion.div
                  className="absolute -inset-1 bg-primary/5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={activeTab === "faqs" ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="font-medium">FAQs</span>
            </div>
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
