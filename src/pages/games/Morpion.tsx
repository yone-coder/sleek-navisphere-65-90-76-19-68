
import React, { useState, useEffect } from 'react';
import { useGameState } from '@/components/games/morpion/hooks/useGameState';
import GameLayout from '@/components/games/morpion/GameLayout';
import { GameMode } from '@/components/games/morpion/types';
import { calculateBotMove } from '@/components/games/morpion/utils/botUtils';
import { useLocation } from 'react-router-dom';

const Morpion = () => {
  const [boardSize] = useState(30);
  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [player1] = useState('Guest10816');
  const [player2, setPlayer2] = useState('Guest');
  const [gameMode, setGameMode] = useState<GameMode>('local');
  const [difficulty] = useState('medium');
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode') as GameMode;

  useEffect(() => {
    if (mode) {
      setGameMode(mode);
      if (mode === 'bot') {
        setPlayer2('Bot');
      }
    }
  }, [mode]);

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
    console.log('Bot effect running:', { gameMode, currentPlayer, winner });
    
    if (gameMode === 'bot' && currentPlayer === 'O' && !winner) {
      console.log('Bot is thinking...');
      
      const timer = setTimeout(() => {
        const botMove = calculateBotMove(board, lastMove, boardSize, difficulty);
        console.log('Bot move calculated:', botMove);
        
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
      board={board}
      boardSize={boardSize}
      zoom={zoom}
      currentPlayer={currentPlayer}
      timeLeft={{ X: 300, O: 300 }}
      inactivityTime={15}
      lastMove={lastMove}
      winningLine={null}
      hoveredCell={null}
      moves={0}
      winner={winner}
      gameHistory={[]}
      soundEnabled={true}
      isSettingsOpen={isSettingsOpen}
      showWinnerPopup={false}
      isTimerRunning={true}
      isValidSecondMove={() => true}
      handleClick={handleClick}
      setHoveredCell={() => {}}
      setSoundEnabled={() => {}}
      undoMove={() => {}}
      resetGame={() => {}}
      setIsSettingsOpen={setIsSettingsOpen}
      setShowWinnerPopup={() => {}}
      setZoom={setZoom}
      setIsTimerRunning={() => {}}
    />
  );
};

export default Morpion;
