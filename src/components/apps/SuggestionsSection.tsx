
import { Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

interface SuggestionsSectionProps {
  suggestedApps: Array<{
    name: string;
    icon: any;
    color: string;
    route: string;
    updates?: number;
  }>;
}

export const SuggestionsSection = ({ suggestedApps }: SuggestionsSectionProps) => {
  const navigate = useNavigate();

  if (suggestedApps.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
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
        <div className="flex gap-4 pb-4">
          {suggestedApps.map((app) => (
            <Card 
              key={app.name}
              className="flex-none w-24 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(app.route)}
            >
              <div className="p-4 flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center relative`}>
                  <app.icon className="w-6 h-6 text-white" />
                  {app.updates > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
                      {app.updates}
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center line-clamp-1">
                  {app.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
