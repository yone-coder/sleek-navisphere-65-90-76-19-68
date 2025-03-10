import React, { useState, useEffect } from 'react';
import { Clock, Calendar, UserCheck, AlertCircle, Check, Users, Eye, Heart, MessageCircle, Share, Smile, Star, ThumbsUp, Award, Trophy } from 'lucide-react';
import TikTokCommentsPanel from '@/components/comments/TikTokCommentsPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedHearts from './AnimatedHearts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HoverValueType {
  percentage: string;
  participants: number;
}

const WebinarComponent = () => {
  const { t } = useLanguage();
  
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
  
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(8200);
  const [shares, setShares] = useState(125000);
  const [comments, setComments] = useState(342);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);

  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const eventDate = "March 12, 2025 • 4:45 PM";

  const emojiReactions = [
    { icon: <Heart size={14} className="mr-1" fill="currentColor" />, name: 'heart', color: 'text-red-500', label: 'Love' },
    { icon: <ThumbsUp size={14} className="mr-1" fill="currentColor" />, name: 'thumbsUp', color: 'text-blue-500', label: 'Like' },
    { icon: <Smile size={14} className="mr-1" fill="currentColor" />, name: 'smile', color: 'text-yellow-500', label: 'Happy' },
    { icon: <Star size={14} className="mr-1" fill="currentColor" />, name: 'star', color: 'text-amber-500', label: 'Amazing' },
    { icon: <Trophy size={14} className="mr-1" fill="currentColor" />, name: 'trophy', color: 'text-purple-500', label: 'Awesome' },
    { icon: <Award size={14} className="mr-1" fill="currentColor" />, name: 'award', color: 'text-green-500', label: 'Great' },
  ];

  function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  const participationPercentage = (participants / maxParticipants) * 100;
  const spotsLeft = maxParticipants - participants;

  useEffect(() => {
    if (participationPercentage > 85) {
      setRegistrationStatus('almost-full');
    } else if (participationPercentage > 65) {
      setRegistrationStatus('filling-fast');
    } else {
      setRegistrationStatus('available');
    }
  }, [participationPercentage]);

  useEffect(() => {
    const baseValue = participants - 100;
    const trend = Array(24).fill(0).map((_, i) => {
      const randomVariation = Math.floor(Math.random() * 20) - 5;
      const upwardTrend = i * (Math.random() * 5 + 3);
      return baseValue + upwardTrend + randomVariation;
    });
    setSparkline(trend);
  }, []);

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
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
                return prevTime;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    setRegistrationRate(Math.floor(Math.random() * 15) + 5);
    
    const participantTimer = setInterval(() => {
      if (participants < maxParticipants) {
        if (Math.random() > 0.6) {
          const increase = 1;
          setParticipants(prev => Math.min(prev + increase, maxParticipants));
          setSparkline(prev => {
            const newSparkline = [...prev.slice(1), participants + increase];
            return newSparkline;
          });
          setRegistrationMessage({
            profile: getRandomLetter(),
            message: 'just registered',
            isVisible: true
          });
          setTimeout(() => {
            setRegistrationMessage(prev => ({
              ...prev,
              isVisible: false
            }));
          }, 10000);
        }
      }
    }, 12000);
    
    return () => {
      clearInterval(timer);
      clearInterval(participantTimer);
    };
  }, [participants, maxParticipants]);

  const handleLikeWithEmoji = (emojiName: string) => {
    if (selectedEmoji === emojiName) {
      setIsLiked(false);
      setSelectedEmoji(null);
      setLikes(prev => prev - 1);
      setShowHeartAnimation(false);
    } else {
      if (!isLiked) {
        setLikes(prev => prev + 1);
      }
      setIsLiked(true);
      setSelectedEmoji(emojiName);
      
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 2000);
    }
    setShowEmojiMenu(false);
  };

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setSelectedEmoji('heart');
      setLikes(prev => prev + 1);
      
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 2000);
    } else {
      setIsLiked(false);
      setSelectedEmoji(null);
      setLikes(prev => prev - 1);
      setShowHeartAnimation(false);
    }
  };

  const handleOpenComments = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };

  const handleShare = () => {
    setShares(prev => prev + 1);
  };

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleRegister = () => {
    if (!isRegistered) {
      setIsRegistered(true);
      setParticipants(prev => prev + 1);
    }
  };

  const estimatedTimeUntilFull = () => {
    if (registrationRate <= 0) return "unknown";
    const hoursLeft = Math.ceil(spotsLeft / registrationRate);
    
    if (hoursLeft < 1) return "Less than an hour";
    if (hoursLeft < 24) return `~${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
    const daysLeft = Math.ceil(hoursLeft / 24);
    return `~${daysLeft} day${daysLeft > 1 ? 's' : ''}`;
  };

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

  const getStatusText = () => {
    switch (registrationStatus) {
      case 'almost-full':
        return <span className="text-red-500 font-medium animate-pulse">{t('webinar.almostfull')}</span>;
      case 'filling-fast':
        return <span className="text-orange-500 font-medium">{t('webinar.fillingfast')}</span>;
      default:
        return <span className="text-green-500 font-medium">{t('webinar.spotsavailable')}</span>;
    }
  };

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    const participantsAtPosition = Math.round((percentage / 100) * maxParticipants);
    
    setTooltipPosition(x);
    setHoverValue({
      percentage: percentage.toFixed(1),
      participants: participantsAtPosition
    });
    setShowTooltip(true);
  };

  const renderSparkline = () => {
    if (!sparkline.length) return null;
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min;
    
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

  const renderStackedProfiles = () => {
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

  return (
    <div className="flex-grow bg-transparent">
      <div className="w-full max-w-sm mx-auto relative rounded-lg p-2">
        <AnimatedHearts isActive={showHeartAnimation} />
        
        <div className="relative mb-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
          <div className="flex justify-between items-center mb-1 text-xs">
            <div className="flex items-center text-gray-600">
              {renderStackedProfiles()}
              <span>{formatNumber(participants)} {t('webinar.joined')}</span>
              <div className="flex ml-1 items-center">
                {renderSparkline()}
              </div>
            </div>
            <div className="flex items-center">
              {getStatusText()}
            </div>
          </div>
          
          <div 
            className="h-5 bg-gray-200 rounded-full overflow-hidden relative mt-1 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowTooltip(false)}
          >
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
              <div className="absolute inset-0 bg-stripes opacity-20"></div>
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-white opacity-20 rounded-full"></div>
              {registrationStatus === 'almost-full' && (
                <div className="absolute right-0 top-0 h-full w-1 bg-white animate-pulse"></div>
              )}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-white px-1 py-0.5">
                {Math.round(participationPercentage)}% Full
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-600">
            <div>
              <span className="font-medium">
                <span className="text-green-500">{formatNumber(spotsLeft)}</span> {t('webinar.spotsleft')}
              </span>
            </div>
            
            <div className="text-right">
              <span className="font-medium flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {t('webinar.fillingup')} {estimatedTimeUntilFull()}
              </span>
            </div>
          </div>
          
          {registrationMessage.isVisible && (
            <div className="mt-2 py-1 px-2 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center animate-fade-in">
              <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center mr-1.5">
                {registrationMessage.profile}
              </div>
              <span className="font-medium">{registrationMessage.message}</span>
            </div>
          )}
        </div>
        
        <div className="relative flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Calendar size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold">{t('webinar.eventtitle')}</h2>
                <div className="flex items-center text-xs text-gray-600 space-x-1">
                  <Calendar size={12} />
                  <span>{eventDate}</span>
                </div>
              </div>
            </div>
            
            <button 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                isRegistered 
                  ? 'bg-green-100 text-green-700' 
                  : buttonHover 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onClick={handleRegister}
              disabled={isRegistered}
            >
              {isRegistered ? (
                <div className="flex items-center">
                  <Check size={14} className="mr-1" />
                  {t('webinar.registered')}
                </div>
              ) : (
                t('webinar.register')
              )}
            </button>
          </div>
          
          <div className="flex justify-between">
            <div className="flex-1 grid grid-cols-4 divide-x divide-gray-200">
              <div className="flex flex-col items-center px-2">
                <div className="text-sm font-bold">{formatTime(timeLeft.days)}</div>
                <div className="text-xs text-gray-500">{t('webinar.days')}</div>
              </div>
              <div className="flex flex-col items-center px-2">
                <div className="text-sm font-bold">{formatTime(timeLeft.hours)}</div>
                <div className="text-xs text-gray-500">{t('webinar.hours')}</div>
              </div>
              <div className="flex flex-col items-center px-2">
                <div className="text-sm font-bold">{formatTime(timeLeft.minutes)}</div>
                <div className="text-xs text-gray-500">{t('webinar.minutes')}</div>
              </div>
              <div className="flex flex-col items-center px-2">
                <div className="text-sm font-bold">{formatTime(timeLeft.seconds)}</div>
                <div className="text-xs text-gray-500">{t('webinar.seconds')}</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <div className="flex space-x-4">
              <button 
                onClick={handleLike}
                className={`flex items-center text-xs font-medium ${isLiked ? selectedEmoji ? emojiReactions.find(e => e.name === selectedEmoji)?.color || 'text-red-500' : 'text-red-500' : 'text-gray-600'}`}
              >
                {isLiked && selectedEmoji ? (
                  emojiReactions.find(e => e.name === selectedEmoji)?.icon || <Heart size={14} className="mr-1" fill="currentColor" />
                ) : (
                  <Heart size={14} className="mr-1" fill={isLiked ? "currentColor" : "none"} />
                )}
                <span>{formatNumber(likes)}</span>
              </button>
              
              <button 
                onClick={handleOpenComments} 
                className="flex items-center text-xs font-medium text-gray-600"
              >
                <MessageCircle size={14} className="mr-1" />
                <span>{formatNumber(comments)}</span>
              </button>
              
              <button 
                onClick={handleShare} 
                className="flex items-center text-xs font-medium text-gray-600"
              >
                <Share size={14} className="mr-1" />
                <span>{formatNumber(shares)}</span>
              </button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  onClick={() => setShowEmojiMenu(!showEmojiMenu)} 
                  className="flex items-center text-xs font-medium text-gray-600"
                >
                  <Smile size={14} className="mr-1" />
                  <span>React</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col p-1 space-y-1">
                {emojiReactions.map((reaction) => (
                  <DropdownMenuItem 
                    key={reaction.name} 
                    onClick={() => handleLikeWithEmoji(reaction.name)}
                    className={`flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${selectedEmoji === reaction.name ? reaction.color + ' bg-gray-100' : ''}`}
                  >
                    {reaction.icon}
                    <span>{reaction.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen}
        onClose={closeCommentsPanel}
      />
    </div>
  );
};

export default WebinarComponent;
