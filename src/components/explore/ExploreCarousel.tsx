
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ExploreCarouselProps {
  sliderImages: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  currentSlide: number;
}

export const ExploreCarousel = ({ sliderImages, currentSlide }: ExploreCarouselProps) => {
  return (
    <div className="w-full relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={image.id} className="w-full pl-0">
              <div className="relative aspect-[2/1]">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center gap-2">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 ease-in-out transform",
                  currentSlide === index 
                    ? "bg-blue-500 w-4 scale-110" 
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
};
