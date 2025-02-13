
import React, { useState } from 'react';
import { RotateCcw, Volume2, ArrowRight } from 'lucide-react';

const GRID_SIZE = 15;
const WIN_CONDITION = 5;

const calculateWinner = (squares: (string | null)[][]) => {
  // Check horizontal, vertical, and diagonal wins
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!squares[row][col]) continue;
      
      // Check horizontal
      if (col <= GRID_SIZE - WIN_CONDITION) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (squares[row][col + i] !== squares[row][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }
      
      // Check vertical
      if (row <= GRID_SIZE - WIN_CONDITION) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (squares[row + i][col] !== squares[row][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }
      
      // Check diagonal down
      if (row <= GRID_SIZE - WIN_CONDITION && col <= GRID_SIZE - WIN_CONDITION) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (squares[row + i][col + i] !== squares[row][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }
      
      // Check diagonal up
      if (row >= WIN_CONDITION - 1 && col <= GRID_SIZE - WIN_CONDITION) {
        let win = true;
        for (let i = 0; i < WIN_CONDITION; i++) {
          if (squares[row - i][col + i] !== squares[row][col]) {
            win = false;
            break;
          }
        }
        if (win) return squares[row][col];
      }
    }
  }
  return null;
};

const Gomoku = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const handleClick = (row: number, col: number) => {
    if (grid[row][col] || calculateWinner(grid)) return;
    
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = xIsNext ? 'X' : 'O';
    setGrid(newGrid);
    setXIsNext(!xIsNext);
    setMoveCount(moveCount + 1);
  };
  
  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setXIsNext(true);
    setMoveCount(0);
  };
  
  const winner = calculateWinner(grid);
  const status = winner 
    ? `Winner: ${winner}`
    : moveCount === GRID_SIZE * GRID_SIZE 
    ? "Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="min-h-screen pt-20 animate-fade-in">
      <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4 px-4">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Player1" alt="Player" className="w-8 h-8 rounded-full" />
                <span>Guest10816</span>
              </div>
            </div>
            <div className="bg-gray-300 p-2 rounded-lg">
              Moves: {moveCount}
            </div>
            <div className="bg-yellow-400 p-2 rounded-lg">
              <div className="flex items-center gap-2">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Player2" alt="Player" className="w-8 h-8 rounded-full" />
                <span>Guest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Status */}
        <div className="text-xl font-bold mb-4">{status}</div>

        {/* Grid */}
        <div className="relative bg-white rounded-lg p-4 shadow-lg">
          <div className="grid"
              style={{
                backgroundImage: 'linear-gradient(#0080ff 1px, transparent 1px), linear-gradient(90deg, #0080ff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                width: `${GRID_SIZE * 40}px`,
                height: `${GRID_SIZE * 40}px`
              }}>
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="w-10 h-10 flex items-center justify-center focus:outline-none"
                    onClick={() => handleClick(rowIndex, colIndex)}
                    disabled={!!cell || !!winner}
                  >
                    {cell === 'X' && (
                      <span className="text-2xl font-bold text-black">X</span>
                    )}
                    {cell === 'O' && (
                      <span className="text-2xl font-bold text-red-500">O</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-4">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={resetGame}
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gomoku;
