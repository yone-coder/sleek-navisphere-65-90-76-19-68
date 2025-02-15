
export interface Tournament {
  id: string;
  title: string;
  description?: string;
  banner_url?: string;
  start_date?: string;
  end_date?: string;
  prize_pool?: number;
  entry_fee?: number;
  max_participants?: number;
  current_participants?: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'closed';
  position: number;
  created_at?: string;
  updated_at?: string;
}

export interface TournamentCardProps {
  tournament: Tournament;
  isAdmin?: boolean;
  className?: string;
}
