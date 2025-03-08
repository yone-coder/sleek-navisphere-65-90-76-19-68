
import React from 'react';
import { Clock, Calendar, TimerOff, ArrowRight, Sun, Cloud, Sunrise } from 'lucide-react';

const EnhancedDateTime = () => {
  // Event details
  const eventDate = new Date('2025-04-15T10:00:00');
  const today = new Date();
  
  // Format date components
  const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();
  
  // Format time components
  const time = eventDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  // Calculate duration display
  const hours = Math.floor(2.5);
  const minutes = (2.5 - hours) * 60;
  const durationText = `${hours}h ${minutes ? minutes + 'm' : ''}`;
  
  // Calculate days remaining
  const msPerDay = 1000 * 60 * 60 * 24;
  const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const eventNoTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const daysRemaining = Math.ceil((eventNoTime.getTime() - todayNoTime.getTime()) / msPerDay);
  
  // Determine if event is in the past, today, or future
  const isPast = daysRemaining < 0;
  const isToday = daysRemaining === 0;
  
  // Format the days remaining text
  let daysRemainingText = '';
  let daysRemainingClass = '';
  
  if (isPast) {
    daysRemainingText = `${Math.abs(daysRemaining)} days ago`;
    daysRemainingClass = 'bg-gray-100 text-gray-600';
  } else if (isToday) {
    daysRemainingText = 'Today';
    daysRemainingClass = 'bg-green-100 text-green-800';
  } else {
    daysRemainingText = `${daysRemaining} days from now`;
    daysRemainingClass = 'bg-blue-100 text-blue-800';
  }
  
  // Day preview data
  // April in most Northern Hemisphere locations tends to be spring weather
  const dayPreview = {
    sunrise: '6:24 AM',
    sunset: '7:48 PM',
    forecast: 'Partly Cloudy',
    tempHigh: '64°F',
    tempLow: '48°F',
    precipitation: '20%'
  };

  return (
    <div className="w-full bg-white rounded-xl mb-4">
      {/* Days remaining banner */}
      <div className={`mb-4 px-4 py-2 rounded-md flex items-center justify-center ${daysRemainingClass}`}>
        <span className="font-medium text-sm">{daysRemainingText}</span>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Date section */}
        <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3 text-center shadow-sm border border-blue-100">
          <p className="text-blue-700 font-medium text-xl">{day}</p>
          <p className="text-blue-600 uppercase text-sm font-bold">{month}</p>
        </div>
        
        {/* Date & time details */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <p className="text-gray-800 font-medium">
              {dayOfWeek}, {month} {day}, {year}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <p className="text-gray-800 font-medium">{time}</p>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
              {durationText}
            </span>
          </div>
        </div>
      </div>
      
      {/* Date context visualization */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
              <Calendar className="h-3 w-3 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500">Today</p>
          </div>
          
          <div className="flex-1 mx-2 h-1 bg-gray-100 relative">
            <div 
              className={`absolute h-1 ${isPast ? 'bg-gray-300' : 'bg-blue-400'}`} 
              style={{ width: `${Math.min(Math.abs(daysRemaining) * 2, 100)}%` }}
            ></div>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className={`rounded-full w-6 h-6 flex items-center justify-center ${isPast ? 'bg-gray-200' : 'bg-blue-100'}`}>
              <Calendar className={`h-3 w-3 ${isPast ? 'text-gray-600' : 'text-blue-600'}`} />
            </div>
            <p className="text-xs text-gray-500">Event</p>
          </div>
        </div>
        
        {/* Days from today */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
              {isPast ? "Event was" : "Event is"} <span className="font-medium">{Math.abs(daysRemaining)} days</span> {isPast ? "ago" : "from today"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Day Preview Section */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-2">How this day will look</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
          {/* Weather and daylight row */}
          <div className="flex justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-50 rounded-full p-1">
                <Sun className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Weather</p>
                <p className="text-sm font-medium">{dayPreview.forecast}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-50 rounded-full p-1">
                <Sunrise className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Daylight</p>
                <p className="text-sm font-medium">{dayPreview.sunrise} - {dayPreview.sunset}</p>
              </div>
            </div>
          </div>
          
          {/* Temperature and precipitation */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="mr-1 text-xs font-medium text-gray-600">Temperature:</div>
              <div className="text-sm">
                <span className="text-red-500 font-medium">{dayPreview.tempHigh}</span> / <span className="text-blue-500 font-medium">{dayPreview.tempLow}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-1 text-xs font-medium text-gray-600">Rain:</div>
              <div className="text-sm font-medium">{dayPreview.precipitation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDateTime;
