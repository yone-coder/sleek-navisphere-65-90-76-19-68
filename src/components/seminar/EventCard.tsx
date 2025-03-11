
import React, { useState } from 'react';
import { MapPin, Copy } from 'lucide-react';
import RegistrationCountdown from './RegistrationCountdown';
import EnhancedDateTime from './EnhancedDateTime';
import VirtualMeetingHelper from './VirtualMeetingHelper';

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
  
  // Simulated copy to clipboard function
  const handleCopyMeetingInfo = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Calculate spots left percentage
  const spotsLeftPercentage = Math.round(((event.maxAttendees - event.attendees) / event.maxAttendees) * 100);
  
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-3">
        {/* Enhanced DateTime Component */}
        <EnhancedDateTime />
        
        {/* Registration Deadline Section - with countdown timer */}
        <div className="mb-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Registration Closing Soon</h3>
          <div className="text-sm text-gray-600 mb-2">
            {new Date(event.registrationDeadline).toLocaleDateString('en-US', { 
              weekday: 'short',
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
            {' '}
            {new Date(event.registrationDeadline).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-700 font-medium">Registration Open</span>
            <span className="text-gray-600 text-sm">{spotsLeftPercentage}% Complete</span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: `${spotsLeftPercentage}%` }}
            ></div>
          </div>
          
          <div className="mb-1 text-gray-600 text-sm font-medium">Closing</div>
          <RegistrationCountdown />
        </div>
        
        {/* Virtual Meeting Helper - Full Width */}
        <div className="w-full mb-3">
          <VirtualMeetingHelper />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
