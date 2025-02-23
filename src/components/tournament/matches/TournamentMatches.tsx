
import { MatchesSection } from "@/components/matches/MatchesSection";
import { Match } from "@/components/matches/types";

interface TournamentMatchesProps {
  matches: Match[];
}

export function TournamentMatches({ matches }: TournamentMatchesProps) {
  return (
    <div className="space-y-12 -mx-4">
      <MatchesSection matches={matches} title="Quarter Finals" />
      <MatchesSection matches={matches} title="Group Stage" />
      <MatchesSection matches={matches} title="Qualifiers" />
    </div>
  );
}
