
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from './types';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className={`border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? 'shadow-sm bg-white' : 'bg-gray-50/50'
      }`}
      layout
      transition={{ layout: { duration: 0.3, type: "spring" } }}
    >
      <div 
        className="px-4 py-3.5 flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
          <h4 className="font-medium text-sm text-gray-900">{faq.question}</h4>
        </div>
        <motion.button 
          className="ml-2 text-gray-500 flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isExpanded ? (
              <motion.div
                key="up"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="down"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="px-6 py-4 pl-12 text-gray-700 text-sm bg-gray-50/50"
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
