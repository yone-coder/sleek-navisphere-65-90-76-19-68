
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import type { GameMode } from '@/components/games/morpion/types';
import { calculateBotMove } from '@/components/games/morpion/utils/botUtils';

interface GameComponentProps {
  boardSize: number;
  zoom: number;
  isSettingsOpen: boolean;
  player1: string;
  player2: string;
  gameMode: GameMode;
  difficulty: string;
  setZoom: (zoom: number) => void;
  setIsSettingsOpen: (open: boolean) => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ 
  boardSize,
  zoom,
  isSettingsOpen,
  player1,
  player2,
  gameMode,
  difficulty,
  setZoom,
  setIsSettingsOpen
}) => {
  const gameState = useGameState({
    boardSize,
    player1,
    player2
  });

  const {
    board,
    currentPlayer,
    lastMove,
    winner,
    handleClick,
    resetGame
  } = gameState;

  // Reset when game mode changes
  useEffect(() => {
    console.log('Game mode changed:', gameMode);
    resetGame();
  }, [gameMode, resetGame]);

  // Bot move effect
  useEffect(() => {
    if (gameMode === 'bot' && currentPlayer === 'O' && !winner) {
      console.log('Bot turn detected', { currentPlayer, gameMode });
      const timer = setTimeout(() => {
        console.log('Bot is thinking...');
        const botMove = calculateBotMove(board, lastMove, boardSize, difficulty);
        console.log('Bot decided move:', botMove);
        if (botMove) {
          handleClick(botMove.row, botMove.col);
        }
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, lastMove, winner, gameMode, difficulty, boardSize, handleClick]);

  return (
    <GameLayout
      player1={player1}
      player2={player2}
      boardSize={boardSize}
      zoom={zoom}
      isSettingsOpen={isSettingsOpen}
      setZoom={setZoom}
      setIsSettingsOpen={setIsSettingsOpen}
      resetGame={resetGame}
      {...gameState}
    />
  );
};

const Morpion = () => {
  const [searchParams] = useSearchParams();
  const [boardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2, setPlayer2] = useState('Guest');
  const [gameMode, setGameMode] = useState<GameMode>('local');
  const [difficulty, setDifficulty] = useState('medium');

  // Handle mode changes from URL
  useEffect(() => {
    const mode = searchParams.get('mode') as GameMode;
    const start = searchParams.get('start');
    
    console.log('URL params:', { mode, start });
    
    if (mode && start === 'true') {
      console.log('Setting game mode from URL:', mode);
      setGameMode(mode);
      if (mode === 'bot') {
        setPlayer2('Bot');
      }
    }
  }, [searchParams]);

  return (
    <GameComponent
      boardSize={boardSize}
      zoom={zoom}
      isSettingsOpen={isSettingsOpen}
      player1={player1}
      player2={player2}
      gameMode={gameMode}
      difficulty={difficulty}
      setZoom={setZoom}
      setIsSettingsOpen={setIsSettingsOpen}
    />
  );
};

export default Morpion;
