
import React, { useState, useEffect } from 'react';
import { Search, X, History, ArrowLeft, Filter, Tag, Star, Command, ChevronRight, MapPin, Calendar, Clock, Users, Sparkles, BookOpen, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  onSelectCategory: (category: string) => void;
  onApplyFilters: (filters: any) => void;
}

export function SeminarsSearchPanel({ 
  isOpen, 
  onClose, 
  searchQuery, 
  setSearchQuery,
  categories,
  onSelectCategory,
  onApplyFilters
}: SearchPanelProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("seminarSearchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("seminarFavoriteSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<'all' | 'virtual' | 'in-person'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'this-week' | 'this-month'>('all');
  
  // Popular search suggestions based on trends
  const popularSearches = [
    "React Workshop", "AI Conference", "Python Fundamentals", 
    "UX Design", "Data Science", "Machine Learning", 
    "Web Development", "DevOps Pipeline", "Cybersecurity"
  ];
  
  // Featured seminars for quick access
  const featuredSeminars = [
    { id: "1", title: "Modern Web Development Summit", date: "June 15-17, 2024", category: "Development", location: "Virtual + San Francisco" },
    { id: "6", title: "Product Management Masterclass", date: "November 15, 2024", category: "Management", location: "Seattle + Virtual" },
    { id: "11", title: "Mobile App Development Bootcamp", date: "October 15-19, 2024", category: "Development", location: "Virtual" }
  ];

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = () => {
    // Save to search history if not empty and not already in history
    if (localQuery.trim() && !searchHistory.includes(localQuery.trim())) {
      const newHistory = [localQuery.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem("seminarSearchHistory", JSON.stringify(newHistory));
    }

    // Apply the search
    setSearchQuery(localQuery);
    
    // Apply filters
    onApplyFilters({
      priceFilter,
      difficultyFilter,
      locationFilter,
      dateFilter
    });
    
    onClose();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setLocalQuery(suggestion);
    setSearchQuery(suggestion);
    handleSearch();
  };

  const toggleFavorite = (query: string) => {
    const newFavorites = favorites.includes(query)
      ? favorites.filter(q => q !== query)
      : [...favorites, query];
    setFavorites(newFavorites);
    localStorage.setItem("seminarFavoriteSearches", JSON.stringify(newFavorites));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("seminarSearchHistory");
  };

  const removeSearchItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("seminarSearchHistory", JSON.stringify(newHistory));
  };

  const clearFilters = () => {
    setPriceFilter('all');
    setDifficultyFilter([]);
    setLocationFilter('all');
    setDateFilter('all');
  };

  const toggleDifficultyFilter = (difficulty: string) => {
    setDifficultyFilter(prev => 
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  if (!isOpen) return null;

  const getFilterCount = () => {
    let count = 0;
    if (priceFilter !== 'all') count++;
    if (difficultyFilter.length > 0) count++;
    if (locationFilter !== 'all') count++;
    if (dateFilter !== 'all') count++;
    return count;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in">
      <div className="h-full flex flex-col">
        <div className="border-b sticky top-0 bg-white z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={onClose}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search seminars, topics, categories, or speakers..."
                className="w-full pl-10 pr-24"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        <Command className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Press Enter to search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Badge 
                  variant="secondary" 
                  className={`px-2 py-0 h-6 ${getFilterCount() === 0 ? 'hidden' : ''}`}
                >
                  {getFilterCount()} filters
                </Badge>

                {localQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setLocalQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <Button onClick={handleSearch} size="sm" className="shrink-0">
              Search
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="max-w-4xl mx-auto py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {/* Left column - main content */}
                {localQuery && (
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Suggested results for "{localQuery}"</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => toggleFavorite(localQuery)}
                    >
                      <Star className={`h-3.5 w-3.5 mr-1 ${favorites.includes(localQuery) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      {favorites.includes(localQuery) ? 'Saved' : 'Save search'}
                    </Button>
                  </div>
                )}

                {!localQuery && favorites.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-gray-900">Saved Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {favorites.map((query, index) => (
                        <Button
                          key={`favorite-${index}`}
                          variant="outline"
                          size="sm"
                          className="h-auto py-1.5 px-3 text-xs"
                          onClick={() => handleSelectSuggestion(query)}
                        >
                          <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                          {query}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {!localQuery && searchHistory.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-900">Recent Searches</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-500 h-auto py-1"
                        onClick={clearSearchHistory}
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((query, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5"
                        >
                          <History className="w-3 h-3 text-gray-400" />
                          <button
                            className="text-sm text-gray-600"
                            onClick={() => handleSelectSuggestion(query)}
                          >
                            {query}
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => toggleFavorite(query)}
                          >
                            <Star className={`h-3 w-3 ${favorites.includes(query) ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => removeSearchItem(index, e)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!localQuery && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-gray-900">Popular Searches</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {popularSearches.map((term, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm" 
                          className="justify-start text-xs font-normal h-auto py-1.5"
                          onClick={() => handleSelectSuggestion(term)}
                        >
                          <Sparkles className="mr-1.5 h-3 w-3 text-blue-500" />
                          {term}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {!localQuery && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-gray-900">Browse by Category</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((category, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="justify-start text-xs font-normal h-auto py-1.5"
                          onClick={() => {
                            onSelectCategory(category);
                            onClose();
                          }}
                        >
                          <Tag className="mr-1.5 h-3 w-3 text-indigo-500" />
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {!localQuery && featuredSeminars.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-sm text-gray-900">Featured Seminars</h3>
                    <div className="space-y-2">
                      {featuredSeminars.map((seminar) => (
                        <Card
                          key={seminar.id}
                          className="p-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-start"
                          onClick={() => {
                            window.location.href = `/seminar/${seminar.id}`;
                            onClose();
                          }}
                        >
                          <div className="flex gap-3 w-full">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold shrink-0">
                              {seminar.category.substring(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{seminar.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{seminar.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{seminar.location}</span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Right column - filters */}
                <div>
                  <h3 className="font-medium text-sm text-gray-900 mb-3">Refine Results</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Price</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant={priceFilter === 'all' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setPriceFilter('all')}
                        >
                          All
                        </Button>
                        <Button 
                          variant={priceFilter === 'free' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setPriceFilter('free')}
                        >
                          Free
                        </Button>
                        <Button 
                          variant={priceFilter === 'paid' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setPriceFilter('paid')}
                        >
                          Paid
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Difficulty Level</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                          <Button 
                            key={level}
                            variant={difficultyFilter.includes(level) ? "default" : "outline"} 
                            size="sm"
                            className="w-full text-xs h-8" 
                            onClick={() => toggleDifficultyFilter(level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Location</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant={locationFilter === 'all' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setLocationFilter('all')}
                        >
                          All
                        </Button>
                        <Button 
                          variant={locationFilter === 'virtual' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setLocationFilter('virtual')}
                        >
                          Virtual
                        </Button>
                        <Button 
                          variant={locationFilter === 'in-person' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setLocationFilter('in-person')}
                        >
                          In-person
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Time Frame</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={dateFilter === 'all' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setDateFilter('all')}
                        >
                          All Dates
                        </Button>
                        <Button 
                          variant={dateFilter === 'today' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setDateFilter('today')}
                        >
                          Today
                        </Button>
                        <Button 
                          variant={dateFilter === 'this-week' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setDateFilter('this-week')}
                        >
                          This Week
                        </Button>
                        <Button 
                          variant={dateFilter === 'this-month' ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => setDateFilter('this-month')}
                        >
                          This Month
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSearch}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-gray-900 mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2"
                      onClick={() => {
                        setLocalQuery("");
                        setPriceFilter('free');
                        handleSearch();
                      }}
                    >
                      <Tag className="mr-2 h-4 w-4 text-green-500" />
                      Free Seminars
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2"
                      onClick={() => {
                        setLocalQuery("");
                        locationFilter === 'virtual'
                        handleSearch();
                      }}
                    >
                      <Globe className="mr-2 h-4 w-4 text-blue-500" />
                      Virtual Seminars
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2"
                      onClick={() => {
                        setLocalQuery("");
                        difficultyFilter.push('Beginner');
                        handleSearch();
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4 text-amber-500" />
                      For Beginners
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-auto py-2"
                      onClick={() => {
                        setLocalQuery("");
                        difficultyFilter.push('Advanced');
                        handleSearch();
                      }}
                    >
                      <Zap className="mr-2 h-4 w-4 text-purple-500" />
                      Advanced Topics
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// For the missing Globe component
const Globe = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};
