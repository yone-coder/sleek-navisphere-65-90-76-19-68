
import React from 'react';
import { Badge } from '@/components/ui/badge';

export function GalleryBadges() {
  return (
    <div className="absolute top-2 left-2 z-30 flex flex-col gap-1.5">
      <Badge className="bg-red-500 text-white border-0">Hot Sale</Badge>
      <Badge className="bg-blue-500 text-white border-0">Free Shipping</Badge>
    </div>
  );
}
