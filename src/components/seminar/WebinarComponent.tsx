
import React from 'react';
import { Clock, MessageCircle, Bell, Share2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface WebinarComponentProps {
  openCommentsPanel?: () => void;
}

const WebinarComponent: React.FC<WebinarComponentProps> = ({ openCommentsPanel }) => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-2xl bg-white rounded-lg overflow-hidden py-1 px-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
            <Clock size={14} className="text-blue-500" />
            <span>{t('seminar.webinar.date')}</span>
          </div>
          <div className="mt-1 text-xs text-gray-500 truncate">
            {t('seminar.webinar.time_remaining')}
          </div>
        </div>
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button 
            onClick={openCommentsPanel}
            className="py-1.5 px-3 text-xs font-medium bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors flex items-center"
          >
            <MessageCircle size={14} className="mr-1" />
            {t('seminar.webinar.comments')}
          </button>
          <button className="py-1.5 px-3 text-xs font-medium bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors flex items-center">
            <Bell size={14} className="mr-1" />
            {t('seminar.webinar.notify')}
          </button>
          <button className="py-1.5 px-3 text-xs font-medium bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors flex items-center">
            <Share2 size={14} className="mr-1" />
            {t('seminar.webinar.share')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebinarComponent;
