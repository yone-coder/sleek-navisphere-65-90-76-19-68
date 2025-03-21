
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apps } from "../data/appsData";
import type { App } from "../types";

interface HomeTabProps {
  favorites: App[];
  onToggleFavorite: (appName: string) => void;
}

export function HomeTab({ favorites, onToggleFavorite }: HomeTabProps) {
  const navigate = useNavigate();
  
  // Get the most used apps (we'll use favorites for this example)
  const mostUsedApps = [...favorites].slice(0, 4);
  
  // Fill with popular apps if we don't have enough favorites
  if (mostUsedApps.length < 4) {
    const popularApps = apps
      .filter(app => app.status === "popular" && !favorites.some(fav => fav.name === app.name))
      .slice(0, 4 - mostUsedApps.length);
    
    mostUsedApps.push(...popularApps);
  }
  
  // Use the main apps list, but arrange in a grid pattern
  const arrangedApps = [...apps]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 24);
  
  // Group apps into rows of 4 for the iOS-style grid
  const appRows = [];
  for (let i = 0; i < arrangedApps.length; i += 4) {
    appRows.push(arrangedApps.slice(i, i + 4));
  }
  
  const handleAppClick = (app: App) => {
    if (app.name === "Chess") {
      navigate('/games/chess');
    } else if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route);
    }
  };
  
  return (
    <div className="pt-4 pb-40">
      {/* iOS-style Status Bar */}
      <div className="mb-6 px-2 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">9:41 AM</div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-6 bg-gray-700 rounded-sm"></div>
          <div className="text-sm font-medium text-gray-700">100%</div>
        </div>
      </div>
      
      {/* Sign In Section */}
      <div className="mb-6 mx-2">
        <Card className="bg-white shadow-sm p-4 rounded-2xl">
          <button 
            className="group flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-all duration-200 rounded-lg"
            onClick={() => navigate('/login')}
          >
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex flex-col items-start min-w-0">
              <span className="text-sm font-medium truncate">Sign in</span>
              <span className="text-xs text-muted-foreground">
                Access your account and data
              </span>
            </div>
            <div className="ml-auto">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-muted-foreground/70"
              >
                <path 
                  d="M9 18L15 12L9 6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </Card>
      </div>
      
      {/* Weather Widget */}
      <div className="mb-6 mx-2">
        <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">New York</h3>
              <p className="text-3xl font-bold">68°</p>
              <p className="text-sm opacity-90">Partly Cloudy</p>
            </div>
            <div className="text-6xl">⛅</div>
          </div>
        </Card>
      </div>
      
      {/* Most Used Apps */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Most Used</h3>
        <div className="grid grid-cols-4 gap-4">
          {mostUsedApps.map((app, index) => (
            <div 
              key={app.name || index} 
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => handleAppClick(app)}
            >
              <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
                {React.isValidElement(app.icon) ? (
                  app.icon
                ) : (
                  <app.icon className="w-7 h-7 text-white" />
                )}
                {app.updates > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {app.updates}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-center">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* All Apps Grid (iOS style) */}
      <div className="px-1">
        {appRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-around mb-8">
            {row.map((app, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="flex flex-col items-center gap-1 w-20"
                onClick={() => handleAppClick(app)}
              >
                <div className={`w-14 h-14 rounded-[22px] ${app.color} flex items-center justify-center relative shadow-sm`}>
                  {React.isValidElement(app.icon) ? (
                    app.icon
                  ) : (
                    <app.icon className="w-7 h-7 text-white" />
                  )}
                  {app.updates > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {app.updates}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-center truncate w-full">{app.name}</span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 hover:opacity-100 hover:bg-gray-100/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(app.name);
                  }}
                >
                  <Star className={`w-3 h-3 ${favorites.some(fav => fav.name === app.name) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Dock */}
      <div className="fixed bottom-16 left-0 right-0 mx-auto w-[90%] max-w-md">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/30">
          <div className="flex justify-around">
            {apps.slice(0, 4).map((app, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
                  {React.isValidElement(app.icon) ? (
                    app.icon
                  ) : (
                    <app.icon className="w-7 h-7 text-white" />
                  )}
                  {app.updates > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {app.updates}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
