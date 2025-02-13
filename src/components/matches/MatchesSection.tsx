
import { ArrowUpRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchCard } from "./MatchCard";
import { Match } from "./types";

interface MatchesSectionProps {
  matches: Match[];
  title: string;
}

export const MatchesSection = ({ matches, title }: MatchesSectionProps) => {
  return (
    <section className="py-8 px-6 bg-[#1a1a1a]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold text-white">{title}</h2>
        <ArrowUpRight className="w-6 h-6 text-white" />
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
