
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Info, Bell, MessageCircle, HelpCircle, BookOpen, ChevronRight, ArrowLeftRight } from 'lucide-react';
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

  // Minimum swipe distance threshold (in px)
  const minSwipeDistance = 50;
  
  // Auto-scroll speed (ms)
  const autoScrollSpeed = 30;
  // Pause duration at ends (ms)
  const autoScrollPause = 1000;
  // Scroll step size (px)
  const scrollStep = 2;

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

  // Setup auto-scroll animation
  useEffect(() => {
    if (showScrollIndicator && autoScrollActive && scrollAreaRef.current) {
      const handleAutoScroll = () => {
        if (!scrollAreaRef.current) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // Reached the right end
        if (scrollDirection === 'right' && scrollLeft >= maxScroll - 5) {
          setScrollDirection('left');
          // Pause at the right end
          if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            setTimeout(() => {
              startAutoScroll('left');
            }, autoScrollPause);
          }
        }
        // Reached the left end
        else if (scrollDirection === 'left' && scrollLeft <= 5) {
          setScrollDirection('right');
          // Pause at the left end
          if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            setTimeout(() => {
              startAutoScroll('right');
            }, autoScrollPause);
          }
        }
        // Continue scrolling in the current direction
        else {
          scrollAreaRef.current.scrollLeft += scrollDirection === 'right' ? scrollStep : -scrollStep;
        }
      };
      
      const startAutoScroll = (direction: 'right' | 'left') => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
        setScrollDirection(direction);
        autoScrollIntervalRef.current = setInterval(handleAutoScroll, autoScrollSpeed);
      };
      
      // Start the auto-scroll
      startAutoScroll('right');
      
      // Cleanup function
      return () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
      };
    }
  }, [showScrollIndicator, autoScrollActive, scrollDirection]);

  // Pause auto-scroll on user interaction
  const pauseAutoScroll = () => {
    setAutoScrollActive(false);
    // Restart after 10 seconds of inactivity
    setTimeout(() => {
      setAutoScrollActive(true);
    }, 10000);
  };

  // Auto-hide swipe hint after 5 seconds
  useEffect(() => {
    if (showSwipeHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSwipeHint]);

  // Handle touch events for swipe
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
      // Scroll to the right
      scrollAreaRef.current.scrollLeft += 100;
    } else if (isRightSwipe && scrollAreaRef.current) {
      // Scroll to the left
      scrollAreaRef.current.scrollLeft -= 100;
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add mouse interaction handlers
  const onMouseDown = () => {
    pauseAutoScroll();
  };

  const onWheel = () => {
    pauseAutoScroll();
  };

  return (
    <div className="relative w-full">
      <ScrollArea 
        className="w-full" 
        ref={scrollAreaRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onWheel={onWheel}
      >
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
      
      {/* Double chevron scroll indicator with enhanced visibility */}
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

      {/* Swipe tutorial hint */}
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
