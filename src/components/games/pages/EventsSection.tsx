
import React, { useState } from 'react';
import { GameEvent } from '@/types/game';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsSectionProps {
  events: GameEvent[];
  isLoading?: boolean;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, isLoading }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (eventId: string) => {
    setLoadedImages(prev => ({ ...prev, [eventId]: true }));
  };

  const allImagesLoaded = !isLoading && events?.length > 0 && 
    events.every(event => loadedImages[event.id] && loadedImages[`${event.id}-icon`]);

  if (isLoading || !allImagesLoaded) {
    return (
      <div className="mb-8">
        <div className="px-4 mb-4">
          <Skeleton className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
        </div>
        <ScrollArea className="w-full" type="scroll">
          <div className="flex px-4 gap-4 pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-none w-[280px]">
                <div className="relative rounded-2xl overflow-hidden">
                  <Skeleton className="w-full aspect-[16/9] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                  <div className="absolute top-2 left-2">
                    <Skeleton className="h-5 w-24 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <Skeleton className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                      <Skeleton className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                      <Skeleton className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <Skeleton className="w-20 h-8 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="mb-8 will-change-transform">
      <h2 className="text-2xl font-medium text-gray-900 px-4 mb-4">Events happening now</h2>
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {events.map(event => (
            <div key={event.id} className="flex-none w-[280px] transform-gpu">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-black/50 text-white border-none backdrop-blur-sm text-xs">
                    Ends in {event.endsIn}
                  </Badge>
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full aspect-[16/9] object-cover mix-blend-overlay transform-gpu"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(event.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-base font-bold mb-1 line-clamp-1">{event.title}</h3>
                  <p className="text-xs opacity-90 line-clamp-2 mb-1">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={event.gameIcon}
                  alt={event.gameTitle}
                  className="w-10 h-10 rounded-xl flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(`${event.id}-icon`)}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate text-sm">
                    {event.gameTitle}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="truncate">{event.developer}</span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5">
                      <span>{event.rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="relative h-8 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:via-blue-500 hover:to-indigo-500 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border border-indigo-400/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] backdrop-blur-sm overflow-hidden group rounded-lg animate-fade-in transform-gpu"
                >
                  <PlayCircle className="w-3 h-3 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-indigo-600/10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default EventsSection;
