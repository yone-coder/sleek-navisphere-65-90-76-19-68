
import { Badge } from "@/components/ui/badge";

interface ParticipantStatsProps {
  confirmedCount: number;
  pendingCount: number;
}

export function ParticipantStats({ confirmedCount, pendingCount }: ParticipantStatsProps) {
  return (
    <div className="flex gap-2">
      <Badge variant="outline" className="bg-green-50 text-green-700">
        Confirmed: {confirmedCount}
      </Badge>
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
        Pending: {pendingCount}
      </Badge>
    </div>
  );
}
