
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, Clock, MapPin, Star, Tag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  onToggleSave
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
  
  return (
    <Card 
      className={cn(
        "w-[300px] overflow-hidden transition-all hover:shadow-md cursor-pointer group relative",
        featured && "border-blue-200 bg-blue-50/40"
      )} 
      onClick={handleCardClick}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-md z-10">
          Featured
        </div>
      )}
      
      <div className="relative h-36 overflow-hidden bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-400 to-purple-500">
            <span className="text-white font-medium">{title}</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-sm">
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </Badge>
        </div>
        
        <button
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow-sm transition-colors",
            isSaved ? "text-yellow-500" : "text-gray-500 hover:text-gray-700"
          )}
          onClick={handleSaveClick}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      
      <CardHeader className="p-3 pb-0">
        <h3 className="font-medium text-sm line-clamp-2 h-10">{title}</h3>
      </CardHeader>
      
      <CardContent className="p-3 pt-2 space-y-2">
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
        
        {rating && (
          <div className="flex items-center text-xs">
            <div className="flex items-center text-yellow-500 mr-2">
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
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-1.5">
            {speakerImages.length > 0 ? (
              speakerImages.slice(0, 3).map((img, i) => (
                <Avatar key={i} className="w-6 h-6 border border-white">
                  <AvatarImage src={img} />
                  <AvatarFallback className="text-[8px] bg-gray-200">
                    SP
                  </AvatarFallback>
                </Avatar>
              ))
            ) : (
              <Avatar className="w-6 h-6 border border-white">
                <AvatarFallback className="text-[8px] bg-gray-200">
                  SP
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <span className="text-xs text-gray-500">
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
            <div className="text-xs text-gray-500 flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>{attendees}/{maxAttendees}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
