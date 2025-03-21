
import { RefreshCw, Package, Grid, List, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { apps, appCategories } from "@/components/apps/data/appsData";
import type { AppCategory } from "@/components/apps/types";

interface ExploreFiltersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCategory: AppCategory;
  setSelectedCategory: (category: AppCategory) => void;
  sortBy: "name" | "rating" | "users";
  setSortBy: (sort: "name" | "rating" | "users") => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showUpdatesOnly: boolean;
  setShowUpdatesOnly: (show: boolean) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  updatesCount: number;
}

export function ExploreFilters({
  isOpen,
  setIsOpen,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showUpdatesOnly,
  setShowUpdatesOnly,
  isRefreshing,
  onRefresh,
  updatesCount
}: ExploreFiltersProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>App Categories</DrawerTitle>
            <DrawerDescription>
              Browse apps by category or use filters to find what you need.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <ScrollArea className="h-[50vh] px-1">
              <div className="space-y-1">
                <Button
                  variant={selectedCategory === "All" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCategory("All");
                    setIsOpen(false);
                  }}
                >
                  <Package className="mr-2 h-4 w-4" />
                  All Apps
                  <Badge className="ml-auto">{apps.length}</Badge>
                </Button>
                
                {appCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpen(false);
                    }}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    {category}
                    <Badge className="ml-auto">
                      {apps.filter(app => app.category === category).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4 space-y-3">
              <div className="border-t pt-4">
                <h4 className="mb-2 text-sm font-medium">Sort Apps</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={sortBy === "name" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("name")}
                    className="flex-1"
                  >
                    Name
                  </Button>
                  <Button 
                    variant={sortBy === "rating" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("rating")}
                    className="flex-1"
                  >
                    Rating
                  </Button>
                  <Button 
                    variant={sortBy === "users" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("users")}
                    className="flex-1"
                  >
                    Popular
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="mb-2 text-sm font-medium">View Mode</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setViewMode("grid")}
                    className="flex-1"
                  >
                    <Grid className="mr-2 h-4 w-4" />
                    Grid
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setViewMode("list")}
                    className="flex-1"
                  >
                    <List className="mr-2 h-4 w-4" />
                    List
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button 
                  variant={showUpdatesOnly ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setShowUpdatesOnly(!showUpdatesOnly)}
                  className="w-full"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {showUpdatesOnly ? "Showing Updates Only" : "Show Updates Only"}
                  {updatesCount > 0 && (
                    <Badge variant="secondary" className="ml-2">{updatesCount}</Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-full"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh App List"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
