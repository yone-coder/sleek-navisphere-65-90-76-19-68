import { useState } from "react";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { GamesBottomNav } from "@/components/games/GamesBottomNav";
import { GamesHeader } from "@/components/games/GamesHeader";
import { GamesCategoryNav } from "@/components/games/GamesCategoryNav";
import { EventsSection } from "@/components/games/EventsSection";
import { SponsoredGamesSection } from "@/components/games/SponsoredGamesSection";
import { PopularGamesSection } from "@/components/games/PopularGamesSection";
import { CategorySection } from "@/components/games/CategorySection";
import { GameListItem } from "@/components/games/GameListItem";
import { Game } from "@/components/games/types";

const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience",
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    creatorImage: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    icon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    verified: true,
    type: ["Board", "Strategy"],
    likes: 1000,
    comments: 100,
    shares: 50,
    category: ["Board", "Strategy"],
    rating: 4.8,
    downloads: "1M+",
    size: "45MB",
    hasAds: false,
    inAppPurchases: true,
    route: "/games/chess",
    updateInfo: "Major Update"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    coverImage: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    creatorImage: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
    icon: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
    verified: false,
    type: ["Casual", "Strategy"],
    likes: 500,
    comments: 200,
    shares: 100,
    category: ["Casual", "Strategy"],
    rating: 4.5,
    downloads: "500K+",
    size: "28MB",
    hasAds: true,
    inAppPurchases: false,
    route: "/games/morpion",
    updateInfo: "New Event"
  },
  {
    id: "word-puzzle",
    title: "Word Masters",
    description: "Brain-teasing word puzzles",
    coverImage: "https://images.unsplash.com/photo-1466921583968-f07aa80c526e",
    creatorImage: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3",
    icon: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3",
    verified: true,
    type: ["Word", "Puzzle"],
    likes: 300,
    comments: 150,
    shares: 75,
    category: ["Word", "Puzzle"],
    rating: 4.3,
    downloads: "100K+",
    size: "32MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "sports-game",
    title: "Ultimate Football",
    description: "Realistic football simulation",
    coverImage: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    creatorImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    icon: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    verified: true,
    type: ["Sports", "Simulation"],
    likes: 800,
    comments: 300,
    shares: 150,
    category: ["Sports", "Simulation"],
    rating: 4.7,
    downloads: "5M+",
    size: "1.2GB",
    hasAds: false,
    inAppPurchases: true
  }
];

const gameEvents: GameEvent[] = [
  {
    id: "valentine-event",
    title: "Roses & Raids: Shadow Knight's Love Potion for Power!",
    description: "Love is in the air, Shadow Knight, but the battle continues! Join our Valentine's special event.",
    image: "https://images.unsplash.com/photo-1581375383680-903f6a661046",
    gameTitle: "Shadow Knight: Ninja",
    gameIcon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    developer: "Fansipan Limi",
    rating: 4.5,
    endsIn: "3 days"
  },
  {
    id: "winter-event",
    title: "Chess Winter Championship",
    description: "Compete in the seasonal tournament with special winter-themed boards",
    image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b",
    gameTitle: "Chess Master Pro",
    gameIcon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    developer: "Chess Studios",
    rating: 4.8,
    endsIn: "5 days"
  }
];

const sponsoredGames: Game[] = [
  {
    id: "candy-crush",
    title: "Candy Crush Soda Saga",
    description: "Match candies in this tasty puzzle adventure",
    coverImage: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    creatorImage: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    verified: true,
    type: ["Casual", "Puzzle"],
    likes: 1200,
    comments: 250,
    shares: 125,
    category: ["Casual", "Puzzle"],
    rating: 4.5,
    downloads: "1B+",
    size: "98MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "royal-match",
    title: "Royal Match",
    description: "Match-3 puzzle with royal twists",
    coverImage: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    creatorImage: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    verified: true,
    type: ["Casual", "Puzzle"],
    likes: 1500,
    comments: 275,
    shares: 175,
    category: ["Casual", "Puzzle"],
    rating: 4.7,
    downloads: "100M+",
    size: "156MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "duolingo",
    title: "Duolingo: Language Lessons",
    description: "Learn languages for free",
    coverImage: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    creatorImage: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    icon: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    verified: true,
    type: ["Education", "Language"],
    likes: 1800,
    comments: 300,
    shares: 180,
    category: ["Education", "Language"],
    rating: 4.7,
    downloads: "500M+",
    size: "45MB",
    hasAds: true,
    inAppPurchases: true
  }
];

const popularGames: Game[] = [
  {
    id: "free-fire-naruto",
    title: "Free Fire x NARUTO SHIPPUDEN",
    description: "Battle other players around the world in a survival shooter",
    coverImage: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    creatorImage: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    icon: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    verified: true,
    type: ["Action", "Shooter"],
    likes: 1300,
    comments: 280,
    shares: 135,
    category: ["Action", "Shooter"],
    rating: 4.4,
    downloads: "100M+",
    size: "326MB"
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    description: "Play the 5v5 MOBA game on mobile with players worldwide.",
    coverImage: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    creatorImage: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    verified: true,
    type: ["Strategy", "MOBA"],
    likes: 1400,
    comments: 290,
    shares: 145,
    category: ["Strategy", "MOBA"],
    rating: 3.9,
    downloads: "500M+",
    size: "156MB"
  },
  {
    id: "candy-crush",
    title: "Candy Crush Saga",
    description: "Match 3 candies to blast sugar! Spread jam & master the sweetest of puzzle games",
    coverImage: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    creatorImage: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    verified: true,
    type: ["Casual", "Puzzle"],
    likes: 1500,
    comments: 300,
    shares: 155,
    category: ["Casual", "Puzzle"],
    rating: 4.6,
    downloads: "1B+",
    size: "85MB"
  },
  {
    id: "pubg-mobile",
    title: "PUBG MOBILE: Miramar",
    description: "Battle royale game with intense multiplayer combat",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    creatorImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    verified: true,
    type: ["Action", "Shooter"],
    likes: 1600,
    comments: 310,
    shares: 165,
    category: ["Action", "Shooter"],
    rating: 4.2,
    downloads: "1B+",
    size: "772MB"
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    description: "Run and dodge trains in this endless runner game",
    coverImage: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    creatorImage: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    icon: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    verified: true,
    type: ["Casual", "Runner"],
    likes: 1700,
    comments: 320,
    shares: 175,
    category: ["Casual", "Runner"],
    rating: 4.5,
    downloads: "1B+",
    size: "128MB"
  },
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    description: "Open-world action RPG with stunning visuals",
    coverImage: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    creatorImage: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    icon: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    verified: true,
    type: ["RPG", "Adventure"],
    likes: 1800,
    comments: 330,
    shares: 185,
    category: ["RPG", "Adventure"],
    rating: 4.3,
    downloads: "500M+",
    size: "15GB"
  }
];

const categories = [
  "Top charts",
  "Children",
  "Premium",
  "New",
  "Action",
  "Adventure",
  "Arcade",
  "Board",
  "Card",
  "Casino",
  "Casual",
  "Educational",
  "Music",
  "Puzzle",
  "Racing",
  "Role Playing",
  "Simulation",
  "Sports",
  "Strategy",
  "Trivia",
  "Word"
];

export default function GamesPages() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery] = useState("");
  const [notifications] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <GamesHeader 
          searchQuery={searchQuery}
          notifications={notifications}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        <GamesCategoryNav 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="pt-4 pb-24">
        <EventsSection events={gameEvents} />
        <SponsoredGamesSection games={sponsoredGames} />
        <CategorySection title="Popular Sports Games" games={games.filter(g => g.type.includes("Sports"))} />
        <CategorySection title="Trending Board Games" games={games.filter(g => g.type.includes("Board"))} />
        <PopularGamesSection games={popularGames} />
        <CategorySection title="Suggested For You" games={games} />
        
        <div className="px-4">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Top Free Games</h2>
          <div className="space-y-4">
            {games.map((game, index) => (
              <GameListItem 
                key={game.id}
                game={game}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <GamesBottomNav />
      
      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
