
import React from 'react';
import { SeminarScrollingRow } from './SeminarScrollingRow';
import { SeminarMasonryGrid } from './SeminarMasonryGrid';
import { SeminarSectionHeading } from './SeminarSectionHeading';
import { SeminarCardProps } from './SeminarCard';
import { Calendar, Award, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SeminarGalleryLayoutProps {
  featuredSeminars: SeminarCardProps[];
  upcomingSeminars: SeminarCardProps[];
  popularSeminars: SeminarCardProps[];
  allSeminars: SeminarCardProps[];
  onSaveSeminar: (id: string) => void;
  className?: string;
}

export function SeminarGalleryLayout({
  featuredSeminars,
  upcomingSeminars,
  popularSeminars,
  allSeminars,
  onSaveSeminar,
  className
}: SeminarGalleryLayoutProps) {
  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Featured row */}
      <div className="w-full">
        <div className="px-4 md:px-6 lg:px-8">
          <SeminarSectionHeading 
            title="Featured Seminars" 
            subtitle="Discover our top picks for this month"
            icon={<Award className="h-5 w-5 text-amber-500" />}
            className="mb-4"
          />
        </div>
        <SeminarScrollingRow 
          title="" 
          seminars={featuredSeminars} 
          onSaveSeminar={onSaveSeminar}
        />
      </div>

      {/* Upcoming row */}
      <div className="w-full">
        <div className="px-4 md:px-6 lg:px-8">
          <SeminarSectionHeading 
            title="Upcoming Seminars" 
            subtitle="Don't miss these events coming soon"
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
            className="mb-4" 
          />
        </div>
        <SeminarScrollingRow 
          title="" 
          seminars={upcomingSeminars} 
          onSaveSeminar={onSaveSeminar}
        />
      </div>

      {/* Popular row */}
      <div className="w-full">
        <div className="px-4 md:px-6 lg:px-8">
          <SeminarSectionHeading 
            title="Trending Seminars" 
            subtitle="Most popular among our users"
            icon={<TrendingUp className="h-5 w-5 text-rose-500" />}
            className="mb-4"
          />
        </div>
        <SeminarScrollingRow 
          title="" 
          seminars={popularSeminars} 
          onSaveSeminar={onSaveSeminar}
        />
      </div>

      {/* All seminars in masonry grid */}
      <div className="mt-12 px-4 md:px-6 lg:px-8">
        <SeminarSectionHeading 
          title="Explore All Seminars" 
          subtitle="Discover seminars tailored to your interests"
          icon={<Zap className="h-5 w-5 text-purple-500" />}
          actionText="Filter"
          onAction={() => console.log("Filter clicked")}
          className="mb-6"
        />
        
        <SeminarMasonryGrid 
          seminars={allSeminars}
          onSaveSeminar={onSaveSeminar}
          className="mt-4"
        />
      </div>
    </div>
  );
}
