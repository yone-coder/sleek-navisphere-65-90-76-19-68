
export interface Reply {
  id: number;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  verified: boolean;
  userId?: string;
}

export interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  verified: boolean;
  pinned: boolean;
  donation?: number;
  replies: Reply[];
  userId?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
