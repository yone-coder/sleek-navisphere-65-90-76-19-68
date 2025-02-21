
export interface GameStats {
  likes: string;
  comments: string;
  shares: string;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  profileImage: string;
  verified: boolean;
  stats: GameStats;
  difficulty?: "easy" | "medium" | "hard";
  players?: number;
  rating?: number;
  category: string;
  tags: string[];
  playTime?: string;
  price?: {
    amount: number;
    currency: string;
  };
}

export interface GameCategory {
  name: string;
  games: Game[];
}
