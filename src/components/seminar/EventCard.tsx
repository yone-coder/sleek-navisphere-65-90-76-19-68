
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Globe, Users, ExternalLink, Copy } from 'lucide-react';
import RegistrationCountdown from './RegistrationCountdown';

const EventCard = () => {
  // Sample event data
  const event = {
    startDate: "2025-04-15T10:00:00",
    endDate: "2025-04-15T12:30:00",
    location: "Virtual / Zoom",
    platform: "Zoom",
    timeZone: "EDT (UTC-4)",
    attendees: 42,
    maxAttendees: 100,
    registrationDeadline: "2025-04-10T19:59:00",
  };

  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Simulated copy to clipboard function
  const handleCopyMeetingInfo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Calculate spots left percentage
  const spotsLeftPercentage = Math.round(((event.maxAttendees - event.attendees) / event.maxAttendees) * 100);
  
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-3">
        {/* Date and Time */}
        <div className="flex items-start mb-2">
          <Calendar className="w-5 h-5 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-gray-900 font-medium">
              Tue, Apr 15, 2025, 10:00 AM
            </p>
            <div className="flex items-center text-sm text-gray-500 mt-0.5">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Duration: 2h 30m</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Location */}
        <div className="mb-3">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-medium flex items-center">
                  <Video className="w-4 h-4 mr-1 text-green-500" />
                  Virtual / {event.platform}
                </p>
                <button 
                  onClick={toggleExpanded}
                  className="text-blue-500 text-sm font-medium hover:text-blue-700 transition-colors"
                >
                  {expanded ? "Less info" : "More info"}
                </button>
              </div>
              
              {expanded ? (
                <div className="mt-1.5 space-y-1.5 bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 text-gray-500 mr-1.5" />
                    <span className="text-gray-700">Time zone: {event.timeZone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-gray-500 mr-1.5" />
                    <span className="text-gray-700">
                      Attendees: {event.attendees}/{event.maxAttendees}
                      <span className="ml-1 text-green-600 font-medium">
                        ({spotsLeftPercentage}% spots left)
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm text-gray-700">Meeting details will be shared after registration</p>
                    
                    <button 
                      onClick={handleCopyMeetingInfo}
                      className="flex items-center justify-center text-sm bg-blue-100 text-blue-700 py-1 px-2.5 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <span>Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          <span>Copy meeting invitation</span>
                        </>
                      )}
                    </button>
                    
                    <a 
                      href="#" 
                      className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      <span>Test your connection before meeting</span>
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-0.5">Link will be shared after registration</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Registration Countdown - full width with minimal padding */}
        <div className="w-full border-t border-gray-100 pt-2">
          <RegistrationCountdown />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
