
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryThumbnailsProps = {
  images: string[];
  selectedImage: number;
  onSelect: (index: number) => void;
};

export function GalleryThumbnails({
  images,
  selectedImage,
  onSelect
}: GalleryThumbnailsProps) {
  return (
    <div className="relative bg-white border-t border-gray-100">
      <ScrollArea className="w-full">
        <div className="flex gap-2 px-4 py-3">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative flex-none w-20 aspect-square rounded-lg overflow-hidden",
                "transition-all duration-300 hover:scale-105",
                "group focus:outline-none",
                selectedImage === index 
                  ? "ring-2 ring-[#0FA0CE] ring-offset-2 shadow-lg" 
                  : "opacity-70 hover:opacity-100"
              )}
              onClick={() => onSelect(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div 
                className={cn(
                  "absolute inset-0 bg-black/20",
                  selectedImage === index ? "opacity-0" : "opacity-100 group-hover:opacity-0",
                  "transition-opacity duration-300"
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {index + 1}/{images.length}
                </span>
              </div>
            </button>
          ))}
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="h-2"
        />
      </ScrollArea>

      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-white/0 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-white/0 pointer-events-none" />

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => onSelect(Math.max(0, selectedImage - 1))}
          className={cn(
            "p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg",
            "hover:bg-white hover:scale-110 active:scale-95",
            "transition-all duration-300",
            "focus:outline-none",
            selectedImage === 0 && "opacity-50 pointer-events-none"
          )}
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => onSelect(Math.min(images.length - 1, selectedImage + 1))}
          className={cn(
            "p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg",
            "hover:bg-white hover:scale-110 active:scale-95",
            "transition-all duration-300",
            "focus:outline-none",
            selectedImage === images.length - 1 && "opacity-50 pointer-events-none"
          )}
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
