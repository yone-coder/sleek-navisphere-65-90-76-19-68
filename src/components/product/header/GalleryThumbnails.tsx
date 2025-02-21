
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type GalleryThumbnailsProps = {
  images: string[];
  selectedImage: number;
  onSelect: (index: number) => void;
  scrolled: boolean;
  scrollDirection: 'up' | 'down';
};

export function GalleryThumbnails({
  images,
  selectedImage,
  onSelect,
  scrolled,
  scrollDirection
}: GalleryThumbnailsProps) {
  return (
    <div 
      className={cn(
        "max-w-3xl mx-auto px-4 py-3",
        "transition-all duration-300 ease-out",
        scrolled && scrollDirection === 'down' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      )}
    >
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
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
            </button>
          ))}
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="h-2"
        />
      </ScrollArea>
    </div>
  );
}
