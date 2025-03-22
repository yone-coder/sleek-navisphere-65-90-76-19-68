import { useState } from "react";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  LayoutList,
  LayoutGrid,
  Check,
  X,
  RotateCw,
  Star,
  Users,
  Type,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { AppCategory } from "@/components/apps/types";

interface ExploreFiltersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCategory: AppCategory;
  setSelectedCategory: (category: AppCategory) => void;
  sortBy: "name" | "rating" | "users";
  setSortBy: (sortBy: "name" | "rating" | "users") => void;
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
  showUpdatesOnly: boolean;
  setShowUpdatesOnly: (showUpdatesOnly: boolean) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  updatesCount: number;
  expandedView: boolean;
  setExpandedView: (expandedView: boolean) => void;
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
  updatesCount,
  expandedView,
  setExpandedView,
}: ExploreFiltersProps) {
  const categories: AppCategory[] = [
    "All",
    "Shopping",
    "Gaming",
    "Education",
    "Finance",
    "Productivity",
    "Utilities",
    "Entertainment",
  ];

  const handleCategoryClick = (category: AppCategory) => {
    setSelectedCategory(category);
  };

  const handleSortByClick = (sortByOption: "name" | "rating" | "users") => {
    setSortBy(sortByOption);
  };

  const handleViewModeClick = (viewModeOption: "grid" | "list") => {
    setViewMode(viewModeOption);
  };

  const handleToggleUpdatesOnly = () => {
    setShowUpdatesOnly(!showUpdatesOnly);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSortBy("name");
    setViewMode("grid");
    setShowUpdatesOnly(false);
    setExpandedView(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:w-[400px] border-l-2">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Customize your app discovery experience.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-160px)]">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Sort By</h4>
              <div className="flex flex-col gap-2">
                <Button
                  variant={sortBy === "name" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortByClick("name")}
                >
                  <Type className="mr-2 h-4 w-4" />
                  Name
                </Button>
                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortByClick("rating")}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Rating
                </Button>
                <Button
                  variant={sortBy === "users" ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortByClick("users")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Popularity
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">View Mode</h4>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewModeClick("grid")}
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewModeClick("list")}
                >
                  <LayoutList className="mr-2 h-4 w-4" />
                  List
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Show Updates Only</h4>
                {updatesCount > 0 && (
                  <Badge variant="secondary">{updatesCount}</Badge>
                )}
              </div>
              <Button
                variant={showUpdatesOnly ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={handleToggleUpdatesOnly}
                disabled={updatesCount === 0}
              >
                {showUpdatesOnly ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Showing Apps with Updates
                  </>
                ) : (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Show Apps with Updates
                  </>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleResetFilters}>
              Reset Filters
            </Button>
            <Button onClick={onRefresh} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Apply Filters
                </>
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
