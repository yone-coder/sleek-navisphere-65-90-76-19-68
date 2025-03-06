
import { useState, useEffect } from 'react';

export function useStorySettings() {
  const [fontSize, setFontSize] = useState(16);
  const [fontSizeControlOpen, setFontSizeControlOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ name: 'English', code: 'en', flag: '🇬🇧' });
  
  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Haitian Creole', code: 'ht', flag: '🇭🇹' },
    { name: 'Italiano', code: 'it', flag: '🇮🇹' }
  ];
  
  const fontSizeOptions = [12, 14, 16, 18, 20, 22, 24];
  
  const handleSetFontSize = (size: number) => {
    setFontSize(size);
  };
  
  const handleLanguageChange = (language: {name: string, code: string, flag: string}) => {
    setCurrentLanguage(language);
    setLanguageMenuOpen(false);
  };
  
  const getFontSizePercentage = () => {
    const min = fontSizeOptions[0];
    const max = fontSizeOptions[fontSizeOptions.length - 1];
    return ((fontSize - min) / (max - min)) * 100;
  };
  
  useEffect(() => {
    if (fontSizeControlOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          !e.target ||
          !(e.target as Element).closest('.font-size-control') && 
          !(e.target as Element).closest('.font-size-toggle')
        ) {
          setFontSizeControlOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [fontSizeControlOpen]);
  
  return {
    fontSize,
    fontSizeControlOpen,
    setFontSizeControlOpen,
    fontSizeOptions,
    handleSetFontSize,
    getFontSizePercentage,
    languageMenuOpen,
    setLanguageMenuOpen,
    currentLanguage,
    languages,
    handleLanguageChange
  };
}
