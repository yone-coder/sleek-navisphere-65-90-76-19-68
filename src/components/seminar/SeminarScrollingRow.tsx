
import React, { useRef } from 'react';
import { SeminarCard, SeminarCardProps } from './SeminarCard';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeminarScrollingRowProps {
  title: string;
  seminars: SeminarCardProps[];
  className?: string;
  onSaveSeminar?: (id: string) => void;
}

export function SeminarScrollingRow({
  title,
  seminars,
  className,
  onSaveSeminar
}: SeminarScrollingRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -280,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn("relative group w-full", className)}>
      <div className="flex items-center justify-between mb-2 px-4 md:px-6 lg:px-8">
        {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
        <Button variant="ghost" size="sm" className="text-sm">
          See all
        </Button>
      </div>

      <div className="relative w-full">
        <ScrollArea className="w-full overflow-x-auto pb-4">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 w-max min-w-full pl-4 pr-4"
          >
            {seminars.map((seminar, index) => (
              <div 
                key={seminar.id} 
                className="min-w-[260px] max-w-[260px] w-[260px] flex-shrink-0"
              >
                <SeminarCard
                  {...seminar}
                  onToggleSave={onSaveSeminar}
                />
              </div>
            ))}
            <div className="min-w-[16px] max-w-[16px] w-[16px] flex-shrink-0"></div>
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
