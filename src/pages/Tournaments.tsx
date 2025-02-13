
import { useSearchParams } from "react-router-dom";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

export default function Tournaments() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("game");
  const gameTitle = searchParams.get("title");

  return (
    <div className="min-h-screen pt-20">
      {gameTitle && (
        <h1 className="text-2xl font-bold px-4 mb-6">
          {decodeURIComponent(gameTitle)} Tournaments
        </h1>
      )}
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-xl font-semibold px-4 mb-4">Featured Tournaments</h2>
          <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold px-4 mb-4">Upcoming Tournaments</h2>
          <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold px-4 mb-4">Past Tournaments</h2>
          <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
            <TournamentCard className="w-64 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
