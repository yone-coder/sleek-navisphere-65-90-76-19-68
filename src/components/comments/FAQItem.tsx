
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from './types';

interface FAQItemProps {
  faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? 'shadow-sm' : ''
      }`}
    >
      <div 
        className="px-4 py-3.5 flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
          <h4 className="font-medium text-sm text-gray-900">{faq.question}</h4>
        </div>
        <button 
          className="ml-2 text-gray-500 flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          {isExpanded ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
          }
        </button>
      </div>
      <div 
        className={`px-6 py-4 pl-12 text-gray-700 text-sm bg-gray-50 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 hidden'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
