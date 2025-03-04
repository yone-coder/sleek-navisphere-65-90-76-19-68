
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Coffee, Code, Laptop, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface AgendaItem {
  id: number;
  time: string;
  title: string;
  speaker: string;
  type: "workshop" | "presentation" | "panel" | "break" | "networking";
  description: string;
  location: string;
}

export const AgendaSection = () => {
  const [selectedDay, setSelectedDay] = useState("day1");
  
  const agenda: Record<string, AgendaItem[]> = {
    day1: [
      {
        id: 1,
        time: "08:30 - 09:00",
        title: "Registration & Breakfast",
        speaker: "",
        type: "break",
        description: "Check-in, get your badge, and enjoy breakfast while networking with other attendees.",
        location: "Main Hall"
      },
      {
        id: 2,
        time: "09:00 - 09:30",
        title: "Opening Keynote: The Future of Web Development",
        speaker: "Alex Johnson",
        type: "presentation",
        description: "An inspiring look at where web development is headed in the next five years and how to prepare.",
        location: "Main Stage"
      },
      {
        id: 3,
        time: "09:45 - 11:15",
        title: "Workshop: Building Modern React Applications",
        speaker: "Marcus Williams",
        type: "workshop",
        description: "Hands-on workshop covering React hooks, context, and performance optimization techniques.",
        location: "Workshop Room A"
      },
      {
        id: 4,
        time: "11:15 - 11:45",
        title: "Coffee Break",
        speaker: "",
        type: "break",
        description: "Refuel with coffee and snacks while networking with speakers and attendees.",
        location: "Lounge Area"
      },
      {
        id: 5,
        time: "11:45 - 12:30",
        title: "Designing Accessible Web Applications",
        speaker: "Samantha Chen",
        type: "presentation",
        description: "Learn practical techniques for making your web applications more accessible to all users.",
        location: "Main Stage"
      },
      {
        id: 6,
        time: "12:30 - 13:30",
        title: "Lunch Break",
        speaker: "",
        type: "break",
        description: "Enjoy a catered lunch and connect with other professionals in the industry.",
        location: "Dining Area"
      },
      {
        id: 7,
        time: "13:30 - 15:00",
        title: "Panel Discussion: Frontend Frameworks Showdown",
        speaker: "Multiple Speakers",
        type: "panel",
        description: "Expert panel discussing the pros and cons of various frontend frameworks and their future.",
        location: "Main Stage"
      },
      {
        id: 8,
        time: "15:15 - 16:45",
        title: "Workshop: Performance Optimization Techniques",
        speaker: "Elena Rodriguez",
        type: "workshop",
        description: "Hands-on workshop on measuring and improving web application performance.",
        location: "Workshop Room B"
      },
      {
        id: 9,
        time: "17:00 - 18:30",
        title: "Networking Reception",
        speaker: "",
        type: "networking",
        description: "Unwind with drinks and appetizers while networking with speakers and fellow attendees.",
        location: "Rooftop Garden"
      }
    ],
    day2: [
      {
        id: 1,
        time: "09:00 - 09:30",
        title: "Day 2 Keynote: Web Security Fundamentals",
        speaker: "David Kim",
        type: "presentation",
        description: "Essential security practices every web developer should know and implement.",
        location: "Main Stage"
      },
      {
        id: 2,
        time: "09:45 - 11:15",
        title: "Workshop: Building Secure Authentication Systems",
        speaker: "David Kim & Priya Patel",
        type: "workshop",
        description: "Learn how to implement secure user authentication with best practices for web applications.",
        location: "Workshop Room A"
      },
      {
        id: 3,
        time: "11:15 - 11:45",
        title: "Coffee Break",
        speaker: "",
        type: "break",
        description: "Refuel with coffee and snacks while networking with speakers and attendees.",
        location: "Lounge Area"
      },
      {
        id: 4,
        time: "11:45 - 12:30",
        title: "Serverless Architecture for Modern Web Apps",
        speaker: "Priya Patel",
        type: "presentation",
        description: "Explore the benefits and implementation strategies for serverless architecture.",
        location: "Main Stage"
      },
      {
        id: 5,
        time: "12:30 - 13:30",
        title: "Lunch Break",
        speaker: "",
        type: "break",
        description: "Enjoy a catered lunch and connect with other professionals in the industry.",
        location: "Dining Area"
      },
      {
        id: 6,
        time: "13:30 - 15:00",
        title: "Workshop: Building a Design System",
        speaker: "Samantha Chen",
        type: "workshop",
        description: "Learn how to create, implement, and maintain a comprehensive design system for your projects.",
        location: "Workshop Room A"
      },
      {
        id: 7,
        time: "15:15 - 16:00",
        title: "GraphQL vs REST: When to Use What",
        speaker: "Marcus Williams",
        type: "presentation",
        description: "A practical comparison of GraphQL and REST with guidelines on choosing the right approach.",
        location: "Main Stage"
      },
      {
        id: 8,
        time: "16:15 - 17:30",
        title: "Live Coding Challenge",
        speaker: "Multiple Speakers",
        type: "networking",
        description: "Watch our speakers tackle coding challenges in real-time and vote for your favorite solution.",
        location: "Main Stage"
      }
    ],
    day3: [
      {
        id: 1,
        time: "09:00 - 09:30",
        title: "Day 3 Keynote: The Future of Web Development",
        speaker: "Elena Rodriguez",
        type: "presentation",
        description: "A forward-looking perspective on emerging technologies and practices in web development.",
        location: "Main Stage"
      },
      {
        id: 2,
        time: "09:45 - 11:15",
        title: "Workshop: Advanced CSS Techniques",
        speaker: "Samantha Chen",
        type: "workshop",
        description: "Master advanced CSS layouts, animations, and responsive design techniques.",
        location: "Workshop Room B"
      },
      {
        id: 3,
        time: "11:15 - 11:45",
        title: "Coffee Break",
        speaker: "",
        type: "break",
        description: "Final networking opportunity with coffee and refreshments.",
        location: "Lounge Area"
      },
      {
        id: 4,
        time: "11:45 - 12:30",
        title: "Building for Scale: Lessons from the Field",
        speaker: "Alex Johnson",
        type: "presentation",
        description: "Real-world examples and lessons learned from scaling web applications to millions of users.",
        location: "Main Stage"
      },
      {
        id: 5,
        time: "12:30 - 13:30",
        title: "Lunch Break",
        speaker: "",
        type: "break",
        description: "Final lunch session with themed networking tables based on development topics.",
        location: "Dining Area"
      },
      {
        id: 6,
        time: "13:30 - 15:00",
        title: "Workshop: Testing Web Applications",
        speaker: "Marcus Williams",
        type: "workshop",
        description: "Comprehensive approach to testing web applications with modern tools and techniques.",
        location: "Workshop Room A"
      },
      {
        id: 7,
        time: "15:15 - 16:00",
        title: "Panel: Career Growth in Web Development",
        speaker: "All Speakers",
        type: "panel",
        description: "Our experts share insights on growing your career and staying relevant in web development.",
        location: "Main Stage"
      },
      {
        id: 8,
        time: "16:15 - 17:00",
        title: "Closing Keynote & Awards",
        speaker: "Organizers",
        type: "presentation",
        description: "Final thoughts, key takeaways, and recognition of outstanding participants.",
        location: "Main Stage"
      }
    ]
  };

  const getEventTypeIcon = (type: AgendaItem["type"]) => {
    switch (type) {
      case "workshop":
        return <Laptop className="h-5 w-5 text-amber-500" />;
      case "presentation":
        return <Code className="h-5 w-5 text-blue-500" />;
      case "panel":
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case "break":
        return <Coffee className="h-5 w-5 text-orange-500" />;
      case "networking":
        return <Users className="h-5 w-5 text-purple-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventTypeBadge = (type: AgendaItem["type"]) => {
    switch (type) {
      case "workshop":
        return "bg-amber-100 text-amber-800";
      case "presentation":
        return "bg-blue-100 text-blue-800";
      case "panel":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-orange-100 text-orange-800";
      case "networking":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-600 font-semibold mb-2 inline-block">Full Schedule</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Days of Learning & Networking</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our carefully curated schedule includes hands-on workshops, inspiring presentations, and valuable networking opportunities.
          </p>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <Tabs defaultValue="day1" value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <div className="bg-gray-50 border-b px-6 py-4">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="day1" className="text-sm font-medium">
                Day 1 <span className="hidden md:inline ml-1">· June 15</span>
              </TabsTrigger>
              <TabsTrigger value="day2" className="text-sm font-medium">
                Day 2 <span className="hidden md:inline ml-1">· June 16</span>
              </TabsTrigger>
              <TabsTrigger value="day3" className="text-sm font-medium">
                Day 3 <span className="hidden md:inline ml-1">· June 17</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {["day1", "day2", "day3"].map((day) => (
            <TabsContent key={day} value={day} className="p-6">
              <div className="space-y-6">
                {agenda[day].map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="relative border-l-4 hover:shadow-md transition-shadow" 
                      style={{ 
                        borderLeftColor: item.type === "workshop" ? "#FCD34D" : 
                                        item.type === "presentation" ? "#93C5FD" : 
                                        item.type === "panel" ? "#86EFAC" :
                                        item.type === "break" ? "#FDBA74" : "#C4B5FD" 
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="min-w-[120px] text-gray-500 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{item.time}</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getEventTypeIcon(item.type)}
                              </div>
                              
                              <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                {item.speaker && (
                                  <p className="text-gray-600">{item.speaker}</p>
                                )}
                                <p className="text-gray-500 mt-2 text-sm">{item.description}</p>
                                
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEventTypeBadge(item.type)}`}>
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                  </span>
                                  
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {item.location}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Schedule subject to minor changes. All sessions will be recorded and available to registered attendees.
        </p>
      </div>
    </div>
  );
};
