
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/seminar/HeroSection';
import SpeakersSection from '@/components/seminar/SpeakersSection';
import AgendaSection from '@/components/seminar/AgendaSection';
import TestimonialsSection from '@/components/seminar/TestimonialsSection';
import PricingSection from '@/components/seminar/PricingSection';
import RegisterForm from '@/components/seminar/RegisterForm';
import FAQSection from '@/components/seminar/FAQSection';
import { cn } from '@/lib/utils';

const Seminar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position for progress indicator and active section
  useEffect(() => {
    const handleScroll = () => {
      if (pageRef.current) {
        const scrollPosition = window.scrollY;
        const winHeight = window.innerHeight;
        const docHeight = pageRef.current.scrollHeight;
        const totalScrollable = docHeight - winHeight;
        const progress = Math.min(scrollPosition / totalScrollable, 1);
        setScrollProgress(progress * 100);
        
        // Update active section based on scroll position
        const sections = ['hero', 'speakers', 'agenda', 'testimonials', 'pricing', 'register', 'faq'];
        const sectionElements = sections.map(id => document.getElementById(id));
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section && section.offsetTop <= scrollPosition + 300) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'register', label: 'Register' },
    { id: 'faq', label: 'FAQ' }
  ];
  
  return (
    <div ref={pageRef} className="relative min-h-screen overflow-hidden">
      {/* Sticky Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              WebDevCon 2023
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeSection === item.id 
                    ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('register')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Register Now
            </Button>
          </div>
          
          <button className="md:hidden text-gray-700">
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pt-16">
        <HeroSection id="hero" />
        <SpeakersSection id="speakers" />
        <AgendaSection id="agenda" />
        <TestimonialsSection id="testimonials" />
        <PricingSection id="pricing" />
        <RegisterForm id="register" />
        <FAQSection id="faq" />
      </main>
      
      {/* Floating scroll to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 20 ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-30 p-3 rounded-full bg-white shadow-lg border border-gray-200"
      >
        <ChevronDown className="h-5 w-5 transform rotate-180" />
      </motion.button>
    </div>
  );
};

export default Seminar;
