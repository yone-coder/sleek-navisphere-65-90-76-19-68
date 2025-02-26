
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign, Share2, Heart, Shield } from 'lucide-react';

interface FloatingProgressProps {
  backers: number;
  progress: number;
  days: number;
  raised: number;
  goal: number;
}

export function FloatingProgress({ 
  backers: finalBackers, 
  progress: finalProgress, 
  days, 
  raised: finalRaised, 
  goal 
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
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 py-2">
      <div className="container mx-auto px-4">
        <div className="space-y-2">
          {/* Stats above progress bar */}
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center whitespace-nowrap">
                <Users className="h-3.5 w-3.5 mr-1 text-gray-500" />
                <span className="text-sm md:text-base font-bold text-gray-900">
                  {Math.round(backers)}
                </span>
                <span className="text-gray-600 text-[10px] ml-1">
                  backers
                </span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <Heart className="h-3.5 w-3.5 mr-1 text-pink-500" />
                <span className="text-sm md:text-base font-bold text-gray-900">
                  {Math.round(progress)}%
                </span>
                <span className="text-gray-600 text-[10px] ml-1">
                  funded
                </span>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span className="text-[10px] font-medium">
                {days}d : {Math.floor(days * 24)}h : {Math.floor(days * 24 * 60)}m
              </span>
            </div>
          </div>

          {/* Progress bar with gradient and animation */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300 ease-out rounded-full relative overflow-hidden"
              style={{ 
                width: `${Math.max((raised / goal) * 100, 0.5)}%`,
                background: 'linear-gradient(90deg, #34d399 0%, #059669 50%, #047857 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg md:text-xl font-bold text-emerald-500">
                      ${Math.round(raised).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">of</span>
                    <span className="text-sm text-gray-600 font-semibold">
                      ${goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <DollarSign className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="text-[10px] font-medium text-emerald-600">+2.5k today</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1 shrink-0">
                    <div className="h-4 w-4 rounded-full bg-blue-400 ring-2 ring-white" />
                    <div className="h-4 w-4 rounded-full bg-purple-400 ring-2 ring-white" />
                    <div className="h-4 w-4 rounded-full bg-pink-400 ring-2 ring-white" />
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">+12 backers in the last hour</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end whitespace-nowrap">
                <div className="flex flex-col items-end">
                  <span className="text-lg md:text-xl font-bold text-gray-900">
                    {days}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <span className="text-[10px]">
                      days to go
                    </span>
                    <Shield className="h-3 w-3" aria-label="Protected campaign" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1 group relative overflow-hidden pr-20"
            >
              <div className="flex items-center">
                <span className="font-medium relative z-10 ml-3">Back This Project</span>
              </div>
              
              {/* Payment method icons */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1.5 mr-3">
                <div className="h-5 w-5 rounded-full bg-[#FFCB05] flex items-center justify-center ring-1 ring-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#000"/>
                    <path d="M7.5 11.5h9M7.5 14.5h9" stroke="#FFCB05" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="h-5 w-5 rounded-full bg-[#00B9F2] flex items-center justify-center ring-1 ring-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                    <path d="M12 3L3 8l9 5 9-5-9-5z" fill="#fff"/>
                    <path d="M3 16l9 5 9-5M3 12l9 5 9-5" stroke="#fff" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="h-5 w-5 rounded-full bg-[#7C2CFF] flex items-center justify-center ring-1 ring-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                    <path d="M12 4L4 8v8l8 4 8-4V8l-8-4z" stroke="#fff" strokeWidth="2"/>
                    <path d="M12 8v8M8 10v4M16 10v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/5 to-emerald-600/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </Button>
            <Button 
              size="icon"
              variant="outline"
              className="shrink-0 h-9 w-9 hover:bg-gray-50"
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
