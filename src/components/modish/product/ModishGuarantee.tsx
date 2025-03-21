
import React from 'react';
import { Award } from 'lucide-react';

export function ModishGuarantee() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-blue-600" />
        <div>
          <span className="text-sm font-medium text-blue-800">100% Satisfaction Guarantee</span>
          <p className="text-xs text-blue-600 mt-0.5">30-day money-back guarantee if you're not completely satisfied</p>
        </div>
      </div>
    </div>
  );
}
