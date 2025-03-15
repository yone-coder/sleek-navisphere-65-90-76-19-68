
import React from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    color: '#8B5CF6'
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
    color: '#D946EF'
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
    color: '#F97316'
  }
];

export const BorletteLatestPicks = () => {
  return (
    <div className="space-y-4">
      {latestPicks.map((result, index) => (
        <Card 
          key={index}
          className="overflow-hidden border-0 shadow-md"
        >
          <CardHeader className="pb-2" style={{ borderBottom: `1px solid ${result.color}22` }}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium" style={{ color: result.color }}>
                {result.state}
              </CardTitle>
              <div className="text-xs text-gray-500">
                {result.time} | {result.date}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3 pb-4">
            <div className="grid grid-cols-3 gap-2">
              {result.picks.map((pick, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50"
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
