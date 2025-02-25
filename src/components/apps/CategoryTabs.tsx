
import { Badge } from "@/components/ui/badge";
import { Category } from "./types";

interface CategoryTabsProps {
  categories: Category[];
}

export const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-2 bg-transparent h-auto p-0 min-w-max">
        {categories.map((category) => {
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-accent rounded-xl border border-transparent hover:border-gray-200 relative whitespace-nowrap"
            >
              {IconComponent && <IconComponent size={16} />}
              <span className="text-sm font-medium">{category.label}</span>
              {category.count && (
                <Badge 
                  variant="secondary" 
                  className="h-5 min-w-5 flex items-center justify-center px-1.5"
                >
                  {category.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
