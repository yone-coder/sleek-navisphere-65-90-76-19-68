
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, GraduationCap, MapPin } from 'lucide-react';

interface AgendaSectionProps {
  id: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerRole: string;
  speakerImage: string;
  time: string;
  duration: string;
  location: string;
  category: "workshop" | "talk" | "panel" | "break";
}

const day1Sessions: Session[] = [
  {
    id: "1-1",
    title: "Registration & Breakfast",
    description: "Join us for a networking breakfast before the seminar begins.",
    speaker: "Staff",
    speakerRole: "Organizers",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff1",
    time: "8:00 AM",
    duration: "1 hour",
    location: "Main Hall",
    category: "break"
  },
  {
    id: "1-2",
    title: "Opening Keynote: The Future of Web Development",
    description: "An inspiring talk about where the web is heading and how developers can stay ahead of the curve.",
    speaker: "Marcus Chen",
    speakerRole: "CTO at WebScale",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker2",
    time: "9:00 AM",
    duration: "1 hour",
    location: "Main Stage",
    category: "talk"
  },
  {
    id: "1-3",
    title: "Modern CSS Techniques",
    description: "Learn about the latest CSS features and how to use them effectively in your projects.",
    speaker: "Elena Rodriguez",
    speakerRole: "UX Designer & Developer",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker3",
    time: "10:15 AM",
    duration: "45 minutes",
    location: "Room A",
    category: "talk"
  },
  {
    id: "1-4",
    title: "Building Accessible React Applications",
    description: "Practical techniques for ensuring your React apps are accessible to all users.",
    speaker: "Sarah Johnson",
    speakerRole: "Senior Frontend Engineer",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker1",
    time: "10:15 AM",
    duration: "45 minutes",
    location: "Room B",
    category: "talk"
  },
  {
    id: "1-5",
    title: "Coffee Break & Networking",
    description: "Refuel with coffee and connect with fellow attendees.",
    speaker: "Staff",
    speakerRole: "Organizers",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff2",
    time: "11:00 AM",
    duration: "30 minutes",
    location: "Lounge Area",
    category: "break"
  },
  {
    id: "1-6",
    title: "Workshop: Building a Design System from Scratch",
    description: "Hands-on workshop where you'll learn how to create a comprehensive design system for your organization.",
    speaker: "Sarah Johnson",
    speakerRole: "Senior Frontend Engineer",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker1",
    time: "11:30 AM",
    duration: "2 hours",
    location: "Workshop Room 1",
    category: "workshop"
  },
  {
    id: "1-7",
    title: "Panel Discussion: Frontend Frameworks - Which One to Choose?",
    description: "Industry experts discuss the pros and cons of popular frontend frameworks and help you decide which is best for your projects.",
    speaker: "Multiple Speakers",
    speakerRole: "Industry Experts",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=panel1",
    time: "11:30 AM",
    duration: "1 hour",
    location: "Main Stage",
    category: "panel"
  }
];

const day2Sessions: Session[] = [
  {
    id: "2-1",
    title: "Breakfast & Networking",
    description: "Start your day with breakfast and conversations with other attendees.",
    speaker: "Staff",
    speakerRole: "Organizers",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff3",
    time: "8:30 AM",
    duration: "45 minutes",
    location: "Main Hall",
    category: "break"
  },
  {
    id: "2-2",
    title: "Building Secure Web Applications",
    description: "Learn essential security practices to protect your web applications from common vulnerabilities.",
    speaker: "Alex Thompson",
    speakerRole: "Security Specialist",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker6",
    time: "9:15 AM",
    duration: "1 hour",
    location: "Main Stage",
    category: "talk"
  },
  {
    id: "2-3",
    title: "Workshop: Implementing CI/CD for Web Projects",
    description: "Hands-on session where you'll set up a complete CI/CD pipeline for a web application.",
    speaker: "Priya Patel",
    speakerRole: "DevOps Engineer",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker5",
    time: "10:30 AM",
    duration: "2 hours",
    location: "Workshop Room 2",
    category: "workshop"
  },
  {
    id: "2-4",
    title: "API Design Best Practices",
    description: "Guidelines for creating robust, developer-friendly APIs that stand the test of time.",
    speaker: "James Wilson",
    speakerRole: "Backend Architect",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker4",
    time: "10:30 AM",
    duration: "45 minutes",
    location: "Room A",
    category: "talk"
  },
  {
    id: "2-5",
    title: "Lunch Break",
    description: "Enjoy a delicious lunch with fellow attendees.",
    speaker: "Staff",
    speakerRole: "Organizers",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff4",
    time: "12:30 PM",
    duration: "1 hour",
    location: "Dining Area",
    category: "break"
  },
  {
    id: "2-6",
    title: "Closing Keynote: Becoming a Better Developer",
    description: "Inspirational talk on continuous learning and growth as a web developer.",
    speaker: "Elena Rodriguez",
    speakerRole: "UX Designer & Developer",
    speakerImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=speaker3",
    time: "3:30 PM",
    duration: "1 hour",
    location: "Main Stage",
    category: "talk"
  }
];

const AgendaSection = ({ id }: AgendaSectionProps) => {
  const [activeDay, setActiveDay] = useState("day1");
  
  const categoryColors = {
    workshop: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      icon: "text-indigo-500"
    },
    talk: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: "text-purple-500"
    },
    panel: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "text-blue-500"
    },
    break: {
      bg: "bg-gray-50",
      text: "text-gray-700",
      border: "border-gray-200",
      icon: "text-gray-500"
    }
  };
  
  return (
    <section id={id} className="py-24 bg-white">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-indigo-300 bg-indigo-50 text-indigo-600 mb-4"
          >
            <Calendar className="mr-1 h-3 w-3" /> Event Schedule
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Two Days of Learning
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Packed with workshops, talks, and networking opportunities.
          </motion.p>
        </div>
        
        <Tabs value={activeDay} onValueChange={setActiveDay} className="mx-auto max-w-4xl">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="day1" className="text-sm md:text-base">
                Day 1 - June 15
              </TabsTrigger>
              <TabsTrigger value="day2" className="text-sm md:text-base">
                Day 2 - June 16
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="text-center mb-8">
            <div className="inline-flex gap-3 flex-wrap justify-center">
              {Object.entries(categoryColors).map(([category, colors]) => (
                <div key={category} className="flex items-center gap-1.5">
                  <div className={`h-3 w-3 rounded-full ${colors.bg} ${colors.border} border`}></div>
                  <span className="text-xs text-slate-600 capitalize">{category}</span>
                </div>
              ))}
            </div>
          </div>
          
          <TabsContent value="day1" className="mt-0 space-y-6">
            {day1Sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`p-6 rounded-xl border ${categoryColors[session.category].border} ${categoryColors[session.category].bg}`}>
                  <div className="md:flex justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${categoryColors[session.category].text}`}>
                        {session.title}
                      </h3>
                      <p className="text-slate-600 mt-1 mb-4">
                        {session.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.time} ({session.duration})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {session.category !== "break" && (
                      <div className="mt-4 md:mt-0">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-white shadow-sm">
                          {session.category}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="day2" className="mt-0 space-y-6">
            {day2Sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`p-6 rounded-xl border ${categoryColors[session.category].border} ${categoryColors[session.category].bg}`}>
                  <div className="md:flex justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${categoryColors[session.category].text}`}>
                        {session.title}
                      </h3>
                      <p className="text-slate-600 mt-1 mb-4">
                        {session.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.time} ({session.duration})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className={`h-4 w-4 ${categoryColors[session.category].icon}`} />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {session.category !== "break" && (
                      <div className="mt-4 md:mt-0">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-white shadow-sm">
                          {session.category}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AgendaSection;
