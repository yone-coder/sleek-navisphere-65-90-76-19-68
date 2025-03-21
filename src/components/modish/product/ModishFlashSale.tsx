
import React from 'react';
import { Zap } from 'lucide-react';

export function ModishFlashSale() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-purple-500" />
        <div>
          <span className="text-sm font-medium text-purple-800">Flash Sale</span>
          <div className="text-xs text-purple-700 bg-white px-2 py-1 rounded-full border border-purple-200">
            12:45:30 left
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white p-2 rounded-md">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] text-gray-500">
                {i}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-600">
            <span className="text-red-500 font-bold">28 people</span> bought in last hour
          </div>
        </div>
        <div className="mt-1.5 w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>67% claimed</span>
          <span>Sale ends in 12 hours</span>
        </div>
      </div>
    </div>
  );
}
