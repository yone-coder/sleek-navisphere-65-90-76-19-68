
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, History, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  apps: any[];
}

export function SearchOverlay({ isOpen, onClose, apps }: SearchOverlayProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredApps = apps.filter(app => {
    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    return searchTerms.every(term => 
      app.name.toLowerCase().includes(term) ||
      app.description.toLowerCase().includes(term) ||
      app.category.toLowerCase().includes(term)
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeSearchItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const categoryTags = Array.from(new Set(apps.map(app => app.category)));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in">
      <div className="h-full flex flex-col">
        <div className="border-b">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={onClose}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search apps, categories, or features..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="max-w-2xl mx-auto py-4 space-y-6">
            {!searchQuery && searchHistory.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-gray-900">Recent Searches</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 h-auto py-1"
                    onClick={clearSearchHistory}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5"
                    >
                      <History className="w-3 h-3 text-gray-400" />
                      <button
                        className="text-sm text-gray-600"
                        onClick={() => handleSearch(query)}
                      >
                        {query}
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => removeSearchItem(index, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!searchQuery && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className="h-auto py-1.5 px-3 text-xs"
                      onClick={() => handleSearch(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-900">
                  {filteredApps.length} {filteredApps.length === 1 ? 'result' : 'results'}
                </h3>
                <div className="grid gap-3">
                  {filteredApps.map((app) => (
                    <Card
                      key={app.name}
                      className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        navigate(app.route);
                        onClose();
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center shrink-0`}>
                          <app.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium">{app.name}</h4>
                          <p className="text-sm text-gray-500">{app.description}</p>
                          <div className="text-xs text-gray-400">{app.category}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
