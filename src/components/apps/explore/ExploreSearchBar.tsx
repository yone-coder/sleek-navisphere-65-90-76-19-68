
import { useState, useEffect } from "react";
import { Search, Filter, Mic, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ExploreSearchBarProps {
  onSearchOpen: () => void;
  recentSearches?: string[];
}

export function ExploreSearchBar({ onSearchOpen, recentSearches = [] }: ExploreSearchBarProps) {
  const [isActive, setIsActive] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  
  const handleFocus = () => {
    setIsActive(true);
    if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  };
  
  const handleBlur = () => {
    setIsActive(false);
    setTimeout(() => setShowRecent(false), 200);
  };

  // Close the recent searches dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowRecent(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-container relative mb-4 mx-1">
      <div
        className={`
          relative transition-all duration-300 rounded-full
          ${isActive ? 'bg-white shadow-md ring-2 ring-primary/20' : 'bg-gray-50 border border-gray-200'}
        `}
        onClick={onSearchOpen}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="absolute inset-0 bg-primary/5 rounded-full"
            />
          )}
        </AnimatePresence>
        
        <Search className={`
          absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
          ${isActive ? 'text-primary' : 'text-gray-400'}
          transition-colors duration-200
        `} />
        
        <Input 
          className="pl-10 pr-20 py-5 h-11 bg-transparent border-none rounded-full shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search apps, games, tools..." 
          readOnly 
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Mic className="h-3.5 w-3.5 text-gray-500" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 rounded-full flex items-center justify-center space-x-1 bg-gray-100 hover:bg-gray-200 pr-2.5 pl-2"
          >
            <Filter className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs text-gray-600">Filters</span>
          </Button>
        </div>
      </div>
      
      {/* Recent searches dropdown */}
      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg p-2 z-20"
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs font-medium text-gray-500">Recent Searches</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-gray-700">
                Clear all
              </Button>
            </div>
            
            <div className="mt-1 space-y-0.5">
              {recentSearches.map((search, index) => (
                <div 
                  key={index}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5 text-gray-400 mr-2.5" />
                  <span className="text-sm">{search}</span>
                  <div className="flex-grow" />
                  <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
                </div>
              ))}
            </div>
            
            <div className="mt-2 px-3 py-2 border-t border-gray-100">
              <div className="flex items-center text-primary cursor-pointer hover:bg-primary/5 rounded-lg px-2 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                <span className="text-sm font-medium">Discover trending apps</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
