
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ChevronDown, 
  Shield, 
  Users, 
  Zap,
  Globe,
  Lock,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [backers, setBackers] = useState(1342);

  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate live backer updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBackers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sticky Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                SaaSify
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-sm">Features</Button>
              <Button variant="ghost" className="text-sm">Roadmap</Button>
              <Button variant="ghost" className="text-sm">Team</Button>
              <Button variant="ghost" className="text-sm">FAQ</Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
              >
                Back the Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Redefining SaaS Development
              <br />
              For The Future
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Building the next generation of cloud infrastructure with advanced AI capabilities,
              enterprise-grade security, and unparalleled scalability.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 w-full sm:w-auto"
              >
                Back Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Watch Demo <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{backers.toLocaleString()}</h3>
              <p className="text-gray-600">Active Backers</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-600">Secure Funds</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">150+</h3>
              <p className="text-gray-600">Countries</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.9/5</h3>
              <p className="text-gray-600">User Rating</p>
            </motion.div>
          </div>

          {/* Brand Logos */}
          <div className="mt-16 px-4">
            <p className="text-center text-sm text-gray-500 mb-8">Trusted by leading companies worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 w-32 rounded-md bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
