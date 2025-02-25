
import { Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { App } from "./types";
import { cn } from "@/lib/utils";

interface SuggestionsSectionProps {
  suggestedApps: App[];
}

export const SuggestionsSection = ({ suggestedApps }: SuggestionsSectionProps) => {
  const navigate = useNavigate();

  if (suggestedApps.length === 0) return null;

  // Create groups of 4 apps
  const groups = suggestedApps.reduce((acc, app, i) => {
    const groupIndex = Math.floor(i / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(app);
    return acc;
  }, [] as App[][]);

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
            <div 
              key={groupIndex} 
              className="flex-none w-[320px] first:ml-0 animate-fade-in"
              style={{ 
                animationDelay: `${groupIndex * 100}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <div className="grid grid-cols-4 gap-4">
                {group.map((app) => (
                  <Card 
                    key={app.name} 
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-transparent border-0"
                    onClick={() => navigate(app.route)}
                  >
                    <div className="relative w-full overflow-hidden">
                      <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
                        <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
                          {'component' in app.icon 
                            ? <img {...app.icon.props} className={cn("w-[80%] h-[80%]", app.icon.props.className)} />
                            : <app.icon className="w-8 h-8 text-white" strokeWidth={2} />
                          }
                          {app.updates > 0 && (
                            <Badge 
                              className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5"
                            >
                              {app.updates}
                            </Badge>
                          )}
                        </div>
                        <div className={`w-[70px] overflow-hidden h-5 name-container ${app.name.length <= 8 ? 'center' : ''}`}>
                          <span 
                            className={`text-sm font-medium text-gray-700 scrolling-text whitespace-nowrap ${app.name.length > 8 ? 'needs-scroll' : 'text-center w-full block'}`}
                          >
                            {app.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
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
