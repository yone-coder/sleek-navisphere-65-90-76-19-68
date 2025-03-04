
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  topics: string[];
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export const SpeakersSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const speakers: Speaker[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Frontend Engineer",
      company: "TechGiant",
      bio: "Alex has over 10 years of experience in frontend development and specializes in React and modern JavaScript frameworks. He's contributed to several open-source projects and regularly speaks at international conferences.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker1",
      topics: ["React Architecture", "Performance Optimization", "Component Design"],
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
        website: "#"
      }
    },
    {
      id: 2,
      name: "Samantha Chen",
      role: "UX/UI Design Lead",
      company: "DesignStudio",
      bio: "Samantha bridges the gap between design and development with her expertise in both UX principles and frontend implementation. She's passionate about creating accessible, beautiful user interfaces.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker2",
      topics: ["Design Systems", "Accessibility", "UI Animation"],
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Marcus Williams",
      role: "Full Stack Developer",
      company: "StartupInnovate",
      bio: "Marcus brings a wealth of experience from both startups and enterprise environments. He specializes in Node.js backends and has built several successful web applications from the ground up.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker3",
      topics: ["API Design", "Serverless Architecture", "Database Optimization"],
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
        website: "#"
      }
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "DevOps Engineer",
      company: "CloudSolutions",
      bio: "Priya specializes in CI/CD pipelines and cloud infrastructure. She helps teams implement DevOps best practices to streamline their development workflows and improve deployment reliability.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker4",
      topics: ["CI/CD Pipelines", "Docker & Kubernetes", "Cloud Infrastructure"],
      socials: {
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 5,
      name: "David Kim",
      role: "Security Specialist",
      company: "SecureWeb",
      bio: "David is an expert in web application security with a focus on frontend vulnerabilities. He regularly conducts security audits and helps development teams build more secure web applications.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker5",
      topics: ["OWASP Top 10", "Auth Best Practices", "Security Testing"],
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 6,
      name: "Elena Rodriguez",
      role: "Performance Engineer",
      company: "FastLoad Inc.",
      bio: "Elena specializes in web performance optimization and has helped numerous companies improve their Core Web Vitals. She's a contributor to several performance monitoring tools.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker6",
      topics: ["Core Web Vitals", "Bundle Optimization", "Runtime Performance"],
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
        website: "#"
      }
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-600 font-semibold mb-2 inline-block">Learn from the Best</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Speakers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our carefully selected speakers bring real-world expertise and cutting-edge knowledge from the industry's leading companies.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedSpeaker(speaker)}
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
              <p className="text-gray-600 mb-3">{speaker.role} at {speaker.company}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {speaker.topics.map((topic, idx) => (
                  <span 
                    key={idx} 
                    className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {speaker.socials.twitter && (
                    <a href={speaker.socials.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.socials.github && (
                    <a href={speaker.socials.github} className="text-gray-400 hover:text-gray-800 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.socials.linkedin && (
                    <a href={speaker.socials.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {speaker.socials.website && (
                    <a href={speaker.socials.website} className="text-gray-400 hover:text-purple-600 transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                
                <span className="text-sm text-purple-600 font-medium">View Profile</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <Dialog open={!!selectedSpeaker} onOpenChange={() => setSelectedSpeaker(null)}>
        <DialogContent className="sm:max-w-xl">
          {selectedSpeaker && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSpeaker.name}</DialogTitle>
                <DialogDescription>{selectedSpeaker.role} at {selectedSpeaker.company}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="flex justify-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-purple-200">
                    <img 
                      src={selectedSpeaker.image} 
                      alt={selectedSpeaker.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-gray-600 text-sm mb-4">{selectedSpeaker.bio}</p>
                  
                  <h4 className="font-semibold mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSpeaker.topics.map((topic, idx) => (
                      <span 
                        key={idx} 
                        className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="font-semibold mb-2">Connect</h4>
                  <div className="flex space-x-3">
                    {selectedSpeaker.socials.twitter && (
                      <a href={selectedSpeaker.socials.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {selectedSpeaker.socials.github && (
                      <a href={selectedSpeaker.socials.github} className="text-gray-400 hover:text-gray-800 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {selectedSpeaker.socials.linkedin && (
                      <a href={selectedSpeaker.socials.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {selectedSpeaker.socials.website && (
                      <a href={selectedSpeaker.socials.website} className="text-gray-400 hover:text-purple-600 transition-colors">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
