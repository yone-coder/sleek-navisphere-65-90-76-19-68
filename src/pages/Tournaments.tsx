
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
        <div className="flex overflow-x-auto space-x-6 pb-6 no-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TournamentCardSkeleton key={n} className="min-w-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Tournaments</h1>
      <div className="flex overflow-x-auto space-x-6 pb-6 no-scrollbar">
        {tournaments?.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} className="min-w-[300px]" />
        ))}
      </div>
    </div>
  );
}
