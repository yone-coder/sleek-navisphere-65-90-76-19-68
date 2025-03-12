
import React from 'react';
import { MessageCircle, Users, Clock, Award, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

interface WebinarComponentProps {
  onOpenComments: () => void;
}

const WebinarComponent: React.FC<WebinarComponentProps> = ({ onOpenComments }) => {
  const { t } = useLanguage();

  // Mock data for the webinar
  const webinarStats = {
    registered: '1.3k',
    remainingSeats: 731,
    fullnessPercentage: 63,
    timeLeft: '02d:08h:44m:55s',
    commentsCount: '8.2k',
    sharesCount: '342',
    viewsCount: '125k',
  };

  // Generate a random recent registrant
  const recentRegistrantLetter = String.fromCharCode(90 - Math.floor(Math.random() * 26));

  return (
    <div className="w-full">
      {/* Registration Statistics */}
      <div className="rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-500" />
            <span className="font-semibold">{webinarStats.registered} {t('seminar.registered')}</span>
          </div>
          <div className="text-sm text-gray-500">{t('seminar.placesAvailable')}</div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <Progress value={webinarStats.fullnessPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>90%</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">
            <span className="font-bold">{webinarStats.fullnessPercentage}% {t('seminar.full')}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span>{webinarStats.remainingSeats} {t('seminar.remainingSeats')}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {t('seminar.completeIn')}: ~3 days
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              <div className="rounded-full bg-blue-600 text-white w-5 h-5 flex items-center justify-center mr-1">
                {recentRegistrantLetter}
              </div>
              {t('seminar.justRegistered')}
            </Badge>
          </div>
        </div>
        
        {/* Countdown timer */}
        <div className="text-center mt-3 font-mono text-sm font-semibold text-blue-700">
          {webinarStats.timeLeft}
        </div>
      </div>
      
      {/* Engagement statistics */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-gray-600 p-0"
            onClick={onOpenComments}
          >
            <MessageCircle size={18} />
            <span>{webinarStats.commentsCount}</span>
          </Button>
          
          <div className="flex items-center gap-1 text-gray-600">
            <Award size={18} />
            <span>{webinarStats.sharesCount}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-600">
            <Zap size={18} />
            <span>{webinarStats.viewsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarComponent;
