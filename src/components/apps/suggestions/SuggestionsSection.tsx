
import { Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SuggestionGroup } from "./SuggestionGroup";
import type { App } from "../types";

interface SuggestionsSectionProps {
  suggestedApps: App[];
}

export const SuggestionsSection = ({ suggestedApps }: SuggestionsSectionProps) => {
  if (suggestedApps.length === 0) return null;

  // Create groups of 4 apps
  const groups = suggestedApps.reduce((acc, app, i) => {
    const groupIndex = Math.floor(i / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(app);
    return acc;
  }, [] as typeof suggestedApps[]);

  return (
    <div className="mb-8 -mx-4 sm:-mx-6 md:-mx-8">
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(0); }
            25% { transform: translateX(0); }
            75% { transform: translateX(calc(-100% + 70px)); }
            100% { transform: translateX(0); }
          }
          .scrolling-text.needs-scroll {
            animation: scrollText 8s 1;
          }
          .scrolling-text.needs-scroll:not(:hover) {
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .scrolling-text.needs-scroll:hover {
            animation-play-state: running;
            overflow: visible;
          }
          .name-container {
            display: flex;
            justify-content: flex-start;
          }
          .name-container.center {
            justify-content: center;
          }
        `}
      </style>
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Suggestions</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs whitespace-nowrap">
              {suggestedApps.length} apps
            </Badge>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Apps you might be interested in</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 px-4 sm:px-6 md:px-8">
          {groups.map((group, groupIndex) => (
            <SuggestionGroup 
              key={groupIndex}
              apps={group}
              groupIndex={groupIndex}
            />
          ))}
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="px-4 sm:px-6 md:px-8 hover:bg-gray-200 transition-colors duration-200"
        />
      </ScrollArea>
    </div>
  );
};
