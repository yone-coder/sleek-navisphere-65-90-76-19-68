
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, Users, Coffee, Code, Film, Users2, Lightbulb, MessageSquare, Zap, Trophy } from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  type: 'keynote' | 'workshop' | 'panel' | 'break' | 'networking';
  icon: JSX.Element;
}

const agendaData: Record<string, AgendaItem[]> = {
  'day-1': [
    {
      time: '08:00 - 09:00',
      title: 'Registration & Breakfast',
      description: 'Pick up your badge and enjoy a light breakfast while networking with fellow attendees.',
      type: 'networking',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '09:00 - 10:00',
      title: 'Opening Keynote: The Future of Web Development',
      description: 'An inspiring look at where web development is headed and how to prepare for the future.',
      speaker: 'Sarah Johnson, CTO at WebTech',
      type: 'keynote',
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />
    },
    {
      time: '10:15 - 11:45',
      title: 'Workshop: Modern CSS Techniques',
      description: 'Hands-on workshop covering advanced CSS layouts, animations, and responsive design patterns.',
      speaker: 'Michael Lee, CSS Architect',
      type: 'workshop',
      icon: <Code className="h-5 w-5 text-blue-500" />
    },
    {
      time: '12:00 - 13:00',
      title: 'Lunch Break',
      description: 'Enjoy a delicious lunch and continue networking with speakers and attendees.',
      type: 'break',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '13:15 - 14:45',
      title: 'Workshop: JavaScript Performance Optimization',
      description: 'Learn techniques to make your JavaScript code run faster and use less memory.',
      speaker: 'David Rodriguez, Senior Engineer at PerformancePro',
      type: 'workshop',
      icon: <Zap className="h-5 w-5 text-yellow-500" />
    },
    {
      time: '15:00 - 16:00',
      title: 'Panel Discussion: Frontend Frameworks Showdown',
      description: 'Experts debate the pros and cons of React, Vue, Angular, and Svelte.',
      speaker: 'Panel of Framework Experts',
      type: 'panel',
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />
    },
    {
      time: '16:15 - 17:15',
      title: 'Keynote: Accessibility in Modern Web Apps',
      description: 'Why accessibility matters and how to build truly inclusive web experiences.',
      speaker: 'Emily Chen, Accessibility Advocate',
      type: 'keynote',
      icon: <Users2 className="h-5 w-5 text-green-500" />
    },
    {
      time: '17:30 - 19:30',
      title: 'Welcome Reception',
      description: 'Join us for drinks, appetizers, and networking to close out the first day.',
      type: 'networking',
      icon: <Users className="h-5 w-5 text-indigo-500" />
    }
  ],
  'day-2': [
    {
      time: '08:30 - 09:00',
      title: 'Morning Coffee',
      description: 'Grab coffee and prepare for day two of the seminar.',
      type: 'break',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '09:00 - 10:00',
      title: 'Keynote: Web Performance in 2023',
      description: 'Latest techniques and metrics for measuring and improving web performance.',
      speaker: 'James Wilson, Performance Engineer at SpeedMetrics',
      type: 'keynote',
      icon: <Zap className="h-5 w-5 text-yellow-500" />
    },
    {
      time: '10:15 - 11:45',
      title: 'Workshop: Building with React and TypeScript',
      description: 'Hands-on development with React and TypeScript for type-safe applications.',
      speaker: 'Lisa Park, Senior Frontend Developer',
      type: 'workshop',
      icon: <Code className="h-5 w-5 text-blue-500" />
    },
    {
      time: '12:00 - 13:00',
      title: 'Lunch Break',
      description: 'Networking lunch with topic-based table discussions.',
      type: 'break',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '13:15 - 14:45',
      title: 'Workshop: API Design and Implementation',
      description: 'Best practices for designing, building, and documenting RESTful and GraphQL APIs.',
      speaker: 'Alex Thompson, API Architect',
      type: 'workshop',
      icon: <Code className="h-5 w-5 text-blue-500" />
    },
    {
      time: '15:00 - 16:00',
      title: 'Panel: The Future of Backend Technologies',
      description: 'Experts discuss trends in backend development, serverless, and more.',
      speaker: 'Panel of Industry Experts',
      type: 'panel',
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />
    },
    {
      time: '16:15 - 17:15',
      title: 'Live Coding: Building a Full-Stack App',
      description: 'Watch experts build a complete application from scratch in real-time.',
      speaker: 'Dev Team from CodeMasters',
      type: 'workshop',
      icon: <Film className="h-5 w-5 text-red-500" />
    },
    {
      time: '17:30 - 18:30',
      title: 'Closing Keynote: Career Growth in Web Development',
      description: 'Strategies for advancing your career and staying relevant in a changing industry.',
      speaker: 'Dr. Monica Taylor, Career Coach',
      type: 'keynote',
      icon: <Trophy className="h-5 w-5 text-amber-500" />
    }
  ],
  'day-3': [
    {
      time: '09:00 - 09:30',
      title: 'Breakfast & Networking',
      description: 'Final day networking breakfast with fellow attendees.',
      type: 'networking',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '09:30 - 11:00',
      title: 'Workshop: Advanced State Management',
      description: 'Deep dive into state management patterns across different frameworks.',
      speaker: 'Robert Kim, Software Architect',
      type: 'workshop',
      icon: <Code className="h-5 w-5 text-blue-500" />
    },
    {
      time: '11:15 - 12:15',
      title: 'Keynote: Web Security Essentials',
      description: 'Protecting your applications from common vulnerabilities and attacks.',
      speaker: 'Nicole Summers, Security Specialist',
      type: 'keynote',
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />
    },
    {
      time: '12:30 - 13:30',
      title: 'Lunch Break',
      description: 'Final networking lunch of the seminar.',
      type: 'break',
      icon: <Coffee className="h-5 w-5 text-orange-500" />
    },
    {
      time: '13:45 - 15:15',
      title: 'Workshop: Testing Modern Web Applications',
      description: 'Comprehensive testing strategies for frontend and backend applications.',
      speaker: 'Thomas Wright, QA Lead',
      type: 'workshop',
      icon: <Code className="h-5 w-5 text-blue-500" />
    },
    {
      time: '15:30 - 16:30',
      title: 'Panel: Work-Life Balance in Tech',
      description: 'Honest conversation about maintaining balance in a demanding industry.',
      speaker: 'Panel of Industry Veterans',
      type: 'panel',
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />
    },
    {
      time: '16:45 - 17:30',
      title: 'Closing Remarks & Next Steps',
      description: 'Recap of the seminar and resources for continuing your learning journey.',
      speaker: 'Seminar Organizing Team',
      type: 'keynote',
      icon: <Trophy className="h-5 w-5 text-amber-500" />
    },
    {
      time: '17:45 - 20:00',
      title: 'Farewell Reception',
      description: 'Celebrate the conclusion of the seminar with drinks and appetizers.',
      type: 'networking',
      icon: <Users className="h-5 w-5 text-indigo-500" />
    }
  ]
};

export const AgendaSection = () => {
  const [activeDay, setActiveDay] = useState('day-1');
  
  const getBadgeColor = (type: AgendaItem['type']) => {
    switch (type) {
      case 'keynote':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'panel':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'break':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'networking':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="agenda" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Agenda</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Schedule</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three days of inspiring keynotes, hands-on workshops, and networking opportunities to advance your web development skills.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="day-1" value={activeDay} onValueChange={setActiveDay} className="w-full">
            <div className="mb-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="day-1" className="text-sm md:text-base">
                  Day 1 <span className="hidden md:inline">- Foundations</span>
                </TabsTrigger>
                <TabsTrigger value="day-2" className="text-sm md:text-base">
                  Day 2 <span className="hidden md:inline">- Advanced</span>
                </TabsTrigger>
                <TabsTrigger value="day-3" className="text-sm md:text-base">
                  Day 3 <span className="hidden md:inline">- Integration</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.keys(agendaData).map((day) => (
              <TabsContent key={day} value={day} className="mt-0">
                <div className="space-y-8">
                  {agendaData[day].map((item, index) => (
                    <div 
                      key={index} 
                      className="grid md:grid-cols-[150px_1fr] gap-4 border-l-4 pl-6 pr-4 py-4 hover:bg-gray-50 rounded-lg transition-colors"
                      style={{ borderLeftColor: item.type === 'keynote' ? '#FDE68A' : 
                                            item.type === 'workshop' ? '#BFDBFE' : 
                                            item.type === 'panel' ? '#E9D5FF' :
                                            item.type === 'break' ? '#FED7AA' : '#C7D2FE' }}
                    >
                      <div>
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-500">{item.time}</span>
                        </div>
                        <Badge className={`mt-2 ${getBadgeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 mt-1 mb-2">{item.description}</p>
                        {item.speaker && (
                          <div className="text-sm text-gray-500 italic">
                            Presented by: {item.speaker}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            *Schedule subject to minor changes. All attendees will receive updates via email.
          </p>
        </div>
      </div>
    </section>
  );
};
