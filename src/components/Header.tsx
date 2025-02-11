
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 
      ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Lovable
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-sm font-medium hover:bg-gray-100/50"
            asChild
          >
            <Link to="/login">Sign In</Link>
          </Button>
          <Button 
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity"
            asChild
          >
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
