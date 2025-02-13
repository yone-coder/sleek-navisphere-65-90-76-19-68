
import { useSearchParams, useNavigate } from "react-router-dom";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Tournaments() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("game");
  const gameTitle = searchParams.get("title");

  return (
    <div className="min-h-screen">
      {/* Custom Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Tournaments</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-14">
        {gameTitle && (
          <h2 className="text-2xl font-bold px-4 py-6">
            {decodeURIComponent(gameTitle)} Tournaments
          </h2>
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
    </div>
  );
}
