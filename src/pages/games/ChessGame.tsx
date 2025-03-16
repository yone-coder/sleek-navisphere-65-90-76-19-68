import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import io from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Flag, MessageSquare } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Backend URL set to your Render deployment
const BACKEND_URL = 'https://chess-backend-jlvx.onrender.com';
const socket = io(BACKEND_URL);

function ChessGame() {
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
      toast({
        title: "Room created",
        description: `You are playing as ${color}. Share your room ID with a friend to play.`,
      });
    });

    socket.on('roomJoined', ({ roomId, color }: { roomId: string, color: 'white' | 'black' }) => {
      setRoomId(roomId);
      setColor(color);
      // Wait for gameStart to set 'playing'
      toast({
        title: "Room joined",
        description: `You are playing as ${color}.`,
      });
    });

    socket.on('gameStart', ({ fen }: { fen: string }) => {
      setFen(fen);
      setTurn(fen.split(' ')[1] === 'w' ? 'white' : 'black');
      setGameStatus('playing');
      toast({
        title: "Game started",
        description: "Your opponent has joined. The game has begun!",
      });
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
      toast({
        title: "Game over",
        description: result === 'draw' ? "The game ended in a draw" : `${winner} wins${reason ? ` by ${reason}` : ''}`,
      });
    });

    socket.on('opponentDisconnected', () => {
      setGameStatus('opponentDisconnected');
      toast({
        title: "Opponent disconnected",
        description: "Your opponent has left the game.",
        variant: "destructive",
      });
    });

    socket.on('error', (message: string) => {
      setErrorMessage(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setTimeout(() => setErrorMessage(null), 3000);
    });

    socket.on('invalidMove', () => {
      setErrorMessage('Invalid move');
      toast({
        title: "Invalid move",
        description: "That move is not allowed.",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Please enter a Room ID",
        variant: "destructive",
      });
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

  // Copy room ID to clipboard
  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room ID copied",
        description: "The room ID has been copied to your clipboard.",
      });
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

  // Get status message
  const getStatusMessage = () => {
    if (gameStatus === 'waitingForOpponent') return "Waiting for opponent to join...";
    if (gameStatus === 'playing') return `It's ${turn}'s turn${isMyTurn ? ' (your turn)' : ''}`;
    if (gameStatus === 'gameOver') return `Game over: ${result}`;
    if (gameStatus === 'opponentDisconnected') return "Opponent disconnected. Game over.";
    return "Welcome to Chess";
  };

  // Get color badge
  const getColorBadge = () => {
    if (!color) return null;
    return (
      <Badge className={`${color === 'white' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-200'} px-2 py-1 rounded-full mr-2`}>
        {color}
      </Badge>
    );
  };

  return (
    <div className="container max-w-3xl mx-auto p-4 animate-fade-in">
      <Card className="shadow-lg border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Chess Game
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!roomId ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Play Chess Online</h3>
                <p className="text-gray-600">Create a new game or join an existing one</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={createRoom} 
                  className="bg-indigo-600 hover:bg-indigo-700 transition-colors w-full"
                >
                  Create New Game
                </Button>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Room ID"
                    value={joinId}
                    onChange={(e) => setJoinId(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={joinRoom}
                    className="bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Join Game
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Room:</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{roomId}</span>
                  <Button variant="ghost" size="sm" onClick={copyRoomId} className="ml-2">
                    <Copy size={16} />
                  </Button>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">You are:</span>
                  {getColorBadge()}
                </div>
              </div>
              
              <div className="bg-gray-100 p-2 rounded-md text-center">
                <p className={`font-medium ${gameStatus === 'gameOver' ? 'text-red-600' : isMyTurn ? 'text-green-600' : 'text-gray-700'}`}>
                  {getStatusMessage()}
                </p>
              </div>
              
              {(gameStatus === 'playing' || gameStatus === 'gameOver') && (
                <div className="mx-auto" style={{ maxWidth: '500px' }}>
                  <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                    boardOrientation={color as 'white' | 'black'}
                    arePiecesDraggable={Boolean(isMyTurn)}
                    customSquareStyles={squareStyles}
                  />
                </div>
              )}
              
              {gameStatus === 'playing' && (
                <div className="flex justify-center space-x-4 mt-4">
                  <Button variant="destructive" onClick={resign}>
                    <Flag className="mr-2 h-4 w-4" /> Resign
                  </Button>
                </div>
              )}
              
              {(gameStatus === 'gameOver' || gameStatus === 'opponentDisconnected') && (
                <div className="flex justify-center mt-4">
                  <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 text-center text-sm text-gray-600">
          <div className="flex justify-center w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> 
            Play chess online with friends. Create a room and share the Room ID to start playing.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChessGame;
