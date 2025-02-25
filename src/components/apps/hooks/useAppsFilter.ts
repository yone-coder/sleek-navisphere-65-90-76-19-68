
import { useState, useMemo } from 'react';
import type { App } from "../types";

export const useAppsFilter = (apps: App[], favorites: string[]) => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      if (showUpdatesOnly) return app.updates > 0;
      if (activeTab === "favorites") return favorites.includes(app.name);
      if (activeTab === "popular") return app.status === "popular";
      if (activeTab === "recent") return app.status === "new";
      if (selectedCategory !== "All") return app.category === selectedCategory;
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "users":
          return (b.users?.replace("K+", "000") || "0").localeCompare(a.users?.replace("K+", "000") || "0");
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [apps, favorites, activeTab, selectedCategory, sortBy, showUpdatesOnly]);

  return {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showUpdatesOnly,
    setShowUpdatesOnly,
    filteredApps
  };
};
