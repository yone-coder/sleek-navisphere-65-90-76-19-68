
import { cn } from "@/lib/utils";
import { TournamentCardProps } from "@/types/tournament";

export function TournamentCard({ tournament, isAdmin, className }: TournamentCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow", className)}>
      {tournament.banner_url && (
        <img
          src={tournament.banner_url}
          alt={tournament.title}
          className="aspect-[2/1] w-full object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{tournament.title}</h3>
        {tournament.description && (
          <p className="mt-2 text-sm text-muted-foreground">{tournament.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {tournament.current_participants}/{tournament.max_participants} participants
          </div>
          <div className="text-sm font-medium">
            Prize: ${tournament.prize_pool}
          </div>
        </div>
      </div>
    </div>
  );
}
