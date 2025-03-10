
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FAQ } from './types';

interface FAQItemProps {
  faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex items-start">
        <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
        <h4 className="font-medium text-gray-900">{faq.question}</h4>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-sm">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
