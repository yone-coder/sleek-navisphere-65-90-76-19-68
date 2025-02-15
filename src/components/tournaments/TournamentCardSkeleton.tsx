
import { Skeleton } from "@/components/ui/skeleton";

export const TournamentCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
      <div className="relative h-32">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-2 left-2">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <div className="absolute top-2 right-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="absolute bottom-2 right-2">
          <Skeleton className="h-5 w-32 rounded-full" />
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
};
