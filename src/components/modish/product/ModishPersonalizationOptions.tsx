
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function ModishPersonalizationOptions() {
  return (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium">Personalization Options</h3>
        </div>
        
        <div className="space-y-2">
          <div className="bg-white rounded-md p-2 border border-gray-100">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-500" />
              <span className="text-xs">Add gift wrapping (+$3.99)</span>
            </label>
          </div>
          
          <div className="bg-white rounded-md p-2 border border-gray-100">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-500" />
              <span className="text-xs">Include a personalized message</span>
            </label>
          </div>
          
          <div className="bg-white rounded-md p-2 border border-gray-100">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-blue-500" />
              <span className="text-xs">Add extended warranty (+$9.99)</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
