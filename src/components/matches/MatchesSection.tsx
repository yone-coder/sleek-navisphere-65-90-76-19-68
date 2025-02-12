
import { ArrowUpRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchCard } from "./MatchCard";
import { Match } from "./types";

interface MatchesSectionProps {
  matches: Match[];
}

export const MatchesSection = ({ matches }: MatchesSectionProps) => {
  return (
    <section className="py-8 px-6 bg-[#1a1a1a]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white px-2">Featured Matches</h2>
        <button className="text-[#9b87f5] hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
          View all <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-6 pb-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
