
import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import StoryPage from '@/components/story/StoryPage';

export function StoryMissionsTab() {
  const [isTabLoading, setIsTabLoading] = useState(true);
  
  useEffect(() => {
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isTabLoading) {
    return (
      <div className="w-full p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
        
        <Skeleton className="h-1 w-full" />
        
        <div className="space-y-4 pt-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          <Skeleton className="h-60 w-full rounded-lg mt-6" />
        </div>
        
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <StoryPage />
    </div>
  );
}

export default StoryMissionsTab;
