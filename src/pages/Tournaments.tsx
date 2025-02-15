
import { useSearchParams, useNavigate } from "react-router-dom";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types/tournament";

export default function Tournaments() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get("game");
  const gameTitle = searchParams.get("title");

  const { data: tournaments = [], isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("position");
      
      if (error) throw error;
      return data || [];
    },
  });

  // Split tournaments by status
  const featuredTournaments = tournaments.filter((t: Tournament) => t.position <= 4);
  const upcomingTournaments = tournaments.filter((t: Tournament) => t.status === "upcoming");
  const pastTournaments = tournaments.filter((t: Tournament) => t.status === "completed");

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
        
        {isLoading ? (
          <div className="p-4">Loading tournaments...</div>
        ) : (
          <div className="flex flex-col space-y-6">
            {featuredTournaments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold px-4 mb-4">Featured Tournaments</h2>
                <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
                  {featuredTournaments.map((tournament) => (
                    <TournamentCard 
                      key={tournament.id}
                      tournament={tournament}
                      className="w-64 shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {upcomingTournaments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold px-4 mb-4">Upcoming Tournaments</h2>
                <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
                  {upcomingTournaments.map((tournament) => (
                    <TournamentCard 
                      key={tournament.id}
                      tournament={tournament}
                      className="w-64 shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {pastTournaments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold px-4 mb-4">Past Tournaments</h2>
                <div className="flex overflow-x-auto px-4 space-x-3 pb-4 no-scrollbar">
                  {pastTournaments.map((tournament) => (
                    <TournamentCard 
                      key={tournament.id}
                      tournament={tournament}
                      className="w-64 shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
