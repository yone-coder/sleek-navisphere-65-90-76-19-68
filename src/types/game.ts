
export interface GameRoom {
  id: string;
  code: string;
  status: 'waiting' | 'playing' | 'finished';
  player1_id: string | null;
  player2_id: string | null;
  current_player: 'X' | 'O';
  winner: string | null;
  board: string[][];
  created_at: string;
  last_move: { row: number; col: number } | null;
  time_left_x: number;
  time_left_o: number;
}

export interface GameMove {
  room_id: string;
  player_id: string;
  row: number;
  col: number;
  timestamp: string;
}
