
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ArrowLeft } from "lucide-react";

type FullscreenViewProps = {
  images: string[];
  name: string;
  selectedImage: number;
  onClose: () => void;
};

export function FullscreenView({
  images,
  name,
  selectedImage,
  onClose
}: FullscreenViewProps) {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="h-full flex items-center justify-center p-4">
        <div className="relative max-w-5xl w-full">
          <Carousel
            opts={{
              startIndex: selectedImage,
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`${name} - View ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
