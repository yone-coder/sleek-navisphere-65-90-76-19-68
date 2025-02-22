
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: Array<{
    id: string;
    label: string;
  }>;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

export const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="py-4">
      <Tabs defaultValue="all" value={activeCategory} onValueChange={onCategoryChange}>
        <div className="relative">
          <TabsList className="h-10 items-center bg-transparent gap-2 flex overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-full px-4">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0",
                    "data-[state=active]:bg-gray-900 data-[state=active]:text-white",
                    "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600",
                    "hover:bg-gray-300"
                  )}
                >
                  {category.label}
                </TabsTrigger>
              ))}
              <div className="w-4 flex-shrink-0" />
            </div>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};
