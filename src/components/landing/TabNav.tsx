
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, Bell, MessageCircle, HelpCircle, BookOpen, ChevronRight, ArrowLeftRight, Briefcase } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface TabNavProps {
  activeTab: string;
}

export function TabNav({ activeTab }: TabNavProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'right' | 'left'>('right');
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const scrollCheckTimer = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;
  
  const autoScrollSpeed = 25;
  const autoScrollPause = 1200;
  const scrollStep = 2;

  const startAutoScroll = (direction: 'right' | 'left') => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    setScrollDirection(direction);
    console.log(`Starting auto-scroll in ${direction} direction`);
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!scrollAreaRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll <= 0) {
        console.log("No scroll needed, maxScroll:", maxScroll);
        return;
      }
      
      if (direction === 'right' && scrollLeft >= maxScroll - 5) {
        console.log("Reached right end, changing direction");
        setScrollDirection('left');
        clearInterval(autoScrollIntervalRef.current!);
        setTimeout(() => {
          startAutoScroll('left');
        }, autoScrollPause);
      }
      else if (direction === 'left' && scrollLeft <= 5) {
        console.log("Reached left end, changing direction");
        setScrollDirection('right');
        clearInterval(autoScrollIntervalRef.current!);
        setTimeout(() => {
          startAutoScroll('right');
        }, autoScrollPause);
      }
      else {
        scrollAreaRef.current.scrollLeft += direction === 'right' ? scrollStep : -scrollStep;
      }
    }, autoScrollSpeed);
  };

  const initializeScroll = () => {
    if (scrollCheckTimer.current) {
      clearTimeout(scrollCheckTimer.current);
    }
    
    if (tabsListRef.current) {
      tabsListRef.current.style.minWidth = '150%';
    }
    
    scrollCheckTimer.current = setTimeout(() => {
      if (scrollAreaRef.current && tabsListRef.current) {
        const containerWidth = scrollAreaRef.current.clientWidth;
        tabsListRef.current.style.minWidth = `${containerWidth * 1.5}px`;
        
        const { scrollWidth, clientWidth } = scrollAreaRef.current;
        const needsScroll = scrollWidth > clientWidth;
        
        console.log("ScrollArea dimensions:", { 
          scrollWidth, 
          clientWidth, 
          tabsListWidth: tabsListRef.current.offsetWidth,
          needsScroll,
          forcedWidth: `${containerWidth * 1.5}px`
        });
        
        setShowScrollIndicator(needsScroll);
        
        scrollAreaRef.current.scrollLeft = 1;
        startAutoScroll('right');
        console.log("Auto-scroll started");
      } else {
        console.log("Refs not available:", { 
          scrollAreaRef: !!scrollAreaRef.current, 
          tabsListRef: !!tabsListRef.current 
        });
      }
    }, 1000);
  };

  useEffect(() => {
    const checkScroll = () => {
      console.log("Checking scroll on mount/resize");
      initializeScroll();
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollCheckTimer.current) {
        clearTimeout(scrollCheckTimer.current);
      }
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
    initializeScroll();
  }, [activeTab]);

  const pauseAutoScroll = () => {
    console.log("User interaction detected, pausing auto-scroll");
    setAutoScrollActive(false);
    
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    
    const timer = setTimeout(() => {
      console.log("Resuming auto-scroll after inactivity");
      setAutoScrollActive(true);
      initializeScroll();
    }, 6000);
    
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSwipeHint]);

  const onTouchStart = (e: React.TouchEvent) => {
    pauseAutoScroll();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft += 100;
    } else if (isRightSwipe && scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft -= 100;
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseDown = () => {
    pauseAutoScroll();
  };

  const onWheel = () => {
    pauseAutoScroll();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && autoScrollActive) {
            console.log("TabNav is now visible, initializing scroll");
            initializeScroll();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (scrollAreaRef.current) {
      observer.observe(scrollAreaRef.current);
    }

    return () => {
      if (scrollAreaRef.current) {
        observer.unobserve(scrollAreaRef.current);
      }
    };
  }, [autoScrollActive]);

  return (
    <div className="relative w-full">
      <ScrollArea 
        className="w-full overflow-x-auto z-50" 
        ref={scrollAreaRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
      >
        <TabsList 
          className="w-max inline-flex h-10 items-center justify-start gap-1 bg-transparent p-1"
          ref={tabsListRef}
          style={{ minWidth: tabsListRef.current ? tabsListRef.current.offsetWidth : 'auto' }}
        >
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
            value="services"
            className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Briefcase className="w-3.5 h-3.5" />
              {activeTab === "services" && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-primary/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs font-medium">Our Projects</span>
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
      
      {showScrollIndicator && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center">
          <div className="h-full flex items-center px-3 bg-gradient-to-l from-white via-white/95 to-transparent backdrop-blur-sm">
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0.8, x: 5 }}
              animate={{ 
                opacity: [0.8, 1, 0.8],
                x: [5, 0, 5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ChevronRight className="text-primary w-5 h-5" />
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
                <ChevronRight className="text-primary/80 w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {showScrollIndicator && showSwipeHint && (
        <motion.div 
          className="absolute left-0 right-0 bottom-[-45px] z-20 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-primary/5 text-primary/90 rounded-full px-4 py-1.5 flex items-center text-xs shadow-sm"
            animate={{ 
              x: [10, -10, 10]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" />
            <span>Swipe to see more tabs</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
