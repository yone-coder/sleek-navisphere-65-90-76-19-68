
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Category } from "./types";

interface CategoryTabsProps {
  categories: Category[];
}

export const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  return (
    <TabsList className="flex gap-2 bg-transparent h-auto p-0">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-white rounded-xl border border-transparent data-[state=active]:border-gray-200 relative"
        >
          <category.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{category.label}</span>
          {category.count && (
            <Badge 
              variant="secondary" 
              className="h-5 min-w-5 flex items-center justify-center px-1.5"
            >
              {category.count}
            </Badge>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
