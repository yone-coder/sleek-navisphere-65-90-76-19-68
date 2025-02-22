import { Game } from "../types/games";

export const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience. Play against AI or compete with players worldwide in real-time matches.",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Chess",
    category: "Board",
    rating: 4.8,
    downloads: "1M+",
    isFeatured: true,
    route: "/games/chess",
    activePlayers: 15420,
    tournaments: 32,
    likes: 45200,
    comments: 1200,
    shares: 890,
    verified: true
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TicTacToe",
    category: "Casual",
    rating: 4.5,
    downloads: "500K+",
    isEditorChoice: true,
    route: "/games/morpion",
    activePlayers: 8765,
    tournaments: 15,
    likes: 23400,
    comments: 678,
    shares: 456,
    verified: false
  },
  {
    id: "domino",
    title: "Domino Masters",
    description: "Strategic tile-matching multiplayer game",
    thumbnail: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Domino",
    category: "Board",
    rating: 4.3,
    downloads: "100K+",
    price: "Free",
    activePlayers: 3456,
    tournaments: 8,
    likes: 12300,
    comments: 345,
    shares: 234,
    verified: false
  },
  {
    id: "puzzle",
    title: "Brain Teaser",
    description: "Mind-bending puzzles and challenges",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Puzzle",
    category: "Puzzle",
    rating: 4.7,
    downloads: "250K+",
    price: "Free",
    activePlayers: 5678,
    tournaments: 12,
    likes: 34500,
    comments: 789,
    shares: 567,
    verified: true
  }
];

export const categories = [
  "For you",
  "Top charts",
  "Kids",
  "Premium",
  "Categories",
  "Editor's choice"
];
