
import { useState, useEffect, useRef } from 'react';
import { Position, TimeLeft, WinningLine, GameHistory } from '../types';

interface UseGameStateProps {
  boardSize: number;
  player1: string;
  player2: string;
}

interface UseGameStateReturn {
  board: string[][];
  currentPlayer: 'X' | 'O';
  moves: number;
  winner: string | null;
  lastMove: Position | null;
  gameHistory: GameHistory[];
  soundEnabled: boolean;
  timeLeft: TimeLeft;
  isTimerRunning: boolean;
  inactivityTime: number;
  winningLine: WinningLine | null;
  showWinnerPopup: boolean;
  hoveredCell: Position | null;
  setSoundEnabled: (enabled: boolean) => void;
  setIsTimerRunning: (running: boolean) => void;
  setShowWinnerPopup: (show: boolean) => void;
  setHoveredCell: (cell: Position | null) => void;
  handleClick: (row: number, col: number) => void;
  undoMove: () => void;
  resetGame: () => void;
  isValidSecondMove: (row: number, col: number) => boolean;
}

export const useGameState = ({ boardSize, player1, player2 }: UseGameStateProps): UseGameStateReturn => {
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<Position | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ X: 300, O: 300 });
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [inactivityTime, setInactivityTime] = useState(15);
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);

  const moveAudioRef = useRef(new Audio('/api/placeholder/audio'));
  const winAudioRef = useRef(new Audio('/api/placeholder/audio'));
  const warningAudioRef = useRef(new Audio('/api/placeholder/audio'));

  useEffect(() => {
    resetGame();
  }, [boardSize]);

  useEffect(() => {
    if (!winner && isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft(prev => ({
          ...prev,
          [currentPlayer]: Math.max(0, prev[currentPlayer] - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentPlayer, winner, isTimerRunning]);

  useEffect(() => {
    if (!winner && isTimerRunning) {
      const inactivityTimer = setInterval(() => {
        setInactivityTime(prev => {
          if (prev <= 0) {
            clearInterval(inactivityTimer);
            setWinner(currentPlayer === 'X' ? 'O' : 'X');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(inactivityTimer);
    }
  }, [currentPlayer, winner, isTimerRunning]);

  useEffect(() => {
    if (inactivityTime === 5 && soundEnabled && !winner) {
      warningAudioRef.current.play().catch(() => {});
    }
  }, [inactivityTime, soundEnabled, winner]);

  useEffect(() => {
    if (timeLeft[currentPlayer] === 0) {
      setWinner(currentPlayer === 'X' ? 'O' : 'X');
    }
  }, [timeLeft, currentPlayer]);

  const isValidSecondMove = (row: number, col: number) => {
    if (moves !== 1) return true;

    const centerRow = Math.floor(boardSize / 2);
    const centerCol = Math.floor(boardSize / 2);

    const rowDiff = Math.abs(row - centerRow);
    const colDiff = Math.abs(col - centerCol);

    return rowDiff <= 3 && colDiff <= 3;
  };

  const checkWinner = (board: string[][], row: number, col: number) => {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal down-right
      [1, -1] // diagonal down-left
    ];
    const symbol = board[row][col];

    return directions.some(([dx, dy]) => {
      let count = 1;
      let positions = [[row, col]];

      // Check forward direction
      for (let i = 1; i < 5; i++) {
        const r = row + dx * i;
        const c = col + dy * i;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== symbol) break;
        count++;
        positions.push([r, c]);
      }

      // Check backward direction
      for (let i = 1; i < 5; i++) {
        const r = row - dx * i;
        const c = col - dy * i;
        if (r < 0 || r >= boardSize || c < 0 || c >= boardSize || board[r][c] !== symbol) break;
        count++;
        positions.push([r, c]);
      }

      if (count >= 5) {
        positions.sort((a, b) => {
          if (dx === 0) return a[1] - b[1];
          if (dy === 0) return a[0] - b[0];
          return a[0] - b[0];
        });
        
        let angle;
        if (dx === 0) angle = 0;
        else if (dy === 0) angle = Math.PI / 2;
        else if (dx === 1 && dy === 1) angle = Math.PI / 4;
        else angle = -Math.PI / 4;

        const startPos = positions[0];
        const endPos = positions[positions.length - 1];
        const width = Math.sqrt(
          Math.pow((endPos[0] - startPos[0]) * 1.5, 2) + 
          Math.pow((endPos[1] - startPos[1]) * 1.5, 2)
        );

        setWinningLine({
          positions,
          color: symbol === 'X' ? 'black' : 'red',
          angle,
          width: `${width}rem`
        });

        positions.forEach(([r, c]) => {
          board[r][c] = `${symbol}_WIN`;
        });
        return true;
      }
      return false;
    });
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] || winner || !isTimerRunning) return;

    if (!isValidSecondMove(row, col)) {
      setHoveredCell({ row, col, invalid: true });
      setTimeout(() => setHoveredCell(null), 500);
      return;
    }

    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = currentPlayer;

    if (soundEnabled) {
      moveAudioRef.current.play().catch(() => {});
    }

    setGameHistory([...gameHistory, {
      board: JSON.parse(JSON.stringify(board)),
      currentPlayer,
      moves,
      lastMove,
      timeLeft: { ...timeLeft },
      inactivityTime
    }]);

    setBoard(newBoard);
    setLastMove({ row, col });
    setMoves(moves + 1);
    setInactivityTime(15);

    if (checkWinner(newBoard, row, col)) {
      if (soundEnabled) {
        if (navigator.vibrate) {
          navigator.vibrate([50, 50, 100]);
        }
        winAudioRef.current.play().catch(() => {});
      }
      setWinner(currentPlayer);
      setTimeout(() => {
        setShowWinnerPopup(true);
      }, 1500);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    const centerPos = Math.floor(boardSize / 2);
    newBoard[centerPos][centerPos] = 'X';

    setBoard(newBoard);
    setCurrentPlayer('O');
    setMoves(1);
    setWinner(null);
    setLastMove({ row: centerPos, col: centerPos });
    setGameHistory([]);
    setTimeLeft({ X: 300, O: 300 });
    setIsTimerRunning(true);
    setInactivityTime(15);
    setWinningLine(null);
  };

  const undoMove = () => {
    if (gameHistory.length === 0) return;
    const lastState = gameHistory[gameHistory.length - 1];
    setBoard(lastState.board);
    setCurrentPlayer(lastState.currentPlayer);
    setMoves(lastState.moves);
    setLastMove(lastState.lastMove);
    setTimeLeft(lastState.timeLeft);
    setInactivityTime(lastState.inactivityTime || 15);
    setGameHistory(gameHistory.slice(0, -1));
    setWinner(null);
  };

  return {
    board,
    currentPlayer,
    moves,
    winner,
    lastMove,
    gameHistory,
    soundEnabled,
    timeLeft,
    isTimerRunning,
    inactivityTime,
    winningLine,
    showWinnerPopup,
    hoveredCell,
    setSoundEnabled,
    setIsTimerRunning,
    setShowWinnerPopup,
    setHoveredCell,
    handleClick,
    undoMove,
    resetGame,
    isValidSecondMove
  };
};
