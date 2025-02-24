
import React from 'react';

interface WinningLine {
  positions: number[][];
  color: string;
  angle: number;
  width: string;
}

interface GameBoardProps {
  board: (string | null)[][];
  boardSize: number;
  zoom: number;
  lastMove: { row: number; col: number } | null;
  winningLine: WinningLine | null;
  hoveredCell: { row: number; col: number; invalid?: boolean } | null;
  moves: number;
  winner: string | null;
  onCellClick: (row: number, col: number) => void;
  isValidSecondMove: (row: number, col: number) => boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  boardSize,
  zoom,
  lastMove,
  winningLine,
  hoveredCell,
  moves,
  winner,
  onCellClick,
  isValidSecondMove
}) => {
  const getCellContent = (cell: string | null) => {
    if (cell?.includes('_WIN')) {
      return (
        <span className={`
          text-base md:text-xl font-bold
          ${cell.startsWith('X') ? 'text-blue-600' : 'text-red-600'}
          animate-pulse
        `}>
          {cell.split('_')[0]}
        </span>
      );
    }
    return (
      <span className={`
        text-sm md:text-base font-bold transition-all duration-300 transform scale-100
        ${cell === 'X' ? 'text-black' : 'text-red-500'}
      `}>
        {cell}
      </span>
    );
  };

  return (
    <div className="grid relative">
      <div 
        className="grid relative"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, ${1.5 * (zoom/100)}rem)`,
          gridTemplateRows: `repeat(${boardSize}, ${1.5 * (zoom/100)}rem)`,
          backgroundImage: 'linear-gradient(to right, #D6B88E 1px, transparent 1px), linear-gradient(to bottom, #D6B88E 1px, transparent 1px)',
          backgroundSize: `${1.5 * (zoom/100)}rem ${1.5 * (zoom/100)}rem`,
          width: `${boardSize * 1.5 * (zoom/100)}rem`,
          height: `${boardSize * 1.5 * (zoom/100)}rem`
        }}
      >
        {winningLine && (
          <div
            className="absolute z-20 bg-current transition-all duration-500 ease-out animate-scale-in"
            style={{
              height: '4px',
              width: winningLine.width,
              left: `${(winningLine.positions[0][1] + 0.5) * 1.5 * (zoom/100)}rem`,
              top: `${(winningLine.positions[0][0] + 0.5) * 1.5 * (zoom/100)}rem`,
              transform: `rotate(${winningLine.angle}rad)`,
              transformOrigin: 'left center',
              backgroundColor: winningLine.color,
              opacity: 0.6,
              boxShadow: `0 0 10px ${winningLine.color}`
            }}
          />
        )}

        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                flex items-center justify-center cursor-pointer relative z-10
                ${lastMove && lastMove.row === rowIndex && lastMove.col === colIndex ? 'bg-blue-100 bg-opacity-50' : ''}
                ${!cell && !winner ? 'hover:bg-blue-50' : ''}
                ${hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex ? 
                  hoveredCell?.invalid ? 'bg-red-100' : 'bg-blue-50' : ''}
                ${moves === 1 && isValidSecondMove(rowIndex, colIndex) && !cell ? 'ring-2 ring-blue-300 ring-inset' : ''}
              `}
              style={{
                width: `${1.5 * (zoom/100)}rem`,
                height: `${1.5 * (zoom/100)}rem`
              }}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}

        {moves === 1 && hoveredCell && !isValidSecondMove(hoveredCell.row, hoveredCell.col) && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="text-red-500 text-sm bg-white bg-opacity-80 px-2 py-1 rounded shadow">
              Place move closer to center
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
