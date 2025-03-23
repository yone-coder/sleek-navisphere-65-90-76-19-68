
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

interface GameTournamentsSectionProps {
  tournaments: any[];
}

export const GameTournamentsSection = ({ tournaments }: GameTournamentsSectionProps) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Tournaments</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard 
            key={tournament.id} 
            tournament={tournament}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};
