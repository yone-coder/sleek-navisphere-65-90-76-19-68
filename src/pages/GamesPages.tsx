
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { GamesBottomNav } from "@/components/games/GamesBottomNav";
import GamesExplore from "./games/GamesExplore";
import ContestsPage from "./games/ContestsPage";
import Morpion from "./games/Morpion";
import GamesHeader from "@/components/games/pages/GamesHeader";
import EventsSection from "@/components/games/pages/EventsSection";
import SponsoredGames from "@/components/games/pages/SponsoredGames";
import CategorySection from "@/components/games/pages/CategorySection";
import PopularGames from "@/components/games/pages/PopularGames";
import TopFreeGames from "@/components/games/pages/TopFreeGames";
import { games, gameEvents, sponsoredGames, popularGames, categories } from "@/data/games";

export default function GamesPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const MainContent = () => (
    <div className="pt-4 pb-24">
      <EventsSection events={gameEvents} />
      <SponsoredGames games={sponsoredGames} />
      <CategorySection 
        title="Popular Sports Games" 
        games={games.filter(g => g.category.includes("Sports"))} 
      />
      <CategorySection 
        title="Trending Board Games" 
        games={games.filter(g => g.category.includes("Board"))} 
      />
      <PopularGames games={popularGames} />
      <CategorySection title="Suggested For You" games={games} />
      <TopFreeGames games={games} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <GamesHeader 
              categories={categories}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              notifications={notifications}
              searchQuery={searchQuery}
              navigate={navigate}
              setIsSearchOpen={setIsSearchOpen}
            />
            <MainContent />
          </>
        } />
        <Route path="game-search/*" element={<GamesExplore />} />
        <Route path="contest/*" element={<ContestsPage />} />
        <Route path="morpion" element={<Morpion />} />
      </Routes>

      <GamesBottomNav />
      
      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}

