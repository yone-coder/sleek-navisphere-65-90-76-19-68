
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentCardSkeleton } from "@/components/tournaments/TournamentCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Tournaments() {
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-6">
        <h1 className="text-2xl font-bold mb-6">Tournaments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TournamentCardSkeleton key={n} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Tournaments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments?.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}
