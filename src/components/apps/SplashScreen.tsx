
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Component, BatteryMedium } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const splashMessages = [
  {
    icon: Palette,
    text: "Customize your home screen",
    colors: ["from-purple-600", "to-amber-500"],
  },
  {
    icon: Component,
    text: "Expand your device's capabilities beyond system defaults",
    colors: ["from-amber-400", "to-violet-600"],
  },
  {
    icon: BatteryMedium,
    text: "Extend your battery life by enabling only what you really need",
    colors: ["from-blue-600", "to-teal-400"],
  },
];

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen = ({ onDismiss }: SplashScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);

  // Animate the content appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Switch between splash messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % splashMessages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const currentMessage = splashMessages[currentIndex];
  const IconComponent = currentMessage.icon;
  const [fromColor, toColor] = currentMessage.colors;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white">
        <div className="text-sm">12:07 AM</div>
        <div className="flex items-center gap-2">
          <span>
            {currentIndex === 0 ? "2.95" : "126"}
            <span className="text-xs">
              {currentIndex === 0 ? "K/s" : "B/s"}
            </span>
          </span>
          <span>4.56</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border border-white rounded-sm relative">
              <div className="absolute inset-0.5 right-0 bg-white" style={{width: '70%'}}></div>
            </div>
            43
          </div>
        </div>
      </div>

      {/* Top Curve */}
      <motion.div 
        key={`top-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute top-0 right-0 w-[70%] h-[40%] bg-gradient-to-br ${fromColor} ${toColor} rounded-bl-full`}
      />

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6">
              <IconComponent className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-white text-4xl font-bold leading-tight mb-2">
              {currentMessage.text}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Curve */}
      <motion.div 
        key={`bottom-${currentIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute bottom-0 left-0 w-[70%] h-[30%] bg-gradient-to-tr ${fromColor} ${toColor} rounded-tr-full`}
      />

      {/* Get Started Button */}
      <div className="p-4 pb-8">
        <Button 
          className="w-full h-14 rounded-full bg-white text-black hover:bg-gray-100 text-lg font-semibold"
          onClick={onDismiss}
        >
          Get started
        </Button>
      </div>
    </div>
  );
};
