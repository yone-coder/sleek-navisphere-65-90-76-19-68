
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      className={`
        max-w-3xl mx-auto px-4 py-3
        ${scrolled && scrollDirection === 'down' ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-300
      `}
    >
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`
                relative flex-none w-20 aspect-square rounded-lg overflow-hidden
                ${selectedImage === index 
                  ? 'ring-2 ring-[#0FA0CE] ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'}
                transition-all duration-300
              `}
              onClick={() => onSelect(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
