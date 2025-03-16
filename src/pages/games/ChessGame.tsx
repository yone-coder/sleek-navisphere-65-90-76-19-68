
import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Button } from "@/components/ui/button";
import io from 'socket.io-client';

// Replace with your Render backend URL or use localhost for development
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const socket = io(BACKEND_URL);

const ChessGame = () => {
  const [roomId, setRoomId] = useState<string | null>(null);           // Current room ID
  const [color, setColor] = useState<'white' | 'black' | null>(null);  // Player's color (white/black)
  const [fen, setFen] = useState('start');                             // Chessboard position (FEN)
  const [gameStatus, setGameStatus] = useState<string | null>(null);   // null, 'waitingForOpponent', 'playing', 'gameOver', 'opponentDisconnected'
  const [turn, setTurn] = useState('white');                           // Current turn
  const [result, setResult] = useState<string | null>(null);           // Game result: null, 'white wins', 'black wins', 'draw'
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null); // Last move for highlighting
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error messages
  const [joinId, setJoinId] = useState('');                            // Input for joining a room

  // Set up Socket.io listeners
  useEffect(() => {
    socket.on('roomCreated', ({ roomId, color }: { roomId: string, color: 'white' | 'black' }) => {
      setRoomId(roomId);
      setColor(color);
      setGameStatus('waitingForOpponent');
    });

    socket.on('roomJoined', ({ roomId, color }: { roomId: string, color: 'white' | 'black' }) => {
      setRoomId(roomId);
      setColor(color);
      // Wait for gameStart to set 'playing'
    });

    socket.on('gameStart', ({ fen }: { fen: string }) => {
      setFen(fen);
      setTurn(fen.split(' ')[1] === 'w' ? 'white' : 'black');
      setGameStatus('playing');
    });

    socket.on('boardUpdate', ({ fen, lastMove }: { fen: string, lastMove: { from: string; to: string } }) => {
      setFen(fen);
      setTurn(fen.split(' ')[1] === 'w' ? 'white' : 'black');
      setLastMove(lastMove);
    });

    socket.on('gameOver', ({ winner, result, reason }: { winner: string, result: string, reason?: string }) => {
      if (result === 'draw') {
        setResult('draw');
      } else {
        setResult(`${winner} wins${reason ? ` by ${reason}` : ''}`);
      }
      setGameStatus('gameOver');
    });

    socket.on('opponentDisconnected', () => {
      setGameStatus('opponentDisconnected');
    });

    socket.on('error', (message: string) => {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(null), 3000);
    });

    socket.on('invalidMove', () => {
      setErrorMessage('Invalid move');
      setTimeout(() => setErrorMessage(null), 3000);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('gameStart');
      socket.off('boardUpdate');
      socket.off('gameOver');
      socket.off('opponentDisconnected');
      socket.off('error');
      socket.off('invalidMove');
    };
  }, []);

  // Create a new game room
  const createRoom = () => {
    socket.emit('createRoom');
  };

  // Join an existing game room
  const joinRoom = () => {
    if (!joinId) {
      setErrorMessage('Please enter a Room ID');
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    socket.emit('joinRoom', joinId);
  };

  // Handle piece movement
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (gameStatus !== 'playing') return false;
    const move = { from: sourceSquare, to: targetSquare };
    socket.emit('move', { roomId, move });
    return true; // Optimistic update; server will validate
  };

  // Resign from the game
  const resign = () => {
    if (window.confirm('Are you sure you want to resign?')) {
      socket.emit('resign', roomId);
    }
  };

  // Determine if it's the player's turn
  const isMyTurn = color && turn === color;

  // Highlight the last move
  const squareStyles = lastMove
    ? {
        [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      }
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Chess Game</h1>
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {errorMessage}
            </div>
          )}
          
          {!roomId ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Join or Create a Game</h2>
              
              <Button onClick={createRoom} className="w-full mb-4">
                Create New Game
              </Button>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={joinRoom}>
                  Join Game
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4 bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                  <p>
                    <strong>Room ID:</strong> {roomId}
                  </p>
                  <p>
                    <strong>You are:</strong> {color}
                  </p>
                </div>
                
                {gameStatus === 'waitingForOpponent' && (
                  <div className="mt-2 text-amber-600 bg-amber-50 p-2 rounded-md">
                    <p className="text-center">Waiting for opponent to join...</p>
                  </div>
                )}
                
                {gameStatus === 'playing' && (
                  <p className="mt-2 text-center font-medium">
                    It's {turn}'s turn {isMyTurn ? '(your turn)' : ''}
                  </p>
                )}
                
                {gameStatus === 'gameOver' && (
                  <p className="mt-2 text-center font-medium text-blue-600">
                    Game over: {result}
                  </p>
                )}
                
                {gameStatus === 'opponentDisconnected' && (
                  <p className="mt-2 text-center text-red-600">
                    Opponent disconnected. Game over.
                  </p>
                )}
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <Chessboard
                  position={fen}
                  onPieceDrop={onDrop}
                  boardOrientation={color || 'white'}
                  arePiecesDraggable={Boolean(isMyTurn)}
                  customSquareStyles={squareStyles}
                  customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              
              {gameStatus === 'playing' && (
                <div className="text-center">
                  <Button 
                    variant="destructive" 
                    onClick={resign} 
                    className="mt-2"
                  >
                    Resign
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessGame;
