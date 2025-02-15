import React, { createContext, useContext, useState } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "tournaments.title": "Tournaments",
    "tournaments.featured": "Featured Tournaments",
    "tournaments.upcoming": "Upcoming Tournaments",
    "tournaments.past": "Past Tournaments",
  },
  es: {
    "tournaments.title": "Torneos",
    "tournaments.featured": "Torneos Destacados",
    "tournaments.upcoming": "Próximos Torneos",
    "tournaments.past": "Torneos Pasados",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
