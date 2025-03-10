
import React from 'react';
import FAQItem from './FAQItem';
import { FAQ } from './types';

interface FAQsListProps {
  faqs: FAQ[];
}

const FAQsList: React.FC<FAQsListProps> = ({ faqs }) => {
  if (faqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32">
        <p className="text-sm text-gray-500">No FAQs available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2 animate-in fade-in">
      {faqs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
};

export default FAQsList;
