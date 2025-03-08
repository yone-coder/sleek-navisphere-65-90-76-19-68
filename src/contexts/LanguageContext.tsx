import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'ht';

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
    'nav.matches': 'Matches',
    'nav.feeds': 'Feeds',
    'nav.profile': 'Profile',
    'nav.wallet': 'Wallet',
    'nav.recent': 'Recent Apps',
    'nav.back': 'Go Back',
    'btn.signin': 'Sign In',
    'btn.signup': 'Sign Up',
    'features.discover': 'Discover what makes us unique',
    'pricing.plans': 'Plans that fit your needs',
    // Seminar page translations
    'seminar.tabs.video': 'Video',
    'seminar.tabs.speakers': 'Speakers',
    'seminar.tabs.subjects': 'Subjects',
    'seminar.tabs.highlights': 'Highlights',
    'seminar.tabs.testimonials': 'Testimonials',
    'seminar.tabs.register': 'Register',
    'seminar.video.title': 'Mastering Modern Website Development: From Basics to Advanced Techniques',
    'seminar.video.views': 'views',
    'seminar.video.comments': 'comments',
    'seminar.academy.name': 'Byte Academy',
    'seminar.academy.description': 'Future of Innovation Seminar 2025',
    'seminar.academy.followers': 'foll.',
    'seminar.academy.seminars': 'sémi.',
    'seminar.academy.follow': 'Follow',
    'seminar.academy.following': 'Following',
    'seminar.description': 'Join industry leaders for this exclusive 3-day event focused on emerging technologies, innovation strategies, and future business trends. March 15-17, 2025.',
    'seminar.speakers': 'Speakers content area',
    'seminar.highlights': 'Highlights content area',
    'seminar.testimonials': 'Testimonials content area',
    'seminar.register': 'Registration content area',
    'webinar.joined': 'joined',
    'webinar.spotsleft': 'spots left',
    'webinar.estfull': 'Est. full:',
    'webinar.almostfull': 'Almost Full!',
    'webinar.fillingfast': 'Filling Fast',
    'webinar.spotsavailable': 'Spots Available',
    'webinar.full': 'Full',
    'webinar.learnmore': 'Learn more',
    'webinar.register': 'Register Now',
    'webinar.registered': 'You\'re Registered!',
    'webinar.justregistered': 'just registered',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.products': 'Productos',
    'nav.features': 'Características',
    'nav.pricing': 'Precios',
    'nav.matches': 'Coincidencias',
    'nav.feeds': 'Feeds',
    'nav.profile': 'Perfil',
    'nav.wallet': 'Billetera',
    'nav.recent': 'Apps Recientes',
    'nav.back': 'Regresar',
    'btn.signin': 'Iniciar Sesión',
    'btn.signup': 'Registrarse',
    'features.discover': 'Descubre lo que nos hace únicos',
    'pricing.plans': 'Planes que se ajustan a tus necesidades',
    // Seminar page translations
    'seminar.tabs.video': 'Video',
    'seminar.tabs.speakers': 'Ponentes',
    'seminar.tabs.subjects': 'Temas',
    'seminar.tabs.highlights': 'Destacados',
    'seminar.tabs.testimonials': 'Testimonios',
    'seminar.tabs.register': 'Registrarse',
    'seminar.video.title': 'Dominando el Desarrollo Web Moderno: De lo Básico a Técnicas Avanzadas',
    'seminar.video.views': 'vistas',
    'seminar.video.comments': 'comentarios',
    'seminar.academy.name': 'Academia Byte',
    'seminar.academy.description': 'Seminario del Futuro de la Innovación 2025',
    'seminar.academy.followers': 'segui.',
    'seminar.academy.seminars': 'semin.',
    'seminar.academy.follow': 'Seguir',
    'seminar.academy.following': 'Siguiendo',
    'seminar.description': 'Únase a líderes de la industria para este evento exclusivo de 3 días centrado en tecnologías emergentes, estrategias de innovación y tendencias comerciales futuras. 15-17 de marzo, 2025.',
    'seminar.speakers': 'Área de contenido de ponentes',
    'seminar.highlights': 'Área de contenido destacado',
    'seminar.testimonials': 'Área de contenido de testimonios',
    'seminar.register': 'Área de registro',
    'webinar.joined': 'unidos',
    'webinar.spotsleft': 'lugares disponibles',
    'webinar.estfull': 'Est. lleno:',
    'webinar.almostfull': '¡Casi Lleno!',
    'webinar.fillingfast': 'Llenándose Rápido',
    'webinar.spotsavailable': 'Lugares Disponibles',
    'webinar.full': 'Lleno',
    'webinar.learnmore': 'Saber más',
    'webinar.register': 'Registrarse Ahora',
    'webinar.registered': '¡Estás Registrado!',
    'webinar.justregistered': 'acaba de registrarse',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.products': 'Produits',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.matches': 'Correspondances',
    'nav.feeds': 'Flux',
    'nav.profile': 'Profil',
    'nav.wallet': 'Portefeuille',
    'nav.recent': 'Apps Récentes',
    'nav.back': 'Retour',
    'btn.signin': 'Connexion',
    'btn.signup': "S'inscrire",
    'features.discover': 'Découvrez ce qui nous rend uniques',
    'pricing.plans': 'Des forfaits adaptés à vos besoins',
    // Seminar page translations
    'seminar.tabs.video': 'Vidéo',
    'seminar.tabs.speakers': 'Intervenants',
    'seminar.tabs.subjects': 'Sujets',
    'seminar.tabs.highlights': 'Points forts',
    'seminar.tabs.testimonials': 'Témoignages',
    'seminar.tabs.register': 'S\'inscrire',
    'seminar.video.title': 'Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées',
    'seminar.video.views': 'vues',
    'seminar.video.comments': 'commentaires',
    'seminar.academy.name': 'Académie Byte',
    'seminar.academy.description': 'Séminaire sur l\'Avenir de l\'Innovation 2025',
    'seminar.academy.followers': 'abon.',
    'seminar.academy.seminars': 'sémin.',
    'seminar.academy.follow': 'Suivre',
    'seminar.academy.following': 'Abonné',
    'seminar.description': 'Rejoignez les leaders de l\'industrie pour cet événement exclusif de 3 jours axé sur les technologies émergentes, les stratégies d\'innovation et les tendances commerciales futures. 15-17 mars 2025.',
    'seminar.speakers': 'Espace des intervenants',
    'seminar.highlights': 'Espace des points forts',
    'seminar.testimonials': 'Espace des témoignages',
    'seminar.register': 'Espace d\'inscription',
    'webinar.joined': 'inscrits',
    'webinar.spotsleft': 'places restantes',
    'webinar.estfull': 'Complet dans:',
    'webinar.almostfull': 'Presque Complet !',
    'webinar.fillingfast': 'Se Remplit Vite',
    'webinar.spotsavailable': 'Places Disponibles',
    'webinar.full': 'Complet',
    'webinar.learnmore': 'En savoir plus',
    'webinar.register': 'S\'inscrire Maintenant',
    'webinar.registered': 'Vous êtes inscrit !',
    'webinar.justregistered': 'vient de s\'inscrire',
  },
  ht: {
    'nav.home': 'Akèy',
    'nav.about': 'Apropo',
    'nav.contact': 'Kontakte',
    'nav.products': 'Pwodwi yo',
    'nav.features': 'Karakteristik',
    'nav.pricing': 'Pri',
    'nav.matches': 'Match yo',
    'nav.feeds': 'Fil Aktiyalite',
    'nav.profile': 'Pwofil',
    'nav.wallet': 'Bous',
    'nav.recent': 'Dènye Apps yo',
    'nav.back': 'Retounen',
    'btn.signin': 'Konekte',
    'btn.signup': 'Enskri',
    'features.discover': 'Dekouvri sa ki fè nou inik',
    'pricing.plans': 'Plan ki adapte ak bezwen ou yo',
    // Seminar page translations
    'seminar.tabs.video': 'Videyo',
    'seminar.tabs.speakers': 'Oratè yo',
    'seminar.tabs.subjects': 'Sijè',
    'seminar.tabs.highlights': 'Pwen Esansyèl yo',
    'seminar.tabs.testimonials': 'Temwayaj yo',
    'seminar.tabs.register': 'Enskri',
    'seminar.video.title': 'Metrize Devlopman Sit Web Modèn: Soti nan Baz pou Rive nan Teknik Avanse',
    'seminar.video.views': 'vizite',
    'seminar.video.comments': 'kòmantè',
    'seminar.academy.name': 'Akademi Byte',
    'seminar.academy.description': 'Seminè sou Lavni Inovasyon 2025',
    'seminar.academy.followers': 'swiv.',
    'seminar.academy.seminars': 'sémin.',
    'seminar.academy.follow': 'Swiv',
    'seminar.academy.following': 'Swivi',
    'seminar.description': 'Rankontre lidè endistri yo pou evènman eksklizif 3 jou sa a ki konsantre sou teknoloji emerjan, estrateji inovasyon, ak tandans biznis nan lavni. 15-17 mas 2025.',
    'seminar.speakers': 'Zòn kontni oratè yo',
    'seminar.highlights': 'Zòn kontni pwen esansyèl yo',
    'seminar.testimonials': 'Zòn kontni temwayaj yo',
    'seminar.register': 'Zòn enskripsyon',
    'webinar.joined': 'enskri',
    'webinar.spotsleft': 'plas ki rete',
    'webinar.estfull': 'Est. plen:',
    'webinar.almostfull': 'Prèske Plen!',
    'webinar.fillingfast': 'Ap Ranpli Vit',
    'webinar.spotsavailable': 'Plas Disponib',
    'webinar.full': 'Plen',
    'webinar.learnmore': 'Aprann plis',
    'webinar.register': 'Enskri Kounye a',
    'webinar.registered': 'Ou Enskri!',
    'webinar.justregistered': 'fèk enskri',
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
