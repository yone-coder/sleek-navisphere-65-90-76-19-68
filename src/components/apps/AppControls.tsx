
import { ListFilter, TrendingUp, LayoutGrid, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppControlsProps {
  selectedCategory: string;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
}

export const AppControls = ({
  selectedCategory,
  viewMode,
  showUpdatesOnly,
  updatesCount,
  categories,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
  onUpdatesToggle,
}: AppControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <ListFilter className="w-4 h-4" />
            {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onSelect={() => onCategoryChange(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <TrendingUp className="w-4 h-4" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onSortChange("name")}>
            Name
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onSortChange("rating")}>
            Rating
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onSortChange("users")}>
            Users
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-2"
        onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
      >
        {viewMode === "grid" ? (
          <LayoutGrid className="w-4 h-4" />
        ) : (
          <Grid2X2 className="w-4 h-4" />
        )}
        View
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`h-9 gap-2 ${showUpdatesOnly ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
        onClick={onUpdatesToggle}
      >
        <Badge variant="secondary" className="h-5 px-1.5">
          {updatesCount}
        </Badge>
        Updates
      </Button>
    </div>
  );
};
