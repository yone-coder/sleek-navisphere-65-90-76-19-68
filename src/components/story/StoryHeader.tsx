
import React from 'react';
import { ChevronDown } from 'lucide-react';

type StoryHeaderProps = {
  isShowingChapters: boolean;
  setIsShowingChapters: (value: boolean) => void;
  currentLanguage: { name: string; code: string; flag: string };
  languageMenuOpen: boolean;
  setLanguageMenuOpen: (value: boolean) => void;
  handleLanguageChange: (language: { name: string; code: string; flag: string }) => void;
  languages: { name: string; code: string; flag: string }[];
  progressPercentage: number;
};

export function StoryHeader({
  isShowingChapters,
  setIsShowingChapters,
  currentLanguage,
  languageMenuOpen,
  setLanguageMenuOpen,
  handleLanguageChange,
  languages,
  progressPercentage
}: StoryHeaderProps) {
  return (
    <div className="fixed top-[60px] left-0 right-0 bg-white shadow-md z-20">
      <header className="bg-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setIsShowingChapters(true)} 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-200"
          >
            <span className="font-medium">Chapters</span>
            <ChevronDown size={18} />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-200"
            >
              <span className="mr-2">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
              <ChevronDown size={16} className={`transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {languageMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLanguageMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        currentLanguage.code === language.code ? 'bg-pink-50 text-pink-600' : ''
                      }`}
                    >
                      <span className="mr-3 text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      
      <div className="w-full h-1 bg-gray-300">
        <div 
          className="h-full bg-blue-500 transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
