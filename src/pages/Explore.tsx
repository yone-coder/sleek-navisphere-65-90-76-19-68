
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExploreCarousel } from "@/components/explore/ExploreCarousel";
import { CategoryTabs } from "@/components/explore/CategoryTabs";
import { GameSection } from "@/components/explore/GameSection";
import { sliderImages, categories, games } from "@/data/exploreData";

export default function Explore() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedGames, setLikedGames] = useState<number[]>([]);
  const { toast } = useToast();

  const handleLike = (gameId: number) => {
    setLikedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
    
    toast({
      title: likedGames.includes(gameId) ? "Removed from favorites" : "Added to favorites",
      description: "Your game preferences have been updated.",
    });
  };

  const handleShare = (gameId: number) => {
    toast({
      title: "Share link copied!",
      description: "Game link has been copied to your clipboard.",
    });
  };

  return (
    <div className="bg-gray-100">
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button className="text-xl" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-2xl font-bold ml-4">Explore</h1>
        </div>
        <button className="text-xl">
          <i className="fas fa-search"></i>
        </button>
      </header>

      <ExploreCarousel
        sliderImages={sliderImages}
        currentSlide={currentSlide}
      />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="space-y-4">
        <GameSection 
          title="Board Games" 
          games={games.boardGames} 
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Arcade Games" 
          games={games.arcadeGames} 
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Card Games" 
          games={games.cardGames} 
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Puzzle Games" 
          games={games.puzzleGames} 
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
      </div>
    </div>
  );
}
