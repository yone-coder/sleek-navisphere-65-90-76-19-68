
import React, { useState } from 'react';
import { Clock, Calendar, Users, Map, Coffee, CheckCircle } from 'lucide-react';

// Sample data - replace with your actual sessions
const sessions = [
  {
    id: 1,
    title: "Opening Keynote: Future of Digital Innovation",
    time: "09:00 - 10:00",
    speaker: "Alexandra Chen",
    room: "Main Hall",
    type: "keynote",
    description: "An inspiring look at emerging trends and how they'll shape our digital landscape over the next decade.",
    tags: ["innovation", "future", "technology"],
    registered: true,
    startTime: 9 * 60, // 9:00 in minutes
    endTime: 10 * 60  // 10:00 in minutes
  },
  {
    id: 2,
    title: "Workshop: Practical AI Implementation Strategies",
    time: "10:30 - 12:00",
    speaker: "Marcus Johnson",
    room: "Workshop Room A",
    type: "workshop",
    description: "Hands-on session exploring real-world applications of AI in business contexts.",
    tags: ["AI", "machine learning", "practical"],
    materials: ["laptop", "example dataset"],
    registered: false,
    startTime: 10 * 60 + 30, // 10:30 in minutes
    endTime: 12 * 60  // 12:00 in minutes
  },
  {
    id: 3,
    title: "Lunch Break & Networking",
    time: "12:00 - 13:30",
    room: "Dining Area",
    type: "break",
    description: "Refuel and connect with fellow attendees.",
    registered: true,
    startTime: 12 * 60, // 12:00 in minutes
    endTime: 13 * 60 + 30  // 13:30 in minutes
  },
  {
    id: 4,
    title: "Panel Discussion: Ethical Considerations in Tech",
    time: "13:30 - 14:45",
    speakers: ["Elena Patel", "David Kim", "Sophia Williams"],
    room: "Auditorium",
    type: "panel",
    description: "Industry experts debate the most pressing ethical questions facing technology today.",
    tags: ["ethics", "responsibility", "impact"],
    registered: true,
    startTime: 13 * 60 + 30, // 13:30 in minutes
    endTime: 14 * 60 + 45  // 14:45 in minutes
  },
  {
    id: 5,
    title: "Deep Dive: Advanced Data Visualization",
    time: "15:00 - 16:30",
    speaker: "James Rodriguez",
    room: "Tech Lab",
    type: "technical",
    description: "Technical session on creating compelling and insightful data visualizations.",
    tags: ["data", "visualization", "technical"],
    materials: ["visualization software", "sample datasets"],
    registered: false,
    startTime: 15 * 60, // 15:00 in minutes
    endTime: 16 * 60 + 30  // 16:30 in minutes
  },
  {
    id: 6,
    title: "Closing Remarks & Next Steps",
    time: "16:45 - 17:30",
    speaker: "Alexandra Chen",
    room: "Main Hall",
    type: "closing",
    description: "Summarizing key takeaways and outlining future opportunities.",
    registered: true,
    startTime: 16 * 60 + 45, // 16:45 in minutes
    endTime: 17 * 60 + 30  // 17:30 in minutes
  }
];

// Modern color palette - rich gradients for a more polished look
const typeColors = {
  keynote: "bg-indigo-100 text-indigo-800",
  workshop: "bg-green-100 text-green-800",
  break: "bg-orange-100 text-orange-800",
  panel: "bg-purple-100 text-purple-800",
  technical: "bg-blue-100 text-blue-800",
  closing: "bg-red-100 text-red-800"
};

// Updated progress bar colors with gradients
const progressColors = {
  keynote: "from-indigo-400 to-indigo-600",
  workshop: "from-green-400 to-green-600",
  break: "from-orange-400 to-orange-600",
  panel: "from-purple-400 to-purple-600",
  technical: "from-blue-400 to-blue-600",
  closing: "from-red-400 to-red-600"
};

// Icons for different session types
const typeIcons = {
  keynote: <Users className="w-4 h-4" />,
  workshop: <Coffee className="w-4 h-4" />,
  break: <Coffee className="w-4 h-4" />,
  panel: <Users className="w-4 h-4" />,
  technical: <Map className="w-4 h-4" />,
  closing: <CheckCircle className="w-4 h-4" />
};

// Component for the time display with animation
const TimeDisplay = ({ time }: { time: string }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <Clock className="w-4 h-4" />
      <span>{time}</span>
    </div>
  );
};

// Tag component
const Tag = ({ text }: { text: string }) => {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
      {text}
    </span>
  );
};

const WebinarSchedule = () => {
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(13 * 60); // Example current time: 1:00 PM

  // Toggle session expansion
  const toggleSessionExpansion = (id: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setExpandedSession(expandedSession === id ? null : id);
      setIsAnimating(false);
    }, 150);
  };

  // Register for a session
  const toggleRegistration = (id: number) => {
    // In real implementation, this would update your state or call an API
    console.log(`Toggled registration for session ${id}`);
  };

  // Calculate day start and end times for progress bar
  const dayStartTime = Math.min(...sessions.map(s => s.startTime));
  const dayEndTime = Math.max(...sessions.map(s => s.endTime));
  const totalDayLength = dayEndTime - dayStartTime;

  // Progress bar segments calculation
  const calculateProgressSegments = () => {
    return sessions.map(session => {
      const width = ((session.endTime - session.startTime) / totalDayLength) * 100;
      const left = ((session.startTime - dayStartTime) / totalDayLength) * 100;
      return {
        id: session.id,
        type: session.type,
        width: `${width}%`,
        left: `${left}%`,
        color: progressColors[session.type as keyof typeof progressColors],
        title: session.title,
        time: session.time,
        isActive: currentTime >= session.startTime && currentTime <= session.endTime
      };
    });
  };

  const progressSegments = calculateProgressSegments();
  
  // Calculate time indicator position
  const timeIndicatorPosition = ((currentTime - dayStartTime) / totalDayLength) * 100;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Webinar Sessions</h1>
        <p className="text-gray-600">Plan your day and make the most of our exciting program</p>
      </div>

      {/* Compact Timeline Progress Bar */}
      <div className="mb-8">
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          {/* Session blocks */}
          {progressSegments.map(segment => (
            <div
              key={segment.id}
              className={`absolute top-0 h-full bg-gradient-to-r ${segment.color} transition-all duration-300 ${segment.isActive ? 'ring-1 ring-white ring-opacity-70' : ''}`}
              style={{
                width: segment.width,
                left: segment.left
              }}
              title={segment.title}
            />
          ))}
          
          {/* Current time indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${timeIndicatorPosition}%` }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-red-500"></div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {Object.entries(progressColors).map(([type, color]) => (
            <div key={type} className="flex items-center bg-white px-2 py-0.5 rounded-full shadow-sm">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-1`}></div>
              <span className="text-xs text-gray-700 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          <div className="space-y-8">
            {sessions.map(session => (
              <div key={session.id} className="relative pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-0 top-4 w-8 h-8 rounded-full ${typeColors[session.type as keyof typeof typeColors]} flex items-center justify-center shadow-sm border border-white`}>
                  {typeIcons[session.type as keyof typeof typeIcons]}
                </div>
                
                {/* Session card */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <TimeDisplay time={session.time} />
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${typeColors[session.type as keyof typeof typeColors]}`}>
                        {session.type}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                    <p className="text-sm text-gray-700 mb-3">{session.description}</p>
                    
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="text-sm text-gray-600 mb-2">
                        {session.speaker && <span>{session.speaker} • </span>}
                        {session.speakers && <span>{session.speakers.join(', ')} • </span>}
                        <span>{session.room}</span>
                      </div>
                      
                      <button
                        onClick={() => toggleRegistration(session.id)}
                        className={`text-xs font-medium px-3 py-1 rounded-full transition-colors duration-200 ${
                          session.registered 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {session.registered ? 'Registered' : 'Register'}
                      </button>
                    </div>
                    
                    {/* Tags */}
                    {session.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {session.tags.map(tag => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    )}
                    
                    {/* Expandable content button */}
                    {session.materials && (
                      <button
                        onClick={() => toggleSessionExpansion(session.id)}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        {expandedSession === session.id ? 'Show less' : 'Show materials'}
                      </button>
                    )}
                    
                    {/* Expanded materials */}
                    {expandedSession === session.id && session.materials && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-semibold mb-2">Materials Needed:</h4>
                        <ul className="text-sm text-gray-700 list-disc pl-5">
                          {session.materials.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex flex-wrap justify-around">
          <div className="text-center px-4 py-2">
            <div className="text-3xl font-bold text-gray-900">{sessions.length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div className="text-center px-4 py-2">
            <div className="text-3xl font-bold text-gray-900">{sessions.filter(s => s.registered).length}</div>
            <div className="text-sm text-gray-600">Your Sessions</div>
          </div>
          <div className="text-center px-4 py-2">
            <div className="text-3xl font-bold text-gray-900">7.5</div>
            <div className="text-sm text-gray-600">Hours of Content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarSchedule;
