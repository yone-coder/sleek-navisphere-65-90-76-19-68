import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Trophy, BookOpen, Wallet, PiggyBank, Mail, Calendar, Clock, Camera, Music, Settings, Map, Calculator, Weather, Phone, Search } from 'lucide-react';

export function HomeTab() {
  const navigate = useNavigate();
  
  // iOS app grid with standard and custom apps
  const appsGrid = [
    // Row 1
    [
      { name: 'Shopr', icon: Store, color: 'bg-emerald-500', route: '/marketplace' },
      { name: 'Winnr', icon: Trophy, color: 'bg-amber-500', route: '/tournaments' },
      { name: 'LernX', icon: BookOpen, color: 'bg-blue-500', route: '/courses' },
      { name: 'Zendy', icon: Wallet, color: 'bg-violet-500', route: '/transfer' },
    ],
    // Row 2
    [
      { name: 'FundX', icon: PiggyBank, color: 'bg-rose-500', route: '/crowdfunding' },
      { name: 'Mail', icon: Mail, color: 'bg-blue-400', route: '/mail' },
      { name: 'Calendar', icon: Calendar, color: 'bg-white', route: '/calendar' },
      { name: 'Clock', icon: Clock, color: 'bg-black', route: '/clock' },
    ],
    // Row 3
    [
      { name: 'Camera', icon: Camera, color: 'bg-gray-800', route: '/camera' },
      { name: 'Music', icon: Music, color: 'bg-gradient-to-b from-pink-500 to-purple-500', route: '/music' },
      { name: 'Settings', icon: Settings, color: 'bg-gray-500', route: '/settings' },
      { name: 'Maps', icon: Map, color: 'bg-green-400', route: '/maps' },
    ],
    // Row 4
    [
      { name: 'Calculator', icon: Calculator, color: 'bg-orange-500', route: '/calculator' },
      { name: 'Weather', icon: Weather, color: 'bg-blue-300', route: '/weather' },
      { name: 'Phone', icon: Phone, color: 'bg-green-500', route: '/phone' },
      { name: 'Modish', icon: Store, color: 'bg-red-500', route: '/modish' },
    ],
  ];
  
  const handleAppClick = (route: string) => {
    navigate(route);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-800/20 to-purple-900/10 backdrop-blur-3xl pt-4 px-6 pb-24">
      {/* App grid layout */}
      <div className="grid gap-y-8 mt-8">
        {appsGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-x-4">
            {row.map((app, appIndex) => {
              const AppIcon = app.icon;
              return (
                <div 
                  key={`${rowIndex}-${appIndex}`} 
                  className="flex flex-col items-center"
                  onClick={() => handleAppClick(app.route)}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${app.color} hover:scale-105 active:scale-95 transition-transform`}>
                    <AppIcon className="w-8 h-8 text-white" />
                  </div>
                  <span className="mt-1 text-xs text-gray-200 font-medium">{app.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Dock at the bottom */}
      <div className="fixed bottom-16 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-3xl p-2 mx-auto">
        <div className="flex justify-around">
          {[
            { name: 'Phone', icon: Phone, color: 'bg-green-500', route: '/phone' },
            { name: 'Safari', icon: Search, color: 'bg-blue-500', route: '/safari' },
            { name: 'Messages', icon: Mail, color: 'bg-green-400', route: '/messages' },
            { name: 'Music', icon: Music, color: 'bg-red-500', route: '/music' }
          ].map((app, index) => {
            const AppIcon = app.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center"
                onClick={() => handleAppClick(app.route)}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${app.color} hover:scale-105 active:scale-95 transition-transform`}>
                  <AppIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
