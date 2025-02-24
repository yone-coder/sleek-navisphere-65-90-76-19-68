import React, { useState, useEffect, useRef } from 'react';
import { Settings2, Undo2, RotateCcw, Volume2, VolumeX, Clock } from 'lucide-react';

const Gomoku = () => {
  const [boardSize, setBoardSize] = useState(30);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState(null);
  const [player1, setPlayer1] = useState('Guest10816');
  const [player2, setPlayer2] = useState('Guest');
  const [lastMove, setLastMove] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ X: 300, O: 300 }); // 5 minutes per player
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [inactivityTime, setInactivityTime] = useState(15);
  const [winningLine, setWinningLine] = useState(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);

  const boardRef = useRef(null);
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isValidSecondMove = (row, col) => {
    if (moves !== 1) return true;

    const centerRow = Math.floor(boardSize / 2);
    const centerCol = Math.floor(boardSize / 2);

    const rowDiff = Math.abs(row - centerRow);
    const colDiff = Math.abs(col - centerCol);

    return rowDiff <= 3 && colDiff <= 3;
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner || !isTimerRunning) return;

    if (!isValidSecondMove(row, col)) {
      setHoveredCell({ row, col, invalid: true });
      setTimeout(() => setHoveredCell(null), 500);
      return;
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

  const checkWinner = (board, row, col) => {
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

  useEffect(() => {
    const centerGrid = () => {
      if (boardRef.current) {
        const centerPos = Math.floor(boardSize / 2);
        const cellSizeInPixels = 1.5 * 16 * (zoom/100);
        const validAreaSize = 7;
        const offsetCells = Math.floor(validAreaSize / 2);
        
        // Get container dimensions
        const containerWidth = boardRef.current.clientWidth;
        const containerHeight = boardRef.current.clientHeight;
        
        // Calculate the target position at the start of the grid
        const targetCellX = 0; // Start from the left
        const targetCellY = 0; // Start from the top
        
        // Set scroll position
        boardRef.current.scrollLeft = targetCellX;
        boardRef.current.scrollTop = targetCellY;
      }
    };

    // Center immediately
    centerGrid();
    
    // Also center after a short delay to handle any layout shifts
    const timer = setTimeout(centerGrid, 100);
    
    return () => clearTimeout(timer);
  }, [boardSize, zoom]);

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

  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const Avatar = ({ name, size = 'md', hasPhoto = false }) => {
    const initials = getInitials(name);
    const bgColor = getAvatarColor(name);
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg'
    };

    if (hasPhoto) {
      return (
        <img
          src={`/api/placeholder/64/64`}
          alt={`${name}'s avatar`}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white`}
        />
      );
    }

    return (
      <div className={`
        ${sizeClasses[size]} ${bgColor} 
        rounded-full flex items-center justify-center 
        text-white font-semibold ring-2 ring-white
      `}>
        {initials}
      </div>
    );
  };

  const PlayerCard = ({ player, symbol, isTop }) => {
    const hasPhoto = !player.toLowerCase().includes('guest');

    return (
      <div className={`
        flex items-center gap-2 md:gap-3 p-1 md:p-2 rounded-lg
        ${currentPlayer === symbol ? 'bg-blue-100 ring-2 ring-blue-400' : 'bg-white'}
        transition-all duration-300 shadow-md
      `}>
        <div className="relative">
          <Avatar 
            name={player} 
            size={window.innerWidth >= 768 ? 'sm' : 'xs'} 
            hasPhoto={hasPhoto} 
          />
          <div className={`
            absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full 
            flex items-center justify-center
            ${symbol === 'X' ? 'bg-black text-white' : 'bg-red-500 text-white'}
            ring-2 ring-white
          `}>
            <span className="text-[10px] md:text-xs font-bold">{symbol}</span>
          </div>
          <div className="text-[10px] md:text-xs font-medium mt-0.5 text-center">
            {formatTime(timeLeft[symbol])}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs md:text-sm truncate max-w-[60px] md:max-w-[80px]">
              {player}
            </span>
            {symbol === currentPlayer && (
              <div className={`
                text-[10px] px-1 py-0.5 rounded-full font-medium hidden md:flex items-center gap-1
                ${inactivityTime <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}
              `}>
                <Clock size={8} className={inactivityTime <= 5 ? 'animate-pulse' : ''} />
                <span>{inactivityTime}s</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] md:text-xs text-gray-600">
              {isTop ? 'Opponent' : 'You'}
            </span>
            {symbol === currentPlayer && (
              <div className={`
                md:hidden text-[10px] px-1 py-0.5 rounded-full font-medium flex items-center gap-1
                ${inactivityTime <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}
              `}>
                <Clock size={8} className={inactivityTime <= 5 ? 'animate-pulse' : ''} />
                <span>{inactivityTime}s</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getCellContent = (cell) => {
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
    <div className="flex flex-col items-center bg-gray-50 h-screen w-full overflow-hidden pb-8">
      <div className="w-full bg-white shadow-md px-2 md:px-4 py-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <PlayerCard player={player2} symbol="O" isTop={true} />

          <div className="flex items-center gap-1 md:gap-2">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
            >
              {soundEnabled ? <Volume2 size={14} className="md:w-4 md:h-4" /> : <VolumeX size={14} className="md:w-4 md:h-4" />}
            </button>

            <button 
              onClick={undoMove}
              disabled={gameHistory.length === 0}
              className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition duration-300
                ${gameHistory.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'}
              `}
            >
              <Undo2 size={14} className="md:w-4 md:h-4" />
            </button>

            <button 
              onClick={resetGame}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
            >
              <RotateCcw size={14} className="md:w-4 md:h-4" />
            </button>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition duration-300 shadow-md border border-gray-200"
            >
              <Settings2 size={14} className="md:w-4 md:h-4" />
            </button>
          </div>
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
                  onClick={() => handleClick(rowIndex, colIndex)}
                  onMouseEnter={() => !cell && setHoveredCell({ row: rowIndex, col: colIndex })}
                  onMouseLeave={() => setHoveredCell(null)}
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
      </div>

      <div className="w-full bg-white shadow-md px-2 md:px-4 py-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <PlayerCard player={player1} symbol="X" isTop={false} />

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
              <span className="font-medium">Moves:</span> {moves}
            </div>

            <div className="bg-white px-3 py-1 rounded-lg shadow-md border border-gray-200">
              <div className="flex gap-4">
                <div>
                  <span className="text-sm text-gray-500">Win Rate:</span>
                  <span className="ml-2 font-medium">
                    {Math.round((moves > 0 ? (moves - gameHistory.length) / moves : 0) * 100)}%
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Avg Time/Move:</span>
                  <span className="ml-2 font-medium">
                    {moves > 1 ? Math.round((300 - timeLeft[currentPlayer]) / moves) : 0}s
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden text-sm bg-white px-2 py-1 rounded shadow-sm">
            <span className="font-medium">{moves}</span> moves
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-md border border-gray-200 text-xs md:text-sm">
        {hoveredCell && (
          <div>
            <span className="font-medium">Position:</span> ({hoveredCell.row}, {hoveredCell.col})
          </div>
        )}
      </div>

      {winner && showWinnerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-md w-full">
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-2 md:mb-4">
                {winner === 'X' ? '🏆' : '🎉'}
              </div>
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-gray-800">
                {winner === 'X' ? player1 : player2} Wins!
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Game completed in {moves} moves and {formatTime(300 - timeLeft[winner])}
              </p>

              <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6 text-sm md:text-base">
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-gray-500">Total Time</div>
                    <div className="font-medium">{formatTime(300 - timeLeft['X'] + 300 - timeLeft['O'])}</div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-gray-500">Avg Move Time</div>
                    <div className="font-medium">{Math.round((300 - timeLeft[winner]) / moves)}s</div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-gray-500">Winning Streak</div>
                    <div className="font-medium">1</div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs md:text-sm text-gray-500">Best Move</div>
                    <div className="font-medium">
                      ({lastMove?.row}, {lastMove?.col})
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 justify-center">
                <button 
                  onClick={() => {
                    setShowWinnerPopup(false);
                    resetGame();
                  }}
                  className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-blue-600 transition duration-300 shadow-md font-medium text-sm md:text-base"
                >
                  Play Again
                </button>
                <button 
                  onClick={() => {
                    setShowWinnerPopup(false);
                    setIsSettingsOpen(true);
                  }}
                  className="bg-gray-100 text-gray-700 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-gray-200 transition duration-300 shadow-md font-medium text-sm md:text-base"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-md w-full">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Game Settings</h2>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board Zoom
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={zoom}
                    onChange={(e) => setZoom(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium w-10 text-right">{zoom}%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Game Timer
                </label>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`w-full px-3 md:px-4 py-2 rounded-lg font-medium transition duration-300 text-sm md:text-base
                    ${isTimerRunning 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }
                  `}
                >
                  {isTimerRunning ? 'Timer Running' : 'Timer Paused'}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sound Effects
                </label>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-full px-3 md:px-4 py-2 rounded-lg font-medium transition duration-300 text-sm md:text-base
                    ${soundEnabled 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }
                  `}
                >
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </button>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="bg-gray-100 text-gray-700 px-4 md:px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300 shadow-md font-medium text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gomoku;
