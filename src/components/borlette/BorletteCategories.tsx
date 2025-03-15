
import React from 'react';
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'florida', name: 'Florida', color: '#8B5CF6' },
  { id: 'georgia', name: 'Georgia', color: '#D946EF' },
  { id: 'new-york', name: 'New York', color: '#F97316' },
  { id: 'france', name: 'France', color: '#0EA5E9' },
  { id: 'tennessee', name: 'Tennessee', color: '#10B981' },
  { id: 'texas', name: 'Texas', color: '#EF4444' },
  { id: 'california', name: 'California', color: '#F59E0B' },
  { id: 'illinois', name: 'Illinois', color: '#6366F1' },
];

export const BorletteCategories = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <Card 
          key={category.id}
          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-gray-50"
        >
          <CardContent className="p-0">
            <div className="relative aspect-[3/2] p-4 flex flex-col justify-end">
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(45deg, ${category.color}22, ${category.color}11)`,
                  borderLeft: `4px solid ${category.color}`
                }} 
              />
              <h3 className="relative text-lg font-medium text-gray-900">
                {category.name}
              </h3>
              <p className="relative text-xs text-gray-500">
                3 daily drawings
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
