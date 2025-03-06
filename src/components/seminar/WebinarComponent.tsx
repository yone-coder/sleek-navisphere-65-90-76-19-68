
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, UserCheck, AlertCircle, Check, Users, Eye, Heart, MessageCircle } from 'lucide-react';
import TikTokCommentsPanel from '@/components/comments/TikTokCommentsPanel';

// Define type for the hover value
interface HoverValueType {
  percentage: string;
  participants: number;
}

const WebinarComponent = () => {
  // State variables
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30
  });
  const [participants, setParticipants] = useState(1267);
  const [maxParticipants, setMaxParticipants] = useState(2000);
  const [registrationStatus, setRegistrationStatus] = useState('available');
  const [registrationRate, setRegistrationRate] = useState(0);
  const [buttonHover, setButtonHover] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [hoverValue, setHoverValue] = useState<HoverValueType | null>(null);
  const [sparkline, setSparkline] = useState<number[]>([]);
  const [registrationMessage, setRegistrationMessage] = useState({
    profile: getRandomLetter(),
    message: 'just registered',
    isVisible: false
  });
  const [views, setViews] = useState(125000);
  const [likes, setLikes] = useState(8200);
  const [comments, setComments] = useState(342);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);

  // Event details
  const eventDate = "March 12, 2025 • 4:45 PM";

  // Helper function to get random letter for profile
  function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Format number with k or m for thousands/millions
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  // Calculate participation percentage and spots left
  const participationPercentage = (participants / maxParticipants) * 100;
  const spotsLeft = maxParticipants - participants;

  // Update registration status based on participation
  useEffect(() => {
    if (participationPercentage > 85) {
      setRegistrationStatus('almost-full');
    } else if (participationPercentage > 65) {
      setRegistrationStatus('filling-fast');
    } else {
      setRegistrationStatus('available');
    }
  }, [participationPercentage]);

  // Generate sparkline data on component mount
  useEffect(() => {
    // Generate a simulated registration trend for the sparkline
    const baseValue = participants - 100;
    const trend = Array(24).fill(0).map((_, i) => {
      const randomVariation = Math.floor(Math.random() * 20) - 5;
      const upwardTrend = i * (Math.random() * 5 + 3);
      return baseValue + upwardTrend + randomVariation;
    });
    setSparkline(trend);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Timer complete
                clearInterval(timer);
                return prevTime;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    // Registration rate calculation (simulated)
    setRegistrationRate(Math.floor(Math.random() * 15) + 5);
    
    // Randomly increase participants (less frequently, more natural)
    const participantTimer = setInterval(() => {
      if (participants < maxParticipants) {
        // More random timing between registrations (less predictable)
        if (Math.random() > 0.6) { // Only show some registrations, not all
          const increase = 1; // Only increase by 1 at a time for more realism
          setParticipants(prev => Math.min(prev + increase, maxParticipants));
          
          // Update sparkline with new value
          setSparkline(prev => {
            const newSparkline = [...prev.slice(1), participants + increase];
            return newSparkline;
          });
          
          // Show registration notification
          setRegistrationMessage({
            profile: getRandomLetter(),
            message: 'just registered',
            isVisible: true
          });
          
          // Hide notification after a delay - changed from 3000ms to 10000ms (10 seconds)
          setTimeout(() => {
            setRegistrationMessage(prev => ({
              ...prev,
              isVisible: false
            }));
          }, 10000);
        }
      }
    }, 12000); // Slower interval (12 seconds instead of 5)
    
    return () => {
      clearInterval(timer);
      clearInterval(participantTimer);
    };
  }, [participants, maxParticipants]);

  // Format time with leading zeros
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  // Handle registration
  const handleRegister = () => {
    if (!isRegistered) {
      setIsRegistered(true);
      setParticipants(prev => prev + 1);
    }
  };

  // Calculate estimated time until full
  const estimatedTimeUntilFull = () => {
    if (registrationRate <= 0) return "unknown";
    const hoursLeft = Math.ceil(spotsLeft / registrationRate);
    
    if (hoursLeft < 1) return "Less than an hour";
    if (hoursLeft < 24) return `~${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
    const daysLeft = Math.ceil(hoursLeft / 24);
    return `~${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
  };

  // Get progress bar color based on status
  const getProgressBarClasses = () => {
    switch (registrationStatus) {
      case 'almost-full':
        return 'bg-gradient-to-r from-orange-400 to-red-500';
      case 'filling-fast':
        return 'bg-gradient-to-r from-yellow-300 to-orange-500';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  // Get registration status text
  const getStatusText = () => {
    switch (registrationStatus) {
      case 'almost-full':
        return <span className="text-red-500 font-medium animate-pulse">Almost Full!</span>;
      case 'filling-fast':
        return <span className="text-orange-500 font-medium">Filling Fast</span>;
      default:
        return <span className="text-green-500 font-medium">Spots Available</span>;
    }
  };

  // Generate milestone markers
  const renderMilestones = () => {
    const milestones = [25, 50, 75, 90];
    return milestones.map(milestone => (
      <div 
        key={milestone}
        className="absolute top-0 h-full w-px bg-white"
        style={{ left: `${milestone}%`, opacity: milestone <= participationPercentage ? 0.7 : 0.2 }}
      >
        <div 
          className={`absolute -top-5 -translate-x-1/2 text-xs ${milestone <= participationPercentage ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
        >
          {milestone}%
        </div>
      </div>
    ));
  };

  // Handle mouse move over progress bar
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Calculate the participants at this position
    const participantsAtPosition = Math.round((percentage / 100) * maxParticipants);
    
    setTooltipPosition(x);
    setHoverValue({
      percentage: percentage.toFixed(1),
      participants: participantsAtPosition
    });
    setShowTooltip(true);
  };

  // Draw sparkline graph
  const renderSparkline = () => {
    if (!sparkline.length) return null;
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min;
    
    // Create path for sparkline
    const width = 60;
    const height = 20;
    const points = sparkline.map((value, i) => {
      const x = (i / (sparkline.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="text-blue-500 ml-1">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle 
          cx={width} 
          cy={parseFloat(points.split(' ').pop()?.split(',')[1] || "0")} 
          r="2" 
          fill="currentColor" 
        />
      </svg>
    );
  };

  // Generate stacked profile images
  const renderStackedProfiles = () => {
    // Create an array of colors for the avatars
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
    
    return (
      <div className="flex -space-x-2 mr-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={`w-5 h-5 rounded-full ${colors[i % colors.length]} text-white text-xs flex items-center justify-center border border-white`}
          >
            {getRandomLetter()}
          </div>
        ))}
        <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center border border-white">
          <Users size={10} />
        </div>
      </div>
    );
  };

  // Handle likes
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Open comments panel
  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  // Close comments panel
  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-2 mx-auto">
      {/* Enhanced Progress and Register Section */}
      <div className="relative mb-2">
        <div className="flex justify-between items-center mb-1 text-xs">
          <div className="flex items-center text-gray-600">
            {renderStackedProfiles()}
            <span>{formatNumber(participants)} joined</span>
            <div className="flex ml-1 items-center">
              {renderSparkline()}
            </div>
          </div>
          <div className="flex items-center">
            {getStatusText()}
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div 
          className="h-5 bg-gray-200 rounded-full overflow-hidden relative mt-1 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Tooltip */}
          {showTooltip && hoverValue && (
            <div 
              className="absolute -top-8 py-1 px-2 bg-gray-800 text-white rounded text-xs whitespace-nowrap z-10"
              style={{ 
                left: tooltipPosition, 
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {formatNumber(hoverValue.participants)} attendees ({hoverValue.percentage}%)
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          )}
          
          {renderMilestones()}
          
          <div 
            className={`h-full ${getProgressBarClasses()} rounded-full transition-all duration-500 relative overflow-hidden`}
            style={{ width: `${participationPercentage}%` }}
          >
            {/* Animated stripes for visual effect */}
            <div className="absolute inset-0 bg-stripes opacity-20"></div>
            
            {/* Shine effect */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-white opacity-20 rounded-full"></div>
            
            {/* Pulse effect at the edge for 'almost-full' status */}
            {registrationStatus === 'almost-full' && (
              <div className="absolute right-0 top-0 h-full w-1 bg-white animate-pulse"></div>
            )}
            
            {/* Progress percentage */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white px-1 py-0.5">
              {Math.round(participationPercentage)}% Full
            </div>
          </div>
        </div>
        
        {/* Status indicators and statistics below progress bar - more compact */}
        <div className="flex justify-between text-xs mt-1 text-gray-600">
          <div>
            <span className="font-medium">
              <span className="text-green-500">{formatNumber(spotsLeft)}</span> spots left
            </span>
          </div>
          
          <div className="text-right">
            <span className="font-medium flex items-center">
              <AlertCircle size={10} className="mr-1 text-orange-500" />
              Est. full: {estimatedTimeUntilFull()}
            </span>
          </div>
        </div>
        
        {/* Compact date and time display */}
        <div className="mt-1 flex justify-between items-center">
          <div className="flex items-center h-5"> 
            {registrationMessage.isVisible ? (
              <div className="flex items-center text-xs animate-fade-in">
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center mr-1 text-xs font-bold">
                  {registrationMessage.profile}
                </div>
                <span className="text-blue-500 font-medium">
                  {registrationMessage.message}
                </span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-600">
                <Calendar size={12} className="mr-1 text-blue-500" />
                <span>{eventDate}</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock size={12} className="mr-1 text-blue-500" />
            <span>{formatTime(timeLeft.days)}d:{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>
      
      {/* Social interaction buttons with light grey backgrounds */}
      <div className="flex justify-between mb-2 text-sm">
        <div className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center">
          <Eye size={14} className="mr-1 text-gray-600" />
          <span className="font-medium">{formatNumber(views)} views</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleLike}
            className={`bg-gray-100 px-3 py-1.5 rounded-full flex items-center ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart size={14} className="mr-1" fill={isLiked ? "currentColor" : "none"} />
            <span className="font-medium">{formatNumber(likes)}</span>
          </button>
          <button 
            onClick={openCommentsPanel}
            className="bg-gray-100 px-3 py-1.5 rounded-full flex items-center text-gray-600"
          >
            <MessageCircle size={14} className="mr-1" />
            <span className="font-medium">{formatNumber(comments)}</span>
          </button>
        </div>
      </div>
      
      {/* Register Button - smaller */}
      <button 
        className={`w-full py-2 px-3 font-medium rounded-md shadow-md text-sm transition-all duration-300 transform ${
          isRegistered
            ? 'bg-green-500 text-white hover:bg-green-600'
            : buttonHover
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg -translate-y-0.5'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5'
        }`}
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        onClick={handleRegister}
      >
        <div className="flex items-center justify-center">
          {isRegistered ? (
            <>
              <Check size={16} className="mr-2 animate-bounce" />
              <span>You're Registered!</span>
            </>
          ) : (
            <>
              <UserCheck size={16} className={`mr-2 ${buttonHover ? 'animate-pulse' : ''}`} />
              <span>Register Now</span>
            </>
          )}
        </div>
      </button>
      
      {/* Comments Panel */}
      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen} 
        onClose={closeCommentsPanel} 
      />
      
      {/* Add animation styles */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          background-size: 25px 25px;
          animation: progress-bar-stripes 2s linear infinite;
        }
        @keyframes progress-bar-stripes {
          from { background-position: 25px 0; }
          to { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};

export default WebinarComponent;
