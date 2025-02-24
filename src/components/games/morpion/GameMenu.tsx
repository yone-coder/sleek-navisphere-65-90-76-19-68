
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { GameMode, Room } from './types';
import { cn } from '@/lib/utils';

interface GameMenuProps {
  onSelectMode: (mode: GameMode, roomId?: string) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onSelectMode }) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [availableRooms] = useState<Room[]>([
    { id: '1', name: 'Game Room 1', players: ['Player1'], createdAt: new Date().toISOString() },
    { id: '2', name: 'Game Room 2', players: ['Player2'], createdAt: new Date().toISOString() }
  ]);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      // Here we would typically create the room in a backend
      onSelectMode('online', roomName);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-amber-50 to-amber-100 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Morpion</h1>
        <p className="text-gray-600">Choose your game mode</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button
          onClick={() => onSelectMode('local')}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Play Local Multiplayer
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
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

        <Button
          onClick={() => onSelectMode('bot')}
          size="lg"
          className="bg-purple-600 hover:bg-purple-700"
        >
          Play vs Bot
        </Button>
      </div>
    </div>
  );
};

export default GameMenu;
