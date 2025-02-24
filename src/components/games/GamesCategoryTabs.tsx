
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GamesCategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: string[];
}

export const GamesCategoryTabs = ({ activeTab, setActiveTab, categories }: GamesCategoryTabsProps) => {
  return (
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
  );
};

