
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'home', label: 'Home' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'sports', label: 'Sports' },
  { id: 'beauty', label: 'Beauty' },
];

export const CategoryTabs = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryTabsProps) => {
  return (
    <Tabs 
      defaultValue="all" 
      className="w-full"
      value={selectedCategory}
      onValueChange={setSelectedCategory}
    >
      <TabsList className="h-10 w-full justify-start gap-1.5 bg-transparent p-0 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="h-7 px-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export { categories };
