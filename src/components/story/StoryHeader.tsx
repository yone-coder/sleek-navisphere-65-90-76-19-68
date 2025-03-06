
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type StoryHeaderProps = {
  isShowingChapters: boolean;
  setIsShowingChapters: (value: boolean) => void;
  currentLanguage: { name: string; code: string; flag: string };
  languageMenuOpen: boolean;
  setLanguageMenuOpen: (value: boolean) => void;
  handleLanguageChange: (language: { name: string; code: string; flag: string }) => void;
  languages: { name: string; code: string; flag: string }[];
  progressPercentage: number;
  currentPage: number;
  chapterTitle: string;
};

export function StoryHeader({
  isShowingChapters,
  setIsShowingChapters,
  currentLanguage,
  languageMenuOpen,
  setLanguageMenuOpen,
  handleLanguageChange,
  languages,
  progressPercentage,
  currentPage,
  chapterTitle
}: StoryHeaderProps) {
  return (
    <div className="sticky top-0 bg-white shadow-sm z-20">
      <header className="bg-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setIsShowingChapters(true)} 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-200"
          >
            <span className="font-medium">Chapters</span>
            <ChevronDown size={18} />
          </button>
          
          <DropdownMenu open={languageMenuOpen} onOpenChange={setLanguageMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-200"
              >
                <span className="mr-2">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown size={16} className={`transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`flex items-center px-2 py-2 ${
                    currentLanguage.code === language.code ? 'bg-pink-50 text-pink-600' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  <span>{language.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-500 transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Chapter title section - removed border-b class */}
      <div className="bg-white py-3">
        <div className="container mx-auto px-4">
          {currentPage === 1 ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1">{chapterTitle}</h2>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-center">{chapterTitle}</h3>
          )}
        </div>
      </div>
    </div>
  );
}
