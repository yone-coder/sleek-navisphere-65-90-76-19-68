
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
}
