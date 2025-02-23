
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GamesCategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const GamesCategoryNav = ({ categories, activeCategory, onCategoryChange }: GamesCategoryNavProps) => {
  return (
    <ScrollArea className="w-full" type="scroll">
      <div className="px-4 pb-3">
        <Tabs 
          value={activeCategory}
          onValueChange={onCategoryChange}
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
