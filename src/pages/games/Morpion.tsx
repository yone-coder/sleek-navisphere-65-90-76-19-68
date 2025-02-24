import React, { useState, useEffect, useRef } from 'react';
import { Clock, Volume2, VolumeX, Undo2, RotateCcw, Settings2 } from 'lucide-react';
import PlayerCard from '@/components/games/morpion/PlayerCard';
import GameBoard from '@/components/games/morpion/GameBoard';
import GameControls from '@/components/games/morpion/GameControls';
import GameSettings from '@/components/games/morpion/GameSettings';
import WinnerPopup from '@/components/games/morpion/WinnerPopup';
import { Position, WinningLine, TimeLeft, GameHistory } from '@/components/games/morpion/types';
import { formatTime, getInitials, getAvatarColor } from '@/components/games/morpion/utils';

const Gomoku = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [player1, setPlayer1] = useState('Guest10816');
  const [player2, setPlayer2] = useState('Guest');
  const [lastMove, setLastMove] = useState<Position | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ X: 300, O: 300 }); // 5 minutes per player
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [inactivityTime, setInactivityTime] = useState(15);
  const [winningLine, setWinningLine] = useState<WinningLine | null>(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
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

      return () => {
        clearInterval(inactivityTimer);
      };
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
        // Sort positions to ensure consistent line drawing from start to end
        positions.sort((a, b) => {
          if (dx === 0) return a[1] - b[1]; // horizontal
          if (dy === 0) return a[0] - b[0]; // vertical
          return a[0] - b[0]; // diagonal
        });
        
        // Calculate angle based on direction
        let angle;
        if (dx === 0) angle = 0; // horizontal
        else if (dy === 0) angle = Math.PI / 2; // vertical
        else if (dx === 1 && dy === 1) angle = Math.PI / 4; // diagonal down-right
        else angle = -Math.PI / 4; // diagonal down-left

        // Calculate line width based on actual distance between first and last position
        const startPos = positions[0];
        const endPos = positions[positions.length - 1];
        const width = Math.sqrt(
          Math.pow((endPos[0] - startPos[0]) * 1.5 * (zoom/100), 2) + 
          Math.pow((endPos[1] - startPos[1]) * 1.5 * (zoom/100), 2)
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

export default Gomoku;
