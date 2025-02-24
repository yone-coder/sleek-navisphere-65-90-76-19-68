import { Game, GameEvent } from "@/types/game";

export const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    icon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
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
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    icon: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
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
    thumbnail: "https://images.unsplash.com/photo-1466921583968-f07aa80c526e",
    icon: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3",
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
    thumbnail: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    icon: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    category: ["Sports", "Simulation"],
    rating: 4.7,
    downloads: "5M+",
    size: "1.2GB",
    hasAds: false,
    inAppPurchases: true
  }
];

export const gameEvents: GameEvent[] = [
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

export const sponsoredGames: Game[] = [
  {
    id: "candy-crush",
    title: "Candy Crush Soda Saga",
    description: "Match candies in this tasty puzzle adventure",
    thumbnail: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
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
    thumbnail: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
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
    thumbnail: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    icon: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    category: ["Education", "Language"],
    rating: 4.7,
    downloads: "500M+",
    size: "45MB",
    hasAds: true,
    inAppPurchases: true
  }
];

export const popularGames: Game[] = [
  {
    id: "free-fire-naruto",
    title: "Free Fire x NARUTO SHIPPUDEN",
    description: "Battle other players around the world in a survival shooter",
    thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    icon: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    category: ["Action", "Shooter"],
    rating: 4.4,
    downloads: "100M+",
    size: "326MB"
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    description: "Play the 5v5 MOBA game on mobile with players worldwide.",
    thumbnail: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    category: ["Strategy", "MOBA"],
    rating: 3.9,
    downloads: "500M+",
    size: "156MB"
  },
  {
    id: "candy-crush",
    title: "Candy Crush Saga",
    description: "Match 3 candies to blast sugar! Spread jam & master the sweetest of puzzle games",
    thumbnail: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    category: ["Casual", "Puzzle"],
    rating: 4.6,
    downloads: "1B+",
    size: "85MB"
  },
  {
    id: "pubg-mobile",
    title: "PUBG MOBILE: Miramar",
    description: "Battle royale game with intense multiplayer combat",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    category: ["Action", "Shooter"],
    rating: 4.2,
    downloads: "1B+",
    size: "772MB"
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    description: "Run and dodge trains in this endless runner game",
    thumbnail: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    icon: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    category: ["Casual", "Runner"],
    rating: 4.5,
    downloads: "1B+",
    size: "128MB"
  },
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    description: "Open-world action RPG with stunning visuals",
    thumbnail: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    icon: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    category: ["RPG", "Adventure"],
    rating: 4.3,
    downloads: "500M+",
    size: "15GB"
  }
];

export const categories = [
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
