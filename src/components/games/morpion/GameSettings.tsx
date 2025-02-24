
import React from 'react';

interface GameSettingsProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const GameSettings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  zoom,
  setZoom,
  isTimerRunning,
  setIsTimerRunning,
  soundEnabled,
  setSoundEnabled
}: GameSettingsProps) => {
  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 md:p-8 rounded-xl shadow-2xl max-w-xs md:max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Game Settings</h2>

        <div className="space-y-4 md:space