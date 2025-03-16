
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SeminarSectionHeadingProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function SeminarSectionHeading({
  title,
  subtitle,
  actionText,
  onAction,
  icon,
  className
}: SeminarSectionHeadingProps) {
  return (
    <div className={cn("mb-6 mt-8 first:mt-0", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        
        {actionText && onAction && (
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={onAction}
          >
            {actionText}
          </Button>
        )}
      </div>
      
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
