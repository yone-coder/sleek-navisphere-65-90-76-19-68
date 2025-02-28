
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
  Trophy
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
    <div className="w-full max-w-5xl mx-auto py-8 px-4 space-y-6">
      {/* Story and Missions Section */}
      <Collapsible
        open={openSections.story}
        onOpenChange={() => toggleSection('story')}
        className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Our Story and Missions</h3>
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
                <Card className="border-0 shadow-none mx-6 mb-6">
                  <CardContent className="p-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-500" />
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
                          <Trophy className="w-4 h-4 text-purple-500" />
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
                  </CardContent>
                </Card>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Services We Offer Section */}
      <Collapsible
        open={openSections.services}
        onOpenChange={() => toggleSection('services')}
        className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">The Services We Offer</h3>
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
                <Card className="border-0 shadow-none mx-6 mb-6">
                  <CardContent className="p-0">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white flex flex-col items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 mb-4">
                          <Laptop className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Digital Marketplace</h4>
                        <p className="text-gray-600 text-sm">A secure platform for buying and selling Haitian products, services, and digital goods globally.</p>
                      </div>
                      
                      <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white flex flex-col items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 mb-4">
                          <ShoppingBag className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Creator Showcase</h4>
                        <p className="text-gray-600 text-sm">Tools for Haitian artists, creators, and developers to showcase and monetize their work.</p>
                      </div>
                      
                      <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white flex flex-col items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 mb-4">
                          <MessageCircle className="w-5 h-5 text-pink-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Community Forums</h4>
                        <p className="text-gray-600 text-sm">Vibrant discussion spaces connecting Haitians worldwide to share ideas and opportunities.</p>
                      </div>
                      
                      <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white flex flex-col items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 mb-4">
                          <GraduationCap className="w-5 h-5 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Educational Resources</h4>
                        <p className="text-gray-600 text-sm">Access to learning materials, courses, and mentorship opportunities focused on digital skills.</p>
                      </div>
                      
                      <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 bg-white flex flex-col items-start">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 mb-4">
                          <Trophy className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">Competitions & Grants</h4>
                        <p className="text-gray-600 text-sm">Regular contests and funding opportunities to support Haitian innovation and entrepreneurship.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Meet the Team Section */}
      <Collapsible
        open={openSections.team}
        onOpenChange={() => toggleSection('team')}
        className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Meet the Team</h3>
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
                <Card className="border-0 shadow-none mx-6 mb-6">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[
                        {
                          name: "Marie-Claire Joseph",
                          role: "Founder & CEO",
                          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
                          color: "from-blue-100 to-blue-200"
                        },
                        {
                          name: "Jean-Paul Baptiste",
                          role: "Lead Developer",
                          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                          color: "from-purple-100 to-purple-200"
                        },
                        {
                          name: "Sophia Étienne",
                          role: "Creative Director",
                          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
                          color: "from-pink-100 to-pink-200"
                        },
                        {
                          name: "Michel Toussaint",
                          role: "Community Manager",
                          image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&h=150&fit=crop&crop=faces",
                          color: "from-green-100 to-green-200"
                        }
                      ].map((member, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-md transition-all duration-300">
                          <div className={`w-20 h-20 rounded-full overflow-hidden mb-4 p-1 bg-gradient-to-br ${member.color}`}>
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
                  </CardContent>
                </Card>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
}
