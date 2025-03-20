
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotPreviewProps {
  screenshots: string[];
}

export function ScreenshotPreview({ screenshots }: ScreenshotPreviewProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  if (!screenshots.length) return null;

  return (
    <div className="relative rounded-xl overflow-hidden group">
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={goToPrevious}
          className="p-1 rounded-full bg-black/30 text-white ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={goToNext}
          className="p-1 rounded-full bg-black/30 text-white mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden rounded-xl aspect-[9/16] bg-gray-100">
        {screenshots.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: index > currentIndex ? 100 : -100 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : index > currentIndex ? 100 : -100,
              zIndex: index === currentIndex ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0 }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {screenshots.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
