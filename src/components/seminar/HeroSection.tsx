
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-indigo-950 z-0"
        style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0ybDQtMXYxbC00IDF2LTF6bTUuMDU2LTlsLjk0NC45NDQtMS41NTUgMS41NTYtMi42MjItMi42MjJMMzQuMDU2IDIzSDIxdjFoMTYuMDQ0bC0yLjExIDIuMTEtMi43MjMgMi43MjMtMi4yMjItMi4yMjJMNS40NDQgNTIuMzg5IDE0IDE2aDVsLjk1NiA0Ljc3OEwyNSAyNmg3di0xaC01bC0xMC03MTQuNjExIDE5LjUzMy0yMS4zODkgNS41NDQgNS41NDQgNi42NjcgNi42NjcuNzc4Ljc3OHpNNDAgNDBoLTJ2LTFoMnYxem00IDBoLTJ2LTFoMnYxem00IDBoLTJ2LTFoMnYxeiIvPjwvZz48L2c+PC9zdmc+')] bg-blue-500 opacity-10 z-0" 
        style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
      />
      
      {/* Floating elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-10 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20 transition-colors">
              October 15-17, 2023
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Web Development <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Mastery Seminar
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join top industry experts for three days of intensive learning, hands-on workshops, and networking to take your web development skills to the next level.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-full">
              <Calendar className="h-5 w-5 mr-2 text-purple-300" />
              <span>October 15-17, 2023</span>
            </div>
            <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-full">
              <MapPin className="h-5 w-5 mr-2 text-purple-300" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 mr-2 text-purple-300" />
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 mr-2 text-purple-300" />
              <span>250 Attendees</span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#register">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg text-white border-0 w-full sm:w-auto text-base">
                Register Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#agenda">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 hover:text-white w-full sm:w-auto text-base">
                View Schedule
              </Button>
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-2xl">
            <div className="relative h-0 pb-[56.25%] rounded-lg overflow-hidden bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&h=560&q=80" 
                alt="Web Development Seminar" 
                className="absolute top-0 left-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button className="bg-white text-indigo-900 hover:bg-white/90 rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                  <span className="sr-only">Play video</span>
                  <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-indigo-900 border-b-[10px] border-b-transparent" />
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 hidden md:block">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg px-4 py-2 text-sm transform rotate-12">
              Exclusive Content
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
