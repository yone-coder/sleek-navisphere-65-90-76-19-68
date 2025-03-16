import React from 'react';
import { SeminarCard, SeminarCardProps } from './SeminarCard';
import { cn } from '@/lib/utils';

interface SeminarMasonryGridProps {
  seminars: SeminarCardProps[];
  className?: string;
  onSaveSeminar?: (id: string) => void;
}

export function SeminarMasonryGrid({ 
  seminars, 
  className, 
  onSaveSeminar 
}: SeminarMasonryGridProps) {
  // Get seminars for each column to create a masonry layout
  const getColumnSeminars = (colIndex: number, columns: number) => {
    return seminars.filter((_, index) => index % columns === colIndex);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Mobile: One column */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            {...seminar}
            onToggleSave={onSaveSeminar}
          />
        ))}
      </div>

      {/* Tablet: Two columns staggered layout */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
        <div className="space-y-4">
          {getColumnSeminars(0, 2).map((seminar) => (
            <SeminarCard
              key={seminar.id}
              {...seminar}
              onToggleSave={onSaveSeminar}
            />
          ))}
        </div>
        <div className="space-y-4 mt-8">
          {getColumnSeminars(1, 2).map((seminar) => (
            <SeminarCard
              key={seminar.id}
              {...seminar}
              onToggleSave={onSaveSeminar}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Multi-column puzzle-like layout */}
      <div className="hidden md:grid gap-4 lg:gap-5" 
           style={{ 
             gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
             gridAutoRows: "10px"
           }}>
        {seminars.map((seminar, index) => {
          // Calculate different heights for cards to create puzzle effect
          const spanRows = 25 + (index % 4) * 2; // Adjusted height for smaller cards
          
          return (
            <div key={seminar.id} 
                 style={{ gridRowEnd: `span ${spanRows}` }} 
                 className="overflow-hidden">
              <SeminarCard
                {...seminar}
                onToggleSave={onSaveSeminar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
