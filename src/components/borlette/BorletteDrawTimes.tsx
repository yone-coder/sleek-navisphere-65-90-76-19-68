
import React, { useState, useEffect } from 'react';
import { Clock, Bell } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Mock data for draw times
const drawTimes = [
  {
    state: 'New York',
    time: '12:30 PM',
    color: '#8B5CF6',
    remaining: getRandomMinutes()
  },
  {
    state: 'Florida',
    time: '1:30 PM',
    color: '#D946EF',
    remaining: getRandomMinutes()
  },
  {
    state: 'Georgia',
    time: '4:45 PM',
    color: '#F97316',
    remaining: getRandomMinutes()
  },
  {
    state: 'Texas',
    time: '6:30 PM',
    color: '#EF4444',
    remaining: getRandomMinutes()
  }
];

function getRandomMinutes() {
  // Return random minutes between 1 and 180
  return Math.floor(Math.random() * 180) + 1;
}

export const BorletteDrawTimes = () => {
  const { toast } = useToast();
  const [remainingTimes, setRemainingTimes] = useState<number[]>(drawTimes.map(d => d.remaining));
  const [remindersEnabled, setRemindersEnabled] = useState<boolean[]>(drawTimes.map(() => false));

  // Update countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTimes(prev => 
        prev.map(time => (time > 1 ? time - 1 : time))
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return "Draw completed";
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  const toggleReminder = (index: number) => {
    const newReminders = [...remindersEnabled];
    newReminders[index] = !newReminders[index];
    setRemindersEnabled(newReminders);

    toast({
      title: newReminders[index] ? "Reminder set" : "Reminder canceled",
      description: `You will ${newReminders[index] ? 'now' : 'no longer'} receive notifications for ${drawTimes[index].state} draw`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-3">
      {drawTimes.map((draw, index) => (
        <Card key={index} className="overflow-hidden border-0 shadow-md">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: `${draw.color}15` }}
                >
                  <Clock className="h-5 w-5" style={{ color: draw.color }} />
                </div>
                <div>
                  <h3 className="font-medium" style={{ color: draw.color }}>
                    {draw.state}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{draw.time}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {formatTimeRemaining(remainingTimes[index])}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8", 
                  remindersEnabled[index] ? "text-orange-500" : "text-gray-400"
                )}
                onClick={() => toggleReminder(index)}
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            <div 
              className="h-1 transition-all duration-500 ease-in-out"
              style={{ 
                width: `${Math.min(100, (1 - remainingTimes[index] / draw.remaining) * 100)}%`,
                backgroundColor: draw.color 
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
