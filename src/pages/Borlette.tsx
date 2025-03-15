
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Calendar, Clock, History, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BorletteSearchBar } from "@/components/borlette/BorletteSearchBar";
import { BorletteBannerSlider } from "@/components/borlette/BorletteBannerSlider";
import { BorletteCategories } from "@/components/borlette/BorletteCategories";
import { BorletteLatestPicks } from "@/components/borlette/BorletteLatestPicks";
import { BorletteQuickPick } from "@/components/borlette/BorletteQuickPick";
import { BorletteDrawTimes } from "@/components/borlette/BorletteDrawTimes";

const Borlette = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-700 hover:text-black relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-xl mx-auto px-4 pb-20 pt-4">
        {/* Banner Slider */}
        <section className="mb-6">
          <BorletteBannerSlider />
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById('quickpick-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Ticket className="h-5 w-5 mb-1" />
              <span className="text-xs">Quick Pick</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById('draw-times')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Clock className="h-5 w-5 mb-1" />
              <span className="text-xs">Draw Times</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById('latest-picks')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <History className="h-5 w-5 mb-1" />
              <span className="text-xs">History</span>
            </Button>
          </div>
        </section>

        {/* Quick Pick Generator */}
        <section id="quickpick-section" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Pick Generator</h2>
          <BorletteQuickPick />
        </section>

        {/* Draw Times */}
        <section id="draw-times" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Draws</h2>
          <BorletteDrawTimes />
        </section>

        {/* Categories with Tabs */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
            <Tabs defaultValue="all" className="w-[180px]" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <BorletteCategories showFavoritesOnly={activeTab === "favorites"} />
        </section>

        {/* Latest Picks */}
        <section id="latest-picks" className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Picks</h2>
          <BorletteLatestPicks />
        </section>

        {/* Calendar Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Draw Calendar</h2>
            <Button variant="ghost" size="sm" className="text-gray-500 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">View All</span>
            </Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
            <p className="text-gray-500">Calendar view coming soon</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Borlette;
