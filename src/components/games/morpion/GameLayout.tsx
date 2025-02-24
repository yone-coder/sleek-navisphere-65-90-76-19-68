
import React, { useRef } from 'react';
import PlayerCard from './PlayerCard';
import GameBoard from './GameBoard';
import GameControls from './GameControls';
import GameSettings from './GameSettings';
import WinnerPopup from './WinnerPopup';
import { Position, WinningLine, TimeLeft, GameHistory } from './types';

interface GameLayoutProps {
  player1: string;
  player2: string;
  board: string[][];
  boardSize: number;
  zoom: number;
  currentPlayer: 'X' | 'O';
  timeLeft: TimeLeft;
  inactivityTime: number;
  lastMove: Position | null;
  winningLine: WinningLine | null;
  hoveredCell: Position | null;
  moves: number;
  winner: string | null;
  gameHistory: GameHistory[];
  soundEnabled: boolean;
  isSettingsOpen: boolean;
  showWinnerPopup: boolean;
  isTimerRunning: boolean;
  isValidSecondMove: (row: number, col: number) => boolean;
  handleClick: (row: number, col: number) => void;
  setHoveredCell: (cell: Position | null) => void;
  setSoundEnabled: (enabled: boolean) => void;
  undoMove: () => void;
  resetGame: () => void;
  setIsSettingsOpen: (open: boolean) => void;
  setShowWinnerPopup: (show: boolean) => void;
  setZoom: (zoom: number) => void;
  setIsTimerRunning: (running: boolean) => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  player1,
  player2,
  board,
  boardSize,
  zoom,
  currentPlayer,
  timeLeft,
  inactivityTime,
  lastMove,
  winningLine,
  hoveredCell,
  moves,
  winner,
  gameHistory,
  soundEnabled,
  isSettingsOpen,
  showWinnerPopup,
  isTimerRunning,
  isValidSecondMove,
  handleClick,
  setHoveredCell,
  setSoundEnabled,
  undoMove,
  resetGame,
  setIsSettingsOpen,
  setShowWinnerPopup,
  setZoom,
  setIsTimerRunning
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center bg-gray-50 h-screen w-full overflow-hidden pb-8">
      <div className="w-full bg-white shadow-md px-2 md:px-4 py-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <PlayerCard 
            player={player2} 
            symbol="O" 
            isTop={true}
            currentPlayer={currentPlayer}
            timeLeft={timeLeft}
            inactivityTime={inactivityTime}
          />
          <PlayerCard 
            player={player1} 
            symbol="X" 
            isTop={false}
            currentPlayer={currentPlayer}
            timeLeft={timeLeft}
            inactivityTime={inactivityTime}
          />
        </div>
      </div>

      <div 
        ref={boardRef}
        className="flex-grow w-full overflow-auto bg-amber-50 border-t border-b border-amber-200"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D6B88E transparent',
          height: 'calc(100vh - 7rem)'
        }}
      >
        <div className="py-2 md:py-4 h-full flex justify-center items-center min-h-[400px]">
          <GameBoard
            board={board}
            boardSize={boardSize}
            zoom={zoom}
            lastMove={lastMove}
            winningLine={winningLine}
            hoveredCell={hoveredCell}
            moves={moves}
            winner={winner}
            isValidSecondMove={isValidSecondMove}
            handleClick={handleClick}
            setHoveredCell={setHoveredCell}
          />
        </div>
      </div>

      <GameControls
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        undoMove={undoMove}
        resetGame={resetGame}
        setIsSettingsOpen={setIsSettingsOpen}
        gameHistory={gameHistory}
        moves={moves}
        timeLeft={timeLeft}
        currentPlayer={currentPlayer}
      />

      <GameSettings
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        zoom={zoom}
        setZoom={setZoom}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <WinnerPopup
        showWinnerPopup={showWinnerPopup}
        winner={winner || ''}
        player1={player1}
        player2={player2}
        moves={moves}
        timeLeft={timeLeft}
        lastMove={lastMove}
        resetGame={resetGame}
        setShowWinnerPopup={setShowWinnerPopup}
        setIsSettingsOpen={setIsSettingsOpen}
      />
    </div>
  );
};

export default GameLayout;
