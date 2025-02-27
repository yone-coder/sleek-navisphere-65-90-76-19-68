
import React from 'react';
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BookOpen, Briefcase, Users } from 'lucide-react';

interface SecondaryTabNavProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function SecondaryTabNav({ activeTab, onTabChange }: SecondaryTabNavProps) {
  return (
    <div className="relative w-full bg-gray-50/70 py-2">
      <ScrollArea className="w-full">
        <TabsList className="w-max inline-flex h-10 items-center justify-start gap-1 bg-transparent p-1">
          <TabsTrigger 
            value="story"
            onClick={() => onTabChange("story")}
            data-state={activeTab === "story" ? "active" : "inactive"}
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <BookOpen className="w-3.5 h-3.5" />
              {activeTab === "story" && (
                <motion.div
                  layoutId="activeSecondaryBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Story & Missions</span>
          </TabsTrigger>

          <TabsTrigger 
            value="services"
            onClick={() => onTabChange("services")}
            data-state={activeTab === "services" ? "active" : "inactive"}
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Briefcase className="w-3.5 h-3.5" />
              {activeTab === "services" && (
                <motion.div
                  layoutId="activeSecondaryBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Services</span>
          </TabsTrigger>

          <TabsTrigger 
            value="team"
            onClick={() => onTabChange("team")}
            data-state={activeTab === "team" ? "active" : "inactive"}
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Users className="w-3.5 h-3.5" />
              {activeTab === "team" && (
                <motion.div
                  layoutId="activeSecondaryBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">The Team</span>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
