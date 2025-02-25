
import { useState, useEffect } from 'react';
import { Position, GameHistory } from '../types';

interface UseGameBoardProps {
  boardSize: number;
}

export const useGameBoard = ({ boardSize }: UseGameBoardProps) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [moves, setMoves] = useState(0);
  const [lastMove, setLastMove] = useState<Position | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);

  const isValidSecondMove = (row: number, col: number) => {
    if (moves === 1) {
      const centerRow = Math.floor(boardSize / 2);
      const centerCol = Math.floor(boardSize / 2);
      const rowDiff = Math.abs(row - centerRow);
      const colDiff = Math.abs(col - centerCol);
      return rowDiff <= 3 && colDiff <= 3;
    }

    // For moves after the second one, check proximity to existing checks
    const existingChecks = [];
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j]) {
          existingChecks.push({ row: i, col: j });
        }
      }
    }

    // Check if the move is within 2 spaces of any existing check
    return existingChecks.some(check => {
      const rowDiff = Math.abs(row - check.row);
      const colDiff = Math.abs(col - check.col);
      return rowDiff <= 2 && colDiff <= 2;
    });
  };

  const resetBoard = () => {
    const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    const centerPos = Math.floor(boardSize / 2);
    newBoard[centerPos][centerPos] = 'X';

    setBoard(newBoard);
    setCurrentPlayer('O');
    setMoves(1);
    setLastMove({ row: centerPos, col: centerPos });
    setGameHistory([]);
  };

  const undoMove = () => {
    let lastState = null;
    
    if (gameHistory.length > 0) {
      lastState = gameHistory[gameHistory.length - 1];
      setBoard(lastState.board);
      setCurrentPlayer(lastState.currentPlayer);
      setMoves(lastState.moves);
      setLastMove(lastState.lastMove);
      setGameHistory(gameHistory.slice(0, -1));
    }
    
    return lastState;
  };

  useEffect(() => {
    resetBoard();
  }, []); // Initialize board when component mounts

  return {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    moves,
    setMoves,
    lastMove,
    setLastMove,
    gameHistory,
    setGameHistory,
    hoveredCell,
    setHoveredCell,
    isValidSecondMove,
    resetBoard,
    undoMove
  };
};
