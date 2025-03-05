
import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { 
  Briefcase, Leaf, Heart, Church, School, Building, 
  GraduationCap, ChevronDown, BookOpen, X
} from 'lucide-react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useLanguage } from '@/contexts/LanguageContext';
import AppStore from './AppStore';

export function ServicesTab() {
  const [activeProjectType, setActiveProjectType] = useState('apps');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [isShowingProjects, setIsShowingProjects] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ name: 'English', code: 'en', flag: '🇬🇧' });
  const { language, setLanguage, t } = useLanguage();
  const [isTogglesVisible, setIsTogglesVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        setIsTogglesVisible(false);
      } else if (scrollTop < lastScrollTop || scrollTop < 10) {
        setIsTogglesVisible(true);
      }
      
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const handleProjectTypeChange = (value: string) => {
    setActiveProjectType(value);
    setIsShowingProjects(false);
  };
  
  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleLanguageChange = (language: {name: string, code: string, flag: string}) => {
    setCurrentLanguage(language);
    setLanguageMenuOpen(false);
  };

  const getShortName = (name: string) => {
    if (name.length <= 10) return name.toUpperCase();
    
    const words = name.split(' ');
    if (words.length > 1) {
      return words
        .filter(word => !['de', 'of', 'and', '&', 'the'].includes(word.toLowerCase()))
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };

  const projects = [
    {
      id: 'apps',
      name: 'Apps',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'lakou-agri',
      name: 'Lakou Agri',
      icon: <Leaf className="w-4 h-4" />,
    },
    {
      id: 'hearts-hands',
      name: 'Hearts & Hands Foundation',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: 'holy-light',
      name: 'Holy Light Church',
      icon: <Church className="w-4 h-4" />,
    },
    {
      id: 'college-nova',
      name: 'Collège Nova de Désarmes',
      icon: <School className="w-4 h-4" />,
    },
    {
      id: 'ecole-polytechnique',
      name: 'École Polytechnique Horizon',
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: 'universite-nova',
      name: 'Université Nova',
      icon: <GraduationCap className="w-4 h-4" />,
    }
  ];

  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Haitian Creole', code: 'ht', flag: '🇭🇹' },
    { name: 'Italiano', code: 'it', flag: '🇮🇹' }
  ];

  const currentProject = projects.find(p => p.id === activeProjectType);
  const projectDisplayName = currentProject ? currentProject.name : 'Select Project';
  const projectShortName = currentProject ? getShortName(currentProject.name) : 'SP';

  return (
    <div className="w-full">
      <div className={`sticky top-0 bg-white shadow-md z-30 transition-all duration-300 ${
        isTogglesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => setIsShowingProjects(true)} 
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-200"
          >
            <span className="font-medium md:hidden">
              {projectShortName}
            </span>
            <span className="font-medium hidden md:block">
              {projectDisplayName}
            </span>
            <ChevronDown size={18} />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-200"
            >
              <span className="mr-2">{currentLanguage.flag}</span>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
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
      </div>

      <div className="w-full px-0">
        <Sheet open={isShowingProjects} onOpenChange={setIsShowingProjects}>
          <SheetContent side="bottom" className="h-[90vh] overflow-y-auto p-0">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-slide-up-in">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 text-center">Our Projects</h2>
                  <p className="mt-1 text-sm text-gray-500 text-center">{projects.length} projects • Tech & Community</p>
                </div>
                <button 
                  onClick={() => setIsShowingProjects(false)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className={`transition-colors border-l-4 ${
                      activeProjectType === project.id 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="flex items-center p-4 cursor-pointer"
                      onClick={() => {
                        handleProjectTypeChange(project.id);
                      }}
                    >
                      <div className="mr-3 flex-shrink-0">
                        {project.icon}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className={`font-medium ${activeProjectType === project.id ? 'text-blue-700' : 'text-gray-800'}`}>
                          {project.name}
                        </h3>
                      </div>
                      
                      <div className="ml-2 text-gray-400">
                        {activeProjectType === project.id && (
                          <BookOpen size={18} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Tabs
          value={activeProjectType}
          onValueChange={handleProjectTypeChange}
          className="w-full mt-0"
        >
          <TabsContent value="apps" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <AppStore />
            </motion.div>
          </TabsContent>

          <TabsContent value="lakou-agri" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Lakou Agri</h3>
                <p className="text-gray-600">Content for Lakou Agri will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="hearts-hands" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Hearts & Hands Foundation</h3>
                <p className="text-gray-600">Content for Hearts & Hands Foundation will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="holy-light" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Holy Light Church</h3>
                <p className="text-gray-600">Content for Holy Light Church will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="college-nova" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Collège Nova de Désarmes</h3>
                <p className="text-gray-600">Content for Collège Nova de Désarmes will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="ecole-polytechnique" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">École Polytechnique Horizon</h3>
                <p className="text-gray-600">Content for École Polytechnique Horizon will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="universite-nova" className="space-y-8 w-full p-0 m-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Université Nova</h3>
                <p className="text-gray-600">Content for Université Nova will appear here.</p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
