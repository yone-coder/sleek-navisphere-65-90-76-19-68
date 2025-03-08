
import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const RegistrationCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [urgencyLevel, setUrgencyLevel] = useState('normal'); // 'normal', 'urgent', 'critical'
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Set the target date (April 10, 2025, 7:59 PM)
  const targetDate = new Date('2025-04-10T19:59:00');
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        
        // Set urgency level based on remaining time
        if (days <= 7) {
          setUrgencyLevel('urgent');
        }
        if (days <= 3) {
          setUrgencyLevel('critical');
        }
      } else {
        // Registration closed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Flip animation for seconds
    const flipTimer = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 1000);
    
    // Cleanup
    return () => {
      clearInterval(timer);
      clearInterval(flipTimer);
    };
  }, [targetDate]);
  
  // Format with leading zeros
  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
  
  // Progress percentage calculation
  const startDate = new Date('2025-03-08T00:00:00'); // Today's date
  const totalDuration = targetDate.getTime() - startDate.getTime();
  const elapsed = new Date().getTime() - startDate.getTime();
  const progressPercentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  
  // Calculate remaining business days (excluding weekends)
  const calculateBusinessDays = () => {
    let count = 0;
    const currentDate = new Date();
    const tempDate = new Date(currentDate.getTime());
    
    while (tempDate < targetDate) {
      const dayOfWeek = tempDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }
    
    return count;
  };
  
  // Get color theme based on urgency
  const getUrgencyTheme = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          border: 'border-red-200',
          text: 'text-red-700',
          progress: 'bg-red-500',
          accent: 'bg-red-100'
        };
      case 'urgent':
        return {
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          progress: 'bg-yellow-500',
          accent: 'bg-yellow-100'
        };
      default:
        return {
          border: 'border-blue-200',
          text: 'text-blue-700',
          progress: 'bg-blue-500',
          accent: 'bg-blue-100'
        };
    }
  };
  
  const theme = getUrgencyTheme();
  const businessDays = calculateBusinessDays();
  
  // Time zone information
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeZoneOffset = new Date().getTimezoneOffset();
  const timeZoneOffsetFormatted = `UTC${timeZoneOffset <= 0 ? '+' : '-'}${Math.abs(Math.floor(timeZoneOffset / 60))}:${String(Math.abs(timeZoneOffset % 60)).padStart(2, '0')}`;
  
  return (
    <div className="w-full px-4 py-6">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${theme.text}`}>Registration Closing Soon</h2>
          <p className="text-gray-600">Deadline: Thu, Apr 10, 2025, 07:59 PM</p>
        </div>
        <Clock className={`${theme.text} h-8 w-8`} />
      </div>
      
      {/* Progress bar with percentage */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className={`${theme.progress} h-2.5 rounded-full transition-all duration-1000 ease-in-out`} 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mb-6">
        <span>Registration Open</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
        <span>Closing</span>
      </div>
      
      {/* Countdown timer with flip animation for seconds */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className={`flex flex-col items-center p-3 ${theme.accent} rounded-lg shadow-sm`}>
          <div className={`text-3xl font-bold ${theme.text}`}>{formatNumber(timeLeft.days)}</div>
          <div className="text-sm text-gray-500">days</div>
        </div>
        <div className={`flex flex-col items-center p-3 ${theme.accent} rounded-lg shadow-sm`}>
          <div className={`text-3xl font-bold ${theme.text}`}>{formatNumber(timeLeft.hours)}</div>
          <div className="text-sm text-gray-500">hours</div>
        </div>
        <div className={`flex flex-col items-center p-3 ${theme.accent} rounded-lg shadow-sm`}>
          <div className={`text-3xl font-bold ${theme.text}`}>{formatNumber(timeLeft.minutes)}</div>
          <div className="text-sm text-gray-500">minutes</div>
        </div>
        <div 
          className={`flex flex-col items-center p-3 ${theme.accent} rounded-lg shadow-sm transform transition-all duration-300 ${isFlipped ? 'scale-105' : 'scale-100'}`}
        >
          <div className={`text-3xl font-bold ${theme.text}`}>{formatNumber(timeLeft.seconds)}</div>
          <div className="text-sm text-gray-500">seconds</div>
        </div>
      </div>
      
      {/* Additional information panel */}
      <div 
        className="mb-4 cursor-pointer" 
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{showDetails ? 'Hide' : 'Show'} additional information</span>
          <span className="text-sm text-gray-500">{showDetails ? '▲' : '▼'}</span>
        </div>
      </div>
      
      {showDetails && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-inner text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Business days left:</p>
              <p className="font-medium">{businessDays} days</p>
            </div>
            <div>
              <p className="text-gray-500">Total hours left:</p>
              <p className="font-medium">{timeLeft.days * 24 + timeLeft.hours} hours</p>
            </div>
            <div>
              <p className="text-gray-500">Your timezone:</p>
              <p className="font-medium">{timeZone} ({timeZoneOffsetFormatted})</p>
            </div>
            <div>
              <p className="text-gray-500">Time spent open:</p>
              <p className="font-medium">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Urgency notice when urgent or critical */}
      {urgencyLevel !== 'normal' && (
        <div className={`flex items-center p-3 rounded ${urgencyLevel === 'critical' ? 'bg-red-100' : 'bg-yellow-100'} mb-4`}>
          <AlertTriangle size={16} className={urgencyLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'} />
          <span className={`ml-2 text-sm font-medium ${urgencyLevel === 'critical' ? 'text-red-600' : 'text-yellow-600'}`}>
            {urgencyLevel === 'critical' ? 'Registration closing very soon!' : 'Registration deadline approaching!'}
          </span>
        </div>
      )}
    </div>
  );
};

export default RegistrationCountdown;
