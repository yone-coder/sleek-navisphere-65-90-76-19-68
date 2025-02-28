
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
  Layers,
  Plus,
  Minus
} from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

export function CollapsibleSections() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    story: false,
    services: false,
    team: false
  });

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

  return (
    <div className="w-full py-8 px-0 space-y-6">
      {/* Story and Missions Section */}
      <Collapsible
        open={openSections.story}
        onOpenChange={() => toggleSection('story')}
        className="group w-full overflow-hidden bg-gradient-to-r from-blue-50/80 to-violet-50/80 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 text-blue-600 border border-blue-200/50 group-hover:scale-105 transition-all duration-300 shadow-sm">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">Our Story and Missions</h3>
              <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Learn about our founding principles and goals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {openSections.story ? 'Close' : 'Expand'}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 border border-blue-100 shadow-sm">
              {openSections.story ? 
                <Minus className="w-5 h-5 text-blue-600" /> : 
                <Plus className="w-5 h-5 text-blue-600" />
              }
            </div>
          </div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.story && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="px-6 pb-8 space-y-8">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      className="space-y-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-blue-100/50"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-blue-100/50">
                        <Globe className="w-5 h-5 text-blue-500" />
                        Our Story
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Founded with a vision to create a digital bridge connecting Haitians worldwide, 
                        our platform began as a grassroots initiative in 2021. What started as a simple 
                        community forum has evolved into a comprehensive ecosystem designed to nurture 
                        talent, preserve culture, and foster economic growth.
                      </p>
                    </motion.div>
                    <motion.div 
                      className="space-y-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-blue-100/50"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2 pb-2 border-b border-purple-100/50">
                        <Trophy className="w-5 h-5 text-purple-500" />
                        Our Missions
                      </h4>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <span className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2.5 w-2.5 bg-purple-500 rounded-full"></span>
                          </span>
                          <span>Empower Haitian creators and entrepreneurs through digital tools</span>
                        </li>
                        <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <span className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
                          </span>
                          <span>Build a globally accessible marketplace for Haitian goods and services</span>
                        </li>
                        <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <span className="h-6 w-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="h-2.5 w-2.5 bg-pink-500 rounded-full"></span>
                          </span>
                          <span>Preserve and promote Haitian culture through digital experiences</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Services We Offer Section */}
      <Collapsible
        open={openSections.services}
        onOpenChange={() => toggleSection('services')}
        className="group w-full overflow-hidden bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm border border-purple-100/50 hover:border-purple-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/20 text-purple-600 border border-purple-200/50 group-hover:scale-105 transition-all duration-300 shadow-sm">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">The Services We Offer</h3>
              <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore our comprehensive service offerings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {openSections.services ? 'Close' : 'Explore'}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 border border-purple-100 shadow-sm">
              {openSections.services ? 
                <Minus className="w-5 h-5 text-purple-600" /> : 
                <Plus className="w-5 h-5 text-purple-600" />
              }
            </div>
          </div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.services && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="px-6 pb-8">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-200 to-transparent mb-8"></div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: <Laptop className="w-5 h-5 text-blue-600" />,
                        title: "Digital Marketplace",
                        description: "A secure platform for buying and selling Haitian products, services, and digital goods globally.",
                        color: "from-blue-50 to-blue-100",
                        iconColor: "text-blue-600",
                        borderColor: "border-blue-100/50",
                        hoverBgColor: "group-hover:bg-blue-100/20",
                        delay: 0.1
                      },
                      {
                        icon: <ShoppingBag className="w-5 h-5 text-purple-600" />,
                        title: "Creator Showcase",
                        description: "Tools for Haitian artists, creators, and developers to showcase and monetize their work.",
                        color: "from-purple-50 to-purple-100",
                        iconColor: "text-purple-600",
                        borderColor: "border-purple-100/50",
                        hoverBgColor: "group-hover:bg-purple-100/20",
                        delay: 0.2
                      },
                      {
                        icon: <MessageCircle className="w-5 h-5 text-pink-600" />,
                        title: "Community Forums",
                        description: "Vibrant discussion spaces connecting Haitians worldwide to share ideas and opportunities.",
                        color: "from-pink-50 to-pink-100",
                        iconColor: "text-pink-600",
                        borderColor: "border-pink-100/50",
                        hoverBgColor: "group-hover:bg-pink-100/20",
                        delay: 0.3
                      },
                      {
                        icon: <GraduationCap className="w-5 h-5 text-green-600" />,
                        title: "Educational Resources",
                        description: "Access to learning materials, courses, and mentorship opportunities focused on digital skills.",
                        color: "from-green-50 to-green-100",
                        iconColor: "text-green-600",
                        borderColor: "border-green-100/50",
                        hoverBgColor: "group-hover:bg-green-100/20",
                        delay: 0.4
                      },
                      {
                        icon: <Trophy className="w-5 h-5 text-yellow-600" />,
                        title: "Competitions & Grants",
                        description: "Regular contests and funding opportunities to support Haitian innovation and entrepreneurship.",
                        color: "from-yellow-50 to-yellow-100",
                        iconColor: "text-yellow-600",
                        borderColor: "border-yellow-100/50",
                        hoverBgColor: "group-hover:bg-yellow-100/20",
                        delay: 0.5
                      }
                    ].map((service, index) => (
                      <motion.div 
                        key={index}
                        className="group p-6 rounded-xl backdrop-blur-sm bg-white/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start border border-purple-100/30 hover:border-purple-200/50"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: service.delay, duration: 0.4 }}
                      >
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} mb-4 ${service.borderColor} border ${service.hoverBgColor} transition-colors group-hover:scale-110 duration-300`}>
                          {service.icon}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">{service.title}</h4>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Meet the Team Section */}
      <Collapsible
        open={openSections.team}
        onOpenChange={() => toggleSection('team')}
        className="group w-full overflow-hidden bg-gradient-to-r from-pink-50/80 to-orange-50/80 backdrop-blur-sm border border-pink-100/50 hover:border-pink-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-pink-500/20 text-pink-600 border border-pink-200/50 group-hover:scale-105 transition-all duration-300 shadow-sm">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-700 transition-colors">Meet the Team</h3>
              <p className="text-sm text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Get to know the people behind our mission</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {openSections.team ? 'Close' : 'View Team'}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 border border-pink-100 shadow-sm">
              {openSections.team ? 
                <Minus className="w-5 h-5 text-pink-600" /> : 
                <Plus className="w-5 h-5 text-pink-600" />
              }
            </div>
          </div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.team && (
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="px-6 pb-8">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-8"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Marie-Claire Joseph",
                        role: "Founder & CEO",
                        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
                        color: "from-blue-200 to-blue-300",
                        delay: 0.1
                      },
                      {
                        name: "Jean-Paul Baptiste",
                        role: "Lead Developer",
                        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                        color: "from-purple-200 to-purple-300",
                        delay: 0.2
                      },
                      {
                        name: "Sophia Étienne",
                        role: "Creative Director",
                        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
                        color: "from-pink-200 to-pink-300",
                        delay: 0.3
                      },
                      {
                        name: "Michel Toussaint",
                        role: "Community Manager",
                        image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&h=150&fit=crop&crop=faces",
                        color: "from-green-200 to-green-300",
                        delay: 0.4
                      }
                    ].map((member, index) => (
                      <motion.div 
                        key={index} 
                        className="group flex flex-col items-center text-center p-5 rounded-xl hover:shadow-md transition-all duration-300 bg-white/60 backdrop-blur-sm border border-pink-100/30 hover:border-pink-200/50"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: member.delay, duration: 0.4 }}
                      >
                        <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 p-1.5 bg-gradient-to-br ${member.color} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <h4 className="font-medium text-gray-800 group-hover:text-pink-700 transition-colors">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                        <button className="mt-3 px-4 py-1.5 rounded-full text-xs font-medium text-gray-500 bg-white/50 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200">
                          View Profile
                        </button>
                      </motion.div>
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
