
import { useEffect, useState, useRef } from 'react';
import { HeroSection } from '@/components/seminar/HeroSection';
import { SpeakersSection } from '@/components/seminar/SpeakersSection';
import { AgendaSection } from '@/components/seminar/AgendaSection';
import { TestimonialsSection } from '@/components/seminar/TestimonialsSection';
import { PricingSection } from '@/components/seminar/PricingSection';
import { RegisterForm } from '@/components/seminar/RegisterForm';
import { FAQSection } from '@/components/seminar/FAQSection';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const Seminar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  
  useEffect(() => {
    const sections = ['hero', 'speakers', 'agenda', 'testimonials', 'pricing', 'register', 'faq'];
    sections.forEach(section => {
      sectionsRef.current[section] = document.getElementById(section);
    });
    
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Show/hide scroll button
      setShowScrollButton(window.scrollY > 500);
      
      // Determine active section
      let current = 'hero';
      for (const section of sections) {
        const element = sectionsRef.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-purple-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Sticky navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-40 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-purple-900">WebDev Seminar</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'speakers', label: 'Speakers' },
                { id: 'agenda', label: 'Agenda' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'register', label: 'Register' },
                { id: 'faq', label: 'FAQ' }
              ].map(item => (
                <button 
                  key={item.id}
                  className={`text-sm font-medium ${
                    activeSection === item.id 
                      ? 'text-purple-600 relative after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <Button 
              className="hidden sm:block bg-purple-600 hover:bg-purple-700"
              onClick={() => scrollToSection('register')}
            >
              Register Now
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="speakers">
          <SpeakersSection />
        </section>
        
        <section id="agenda">
          <AgendaSection />
        </section>
        
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        
        <section id="pricing">
          <PricingSection />
        </section>
        
        <section id="register" className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Register for the Seminar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Secure your spot at the web development event of the year. Early registration ensures you don't miss out on limited workshop spaces.
              </p>
            </div>
            
            <RegisterForm />
          </div>
        </section>
        
        <section id="faq">
          <FAQSection />
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">WebDev Seminar</h3>
              <p className="text-gray-300">
                The premier event for web developers looking to enhance their skills and network with industry leaders.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Speakers', 'Agenda', 'Register', 'FAQ'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>info@webdevseminar.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Tech Street, San Francisco, CA</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-300 mb-4">Get updates and news about the event</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} WebDev Seminar. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button
        className={`fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-opacity z-50 ${
          showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Seminar;
