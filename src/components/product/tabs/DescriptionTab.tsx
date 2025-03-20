
import React from 'react';
import { CheckCircle } from 'lucide-react';

type DescriptionTabProps = {
  description: string;
  highlights?: string[];
};

export function DescriptionTab({ description, highlights = [] }: DescriptionTabProps) {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none text-gray-700">
        {description}
      </div>
      
      {highlights && highlights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Key Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
