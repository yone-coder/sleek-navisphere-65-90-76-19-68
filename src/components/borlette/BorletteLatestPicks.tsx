
import React, { useState } from 'react';
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
  Sparkles
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 11, label: '1st' }, { number: 22, label: '2nd' }, { number: 33, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 44, label: '1st' }, { number: 55, label: '2nd' }, { number: 66, label: '3rd' }] }
    ]
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 3, label: '1st' }, { number: 6, label: '2nd' }, { number: 9, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 1, label: '1st' }, { number: 2, label: '2nd' }, { number: 3, label: '3rd' }] }
    ]
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 7, label: '1st' }, { number: 8, label: '2nd' }, { number: 9, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 4, label: '1st' }, { number: 5, label: '2nd' }, { number: 6, label: '3rd' }] }
    ]
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 19, label: '1st' }, { number: 38, label: '2nd' }, { number: 72, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 92, label: '1st' }, { number: 64, label: '2nd' }, { number: 81, label: '3rd' }] }
    ]
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 1, label: '1st' }, { number: 2, label: '2nd' }, { number: 3, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 7, label: '1st' }, { number: 5, label: '2nd' }, { number: 2, label: '3rd' }] }
    ]
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
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 22, label: '1st' }, { number: 44, label: '2nd' }, { number: 88, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 11, label: '1st' }, { number: 55, label: '2nd' }, { number: 77, label: '3rd' }] }
    ]
  }
];

export const BorletteLatestPicks = () => {
  const { toast } = useToast();
  const [openStates, setOpenStates] = useState<string[]>([]);
  const [favoriteNumbers, setFavoriteNumbers] = useState<number[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statsView, setStatsView] = useState(false);
  
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

  const downloadResults = (state: string) => {
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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
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
        </div>
        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 h-7 px-2"
            onClick={toggleStatsView}
          >
            <TrendingUp className="h-3 w-3" />
            <span>{statsView ? "Hide Stats" : "Show Stats"}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 h-7 px-2"
            onClick={clearFilters}
          >
            <Filter className="h-3 w-3" />
            <span>Clear Filters</span>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7 rounded-full"
                >
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Click on a date to filter by date</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {filteredPicks.map((result, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
              <Collapsible 
                open={openStates.includes(result.state)}
                onOpenChange={() => toggleCollapsible(result.state)}
              >
                <Card className="overflow-hidden border-0 shadow-md h-full">
                  <CardHeader className="pb-2" style={{ borderBottom: `1px solid ${result.color}22` }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-base font-medium" style={{ color: result.color }}>
                          {result.state}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1" style={{ borderColor: result.color, color: result.color }}>
                          {result.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{result.time}</span>
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
                        </div>
                      ))}
                    </div>

                    {statsView && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs">
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
                      </div>
                    )}

                    <div className="flex justify-between mt-3">
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          {openStates.includes(result.state) ? "Hide history" : "Show history"}
                        </Button>
                      </CollapsibleTrigger>
                      <div className="flex gap-1">
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
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Past Results</h4>
                        <ScrollArea className="h-[120px]">
                          {result.pastResults.map((pastResult, pastIdx) => (
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
