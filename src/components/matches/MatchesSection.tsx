
import { ArrowRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchCard } from "./MatchCard";
import { Match } from "./types";

interface MatchesSectionProps {
  matches: Match[];
  title: string;
}

export const MatchesSection = ({ matches, title }: MatchesSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        <ArrowRight className="w-5 h-5 text-foreground/80 hover:text-foreground transition-colors cursor-pointer" />
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-6 px-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
