
import { Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import type { App } from "../types";

interface SuggestionCardProps {
  app: App;
  animationDelay?: string;
}

export const SuggestionCard = ({ app, animationDelay }: SuggestionCardProps) => {
  const navigate = useNavigate();
  const randomDelay = Math.floor(Math.random() * 10000) + 5000;
  
  return (
    <Card 
      key={app.name} 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-transparent border-0"
      onClick={() => navigate(app.route)}
    >
      <div className="relative w-full overflow-hidden">
        <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
          <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
            <app.icon className="w-8 h-8 text-white" strokeWidth={2} />
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
              className={`text-sm font-medium text-gray-700 scrolling-text whitespace-nowrap ${app.name.length > 8 ? 'needs-scroll inline-block' : 'text-center w-full block'}`}
              style={{
                animation: app.name.length > 8 ? 'scrollText 8s 1' : undefined,
                animationDelay: animationDelay
              }}
            >
              {app.name}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
