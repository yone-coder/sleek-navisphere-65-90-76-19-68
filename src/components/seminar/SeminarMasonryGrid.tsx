
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
  // Split seminars into columns for masonry layout
  const getColumnSeminars = (colIndex: number, totalColumns: number) => {
    return seminars.filter((_, index) => index % totalColumns === colIndex);
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

      {/* Tablet: Two columns */}
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
        <div className="space-y-4">
          {getColumnSeminars(1, 2).map((seminar) => (
            <SeminarCard
              key={seminar.id}
              {...seminar}
              onToggleSave={onSaveSeminar}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Three columns */}
      <div className="hidden md:grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {[...Array(5)].map((_, colIndex) => (
          <div key={colIndex} className={colIndex >= 3 ? "hidden lg:block xl:block" : ""}>
            <div className="space-y-4">
              {getColumnSeminars(colIndex, 5).map((seminar) => (
                <SeminarCard
                  key={seminar.id}
                  {...seminar}
                  onToggleSave={onSaveSeminar}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
