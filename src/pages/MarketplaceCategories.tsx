
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Grid, ListFilter, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CategoryTabs } from "@/components/marketplace/CategoryTabs";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";
import { cn } from "@/lib/utils";

// Featured categories with rich metadata
const categories = [
  {
    id: "gaming",
    name: "Gaming",
    description: "Gaming gear and accessories",
    icon: "🎮",
    itemCount: 2451,
    featured: true,
    gradient: "from-purple-500 to-indigo-500",
    subcategories: ["PC Gaming", "Console Gaming", "Mobile Gaming", "VR/AR"],
    trending: true
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest tech and gadgets",
    icon: "📱",
    itemCount: 1832,
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
    subcategories: ["Smartphones", "Laptops", "Audio", "Cameras"],
    trending: true
  },
  {
    id: "peripherals",
    name: "Peripherals",
    description: "Computer peripherals and accessories",
    icon: "🖱️",
    itemCount: 967,
    featured: false,
    gradient: "from-green-500 to-emerald-500",
    subcategories: ["Keyboards", "Mice", "Monitors", "Storage"],
    hot: true
  },
  {
    id: "components",
    name: "Components",
    description: "PC building components",
    icon: "🔧",
    itemCount: 1245,
    featured: true,
    gradient: "from-orange-500 to-red-500",
    subcategories: ["CPUs", "GPUs", "Motherboards", "RAM"],
    new: true
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Tech accessories and add-ons",
    icon: "🎧",
    itemCount: 2156,
    featured: false,
    gradient: "from-pink-500 to-rose-500",
    subcategories: ["Cases", "Cables", "Adapters", "Power"],
    trending: true
  },
  {
    id: "software",
    name: "Software",
    description: "Digital software and licenses",
    icon: "💿",
    itemCount: 543,
    featured: false,
    gradient: "from-violet-500 to-purple-500",
    subcategories: ["Games", "Productivity", "Security", "Design"],
    hot: true
  }
];

const MarketplaceCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex items-center gap-2 p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Categories</h1>
        </div>

        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="px-4 pb-3 flex items-center justify-between">
          <CategoryTabs
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", view === "grid" && "text-blue-500")}
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", view === "list" && "text-blue-500")}
              onClick={() => setView("list")}
            >
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[132px] pb-20 px-4">
        <div className={cn(
          "grid gap-4",
          view === "grid" ? "grid-cols-2" : "grid-cols-1"
        )}>
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/marketplace/categories/${category.id}`)}
              className={cn(
                "relative group overflow-hidden",
                "bg-gradient-to-br rounded-2xl",
                category.gradient,
                "animate-scale-in transition-transform hover:scale-[1.02] active:scale-[0.98]",
                view === "grid" ? "aspect-square" : "h-24"
              )}
            >
              {/* Category Content */}
              <div className="absolute inset-0 p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl mb-1">{category.icon}</span>
                    <h3 className="font-semibold mt-2">{category.name}</h3>
                    {view === "list" && (
                      <p className="text-xs text-white/80 mt-1">{category.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {category.itemCount.toLocaleString()} items
                    </Badge>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  {category.trending && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      🔥 Trending
                    </Badge>
                  )}
                  {category.new && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      ✨ New
                    </Badge>
                  )}
                  {category.hot && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      🌟 Hot
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <MarketplaceNav />
    </div>
  );
};

export default MarketplaceCategories;
