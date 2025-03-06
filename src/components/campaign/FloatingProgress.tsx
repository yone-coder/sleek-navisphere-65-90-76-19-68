
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Users, Share2, GraduationCap } from 'lucide-react';

interface FloatingProgressProps {
  backers: number;
  progress: number;
  days: number;
  raised: number;
  goal: number;
  onBackProjectClick?: () => void;
  isWebinar?: boolean;
}

export function FloatingProgress({ 
  backers: finalBackers, 
  progress: finalProgress, 
  days, 
  raised: finalRaised, 
  goal,
  onBackProjectClick,
  isWebinar = false
}: FloatingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [raised, setRaised] = useState(0);
  const [backers, setBackers] = useState(0);

  useEffect(() => {
    // Animate values from 0 to their final values
    const duration = 1500; // 1.5 seconds
    const frames = 60;
    const interval = duration / frames;

    const progressIncrement = finalProgress / frames;
    const raisedIncrement = finalRaised / frames;
    const backersIncrement = finalBackers / frames;

    let frame = 0;
    const timer = setInterval(() => {
      if (frame < frames) {
        setProgress(prev => Math.min(prev + progressIncrement, finalProgress));
        setRaised(prev => Math.min(prev + raisedIncrement, finalRaised));
        setBackers(prev => Math.min(Math.round(prev + backersIncrement), finalBackers));
        frame++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [finalProgress, finalRaised, finalBackers]);

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 py-3">
      <div className="container mx-auto px-4">
        <div className="space-y-3">
          {/* Progress bar with gradient */}
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full relative overflow-hidden"
              style={{ 
                width: `${Math.max((raised / goal) * 100, 0.5)}%`,
                background: isWebinar 
                  ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' 
                  : 'linear-gradient(90deg, #34d399 0%, #059669 100%)'
              }}
            />
          </div>
          
          {/* Stats row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Participants counter */}
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1.5 text-blue-500" />
                <span className="text-sm font-semibold text-gray-800">
                  {Math.round(backers)} 
                  <span className="text-xs text-gray-500 ml-1">
                    {isWebinar ? 'participants' : 'backers'}
                  </span>
                </span>
              </div>
              
              {/* Progress percentage */}
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-1.5 text-blue-500" />
                <span className="text-sm font-semibold text-gray-800">
                  {Math.round(progress)}%
                  <span className="text-xs text-gray-500 ml-1">filled</span>
                </span>
              </div>
            </div>
            
            {/* Days remaining */}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-800">
                {days} 
                <span className="text-xs text-gray-500 ml-1">days left</span>
              </span>
            </div>
          </div>

          {/* Space available info */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-blue-600">
                {Math.round(raised)}
              </span>
              <span className="text-xs text-gray-500">of</span>
              <span className="text-sm text-gray-700 font-medium">
                {goal}
              </span>
              <span className="text-xs text-gray-500">spots</span>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={onBackProjectClick}
              >
                Reserve Your Spot
              </Button>
              <Button 
                size="icon"
                variant="outline"
                className="h-9 w-9 border-gray-200"
              >
                <Share2 className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
