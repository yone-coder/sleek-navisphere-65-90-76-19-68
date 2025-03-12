
import React, { useState } from 'react';
import { MapPin, Copy } from 'lucide-react';
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
  
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Content */}
      <div className="p-3">
        {/* Virtual Meeting Helper - Full Width */}
        <div className="w-full mb-3">
          <VirtualMeetingHelper />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
