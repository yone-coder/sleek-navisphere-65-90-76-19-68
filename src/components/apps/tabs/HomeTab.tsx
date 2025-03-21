
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { User, Camera, Headphones, Image, Film, Music, Play, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeTabProps {
  favorites: App[];
  onToggleFavorite: (appName: string) => void;
}

export function HomeTab({ favorites, onToggleFavorite }: HomeTabProps) {
  const navigate = useNavigate();
  
  // Media apps data
  const mediaApps = [
    { name: "Camera", icon: Camera, color: "bg-gray-200", route: "/camera" },
    { name: "Disney+", icon: () => (
      <div className="text-white text-xl font-bold">D+</div>
    ), color: "bg-blue-900", route: "/disney" },
    { name: "Google TV", icon: Tv, color: "bg-white", route: "/google-tv" },
    { name: "Headphones", icon: Headphones, color: "bg-amber-200", route: "/headphones" },
    { name: "Musixmatch", icon: Music, color: "bg-red-400", route: "/musixmatch" },
    { name: "Netflix", icon: Film, color: "bg-black", route: "/netflix" },
    { name: "Photos", icon: Image, color: "bg-white", route: "/photos" },
    { name: "Resplash", icon: () => (
      <div className="flex items-center">
        <div className="h-3 w-3 bg-black rounded-full mr-1"></div>
        <div className="h-4 w-4 bg-black rounded-full"></div>
      </div>
    ), color: "bg-white", route: "/resplash" },
    { name: "Snapseed", icon: () => (
      <div className="text-white text-sm">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-lime-400 mr-1"></div>
          <div className="h-3 w-3 bg-gray-700"></div>
        </div>
      </div>
    ), color: "bg-gray-800", route: "/snapseed" },
    { name: "Spotify", icon: () => (
      <div className="text-white text-sm">
        <div className="h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 border-t-2 border-r-2 border-white transform rotate-45"></div>
        </div>
      </div>
    ), color: "bg-black", route: "/spotify" },
    { name: "Tabs", icon: () => (
      <div className="text-black text-sm font-bold">G</div>
    ), color: "bg-yellow-400", route: "/tabs" },
    { name: "YouTube", icon: Play, color: "bg-white", route: "/youtube" }
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
      
      {/* Media Apps Grid Section */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Media</h2>
        <div className="grid grid-cols-4 gap-4">
          {mediaApps.map((app, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center"
              onClick={() => handleAppClick(app.route)}
            >
              <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-md mb-1`}>
                {React.isValidElement(app.icon) ? (
                  app.icon
                ) : (
                  <app.icon className="w-8 h-8 text-gray-800" />
                )}
              </div>
              <span className="text-xs text-white">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
