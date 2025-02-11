
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es' | 'fr';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.products': 'Products',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'btn.signin': 'Sign In',
    'btn.signup': 'Sign Up',
    'features.discover': 'Discover what makes us unique',
    'pricing.plans': 'Plans that fit your needs',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.products': 'Productos',
    'nav.features': 'Características',
    'nav.pricing': 'Precios',
    'btn.signin': 'Iniciar Sesión',
    'btn.signup': 'Registrarse',
    'features.discover': 'Descubre lo que nos hace únicos',
    'pricing.plans': 'Planes que se ajustan a tus necesidades',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.products': 'Produits',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'btn.signin': 'Connexion',
    'btn.signup': "S'inscrire",
    'features.discover': 'Découvrez ce qui nous rend uniques',
    'pricing.plans': 'Des forfaits adaptés à vos besoins',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
