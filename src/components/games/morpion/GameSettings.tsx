
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface GameSettingsProps {
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  isMuted,
  setIsMuted,
  showSettings,
  setShowSettings
}) => {
  return (
    <div className="absolute top-4 right-4 space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </Button>
    </div>
  );
};
