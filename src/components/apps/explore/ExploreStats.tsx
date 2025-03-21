
import { Package, Download, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ExploreStatsProps {
  appsCount: number;
  favoritesCount: number;
  updatesCount: number;
}

export function ExploreStats({ appsCount, favoritesCount, updatesCount }: ExploreStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-3">
          <Package className="h-5 w-5 text-blue-500 mb-1" />
          <span className="text-lg font-bold">{appsCount}</span>
          <span className="text-xs text-gray-500">All Apps</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-3">
          <Download className="h-5 w-5 text-green-500 mb-1" />
          <span className="text-lg font-bold">{favoritesCount}</span>
          <span className="text-xs text-gray-500">Installed</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-3">
          <Clock className="h-5 w-5 text-amber-500 mb-1" />
          <span className="text-lg font-bold">{updatesCount}</span>
          <span className="text-xs text-gray-500">Updates</span>
        </CardContent>
      </Card>
    </div>
  );
}
