
export interface Game {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  creatorImage: string;
  verified: boolean;
  type: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked?: boolean;
  rating?: number;
  totalRatings?: number;
  activePlayers?: number;
  tournaments?: number;
  avgGameTime?: string;
  difficulty?: string;
}
