
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Video, Globe, Users, ExternalLink, Copy } from 'lucide-react';

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

  const [countdown, setCountdown] = useState({ days: 33, hours: 3, minutes: 29 });
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Calculate countdown to registration deadline
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const deadline = new Date(event.registrationDeadline);
      const diff = deadline.getTime() - now.getTime();
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown({ days, hours, minutes });
    };
    
    // Just for display purposes, we'll use the fixed values
    // calculateCountdown();
    // const timer = setInterval(calculateCountdown, 60000);
    
    // return () => clearInterval(timer);
  }, [event.registrationDeadline]);

  // Calculate spots left percentage
  const spotsLeftPercentage = Math.round(((event.maxAttendees - event.attendees) / event.maxAttendees) * 100);

  // Simulated copy to clipboard function
  const handleCopyMeetingInfo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 -mx-6">
      {/* Card Content */}
      <div className="p-4">
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
        <div className="mb-2">
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
        
        {/* Registration Deadline */}
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
          <div>
            <p className="text-gray-900 font-medium">
              Registration closes on Thu, Apr 10, 2025, 07:59 PM
            </p>
            <div className="flex gap-1.5 text-sm mt-0.5">
              <div className="bg-gray-100 rounded px-2 py-0.5">
                {countdown.days}d
              </div>
              <div className="bg-gray-100 rounded px-2 py-0.5">
                {countdown.hours}h
              </div>
              <div className="bg-gray-100 rounded px-2 py-0.5">
                {countdown.minutes}m
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
