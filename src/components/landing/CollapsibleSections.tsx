
import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Users, 
  ChevronDown, 
  Globe, 
  Laptop, 
  ShoppingBag, 
  MessageCircle, 
  GraduationCap, 
  Trophy,
  MessageSquare
} from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import ProjectHighlights from './ProjectHighlights';

export function CollapsibleSections() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    story: false,
    services: false,
    testimonials: false,
    team: false
  });

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

  return (
    <div className="w-full py-8 px-0 space-y-8">
      {/* Story and Missions Section */}
      <Collapsible
        open={openSections.story}
        onOpenChange={() => toggleSection('story')}
        className="w-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Story & Missions</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.story ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.story && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 space-y-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-6"></div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" />
                        Our Story
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Founded with a vision to create a digital bridge connecting Haitians worldwide, 
                        our platform began as a grassroots initiative in 2021. What started as a simple 
                        community forum has evolved into a comprehensive ecosystem designed to nurture 
                        talent, preserve culture, and foster economic growth.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-500" />
                        Our Missions
                      </h4>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                          </span>
                          <span>Empower Haitian creators and entrepreneurs through digital tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                          </span>
                          <span>Build a globally accessible marketplace for Haitian goods and services</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2 w-2 bg-pink-500 rounded-full"></span>
                          </span>
                          <span>Preserve and promote Haitian culture through digital experiences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Services Section */}
      <Collapsible
        open={openSections.services}
        onOpenChange={() => toggleSection('services')}
        className="w-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Services</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.services ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.services && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-200 to-transparent mb-6"></div>
                  <ProjectHighlights />
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Testimonials Section */}
      <Collapsible
        open={openSections.testimonials}
        onOpenChange={() => toggleSection('testimonials')}
        className="w-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Testimonials</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.testimonials ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.testimonials && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-10">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-8"></div>
                  {/* Header */}
                  <div className="text-center space-y-4 mb-8">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      What Our Community Is Saying
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
                  </div>
                  
                  {/* Testimonials Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <p className="text-gray-700 leading-relaxed relative mb-6 font-light">
                          <span className="absolute -left-1 -top-4 text-5xl text-indigo-400 opacity-20">"</span>
                          This platform is exactly what the Haitian community needs—an innovative solution that empowers us and brings us together. I'm excited to see the impact it will have!
                        </p>
                        <div className="flex items-center mt-auto">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg shadow-sm">
                            MJ
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-900">Marie Joseph</h4>
                            <p className="text-sm text-gray-500">Haitian Entrepreneur & Community Leader</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <p className="text-gray-700 leading-relaxed relative mb-6 font-light">
                          <span className="absolute -left-1 -top-4 text-5xl text-indigo-400 opacity-20">"</span>
                          A digital hub for Haitians is long overdue. This project will open doors to new opportunities and help bridge the gap between the diaspora and home.
                        </p>
                        <div className="flex items-center mt-auto">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg shadow-sm">
                            JP
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-900">Jean-Louis Pierre</h4>
                            <p className="text-sm text-gray-500">Haitian-American Tech Advocate</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <p className="text-gray-700 leading-relaxed relative mb-6 font-light">
                          <span className="absolute -left-1 -top-4 text-5xl text-indigo-400 opacity-20">"</span>
                          What excites me most about this project is the ability to support local businesses and foster a sense of unity across our global community.
                        </p>
                        <div className="flex items-center mt-auto">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-lg shadow-sm">
                            SL
                          </div>
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-900">Samantha Lemoine</h4>
                            <p className="text-sm text-gray-500">Haitian Influencer & Cultural Advocate</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Our Team Section */}
      <Collapsible
        open={openSections.team}
        onOpenChange={() => toggleSection('team')}
        className="w-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Our Team</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openSections.team ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.team && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-8">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-6"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Marie-Claire Joseph",
                        role: "Founder & CEO",
                        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
                        color: "from-blue-200 to-blue-300"
                      },
                      {
                        name: "Jean-Paul Baptiste",
                        role: "Lead Developer",
                        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                        color: "from-purple-200 to-purple-300"
                      },
                      {
                        name: "Sophia Étienne",
                        role: "Creative Director",
                        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
                        color: "from-pink-200 to-pink-300"
                      },
                      {
                        name: "Michel Toussaint",
                        role: "Community Manager",
                        image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&h=150&fit=crop&crop=faces",
                        color: "from-green-200 to-green-300"
                      }
                    ].map((member, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm">
                        <div className={`w-20 h-20 rounded-full overflow-hidden mb-4 p-1 bg-gradient-to-br ${member.color} shadow-md`}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <h4 className="font-medium text-gray-800">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
}
