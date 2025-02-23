
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContestCardProps {
  contest: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string[];
    rating: number;
    players: string;
    prize: string;
    status: string;
    startsIn: string;
    route?: string;
  };
}

export function ContestCard({ contest }: ContestCardProps) {
  return (
    <div className="flex-none w-[300px]">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
        <img
          src={contest.thumbnail}
          alt={contest.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className={cn(
          "absolute top-3 right-3",
          contest.status === "Live" ? "bg-red-500" : 
          contest.status === "Registering" ? "bg-green-500" : 
          "bg-blue-500"
        )}>
          {contest.status}
        </Badge>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
              {contest.prize}
            </Badge>
            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
              {contest.players} Players
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-white truncate">{contest.title}</h3>
        </div>
      </div>
    </div>
  );
}
