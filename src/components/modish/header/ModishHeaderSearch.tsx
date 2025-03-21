
import React from 'react';
import { Camera, Mic, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModishHeaderSearchProps = {
  searchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;
};

export function ModishHeaderSearch({ searchFocused, setSearchFocused }: ModishHeaderSearchProps) {
  return (
    <div 
      className={cn(
        "relative transition-all duration-200 flex items-center",
        searchFocused ? "flex-1 mx-2" : "w-[160px] mx-1"
      )}
    >
      <div className={cn(
        "bg-gray-100 rounded-full w-full flex items-center pr-2 pl-3 py-1.5 transition-all",
        searchFocused ? "border border-red-500" : "border border-transparent"
      )}>
        <Search className="w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search on AliExpress"
          className="bg-transparent w-full ml-2 text-xs outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchFocused && (
          <div className="flex items-center gap-2">
            <button className="ml-1">
              <Camera className="w-4 h-4 text-gray-500" />
            </button>
            <button className="ml-1">
              <Mic className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
