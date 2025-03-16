
import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Share2, 
  Calendar, 
  Download, 
  Star, 
  Filter, 
  ArrowLeft, 
  ArrowRight,
  Info,
  AlertCircle,
  TrendingUp,
  Sparkles,
  LineChart,
  BarChart4,
  PieChart,
  Hash,
  Zap,
  RefreshCcw,
  Bookmark,
  PenSquare,
  Check,
  CircleX
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data for latest picks with different lottery types
const latestPicks = [
  {
    state: 'New York',
    type: 'Borlette',
    time: 'Evening - 7:30 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 12, label: '1st' },
      { number: 45, label: '2nd' },
      { number: 78, label: '3rd' }
    ],
    color: '#8B5CF6',
    hotNumber: 45,
    coldNumber: 12,
    frequency: {
      12: 5,
      45: 18,
      78: 10
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 11, label: '1st' }, { number: 22, label: '2nd' }, { number: 33, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 44, label: '1st' }, { number: 55, label: '2nd' }, { number: 66, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 77, label: '1st' }, { number: 88, label: '2nd' }, { number: 99, label: '3rd' }] }
    ],
    patterns: ["Consecutive", "Odd-Even-Odd"]
  },
  {
    state: 'Florida',
    type: 'Lotto 3',
    time: 'Midday - 1:30 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 2, label: '1st' },
      { number: 5, label: '2nd' },
      { number: 8, label: '3rd' }
    ],
    color: '#D946EF',
    hotNumber: 2,
    coldNumber: 8,
    frequency: {
      2: 22,
      5: 9,
      8: 4
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 3, label: '1st' }, { number: 6, label: '2nd' }, { number: 9, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 1, label: '1st' }, { number: 2, label: '2nd' }, { number: 3, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 4, label: '1st' }, { number: 5, label: '2nd' }, { number: 6, label: '3rd' }] }
    ],
    patterns: ["Sequence", "All Low Numbers"]
  },
  {
    state: 'Georgia',
    type: 'Lotto 4',
    time: 'Evening - 6:45 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 3, label: '1st' },
      { number: 4, label: '2nd' },
      { number: 5, label: '3rd' }
    ],
    color: '#F97316',
    hotNumber: 5,
    coldNumber: 3,
    frequency: {
      3: 7,
      4: 12,
      5: 19
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 7, label: '1st' }, { number: 8, label: '2nd' }, { number: 9, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 4, label: '1st' }, { number: 5, label: '2nd' }, { number: 6, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 1, label: '1st' }, { number: 2, label: '2nd' }, { number: 3, label: '3rd' }] }
    ],
    patterns: ["Consecutive", "Ascending"]
  },
  {
    state: 'Texas',
    type: 'Borlette',
    time: 'Evening - 8:00 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 23, label: '1st' },
      { number: 47, label: '2nd' },
      { number: 91, label: '3rd' }
    ],
    color: '#EF4444',
    hotNumber: 47,
    coldNumber: 91,
    frequency: {
      23: 11,
      47: 20,
      91: 3
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 19, label: '1st' }, { number: 38, label: '2nd' }, { number: 72, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 92, label: '1st' }, { number: 64, label: '2nd' }, { number: 81, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 23, label: '1st' }, { number: 47, label: '2nd' }, { number: 91, label: '3rd' }] }
    ],
    patterns: ["No Pattern", "Contains a Prime Number"]
  },
  {
    state: 'Tennessee',
    type: 'Lotto 3',
    time: 'Midday - 2:00 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 1, label: '1st' },
      { number: 4, label: '2nd' },
      { number: 7, label: '3rd' }
    ],
    color: '#0EA5E9',
    hotNumber: 7,
    coldNumber: 1,
    frequency: {
      1: 6,
      4: 10,
      7: 15
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 1, label: '1st' }, { number: 2, label: '2nd' }, { number: 3, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 7, label: '1st' }, { number: 5, label: '2nd' }, { number: 2, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 9, label: '1st' }, { number: 6, label: '2nd' }, { number: 3, label: '3rd' }] }
    ],
    patterns: ["Arithmetic Sequence", "Odd-Even-Odd"]
  },
  {
    state: 'France',
    type: 'Borlette',
    time: 'Evening - 9:00 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 33, label: '1st' },
      { number: 66, label: '2nd' },
      { number: 99, label: '3rd' }
    ],
    color: '#3B82F6',
    hotNumber: 66,
    coldNumber: 33,
    frequency: {
      33: 4,
      66: 18,
      99: 9
    },
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 22, label: '1st' }, { number: 44, label: '2nd' }, { number: 88, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 11, label: '1st' }, { number: 55, label: '2nd' }, { number: 77, label: '3rd' }] },
      { date: 'Oct 12, 2023', picks: [{ number: 12, label: '1st' }, { number: 24, label: '2nd' }, { number: 36, label: '3rd' }] }
    ],
    patterns: ["Multiples", "All Even Numbers"]
  }
];

export const BorletteLatestPicks = () => {
  const { toast } = useToast();
  const [openStates, setOpenStates] = useState<string[]>([]);
  const [favoriteNumbers, setFavoriteNumbers] = useState<number[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statsView, setStatsView] = useState(false);
  const [selectedChart, setSelectedChart] = useState<string>('frequency');
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [searchNumber, setSearchNumber] = useState<string>('');
  const [searchResults, setSearchResults] = useState<boolean>(false);
  const [showPatterns, setShowPatterns] = useState<boolean>(false);
  const [notificationEnabled, setNotificationEnabled] = useState<string[]>([]);
  const [favoriteStates, setFavoriteStates] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [comparisonMetric, setComparisonMetric] = useState<string>('frequency');
  const [viewMode, setViewMode] = useState<'card' | 'detailed'>('card');
  const [customRanges, setCustomRanges] = useState<{min: number, max: number}>({min: 1, max: 100});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const filteredPicks = filter 
    ? latestPicks.filter(pick => pick.type === filter)
    : latestPicks;

  const toggleCollapsible = (state: string) => {
    setOpenStates(prev => 
      prev.includes(state) 
        ? prev.filter(s => s !== state) 
        : [...prev, state]
    );
  };

  const shareResult = (state: string, numbers: string) => {
    navigator.clipboard.writeText(`${state} lottery results: ${numbers}`);
    toast({
      title: "Copied to clipboard",
      description: `${state} lottery results have been copied to your clipboard.`,
      duration: 3000,
    });
  };

  const toggleFavoriteNumber = (number: number) => {
    setFavoriteNumbers(prev => 
      prev.includes(number)
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
    
    toast({
      title: favoriteNumbers.includes(number) ? "Removed from favorites" : "Added to favorites",
      description: `Number ${number} has been ${favoriteNumbers.includes(number) ? 'removed from' : 'added to'} your favorite numbers.`,
      duration: 3000,
    });
  };

  const toggleFavoriteState = (state: string) => {
    setFavoriteStates(prev => 
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
    
    toast({
      title: favoriteStates.includes(state) ? "Removed from favorites" : "Added to favorites",
      description: `${state} has been ${favoriteStates.includes(state) ? 'removed from' : 'added to'} your favorite states.`,
      duration: 3000,
    });
  };

  const downloadResults = (state: string) => {
    // Create a CSV format for the results
    const result = latestPicks.find(pick => pick.state === state);
    if (!result) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,1st,2nd,3rd\n";
    
    // Add current result
    csvContent += `${result.date},${result.picks.map(p => p.number).join(',')}\n`;
    
    // Add past results
    result.pastResults.forEach(pastResult => {
      csvContent += `${pastResult.date},${pastResult.picks.map(p => p.number).join(',')}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${state}_lottery_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `${state} lottery results are being downloaded.`,
      duration: 3000,
    });
  };

  const toggleStatsView = () => {
    setStatsView(!statsView);
    toast({
      title: statsView ? "Standard view activated" : "Statistics view activated",
      description: `Switched to ${statsView ? 'standard' : 'statistics'} view for lottery results.`,
      duration: 3000,
    });
  };

  const clearFilters = () => {
    setFilter(null);
    setSelectedDate(null);
    setSearchNumber('');
    setSearchResults(false);
    toast({
      title: "Filters cleared",
      description: "All filters have been reset.",
      duration: 3000,
    });
  };

  const selectDate = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const getFrequencyColor = (isHot: boolean) => {
    return isHot ? 'text-red-500' : 'text-blue-500';
  };

  const toggleNotification = (state: string) => {
    setNotificationEnabled(prev => 
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
    
    toast({
      title: notificationEnabled.includes(state) ? "Notifications disabled" : "Notifications enabled",
      description: `You will ${notificationEnabled.includes(state) ? 'no longer' : 'now'} receive notifications for ${state} lottery results.`,
      duration: 3000,
    });
  };

  const handleSearch = () => {
    if (!searchNumber) {
      setSearchResults(false);
      return;
    }
    
    const num = parseInt(searchNumber);
    if (isNaN(num)) {
      toast({
        title: "Invalid number",
        description: "Please enter a valid number to search.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setSearchResults(true);
    
    // Check if number exists in any results
    const found = latestPicks.some(pick => 
      pick.picks.some(p => p.number === num) || 
      pick.pastResults.some(past => past.picks.some(p => p.number === num))
    );
    
    if (!found) {
      toast({
        title: "No results found",
        description: `Number ${num} was not found in any lottery results.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Search results",
        description: `Found matches for number ${num}.`,
        duration: 3000,
      });
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (compareMode) {
      setCompareItems([]);
    }
  };

  const toggleCompareItem = (state: string) => {
    if (compareItems.includes(state)) {
      setCompareItems(prev => prev.filter(s => s !== state));
    } else {
      if (compareItems.length < 3) {
        setCompareItems(prev => [...prev, state]);
      } else {
        toast({
          title: "Compare limit reached",
          description: "You can only compare up to 3 lottery results at a time.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const generateLuckyPick = () => {
    const randomPick = Math.floor(Math.random() * 100) + 1;
    
    toast({
      title: "Lucky pick generated",
      description: `Your lucky number is ${randomPick}. Consider playing this number!`,
      duration: 5000,
    });
    
    // Add to favorites automatically
    if (!favoriteNumbers.includes(randomPick)) {
      setFavoriteNumbers(prev => [...prev, randomPick]);
    }
  };

  const isNumberInCurrentResults = (number: number) => {
    return filteredPicks.some(pick => pick.picks.some(p => p.number === number));
  };

  useEffect(() => {
    // Show a welcome toast on first render
    toast({
      title: "Welcome to Borlette Results",
      description: "View the latest lottery results and analyze patterns.",
      duration: 5000,
    });
    
    // Set up periodic updates if notification is enabled
    const notificationInterval = setInterval(() => {
      if (notificationEnabled.length > 0) {
        const randomState = notificationEnabled[Math.floor(Math.random() * notificationEnabled.length)];
        toast({
          title: `${randomState} Lottery Update`,
          description: "New results are available. Check them out!",
          duration: 5000,
        });
      }
    }, 60000); // Check every minute
    
    return () => {
      clearInterval(notificationInterval);
    };
  }, [notificationEnabled, toast]);

  return (
    <div className="space-y-4">
      {/* Advanced Tools Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex flex-wrap items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-xs px-3 py-1 h-auto",
                    filter === null ? "bg-gray-200" : "bg-transparent"
                  )}
                  onClick={() => setFilter(null)}
                >
                  All
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Show all lottery types</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-xs px-3 py-1 h-auto",
                    filter === "Borlette" ? "bg-gray-200" : "bg-transparent"
                  )}
                  onClick={() => setFilter("Borlette")}
                >
                  Borlette
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Filter to show only Borlette results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-xs px-3 py-1 h-auto",
                    filter === "Lotto 3" ? "bg-gray-200" : "bg-transparent"
                  )}
                  onClick={() => setFilter("Lotto 3")}
                >
                  Lotto 3
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Filter to show only Lotto 3 results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-xs px-3 py-1 h-auto",
                    filter === "Lotto 4" ? "bg-gray-200" : "bg-transparent"
                  )}
                  onClick={() => setFilter("Lotto 4")}
                >
                  Lotto 4
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Filter to show only Lotto 4 results</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Number Search */}
          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              placeholder="Search number..."
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
              className="h-7 w-24 text-xs"
            />
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleSearch}
            >
              <Hash className="h-3 w-3 mr-1" />
              Find
            </Button>
          </div>
          
          {/* Stats Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs flex items-center gap-1 h-7 px-2", 
              statsView ? "bg-blue-100 text-blue-700" : ""
            )}
            onClick={toggleStatsView}
          >
            <TrendingUp className="h-3 w-3" />
            <span>{statsView ? "Hide Stats" : "Show Stats"}</span>
          </Button>
          
          {/* Patterns Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs flex items-center gap-1 h-7 px-2", 
              showPatterns ? "bg-green-100 text-green-700" : ""
            )}
            onClick={() => setShowPatterns(!showPatterns)}
          >
            <LineChart className="h-3 w-3" />
            <span>{showPatterns ? "Hide Patterns" : "Show Patterns"}</span>
          </Button>
          
          {/* Compare Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs flex items-center gap-1 h-7 px-2", 
              compareMode ? "bg-purple-100 text-purple-700" : ""
            )}
            onClick={toggleCompareMode}
          >
            <BarChart4 className="h-3 w-3" />
            <span>{compareMode ? "Exit Compare" : "Compare"}</span>
          </Button>

          {/* Lucky Pick Generator */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 h-7 px-2 text-orange-600"
            onClick={generateLuckyPick}
          >
            <Zap className="h-3 w-3" />
            <span>Lucky Pick</span>
          </Button>
          
          {/* Advanced Settings */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs flex items-center gap-1 h-7 px-2"
              >
                <Filter className="h-3 w-3" />
                <span>Advanced</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Advanced Settings</SheetTitle>
                <SheetDescription>
                  Configure your lottery results display preferences.
                </SheetDescription>
              </SheetHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Items per page</Label>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(parseInt(value))}
                  >
                    <SelectTrigger id="items-per-page">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 items</SelectItem>
                      <SelectItem value="4">4 items</SelectItem>
                      <SelectItem value="6">6 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="view-mode">View mode</Label>
                  <Select
                    value={viewMode}
                    onValueChange={(value) => setViewMode(value as 'card' | 'detailed')}
                  >
                    <SelectTrigger id="view-mode">
                      <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card View</SelectItem>
                      <SelectItem value="detailed">Detailed View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statistics-type">Statistics display</Label>
                  <Select
                    value={selectedChart}
                    onValueChange={setSelectedChart}
                  >
                    <SelectTrigger id="statistics-type">
                      <SelectValue placeholder="Select statistics type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frequency">Frequency Chart</SelectItem>
                      <SelectItem value="trends">Trend Analysis</SelectItem>
                      <SelectItem value="patterns">Pattern Recognition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="range-select">Number range</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="min-range"
                      type="number"
                      value={customRanges.min}
                      onChange={(e) => setCustomRanges({...customRanges, min: parseInt(e.target.value) || 1})}
                      className="w-20"
                    />
                    <span>to</span>
                    <Input
                      id="max-range"
                      type="number"
                      value={customRanges.max}
                      onChange={(e) => setCustomRanges({...customRanges, max: parseInt(e.target.value) || 100})}
                      className="w-20"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sort-order">Sort order</Label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
                  >
                    <SelectTrigger id="sort-order">
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest first</SelectItem>
                      <SelectItem value="asc">Oldest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={notificationEnabled.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        // Enable for all
                        setNotificationEnabled(latestPicks.map(p => p.state));
                      } else {
                        // Disable for all
                        setNotificationEnabled([]);
                      }
                    }}
                  />
                  <Label htmlFor="notifications">Enable result notifications</Label>
                </div>
              </div>
              
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-full"
                  onClick={clearFilters}
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Clear all filters and reset view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Compare Mode Panel */}
      {compareMode && compareItems.length > 0 && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <BarChart4 className="h-4 w-4 mr-1 text-purple-600" />
            Comparing {compareItems.length} Lottery Results
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Select 
                value={comparisonMetric} 
                onValueChange={setComparisonMetric}
                className="w-40"
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frequency">Number Frequency</SelectItem>
                  <SelectItem value="hotCold">Hot/Cold Numbers</SelectItem>
                  <SelectItem value="patterns">Number Patterns</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setCompareItems([])}
              >
                Clear selection
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {compareItems.map((state, idx) => {
                const stateData = latestPicks.find(pick => pick.state === state);
                if (!stateData) return null;
                
                return (
                  <Card key={idx} className="overflow-hidden border">
                    <CardHeader className="p-3 pb-1" style={{ borderBottom: `1px solid ${stateData.color}22` }}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium" style={{ color: stateData.color }}>
                          {stateData.state}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs" style={{ borderColor: stateData.color, color: stateData.color }}>
                          {stateData.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      {comparisonMetric === 'frequency' && (
                        <div>
                          <h4 className="text-xs font-medium mb-1 text-gray-500">Number Frequencies</h4>
                          <div className="grid grid-cols-3 gap-1">
                            {stateData.picks.map((pick, pidx) => (
                              <div key={pidx} className="text-center p-1 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500">{pick.number}</div>
                                <div className="text-sm font-medium">{stateData.frequency[pick.number as keyof typeof stateData.frequency] || 0}x</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {comparisonMetric === 'hotCold' && (
                        <div>
                          <h4 className="text-xs font-medium mb-1 text-gray-500">Hot/Cold Numbers</h4>
                          <div className="flex justify-between">
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Hot</div>
                              <div className="text-sm font-medium text-red-500">{stateData.hotNumber}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500">Cold</div>
                              <div className="text-sm font-medium text-blue-500">{stateData.coldNumber}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {comparisonMetric === 'patterns' && (
                        <div>
                          <h4 className="text-xs font-medium mb-1 text-gray-500">Patterns</h4>
                          <div className="space-y-1">
                            {stateData.patterns.map((pattern, pidx) => (
                              <div key={pidx} className="text-xs p-1 bg-gray-50 rounded">
                                {pattern}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults && searchNumber && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Hash className="h-4 w-4 mr-1 text-indigo-600" />
            Search Results for Number {searchNumber}
          </h3>
          
          <div className="space-y-2">
            {filteredPicks.some(pick => 
              pick.picks.some(p => p.number === parseInt(searchNumber)) || 
              pick.pastResults.some(past => past.picks.some(p => p.number === parseInt(searchNumber)))
            ) ? (
              filteredPicks
                .filter(pick => 
                  pick.picks.some(p => p.number === parseInt(searchNumber)) || 
                  pick.pastResults.some(past => past.picks.some(p => p.number === parseInt(searchNumber)))
                )
                .map((pick, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-sm" style={{ backgroundColor: pick.color }}></div>
                      <div>
                        <div className="font-medium text-sm">{pick.state}</div>
                        <div className="text-xs text-gray-500">{pick.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {pick.picks.some(p => p.number === parseInt(searchNumber)) ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Current
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-600">
                          Past
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => toggleCollapsible(pick.state)}>
                        <Info className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center p-4 text-gray-500">
                No results found for number {searchNumber}.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Favorite Numbers */}
      {favoriteNumbers.length > 0 && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            Your Favorite Numbers
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {favoriteNumbers.map((num, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                  isNumberInCurrentResults(num) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                )}
              >
                <span>{num}</span>
                {isNumberInCurrentResults(num) && (
                  <Check className="h-3 w-3 text-green-600" />
                )}
                <button
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => toggleFavoriteNumber(num)}
                >
                  <CircleX className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {filteredPicks.slice(0, itemsPerPage).map((result, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
              <Collapsible 
                open={openStates.includes(result.state)}
                onOpenChange={() => toggleCollapsible(result.state)}
              >
                <Card className={cn(
                  "overflow-hidden border-0 shadow-md h-full",
                  compareMode && "border-2",
                  compareMode && compareItems.includes(result.state) ? `border-2 border-${result.color}` : ""
                )}>
                  <CardHeader className="pb-2" style={{ borderBottom: `1px solid ${result.color}22` }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <CardTitle className="text-base font-medium" style={{ color: result.color }}>
                          {result.state}
                        </CardTitle>
                        {favoriteStates.includes(result.state) && (
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        )}
                        {notificationEnabled.includes(result.state) && (
                          <Badge variant="outline" className="h-4 text-[10px] px-1 bg-blue-50" style={{ borderColor: result.color }}>
                            <Bell className="h-2 w-2 mr-0.5" style={{ color: result.color }} />
                            <span style={{ color: result.color }}>Alerts</span>
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-xs" style={{ borderColor: result.color, color: result.color }}>
                          {result.type}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{result.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-4">
                    <div className="grid grid-cols-3 gap-2">
                      {result.picks.map((pick, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 relative"
                        >
                          <Badge 
                            variant="outline" 
                            className="mb-1 text-xs font-normal"
                            style={{ borderColor: `${result.color}44`, color: result.color }}
                          >
                            {pick.label}
                          </Badge>
                          <span className="text-xl font-semibold text-gray-900">
                            {pick.number}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-6 w-6"
                            onClick={() => toggleFavoriteNumber(pick.number)}
                          >
                            <Star 
                              className={cn(
                                "h-3 w-3",
                                favoriteNumbers.includes(pick.number) 
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              )} 
                            />
                          </Button>
                          {statsView && (
                            <div className="text-xs text-gray-500 mt-1">
                              {result.frequency[pick.number as keyof typeof result.frequency] || 0}x
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Stats & Patterns View */}
                    {(statsView || showPatterns) && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs">
                        <Tabs defaultValue="stats" className="w-full">
                          <TabsList className="grid w-full grid-cols-2 h-7">
                            <TabsTrigger value="stats" className="text-xs h-6" disabled={!statsView}>Stats</TabsTrigger>
                            <TabsTrigger value="patterns" className="text-xs h-6" disabled={!showPatterns}>Patterns</TabsTrigger>
                          </TabsList>
                          <TabsContent value="stats" className="pt-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium">Hot Number:</span>
                              <span className={getFrequencyColor(true)}>
                                {result.hotNumber} <Sparkles className="inline h-3 w-3" />
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Cold Number:</span>
                              <span className={getFrequencyColor(false)}>
                                {result.coldNumber} <AlertCircle className="inline h-3 w-3" />
                              </span>
                            </div>
                          </TabsContent>
                          <TabsContent value="patterns" className="pt-2">
                            <div className="space-y-1">
                              {result.patterns.map((pattern, idx) => (
                                <div key={idx} className="text-xs py-1 px-2 bg-white rounded border border-gray-100">
                                  {pattern}
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    <div className="flex justify-between mt-3">
                      <div className="flex gap-1">
                        <CollapsibleTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            {openStates.includes(result.state) ? "Hide history" : "Show history"}
                          </Button>
                        </CollapsibleTrigger>
                        
                        {compareMode && (
                          <Button 
                            variant={compareItems.includes(result.state) ? "secondary" : "ghost"}
                            size="sm" 
                            className="text-xs"
                            onClick={() => toggleCompareItem(result.state)}
                          >
                            {compareItems.includes(result.state) ? "Selected" : "Compare"}
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                            >
                              <PenSquare className="h-3.5 w-3.5 text-gray-500" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-44 p-2">
                            <div className="space-y-2">
                              <div className="text-xs font-medium">Quick Actions</div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full justify-start text-xs h-8"
                                onClick={() => toggleFavoriteState(result.state)}
                              >
                                <Bookmark className="h-3.5 w-3.5 mr-1" />
                                {favoriteStates.includes(result.state) ? "Remove from Favorites" : "Add to Favorites"}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full justify-start text-xs h-8"
                                onClick={() => toggleNotification(result.state)}
                              >
                                <Bell className="h-3.5 w-3.5 mr-1" />
                                {notificationEnabled.includes(result.state) ? "Disable Notifications" : "Enable Notifications"}
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => shareResult(result.state, result.picks.map(p => p.number).join(', '))}
                        >
                          <Share2 className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => downloadResults(result.state)}
                        >
                          <Download className="h-3.5 w-3.5 text-gray-500" />
                        </Button>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 mb-2 flex justify-between items-center">
                          <span>Past Results</span>
                          {sortOrder === 'desc' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 text-[10px] px-1.5"
                              onClick={() => setSortOrder('asc')}
                            >
                              Newest first
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 text-[10px] px-1.5"
                              onClick={() => setSortOrder('desc')}
                            >
                              Oldest first
                            </Button>
                          )}
                        </h4>
                        <ScrollArea className="h-[120px]">
                          {(sortOrder === 'desc' ? [...result.pastResults] : [...result.pastResults].reverse()).map((pastResult, pastIdx) => (
                            <div key={pastIdx} className="mb-2 last:mb-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "w-full text-xs justify-start font-normal py-1 mb-1",
                                  selectedDate === pastResult.date ? "bg-gray-200" : ""
                                )}
                                onClick={() => selectDate(pastResult.date)}
                              >
                                {pastResult.date}
                              </Button>
                              <div className="grid grid-cols-3 gap-2">
                                {pastResult.picks.map((pick, pickIdx) => (
                                  <div 
                                    key={pickIdx}
                                    className="flex-1 text-center p-2 bg-gray-50 rounded-md flex flex-col items-center"
                                  >
                                    <span className="text-xs text-gray-500">{pick.label}</span>
                                    <span className="font-medium">{pick.number}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-1 mt-2">
          <CarouselPrevious className="static transform-none h-6 w-6 rounded-full" />
          <CarouselNext className="static transform-none h-6 w-6 rounded-full" />
        </div>
      </Carousel>
    </div>
  );
};
