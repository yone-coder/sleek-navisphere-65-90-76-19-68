
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { Tournament } from "@/types/tournament";

interface SortableTournamentCardProps {
  tournament: Tournament;
}

export function SortableTournamentCard({ tournament }: SortableTournamentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tournament.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TournamentCard tournament={tournament} isAdmin />
    </div>
  );
}
