
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { User, Camera, Headphones, Image, Film, Music, Play, Tv, Shirt, Store, Wallet, Gamepad2, Ticket, Shopping } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { App } from "@/components/apps/types";

interface HomeTabProps {
  favorites: App[];
  onToggleFavorite: (appName: string) => void;
}

export function HomeTab({ favorites, onToggleFavorite }: HomeTabProps) {
  const navigate = useNavigate();
  
  // Filtered list of apps available on the page
  const availableApps = [
    { name: "Modish", icon: Shirt, color: "bg-slate-800", route: "/modish" },
    { name: "Wallet", icon: Wallet, color: "bg-purple-600", route: "/wallet" },
    { name: "Games", icon: Gamepad2, color: "bg-green-600", route: "/games-pages" },
    { name: "Borlette", icon: Ticket, color: "bg-zinc-800", route: "/borlette" },
    { name: "Shopping", icon: Shopping, color: "bg-emerald-500", route: "/marketplace" }
  ];
  
  const handleAppClick = (route: string) => {
    navigate(route);
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
      
      {/* Apps Grid Section - Full width with minimal padding */}
      <div className="px-2">
        <h2 className="text-2xl font-bold mb-4">My Apps</h2>
        <div className="grid grid-cols-4 gap-3">
          {availableApps.map((app, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              onClick={() => handleAppClick(app.route)}
            >
              <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-md mb-1`}>
                {React.isValidElement(app.icon) ? (
                  app.icon
                ) : (
                  <app.icon className="w-8 h-8 text-white" />
                )}
              </div>
              <span className="text-xs text-gray-800">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
