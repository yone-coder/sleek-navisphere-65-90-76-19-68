
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { ContestCard } from "./ContestCard";

interface ContestSectionProps {
  title: string;
  contests: Array<{
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
  }>;
}

export function ContestSection({ title, contests }: ContestSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-medium text-foreground">{title}</h2>
        <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex px-4 gap-4 pb-4">
          {contests.map(contest => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
