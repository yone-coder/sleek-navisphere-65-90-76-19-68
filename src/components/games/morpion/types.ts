
export interface Position {
  row: number;
  col: number;
  invalid?: boolean;
}

export interface WinningLine {
  positions: number[][];
  color: string;
  angle: number;
  width: string;
}

export interface TimeLeft {
  X: number;
  O: number;
}

export interface GameState {
  boardSize: number;
  board: string[][];
  currentPlayer: 'X' | 'O';
  moves: number;
  winner: string | null;
  player1: string;
  player2: string;
  lastMove: Position | null;
  gameHistory: any[];
  timeLeft: TimeLeft;
  isTimerRunning: boolean;
  inactivityTime: number;
  winningLine: WinningLine | null;
  showWinnerPopup: boolean;
}

export interface GameSettings {
  zoom: number;
  soundEnabled: boolean;
  isSettingsOpen: boolean;
}
