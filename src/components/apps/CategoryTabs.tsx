
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Category } from "./types";

interface CategoryTabsProps {
  categories: Category[];
}

export const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  return (
    <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-white rounded-xl border border-transparent data-[state=active]:border-gray-200 relative"
        >
          <category.icon className="w-5 h-5" />
          <span className="text-xs">{category.label}</span>
          {category.count && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 text-[10px] h-5"
            >
              {category.count}
            </Badge>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
