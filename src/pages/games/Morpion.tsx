
import React, { useState, useEffect } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import GameMenu from '@/components/games/morpion/GameMenu';
import { GameMode } from '@/components/games/morpion/types';
import { calculateBotMove } from '@/components/games/morpion/utils/botUtils';

const GameComponent = ({ 
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
    handleClick
  } = gameState;

  // Bot move effect
  useEffect(() => {
    if (gameMode === 'bot' && currentPlayer === 'O' && !winner) {
      const timer = setTimeout(() => {
        const botMove = calculateBotMove(board, lastMove, boardSize, difficulty);
        if (botMove) {
          handleClick(botMove.row, botMove.col);
        }
      }, 750); // Add a small delay to make it feel more natural

      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, lastMove, winner, gameMode, difficulty]);

  return (
    <GameLayout
      player1={player1}
      player2={player2}
      boardSize={boardSize}
      zoom={zoom}
      isSettingsOpen={isSettingsOpen}
      setZoom={setZoom}
      setIsSettingsOpen={setIsSettingsOpen}
      {...gameState}
    />
  );
};

const Morpion = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2, setPlayer2] = useState('Guest');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficulty] = useState('medium');

  // Get query parameters to check if we should start game directly
  const queryParams = new URLSearchParams(window.location.search);
  const directStart = queryParams.get('start');
  const mode = queryParams.get('mode') as GameMode;

  // Effect to handle direct game start
  useEffect(() => {
    if (directStart && mode) {
      handleSelectMode(mode);
    }
  }, [directStart, mode]);

  const handleSelectMode = (mode: GameMode, roomId?: string, options?: { difficulty?: string }) => {
    setGameMode(mode);
    setGameStarted(true);
    
    if (mode === 'bot') {
      setPlayer2('Bot');
      setDifficulty(options?.difficulty || 'medium');
    }
    
    console.log(`Starting game in ${mode} mode${roomId ? ` with room ${roomId}` : ''}`);
  };

  // Show menu if game hasn't started and we're not doing a direct start
  if (!gameStarted && !directStart) {
    return <GameMenu onSelectMode={handleSelectMode} />;
  }

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
