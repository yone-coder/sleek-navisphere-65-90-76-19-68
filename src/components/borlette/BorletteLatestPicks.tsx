
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, Calendar, Download, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Mock data for latest picks
const latestPicks = [
  {
    state: 'New York',
    time: 'Evening - 7:30 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 123, label: '1st' },
      { number: 456, label: '2nd' },
      { number: 789, label: '3rd' }
    ],
    color: '#8B5CF6',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 111, label: '1st' }, { number: 222, label: '2nd' }, { number: 333, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 444, label: '1st' }, { number: 555, label: '2nd' }, { number: 666, label: '3rd' }] }
    ]
  },
  {
    state: 'Florida',
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
    time: 'Evening - 6:45 PM',
    date: 'Oct 15, 2023',
    picks: [
      { number: 345, label: '1st' },
      { number: 678, label: '2nd' },
      { number: 901, label: '3rd' }
    ],
    color: '#F97316',
    pastResults: [
      { date: 'Oct 14, 2023', picks: [{ number: 765, label: '1st' }, { number: 876, label: '2nd' }, { number: 987, label: '3rd' }] },
      { date: 'Oct 13, 2023', picks: [{ number: 432, label: '1st' }, { number: 543, label: '2nd' }, { number: 654, label: '3rd' }] }
    ]
  }
];

export const BorletteLatestPicks = () => {
  const { toast } = useToast();
  const [openStates, setOpenStates] = useState<string[]>([]);
  const [favoriteNumbers, setFavoriteNumbers] = useState<number[]>([]);

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
      {latestPicks.map((result, index) => (
        <Collapsible 
          key={index}
          open={openStates.includes(result.state)}
          onOpenChange={() => toggleCollapsible(result.state)}
        >
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="pb-2" style={{ borderBottom: `1px solid ${result.color}22` }}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-medium" style={{ color: result.color }}>
                  {result.state}
                </CardTitle>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{result.time} | {result.date}</span>
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
                  {result.pastResults.map((pastResult, pastIdx) => (
                    <div key={pastIdx} className="mb-2 last:mb-0">
                      <div className="text-xs text-gray-500 mb-1">{pastResult.date}</div>
                      <div className="flex gap-2">
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
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
};
