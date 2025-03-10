
import React from 'react';
import FAQItem from './FAQItem';
import { FAQ } from './types';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-4 mt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {faqs.map((faq) => (
        <motion.div key={faq.id} variants={itemVariants}>
          <FAQItem faq={faq} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQsList;
