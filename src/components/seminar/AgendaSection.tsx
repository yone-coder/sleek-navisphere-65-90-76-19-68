
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, Coffee, BookOpen, LucideIcon, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SessionType = "workshop" | "talk" | "panel" | "break" | "networking";

interface Session {
  id: string;
  title: string;
  description: string;
  speaker: string;
  time: string;
  duration: string;
  location: string;
  type: SessionType;
  capacity?: number;
  tags?: string[];
}

interface DaySchedule {
  date: string;
  title: string;
  sessions: Session[];
}

const scheduleData: DaySchedule[] = [
  {
    date: "2024-06-15",
    title: "Day 1",
    sessions: [
      {
        id: "1",
        title: "Registration & Welcome Breakfast",
        description: "Pick up your badge and enjoy a networking breakfast.",
        speaker: "Event Staff",
        time: "8:00 AM - 9:00 AM",
        duration: "1 hour",
        location: "Main Hall",
        type: "break",
      },
      {
        id: "2",
        title: "Keynote: The Future of Web Development",
        description: "An inspiring look at where the industry is headed and the technologies that will shape our future.",
        speaker: "Alex Morgan",
        time: "9:00 AM - 10:00 AM",
        duration: "1 hour",
        location: "Main Stage",
        type: "talk",
        tags: ["Future Trends", "Industry Insights"],
      },
      {
        id: "3",
        title: "Workshop: Building Accessible Interfaces",
        description: "Hands-on workshop on creating websites that work for everyone.",
        speaker: "Morgan Lee",
        time: "10:30 AM - 12:30 PM",
        duration: "2 hours",
        location: "Workshop Room A",
        type: "workshop",
        capacity: 30,
        tags: ["Accessibility", "Frontend", "UX"],
      },
      {
        id: "4",
        title: "Lunch Break",
        description: "Catered lunch with vegetarian and vegan options available.",
        speaker: "",
        time: "12:30 PM - 1:30 PM",
        duration: "1 hour",
        location: "Dining Area",
        type: "break",
      },
      {
        id: "5",
        title: "Advanced React Patterns",
        description: "Discover patterns to solve complex UI challenges with React.",
        speaker: "Taylor Rodriguez",
        time: "1:30 PM - 2:30 PM",
        duration: "1 hour",
        location: "Room 101",
        type: "talk",
        tags: ["React", "Advanced", "Frontend"],
      },
      {
        id: "6",
        title: "Panel: The Role of AI in Web Development",
        description: "Industry experts discuss how AI is changing the way we build websites.",
        speaker: "Multiple Speakers",
        time: "3:00 PM - 4:00 PM",
        duration: "1 hour",
        location: "Main Stage",
        type: "panel",
        tags: ["AI", "Future Trends", "Developer Tools"],
      },
      {
        id: "7",
        title: "Networking Reception",
        description: "Connect with fellow attendees, speakers, and sponsors over drinks and appetizers.",
        speaker: "",
        time: "5:00 PM - 7:00 PM",
        duration: "2 hours",
        location: "Rooftop Lounge",
        type: "networking",
      },
    ],
  },
  {
    date: "2024-06-16",
    title: "Day 2",
    sessions: [
      {
        id: "8",
        title: "Morning Coffee",
        description: "Start your day with coffee and light breakfast.",
        speaker: "",
        time: "8:30 AM - 9:00 AM",
        duration: "30 minutes",
        location: "Main Hall",
        type: "break",
      },
      {
        id: "9",
        title: "Web Performance Optimization Strategies",
        description: "Learn how to measure and improve web performance for better user experience.",
        speaker: "Sam Washington",
        time: "9:00 AM - 10:00 AM",
        duration: "1 hour",
        location: "Room 102",
        type: "talk",
        tags: ["Performance", "Optimization", "UX"],
      },
      {
        id: "10",
        title: "Workshop: Design Systems in Practice",
        description: "Building and implementing design systems for consistent user experiences.",
        speaker: "Jamie Chen",
        time: "10:30 AM - 12:30 PM",
        duration: "2 hours",
        location: "Workshop Room B",
        type: "workshop",
        capacity: 30,
        tags: ["Design Systems", "UI", "Collaboration"],
      },
      {
        id: "11",
        title: "Lunch & Learn: Open Source Contribution",
        description: "Join a discussion about getting involved in open source while enjoying lunch.",
        speaker: "Various Speakers",
        time: "12:30 PM - 1:30 PM",
        duration: "1 hour",
        location: "Dining Area",
        type: "networking",
        tags: ["Open Source", "Community"],
      },
      {
        id: "12",
        title: "Modern CI/CD for Web Applications",
        description: "Streamlining deployment pipelines for web projects.",
        speaker: "Jordan Smith",
        time: "1:30 PM - 2:30 PM",
        duration: "1 hour",
        location: "Room 103",
        type: "talk",
        tags: ["DevOps", "CI/CD", "Automation"],
      },
      {
        id: "13",
        title: "Workshop: Serverless Architectures",
        description: "Building scalable applications with serverless technologies.",
        speaker: "Taylor Rodriguez",
        time: "3:00 PM - 5:00 PM",
        duration: "2 hours",
        location: "Workshop Room A",
        type: "workshop",
        capacity: 30,
        tags: ["Serverless", "Cloud", "Backend"],
      },
      {
        id: "14",
        title: "Conference Dinner",
        description: "Enjoy a formal dinner with entertainment and special announcements.",
        speaker: "",
        time: "6:00 PM - 9:00 PM",
        duration: "3 hours",
        location: "Grand Ballroom",
        type: "networking",
      },
    ],
  },
  {
    date: "2024-06-17",
    title: "Day 3",
    sessions: [
      {
        id: "15",
        title: "Breakfast & Roundtable Discussions",
        description: "Join themed tables for focused discussions while enjoying breakfast.",
        speaker: "Various Facilitators",
        time: "8:30 AM - 9:30 AM",
        duration: "1 hour",
        location: "Dining Area",
        type: "networking",
        tags: ["Discussion", "Networking"],
      },
      {
        id: "16",
        title: "The State of Web Standards",
        description: "An update on current and upcoming web standards and browser implementations.",
        speaker: "Morgan Lee",
        time: "9:30 AM - 10:30 AM",
        duration: "1 hour",
        location: "Main Stage",
        type: "talk",
        tags: ["Web Standards", "Browsers", "Future"],
      },
      {
        id: "17",
        title: "Workshop: Advanced CSS Techniques",
        description: "Master modern CSS features for complex layouts and animations.",
        speaker: "Jamie Chen",
        time: "11:00 AM - 1:00 PM",
        duration: "2 hours",
        location: "Workshop Room B",
        type: "workshop",
        capacity: 30,
        tags: ["CSS", "Animation", "Layout"],
      },
      {
        id: "18",
        title: "Lunch Break",
        description: "Final lunch of the conference.",
        speaker: "",
        time: "1:00 PM - 2:00 PM",
        duration: "1 hour",
        location: "Dining Area",
        type: "break",
      },
      {
        id: "19",
        title: "Panel: Career Paths in Web Development",
        description: "Experienced professionals discuss different career trajectories and opportunities.",
        speaker: "Multiple Speakers",
        time: "2:00 PM - 3:00 PM",
        duration: "1 hour",
        location: "Main Stage",
        type: "panel",
        tags: ["Career", "Professional Development"],
      },
      {
        id: "20",
        title: "Closing Keynote: Building the Web of Tomorrow",
        description: "Inspirational talk on how we can collectively shape the future of the web.",
        speaker: "Alex Morgan",
        time: "3:30 PM - 4:30 PM",
        duration: "1 hour",
        location: "Main Stage",
        type: "talk",
        tags: ["Inspiration", "Future", "Community"],
      },
      {
        id: "21",
        title: "Farewell Reception",
        description: "Final networking opportunity with refreshments.",
        speaker: "",
        time: "4:30 PM - 6:00 PM",
        duration: "1.5 hours",
        location: "Main Hall",
        type: "networking",
      },
    ],
  },
];

const getSessionIcon = (type: SessionType): LucideIcon => {
  switch (type) {
    case "workshop":
      return BookOpen;
    case "talk":
      return Video;
    case "panel":
      return Users;
    case "break":
      return Coffee;
    case "networking":
      return Users;
    default:
      return Clock;
  }
};

const getSessionColor = (type: SessionType): string => {
  switch (type) {
    case "workshop":
      return "bg-blue-50 border-blue-200 text-blue-700";
    case "talk":
      return "bg-purple-50 border-purple-200 text-purple-700";
    case "panel":
      return "bg-green-50 border-green-200 text-green-700";
    case "break":
      return "bg-amber-50 border-amber-200 text-amber-700";
    case "networking":
      return "bg-pink-50 border-pink-200 text-pink-700";
    default:
      return "bg-gray-50 border-gray-200 text-gray-700";
  }
};

export const AgendaSection = () => {
  const [activeDay, setActiveDay] = useState("2024-06-15");

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conference Agenda</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three days of inspiring talks, hands-on workshops, and valuable networking
          </p>
        </div>

        <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {scheduleData.map((day) => (
              <TabsTrigger key={day.date} value={day.date} className="text-sm md:text-base">
                {day.title}
                <span className="hidden md:inline ml-2 text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {scheduleData.map((day) => (
            <TabsContent key={day.date} value={day.date} className="space-y-6">
              {day.sessions.map((session) => {
                const SessionIcon = getSessionIcon(session.type);
                const sessionColor = getSessionColor(session.type);
                
                return (
                  <Card key={session.id} className={`border ${sessionColor} transition-all hover:shadow-md`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="md:w-1/4 flex flex-col">
                          <div className="text-lg font-medium mb-1">{session.time}</div>
                          <div className="text-sm text-gray-500 mb-2">{session.duration}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin size={14} /> {session.location}
                          </div>
                          {session.capacity && (
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                              <Users size={14} /> {session.capacity} attendees max
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-3/4">
                          <div className="flex items-start gap-2 mb-3">
                            <Badge variant="outline" className={sessionColor}>
                              <SessionIcon size={14} className="mr-1" />
                              {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                          {session.speaker && (
                            <div className="text-purple-600 mb-2">
                              {session.speaker}
                            </div>
                          )}
                          <p className="text-gray-600 mb-3">{session.description}</p>
                          
                          {session.tags && session.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {session.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
