
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";

type GalleryControlsProps = {
  api: CarouselApi | null;
};

export function GalleryControls({ api }: GalleryControlsProps) {
  return (
    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none z-50">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => api?.scrollPrev()}
        className={cn(
          "h-12 w-12 rounded-full pointer-events-auto",
          "bg-black/20 text-white backdrop-blur-sm",
          "hover:bg-black/30 hover:scale-110",
          "transition-all duration-300 shadow-lg",
          "opacity-0 group-hover:opacity-100"
        )}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => api?.scrollNext()}
        className={cn(
          "h-12 w-12 rounded-full pointer-events-auto",
          "bg-black/20 text-white backdrop-blur-sm",
          "hover:bg-black/30 hover:scale-110",
          "transition-all duration-300 shadow-lg",
          "opacity-0 group-hover:opacity-100"
        )}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
