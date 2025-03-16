import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, Clock, MapPin, Star, Tag, Users, Award, TrendingUp, Clock3, Video, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SeminarCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  image?: string;
  price?: string | number;
  category: string;
  speakersCount: number;
  duration?: string;
  rating?: number;
  attendees?: number;
  maxAttendees?: number;
  featured?: boolean;
  topic?: string;
  speakerImages?: string[];
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  isLive?: boolean;
  isCertified?: boolean;
  language?: string;
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  popularity?: number; // 1-100 score for popularity
}

export function SeminarCard({
  id,
  title,
  date,
  time,
  location,
  image,
  price,
  category,
  speakersCount,
  duration,
  rating,
  attendees,
  maxAttendees,
  featured,
  topic,
  speakerImages = [],
  isSaved,
  onToggleSave,
  isLive = false,
  isCertified = false,
  language = 'English',
  difficultyLevel = 'All Levels',
  popularity = 70
}: SeminarCardProps) {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/seminar/${id}`);
  };
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(id);
    }
  };

  const percentageFilled = attendees && maxAttendees 
    ? Math.round((attendees / maxAttendees) * 100) 
    : null;
  
  const getAvailabilityColor = () => {
    if (!percentageFilled) return 'bg-gray-200';
    if (percentageFilled > 80) return 'bg-red-500';
    if (percentageFilled > 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getDifficultyColor = () => {
    switch(difficultyLevel) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  return (
    <Card 
      className={cn(
        "w-[260px] overflow-hidden transition-all hover:shadow-md cursor-pointer group relative shrink-0",
        featured && "border-blue-200 bg-blue-50/40"
      )} 
      onClick={handleCardClick}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-md z-10">
          Featured
        </div>
      )}

      {isLive && (
        <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-md z-10 flex items-center">
          <span className="animate-pulse w-2 h-2 bg-white rounded-full mr-1"></span> LIVE
        </div>
      )}
      
      <div className="relative h-32 overflow-hidden bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-400 to-purple-500">
            <span className="text-white font-medium text-sm">{title.substring(0, 30)}</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-sm text-[10px] px-1.5 py-0">
            <Tag className="w-2.5 h-2.5 mr-1" />
            {category}
          </Badge>
          
          {isCertified && (
            <Badge variant="secondary" className="bg-white/90 text-green-700 shadow-sm text-[10px] px-1.5 py-0">
              <Award className="w-2.5 h-2.5 mr-1" />
              Certified
            </Badge>
          )}
        </div>
        
        <button
          className={cn(
            "absolute top-2 right-2 p-1 rounded-full bg-white/90 shadow-sm transition-colors",
            isSaved ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"
          )}
          onClick={handleSaveClick}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
        </button>

        {popularity > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-1.5 py-0.5">
            <TrendingUp className="w-2.5 h-2.5 text-white" />
            <span className="text-[8px] text-white font-medium">{popularity}% Popular</span>
          </div>
        )}
      </div>
      
      <CardHeader className="p-3 pb-0">
        <h3 className="font-medium text-sm line-clamp-2 h-10">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-3 pt-2 space-y-1.5">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{date}</span>
          {time && (
            <>
              <span className="mx-1">•</span>
              <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
              <span>{time}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <Clock3 className="w-3 h-3 mr-1 flex-shrink-0" />
          <span>{duration || '3 hours'}</span>
          <span className="mx-1">•</span>
          <Video className="w-3 h-3 mr-1 flex-shrink-0" />
          <span>{language}</span>
        </div>
        
        {rating && (
          <div className="flex items-center text-xs">
            <div className="flex items-center text-yellow-500 mr-1.5">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className="w-3 h-3" 
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-gray-600">{rating.toFixed(1)}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Badge variant="outline" className={cn(getDifficultyColor(), "text-[10px] px-1.5 py-0.5 h-5")}>
            <Zap className="w-2.5 h-2.5 mr-1" />
            {difficultyLevel}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-1 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-1.5">
            {speakerImages.length > 0 ? (
              speakerImages.slice(0, 2).map((img, i) => (
                <Avatar key={i} className="w-5 h-5 border border-white">
                  <AvatarImage src={img} />
                  <AvatarFallback className="text-[7px] bg-gray-200">
                    SP
                  </AvatarFallback>
                </Avatar>
              ))
            ) : (
              <Avatar className="w-5 h-5 border border-white">
                <AvatarFallback className="text-[7px] bg-gray-200">
                  SP
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <span className="text-[10px] text-gray-500">
            {speakersCount} {speakersCount === 1 ? 'Speaker' : 'Speakers'}
          </span>
        </div>
        
        <div className="text-right">
          {price !== undefined && (
            <div className={cn(
              "text-sm font-medium",
              typeof price === 'number' && price === 0 ? "text-green-600" : "text-blue-600"
            )}>
              {typeof price === 'number' && price === 0 ? 'Free' : 
                typeof price === 'string' ? price : 
                `$${price}`}
            </div>
          )}
          
          {attendees !== undefined && maxAttendees && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-[10px] text-gray-500 flex items-center">
                    <Users className="w-2.5 h-2.5 mr-1" />
                    <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getAvailabilityColor()}`} 
                        style={{ width: `${percentageFilled}%` }}
                      ></div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  <p>{attendees} of {maxAttendees} seats filled ({percentageFilled}%)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
