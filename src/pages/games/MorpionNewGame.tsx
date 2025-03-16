
import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Flag, MessageSquare, ZoomIn, ZoomOut, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Position } from "@/components/games/morpion/types";

interface LastMove {
  x: number;
  y: number;
}

function MorpionNewGame() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [player, setPlayer] = useState<string | null>(null);
  const [board, setBoard] = useState<(string | null)[][]>(Array(50).fill(null).map(() => Array(50).fill(null)));
  const [turn, setTurn] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<LastMove | null>(null);
  const [status, setStatus] = useState<string>('Create or Join a Game');
  const [joinRoomId, setJoinRoomId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewPosition, setViewPosition] = useState({ x: 20, y: 20 }); // Center of the board
  const [zoom, setZoom] = useState<number>(1);
  const [moveCount, setMoveCount] = useState<number>(0);
  const boardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('https://morpion-backend.onrender.com');
    setSocket(newSocket);

    newSocket.on('roomCreated', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setPlayer('X');
      setStatus('Waiting for opponent... Share this Room ID: ' + roomId);
      toast({
        title: "Room created",
        description: `You are playing as X. Share your room ID with a friend to play.`,
      });
    });

    newSocket.on('roomJoined', ({ roomId, player }: { roomId: string, player: string }) => {
      setRoomId(roomId);
      setPlayer(player);
      setStatus(`Game Started! You are ${player}`);
      toast({
        title: "Room joined",
        description: `You are playing as ${player}.`,
      });
    });

    newSocket.on('gameStart', ({ board, turn }: { board: (string | null)[][], turn: string }) => {
      setBoard(board);
      setTurn(turn);
      setWinner(null);
      setLastMove(null);
      setMoveCount(0);
      toast({
        title: "Game started",
        description: "Your opponent has joined. The game has begun!",
      });
    });

    newSocket.on('boardUpdate', ({ board, turn, lastMove }: { board: (string | null)[][], turn: string, lastMove: LastMove }) => {
      setBoard(board);
      setTurn(turn);
      setLastMove(lastMove);
      setMoveCount(prev => prev + 1);
      
      // If there's a last move, center the view on it
      if (lastMove && boardContainerRef.current) {
        setViewPosition({ x: lastMove.x, y: lastMove.y });
      }
    });

    newSocket.on('gameOver', ({ winner, reason }: { winner: string, reason: string }) => {
      setWinner(winner);
      const message = winner === 'draw' ? 'It\'s a Draw!' : `${winner} Wins by ${reason}`;
      setStatus(`Game Over: ${message}`);
      toast({
        title: "Game over",
        description: message,
        variant: winner === 'draw' ? "default" : "destructive",
      });
    });

    newSocket.on('opponentDisconnected', () => {
      setStatus('Opponent Disconnected');
      toast({
        title: "Opponent disconnected",
        description: "Your opponent has left the game.",
        variant: "destructive",
      });
      setRoomId(null);
      setPlayer(null);
      setBoard(Array(50).fill(null).map(() => Array(50).fill(null)));
      setTurn('X');
      setWinner(null);
      setLastMove(null);
      setMoveCount(0);
    });

    newSocket.on('error', (message: string) => {
      setErrorMessage(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setTimeout(() => setErrorMessage(null), 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = () => {
    if (socket) {
      socket.emit('createRoom');
    }
  };

  const joinRoom = () => {
    if (!joinRoomId) {
      toast({
        title: "Error",
        description: "Please enter a Room ID",
        variant: "destructive",
      });
      return;
    }
    if (socket) {
      socket.emit('joinRoom', joinRoomId);
    }
  };

  const makeMove = (x: number, y: number) => {
    if (player === turn && !board[x][y] && !winner && socket) {
      socket.emit('move', { roomId, x, y });
    }
  };

  const resign = () => {
    if (window.confirm('Are you sure you want to resign?') && socket) {
      socket.emit('resign', roomId);
    }
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room ID copied",
        description: "The room ID has been copied to your clipboard.",
      });
    }
  };

  const visibleSize = Math.min(15, 50); // Show a 15x15 grid or less
  const halfSize = Math.floor(visibleSize / 2);
  const startX = Math.max(0, Math.min(viewPosition.x - halfSize, 50 - visibleSize));
  const startY = Math.max(0, Math.min(viewPosition.y - halfSize, 50 - visibleSize));
  const endX = Math.min(startX + visibleSize, 50);
  const endY = Math.min(startY + visibleSize, 50);

  const moveView = (dx: number, dy: number) => {
    setViewPosition(prev => ({
      x: Math.max(0, Math.min(prev.x + dx, 49)),
      y: Math.max(0, Math.min(prev.y + dy, 49))
    }));
  };

  const renderCell = (x: number, y: number) => {
    const isLastMove = lastMove && lastMove.x === x && lastMove.y === y;
    const cellSize = 28 * zoom; // Base size multiplied by zoom
    const isCurrentPlayer = player === turn;
    const isPossibleMove = isCurrentPlayer && !board[x][y] && !winner;
    
    return (
      <div
        key={`cell-${x}-${y}`}
        className={`
          border border-gray-700 flex items-center justify-center
          ${board[x][y] ? (board[x][y] === 'X' ? 'bg-red-900/30' : 'bg-blue-900/30') : 'bg-gray-900/20'}
          ${isLastMove ? 'ring-2 ring-yellow-400' : ''}
          ${isPossibleMove ? 'hover:bg-gray-700/30 cursor-pointer' : 'cursor-default'}
          transition-colors
        `}
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        onClick={() => isPossibleMove && makeMove(x, y)}
      >
        <span className={`text-lg font-bold ${board[x][y] === 'X' ? 'text-red-400' : 'text-blue-400'}`}>
          {board[x][y]}
        </span>
      </div>
    );
  };

  const renderVisibleBoard = () => {
    const visibleRows = [];
    for (let x = startX; x < endX; x++) {
      const row = [];
      for (let y = startY; y < endY; y++) {
        row.push(renderCell(x, y));
      }
      visibleRows.push(
        <div key={`row-${x}`} className="flex">
          {row}
        </div>
      );
    }
    return visibleRows;
  };

  const isMyTurn = player === turn;

  return (
    <div className="container max-w-5xl mx-auto p-4 animate-fade-in">
      <Card className="shadow-lg border-2 border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
        <CardHeader className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
          <CardTitle className="text-center text-2xl font-bold">
            Morpion: Connect 5
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!roomId ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-white">Play Morpion Online</h3>
                <p className="text-gray-400">Create a new game or join an existing one</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button 
                  onClick={createRoom} 
                  className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-colors w-full"
                >
                  Create New Game
                </Button>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Room ID"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-700 text-white"
                  />
                  <Button 
                    onClick={joinRoom}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Join Game
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Room:</span>
                  <span className="bg-gray-800 px-2 py-1 rounded">{roomId}</span>
                  <Button variant="ghost" size="sm" onClick={copyRoomId} className="ml-2 text-gray-300">
                    <Copy size={16} />
                  </Button>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">You are:</span>
                  <Badge className={`${player === 'X' ? 'bg-red-900 text-red-100' : 'bg-blue-900 text-blue-100'} px-2 py-1 rounded-full`}>
                    {player}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-gray-800 p-2 rounded-md text-center">
                <p className={`font-medium ${winner ? 'text-purple-400' : isMyTurn ? 'text-green-400' : 'text-gray-400'}`}>
                  {status}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {!winner && `Current turn: ${turn} ${isMyTurn ? '(your turn)' : ''}`}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-400">
                  Moves: <span className="text-white font-bold">{moveCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                    className="border-gray-700 text-gray-300"
                  >
                    <ZoomOut size={16} />
                  </Button>
                  <span className="text-gray-300">{Math.round(zoom * 100)}%</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                    className="border-gray-700 text-gray-300"
                  >
                    <ZoomIn size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3 flex justify-center">
                  <Button size="sm" variant="outline" onClick={() => moveView(0, -5)} className="border-gray-700 text-gray-300">
                    <ChevronUp />
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => moveView(-5, 0)} className="border-gray-700 text-gray-300">
                    <ChevronLeft />
                  </Button>
                </div>
                <div className="flex justify-center">
                  {lastMove && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => setViewPosition({ x: lastMove.x, y: lastMove.y })}
                      className="bg-yellow-900/40 text-yellow-200 border-yellow-800 hover:bg-yellow-900/60"
                    >
                      Center on last move
                    </Button>
                  )}
                </div>
                <div className="flex justify-start">
                  <Button size="sm" variant="outline" onClick={() => moveView(5, 0)} className="border-gray-700 text-gray-300">
                    <ChevronRight />
                  </Button>
                </div>
                <div className="col-span-3 flex justify-center">
                  <Button size="sm" variant="outline" onClick={() => moveView(0, 5)} className="border-gray-700 text-gray-300">
                    <ChevronDown />
                  </Button>
                </div>
              </div>
              
              <div 
                ref={boardContainerRef}
                className="flex justify-center mt-4 rounded-md border-2 border-gray-700 overflow-hidden"
              >
                <div className="border-2 border-gray-700 rounded-md overflow-hidden">
                  {renderVisibleBoard()}
                </div>
              </div>
              
              {!winner ? (
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={resign} 
                    variant="destructive"
                    className="bg-red-800 hover:bg-red-900 text-white"
                  >
                    <Flag className="mr-2 h-4 w-4" /> Resign
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center mt-4">
                  <Button onClick={() => window.location.reload()} className="bg-blue-700 hover:bg-blue-800">
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-900 p-4 text-center text-sm text-gray-400">
          <div className="flex justify-center w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> 
            Play Morpion online with friends. Create a room and share the Room ID to start playing.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MorpionNewGame;
