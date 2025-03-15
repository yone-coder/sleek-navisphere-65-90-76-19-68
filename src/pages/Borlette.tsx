
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorletteSearchBar } from "@/components/borlette/BorletteSearchBar";
import { BorletteBannerSlider } from "@/components/borlette/BorletteBannerSlider";
import { BorletteCategories } from "@/components/borlette/BorletteCategories";
import { BorletteLatestPicks } from "@/components/borlette/BorletteLatestPicks";

const Borlette = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with Search Bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="h-9 w-9 text-gray-700 hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <BorletteSearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-xl mx-auto px-4 pb-20 pt-4">
        {/* Banner Slider */}
        <section className="mb-8">
          <BorletteBannerSlider />
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
          <BorletteCategories />
        </section>

        {/* Latest Picks */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Picks</h2>
          <BorletteLatestPicks />
        </section>
      </main>
    </div>
  );
};

export default Borlette;
