
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GameMode, Room } from './types';
import { cn } from '@/lib/utils';
import { Bot, Globe, Trophy, Users } from 'lucide-react';

interface GameMenuProps {
  onSelectMode: (mode: GameMode, roomId?: string) => void;
}

export const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [availableRooms] = useState<Room[]>([
    { id: '1', name: 'Game Room 1', players: ['Player1'], createdAt: new Date().toISOString() },
    { id: '2', name: 'Game Room 2', players: ['Player2'], createdAt: new Date().toISOString() }
  ]);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      onSelectMode('online', roomName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-amber-50 to-amber-100 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Morpion</h1>
        <p className="text-gray-600">Choose your game mode</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Local Play
            </CardTitle>
            <CardDescription>Play against a friend on the same device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input 
                  placeholder="Enter your name" 
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
              <Button
                onClick={() => onSelectMode('local')}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Start Local Game
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              VS Bot
            </CardTitle>
            <CardDescription>Challenge our AI in different difficulty levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => onSelectMode('bot')}
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Play VS Bot
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Online Play
            </CardTitle>
            <CardDescription>Play against other players online</CardDescription>
          </CardHeader>
          <CardContent>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  Play Online
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Online Game</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button
                    onClick={() => setShowCreateRoom(true)}
                    className="w-full"
                    variant="outline"
                  >
                    Create Room
                  </Button>
                  {showCreateRoom && (
                    <div className="space-y-4 mt-4">
                      <Input
                        placeholder="Room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                      />
                      <Button onClick={handleCreateRoom} className="w-full">
                        Create
                      </Button>
                    </div>
                  )}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-4">Available Rooms</h3>
                    <div className="space-y-2">
                      {availableRooms.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => onSelectMode('online', room.id)}
                          className={cn(
                            "w-full p-3 text-left rounded-lg border",
                            "hover:bg-gray-50 transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500"
                          )}
                        >
                          <div className="font-medium">{room.name}</div>
                          <div className="text-sm text-gray-500">
                            Players: {room.players.length}/2
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Tournament
            </CardTitle>
            <CardDescription>Join or create a tournament</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onSelectMode('local')}
              size="lg"
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
