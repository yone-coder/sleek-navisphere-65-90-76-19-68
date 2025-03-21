
import React from 'react';
import { ShieldCheck, ThumbsUp, CreditCard } from 'lucide-react';

export function ModishGuaranteesGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: <ShieldCheck className="h-5 w-5 text-blue-500" />, text: "90-Day Warranty" },
        { icon: <ThumbsUp className="h-5 w-5 text-green-500" />, text: "Authentic Product" },
        { icon: <CreditCard className="h-5 w-5 text-purple-500" />, text: "Buyer Protection" }
      ].map((guarantee, index) => (
        <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-2 text-center">
          {guarantee.icon}
          <span className="text-xs text-gray-700 mt-1">{guarantee.text}</span>
        </div>
      ))}
    </div>
  );
}
