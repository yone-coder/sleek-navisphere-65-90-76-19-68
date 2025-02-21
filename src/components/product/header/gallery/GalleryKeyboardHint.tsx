
import { ArrowRight } from "lucide-react";

type GalleryKeyboardHintProps = {
  show: boolean;
};

export function GalleryKeyboardHint({ show }: GalleryKeyboardHintProps) {
  if (!show) return null;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fade-in">
      <div className="bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm flex items-center gap-2">
        <ArrowRight className="w-4 h-4" />
        Use arrow keys to navigate
      </div>
    </div>
  );
}
