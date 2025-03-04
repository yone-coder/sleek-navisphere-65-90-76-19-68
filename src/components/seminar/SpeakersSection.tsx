
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GraduationCap, Linkedin, Twitter, Globe } from 'lucide-react';

interface SpeakersProps {
  id: string;
}

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  topics: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Engineer",
    company: "TechFusion",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker1",
    bio: "Sarah is a seasoned frontend developer with over 10 years of experience creating responsive, accessible web applications. She is passionate about design systems and component-driven development.",
    topics: ["React", "Design Systems", "Web Accessibility"],
    socialLinks: {
      twitter: "https://twitter.com/sarahjdev",
      linkedin: "https://linkedin.com/in/sarahjdev",
      website: "https://sarahjohnson.dev"
    }
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "CTO",
    company: "WebScale",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker2",
    bio: "Marcus leads the technical team at WebScale, focusing on building high-performance web applications that can handle millions of users. He's an advocate for server-side rendering and edge computing.",
    topics: ["Performance Optimization", "Next.js", "Edge Computing"],
    socialLinks: {
      twitter: "https://twitter.com/marcuschen",
      linkedin: "https://linkedin.com/in/marcuschen"
    }
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "UX Designer & Developer",
    company: "DesignCode",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker3",
    bio: "Elena bridges the gap between design and development. With a background in both fields, she creates beautiful, user-friendly interfaces that are easy to implement.",
    topics: ["UI/UX Design", "CSS Architecture", "Design-to-Code Workflow"],
    socialLinks: {
      twitter: "https://twitter.com/elenarodesign",
      website: "https://elenarodriguez.design"
    }
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Backend Architect",
    company: "ServerStack",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker4",
    bio: "James specializes in building scalable backend systems using modern technologies. He's a contributor to several open-source projects and loves teaching others about system design.",
    topics: ["API Design", "Node.js", "Microservices"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/jameswilson",
      website: "https://jameswilson.tech"
    }
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "DevOps Engineer",
    company: "CloudNative",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker5",
    bio: "Priya helps teams implement CI/CD pipelines and container orchestration. She's known for making complex DevOps concepts accessible to developers of all skill levels.",
    topics: ["Docker", "Kubernetes", "CI/CD Pipelines"],
    socialLinks: {
      twitter: "https://twitter.com/priyaops",
      linkedin: "https://linkedin.com/in/priyapatel"
    }
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "Security Specialist",
    company: "SecureWeb",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker6",
    bio: "Alex focuses on web application security and teaches developers how to build secure applications from the ground up. Former ethical hacker turned educator.",
    topics: ["Web Security", "Authentication Systems", "OWASP Top 10"],
    socialLinks: {
      twitter: "https://twitter.com/alextsec",
      website: "https://alexthompson.security"
    }
  }
];

const SpeakersSection = ({ id }: SpeakersProps) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  
  return (
    <section id={id} className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-purple-300 bg-purple-50 text-purple-600 mb-4"
          >
            <GraduationCap className="mr-1 h-3 w-3" /> Expert Speakers
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Learn from Industry Leaders
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Our carefully selected speakers represent the best minds in web development today.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200/50"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16 border-2 border-purple-100">
                      <img src={speaker.image} alt={speaker.name} />
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg group-hover:text-purple-600 transition-colors">
                        {speaker.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {speaker.role} at {speaker.company}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {speaker.topics.map(topic => (
                      <span key={topic} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors"
                    onClick={() => setSelectedSpeaker(speaker)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Speaker Detail Dialog */}
      <Dialog open={!!selectedSpeaker} onOpenChange={(open) => !open && setSelectedSpeaker(null)}>
        <DialogContent className="sm:max-w-xl">
          {selectedSpeaker && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedSpeaker.image} alt={selectedSpeaker.name} />
                  </Avatar>
                  {selectedSpeaker.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedSpeaker.role} at {selectedSpeaker.company}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <p className="text-slate-700">
                  {selectedSpeaker.bio}
                </p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpeaker.topics.map(topic => (
                      <span key={topic} className="text-xs px-2 py-1 bg-purple-50 rounded-full text-purple-700">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Connect</h4>
                  <div className="flex gap-2">
                    {selectedSpeaker.socialLinks.twitter && (
                      <a href={selectedSpeaker.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {selectedSpeaker.socialLinks.linkedin && (
                      <a href={selectedSpeaker.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-700/10 text-blue-700 hover:bg-blue-700/20 transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {selectedSpeaker.socialLinks.website && (
                      <a href={selectedSpeaker.socialLinks.website} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SpeakersSection;
