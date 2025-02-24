
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { GameEvent } from "../types/pages";

interface EventsSectionProps {
  gameEvents: GameEvent[];
}

export const EventsSection = ({ gameEvents }: EventsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium text-gray-900 px-4 mb-4">Events happening now</h2>
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {gameEvents.map(event => (
            <div key={event.id} className="flex-none w-[340px]">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-black/50 text-white border-none backdrop-blur-sm">
                    Ends in {event.endsIn}
                  </Badge>
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full aspect-[5/3] object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2 mb-2">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src={event.gameIcon}
                  alt={event.gameTitle}
                  className="w-12 h-12 rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {event.gameTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="truncate">{event.developer}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>{event.rating}</span>
                      <span>★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

