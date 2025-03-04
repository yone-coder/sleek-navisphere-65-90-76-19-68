
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  id: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  return (
    <section id={id} className="relative min-h-[90vh] overflow-hidden flex items-center">
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,transparent)]" />
      </div>
      
      {/* Floating gradient blobs */}
      <motion.div 
        className="absolute top-0 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-purple-300 bg-purple-50 text-purple-600"
            >
              June 15-16, 2023 • San Francisco
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              <span className="block">Master Modern</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Web Development
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-lg"
            >
              Join the most comprehensive seminar on cutting-edge web development technologies, best practices, and future trends.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Agenda
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-purple-600">
                  <Users className="h-5 w-5" />
                  <span className="font-bold text-2xl">50+</span>
                </div>
                <span className="text-sm text-slate-600">Expert Speakers</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Calendar className="h-5 w-5" />
                  <span className="font-bold text-2xl">2</span>
                </div>
                <span className="text-sm text-slate-600">Days of Learning</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-purple-600">
                  <Lightbulb className="h-5 w-5" />
                  <span className="font-bold text-2xl">24+</span>
                </div>
                <span className="text-sm text-slate-600">Workshops</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-3xl transform rotate-3" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-200/50">
              <img 
                src="https://images.unsplash.com/photo-1540304453527-62f9a16a3422?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Web Development Conference" 
                className="w-full object-cover h-[600px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
