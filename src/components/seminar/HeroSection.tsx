
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Zap, Users, Calendar } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wLTMwaC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                June 15-17, 2023 • Virtual & In-Person
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Master Modern Web Development
              </h1>
              
              <p className="text-lg text-purple-100 mb-8 max-w-xl">
                Join industry experts for an immersive three-day seminar on cutting-edge web development techniques, tools, and best practices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-900 px-8 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors"
                >
                  Register Now <ArrowRight className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border border-white/40 text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  View Schedule
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {[
                { icon: <Code className="h-5 w-5" />, text: "20+ Technical Sessions" },
                { icon: <Users className="h-5 w-5" />, text: "Industry-Leading Speakers" },
                { icon: <Zap className="h-5 w-5" />, text: "Hands-on Workshops" },
                { icon: <Calendar className="h-5 w-5" />, text: "Networking Events" },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
                >
                  <div className="text-purple-300">
                    {item.icon}
                  </div>
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-400 rounded-lg" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-400 rounded-lg" />
              
              <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-gray-800 h-8 flex items-center px-4 gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="p-4 font-mono text-sm bg-gray-900 text-green-400">
                  <div className="flex">
                    <span className="text-purple-400">const </span>
                    <span className="text-blue-300 ml-2">developer</span>
                    <span className="text-white ml-2">=</span>
                    <span className="text-yellow-300 ml-2">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-300">skills:</span>
                    <span className="text-yellow-300 ml-2">[</span>
                    <span className="text-orange-300">'React'</span>
                    <span className="text-white">,</span>
                    <span className="text-orange-300 ml-1">'TypeScript'</span>
                    <span className="text-white">,</span>
                    <span className="text-orange-300 ml-1">'Node.js'</span>
                    <span className="text-yellow-300">]</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-300">level:</span>
                    <span className="text-orange-300 ml-2">'Beginner'</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-300">goal:</span>
                    <span className="text-orange-300 ml-2">'Become an Expert'</span>
                  </div>
                  <div>
                    <span className="text-yellow-300">{'}'}</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-purple-400">function </span>
                    <span className="text-blue-300">upgradeSkills</span>
                    <span className="text-white">(</span>
                    <span className="text-blue-300">developer</span>
                    <span className="text-white">) {'{}'}</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-purple-300">// Join our seminar to upgrade your skills!</span>
                    <span className="ml-1 animate-pulse">|</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
