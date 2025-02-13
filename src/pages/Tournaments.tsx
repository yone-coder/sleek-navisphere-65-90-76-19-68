
import { TournamentCard } from "@/components/tournaments/TournamentCard";

export default function Tournaments() {
  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-col">
        <TournamentCard className="w-full max-w-none rounded-none" />
        <TournamentCard className="w-full max-w-none rounded-none" />
        <TournamentCard className="w-full max-w-none rounded-none" />
      </div>
    </div>
  );
}
