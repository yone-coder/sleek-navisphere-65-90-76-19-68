
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
  ArrowRight 
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
      { number: 234, label: '1st' },
      { number: 567, label: '2nd' },
      { number: 890, label: '3rd' }
    ],
    color: '#D946EF',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 321, label: '1st' }, { number: 654, label: '2nd' }, { number: 987, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 135, label: '1st' }, { number: 246, label: '2nd' }, { number: 357, label: '3rd' }] }
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
      { number: 5, label: '3rd' },
      { number: 9, label: '4th' }
    ],
    color: '#F97316',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 7, label: '1st' }, { number: 8, label: '2nd' }, { number: 9, label: '3rd' }, { number: 1, label: '4th' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 4, label: '1st' }, { number: 5, label: '2nd' }, { number: 6, label: '3rd' }, { number: 2, label: '4th' }] }
    ]
  },
  {
    state: 'Texas',
    type: 'Borlette',
    time: 'Evening - 8:00 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 23, label: '1st' },
      { number: 47, label: '2nd' }
    ],
    color: '#EF4444',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 19, label: '1st' }, { number: 38, label: '2nd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 92, label: '1st' }, { number: 64, label: '2nd' }] }
    ]
  },
  {
    state: 'Tennessee',
    type: 'Lotto 3',
    time: 'Midday - 2:00 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 123, label: '1st' },
      { number: 456, label: '2nd' },
      { number: 789, label: '3rd' }
    ],
    color: '#0EA5E9',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 147, label: '1st' }, { number: 258, label: '2nd' }, { number: 369, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 753, label: '1st' }, { number: 951, label: '2nd' }, { number: 426, label: '3rd' }] }
    ]
  }
];

export const BorletteLatestPicks = () => {
  const { toast } = useToast();
  const [openStates, setOpenStates] = useState<string[]>([]);
  const [favoriteNumbers, setFavoriteNumbers] = useState<number[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
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
        <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
          <Filter className="h-3 w-3" />
          <span>More Filters</span>
        </Button>
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
                    <div className={cn(
                      "grid gap-2",
                      result.picks.length === 2 ? "grid-cols-2" :
                      result.picks.length === 3 ? "grid-cols-3" :
                      "grid-cols-4"
                    )}>
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
                              <div className="text-xs text-gray-500 mb-1">{pastResult.date}</div>
                              <div className={cn(
                                "flex gap-2",
                                pastResult.picks.length > 3 && "flex-wrap"
                              )}>
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
