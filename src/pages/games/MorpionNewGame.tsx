
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, MinusIcon, PlusIcon, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

function MorpionNewGame() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [player, setPlayer] = useState<string | null>(null);
  const [board, setBoard] = useState<(string | null)[][]>(Array(50).fill(null).map(() => Array(50).fill(null)));
  const [turn, setTurn] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Create or join a game');
  const [joinRoomId, setJoinRoomId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1); // Zoom control
  const [copied, setCopied] = useState<boolean>(false); // Copy feedback
  const [viewPosition, setViewPosition] = useState({ x: 20, y: 20 }); // Center of the board

  useEffect(() => {
    const newSocket = io('https://morpion-backend.onrender.com'); // Replace with your Render URL
    setSocket(newSocket);

    newSocket.on('roomCreated', ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setPlayer('X');
      setStatus('Waiting for opponent...');
      toast({
        title: "Room created",
        description: `You are playing as X. Share your room ID with a friend to play.`,
      });
    });

    newSocket.on('roomJoined', ({ roomId, player }: { roomId: string, player: string }) => {
      setRoomId(roomId);
      setPlayer(player);
      setStatus(`Game started. Your turn: ${turn === player ? 'Yes' : 'No'}`);
      toast({
        title: "Room joined",
        description: `You are playing as ${player}.`,
      });
    });

    newSocket.on('gameStart', ({ board, turn }: { board: (string | null)[][], turn: string }) => {
      setBoard(board);
      setTurn(turn);
      setWinner(null);
      setMoveCount(0);
      toast({
        title: "Game started",
        description: "Your opponent has joined. The game has begun!",
      });
    });

    newSocket.on('boardUpdate', ({ board, turn }: { board: (string | null)[][], turn: string }) => {
      setBoard(board);
      setTurn(turn);
      setMoveCount(prev => prev + 1);
      setStatus(`Game in progress. Your turn: ${turn === player ? 'Yes' : 'No'}`);
    });

    newSocket.on('gameOver', ({ winner }: { winner: string }) => {
      setWinner(winner);
      setStatus(winner === 'draw' ? 'Game over. Draw.' : `Game over. ${winner} wins!`);
      toast({
        title: "Game over",
        description: winner === 'draw' ? "The game ended in a draw" : `${winner} wins!`,
      });
    });

    newSocket.on('opponentDisconnected', () => {
      setStatus('Opponent disconnected. Game over.');
      toast({
        title: "Opponent disconnected",
        description: "Your opponent has left the game.",
        variant: "destructive",
      });
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
  }, [turn, player]); // Re-run effect when turn or player changes

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

  const resetGame = () => {
    if (roomId && socket && window.confirm('Reset the game? This will clear the board.')) {
      const newBoard = Array(50).fill(null).map(() => Array(50).fill(null));
      setBoard(newBoard);
      setTurn('X');
      setWinner(null);
      setMoveCount(0);
      setStatus(`Game reset. Your turn: ${player === 'X' ? 'Yes' : 'No'}`);
      socket.emit('boardUpdate', { roomId, board: newBoard, turn: 'X' });
      toast({
        title: "Game reset",
        description: "The board has been cleared. X starts.",
      });
    }
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      toast({
        title: "Room ID copied",
        description: "The room ID has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const adjustZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.5), 2));
  };

  // Determine the visible area of the board
  const visibleSize = Math.min(15, 50); // Show a 15x15 grid or less
  const halfSize = Math.floor(visibleSize / 2);
  const startX = Math.max(0, Math.min(viewPosition.x - halfSize, 50 - visibleSize));
  const startY = Math.max(0, Math.min(viewPosition.y - halfSize, 50 - visibleSize));
  const endX = Math.min(startX + visibleSize, 50);
  const endY = Math.min(startY + visibleSize, 50);

  // Navigation functions
  const moveView = (dx: number, dy: number) => {
    setViewPosition(prev => ({
      x: Math.max(0, Math.min(prev.x + dx, 49)),
      y: Math.max(0, Math.min(prev.y + dy, 49))
    }));
  };

  const renderCell = (x: number, y: number) => {
    const cellSize = 28 * zoomLevel; // Base size multiplied by zoom
    const isCurrentPlayer = player === turn;
    const isPossibleMove = isCurrentPlayer && !board[x][y] && !winner;
    
    return (
      <div
        key={`cell-${x}-${y}`}
        className={`
          border border-gray-300 flex items-center justify-center
          ${board[x][y] ? (board[x][y] === 'X' ? 'bg-pink-100' : 'bg-blue-100') : 'bg-white'}
          ${isPossibleMove ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-default'}
          transition-colors
        `}
        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        onClick={() => isPossibleMove && makeMove(x, y)}
      >
        <span className={`text-lg font-bold ${board[x][y] === 'X' ? 'text-pink-600' : 'text-blue-600'}`}>
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
    <div className="container max-w-5xl mx-auto p-4 animate-fade-in bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
      <Card className="shadow-lg border-2 border-slate-700 bg-slate-900 text-white">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-700">
          <CardTitle className="text-center text-2xl font-bold text-cyan-400">
            Morpion: Connect 5
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!roomId ? (
            <div className="space-y-8 flex flex-col items-center">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-cyan-300">Play Morpion Online</h3>
                <p className="text-gray-400">Create a new game or join an existing one</p>
              </div>
              
              <div className="flex flex-col space-y-4 w-full max-w-md">
                <Button 
                  onClick={createRoom} 
                  className="bg-cyan-600 hover:bg-cyan-700 transition-colors w-full"
                >
                  Create New Game
                </Button>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter Room ID"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-700 text-white"
                  />
                  <Button 
                    onClick={joinRoom}
                    className="bg-pink-600 hover:bg-pink-700 transition-colors"
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
                  <span className="font-semibold mr-2 text-gray-300">Room:</span>
                  <span className="bg-slate-800 px-2 py-1 rounded text-cyan-300">{roomId}</span>
                  <Button variant="ghost" size="sm" onClick={copyRoomId} className="ml-2 text-gray-300 hover:text-white">
                    {copied ? 'Copied!' : <Copy size={16} />}
                  </Button>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold mr-2 text-gray-300">You are:</span>
                  <Badge className={`${player === 'X' ? 'bg-pink-900 text-pink-200' : 'bg-blue-900 text-blue-200'} px-2 py-1 rounded-full`}>
                    {player}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-slate-800 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <p className={`font-medium ${winner ? 'text-purple-400' : isMyTurn ? 'text-green-400' : 'text-gray-300'}`}>
                    {status}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Moves:</span>
                    <Badge variant="outline" className="text-cyan-300 border-cyan-800">
                      {moveCount}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-slate-800 p-3 rounded-md">
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-gray-300 border-slate-700 hover:bg-slate-700"
                    onClick={() => adjustZoom(-0.1)}
                  >
                    <MinusIcon size={16} />
                  </Button>
                  <span className="text-cyan-300">Zoom: {Math.round(zoomLevel * 100)}%</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-gray-300 border-slate-700 hover:bg-slate-700"
                    onClick={() => adjustZoom(0.1)}
                  >
                    <PlusIcon size={16} />
                  </Button>
                </div>
                
                <Button
                  variant="destructive" 
                  size="sm"
                  onClick={resetGame}
                  className="bg-pink-700 hover:bg-pink-800"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset Game
                </Button>
              </div>
              
              <div className="flex justify-center space-x-4 mb-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-300 border-slate-700 hover:bg-slate-700"
                  onClick={() => moveView(0, -5)}
                >
                  Move Up
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-300 border-slate-700 hover:bg-slate-700"
                  onClick={() => moveView(-5, 0)}
                >
                  Move Left
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-300 border-slate-700 hover:bg-slate-700"
                  onClick={() => moveView(5, 0)}
                >
                  Move Right
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-300 border-slate-700 hover:bg-slate-700"
                  onClick={() => moveView(0, 5)}
                >
                  Move Down
                </Button>
              </div>
              
              <div className="flex justify-center mt-6">
                <div 
                  className="border-2 border-slate-700 rounded-md overflow-hidden bg-white shadow-lg transform transition-transform"
                  style={{ transformOrigin: 'center', transform: `scale(${zoomLevel})` }}
                >
                  {renderVisibleBoard()}
                </div>
              </div>
              
              {winner && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={resetGame}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-slate-800 p-4 text-center text-sm text-gray-400 border-t border-slate-700">
          <div className="flex items-center justify-center w-full">
            <AlertTriangle className="mr-2 h-4 w-4 text-cyan-400" /> 
            Play Morpion online with friends. Create a room and share the Room ID to start playing.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MorpionNewGame;
