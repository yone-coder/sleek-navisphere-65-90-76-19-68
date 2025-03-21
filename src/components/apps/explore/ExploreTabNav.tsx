
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Flame, Package, Maximize, Minimize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExploreTabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoriteCount?: number;
  updateCount?: number;
  expandView?: boolean;
  onToggleView?: () => void;
}

export function ExploreTabNav({ 
  activeTab, 
  setActiveTab, 
  favoriteCount = 0,
  updateCount = 0,
  expandView,
  onToggleView 
}: ExploreTabNavProps) {
  const [mounted, setMounted] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  
  // Set tabs configuration
  const tabs = [
    { id: "all", label: "All", icon: Package },
    { id: "popular", label: "Popular", icon: Flame },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "favorites", label: "Favorites", icon: Star, count: favoriteCount }
  ];

  // Update indicator position based on active tab
  useEffect(() => {
    setMounted(true);
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    setIndicatorPosition(activeIndex * (100 / tabs.length));
    setIndicatorWidth(100 / tabs.length);
  }, [activeTab, tabs.length]);

  return (
    <div className="sticky top-16 z-10 bg-white py-2 mb-4">
      <div className="flex items-center justify-between px-1 mb-2">
        <h2 className="text-base font-medium">
          {activeTab === "all" ? "Browse Apps" : 
           activeTab === "popular" ? "Popular Apps" : 
           activeTab === "recent" ? "Recently Added" : 
           "Your Favorites"}
        </h2>
        
        {onToggleView && (
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 h-8 w-8"
            onClick={onToggleView}
            title={expandView ? "Compact View" : "Expanded View"}
          >
            {expandView ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      
      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-gray-100/80 p-0.5 h-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id}
                  className={`
                    flex items-center justify-center gap-1.5 py-2 relative
                    ${isActive ? 'text-primary' : 'text-gray-600'}
                    data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                  
                  {tab.count > 0 && (
                    <Badge 
                      variant="outline" 
                      className={`
                        ml-0.5 h-5 px-1.5 text-[10px] font-semibold
                        ${isActive 
                          ? 'bg-primary/10 text-primary border-primary/20' 
                          : 'bg-gray-200 text-gray-700 border-gray-300'}
                      `}
                    >
                      {tab.count}
                    </Badge>
                  )}
                  
                  {tab.id === "recent" && updateCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {/* Animated indicator */}
          {mounted && (
            <motion.div 
              className="absolute bottom-0 left-0 h-full rounded-md bg-white shadow-sm pointer-events-none"
              initial={false}
              animate={{
                left: `${indicatorPosition}%`,
                width: `${indicatorWidth}%`
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
              style={{ height: 'calc(100% - 4px)', top: '2px' }}
            />
          )}
        </Tabs>
      </div>
      
      {/* Updates notification */}
      <AnimatePresence>
        {updateCount > 0 && activeTab === "recent" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 mx-1 py-1.5 px-3 bg-blue-50 text-blue-800 text-xs rounded-md flex items-center"
          >
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>
              {updateCount} {updateCount === 1 ? 'app has' : 'apps have'} recently been updated
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
