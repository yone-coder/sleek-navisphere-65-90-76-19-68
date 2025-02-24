
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Search, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GamesHeaderProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: number;
  searchQuery: string;
  navigate: (to: number) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const GamesHeader: React.FC<GamesHeaderProps> = ({
  categories,
  activeTab,
  setActiveTab,
  notifications,
  searchQuery,
  navigate,
  setIsSearchOpen
}) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for games"
            className="w-full pl-10 bg-gray-50 border-none"
            value={searchQuery}
            onClick={() => setIsSearchOpen(true)}
            readOnly
          />
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-8 w-8"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge 
              className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] font-medium text-white border-2 border-white"
            >
              {notifications}
            </Badge>
          )}
        </Button>
      </div>

      <ScrollArea className="w-full" type="scroll">
        <div className="px-4 pb-3">
          <Tabs 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="h-9 bg-transparent p-0 w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 h-9 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default GamesHeader;

