
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, Bell, MessageCircle, HelpCircle, BookOpen, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface TabNavProps {
  activeTab: string;
}

export function TabNav({ activeTab }: TabNavProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check if scrolling is needed
  useEffect(() => {
    const checkScroll = () => {
      if (scrollAreaRef.current) {
        const { scrollWidth, clientWidth } = scrollAreaRef.current;
        setShowScrollIndicator(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      <ScrollArea className="w-full" ref={scrollAreaRef}>
        <TabsList className="w-max inline-flex h-10 items-center justify-start gap-1 bg-transparent p-1">
          <TabsTrigger 
            value="overview"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Info className="w-3.5 h-3.5" />
              {activeTab === "overview" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Overview</span>
          </TabsTrigger>

          <TabsTrigger 
            value="story"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <BookOpen className="w-3.5 h-3.5" />
              {activeTab === "story" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Story & Missions</span>
          </TabsTrigger>

          <TabsTrigger 
            value="timeline"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Bell className="w-3.5 h-3.5" />
              {activeTab === "timeline" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Timeline</span>
            <Badge 
              variant="secondary" 
              className="h-3.5 px-1 text-[10px] bg-primary/5 text-primary border-0"
            >
              2
            </Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="comments"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <MessageCircle className="w-3.5 h-3.5" />
              {activeTab === "comments" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Comments</span>
            <Badge 
              variant="secondary" 
              className="h-3.5 px-1 text-[10px] bg-primary/5 text-primary border-0"
            >
              12
            </Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="faqs"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <HelpCircle className="w-3.5 h-3.5" />
              {activeTab === "faqs" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">FAQs</span>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      
      {/* Double chevron scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center">
          <div className="h-full flex items-center px-2 bg-gradient-to-l from-white via-white/90 to-transparent">
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0.7, x: 5 }}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                x: [5, 0, 5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ChevronRight className="text-primary/80 w-5 h-5" />
              <motion.div
                animate={{
                  y: [-2, 2, -2]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.15,
                  ease: "easeInOut"
                }}
              >
                <ChevronRight className="text-primary/60 w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
