
import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTournamentCard } from "@/components/admin/SortableTournamentCard";
import { Tournament } from "@/types/tournament";

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("position");
      
      if (error) throw error;
      setTournaments(data || []);
      return data;
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setTournaments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Update positions in Supabase
        newArray.forEach(async (item, index) => {
          await supabase
            .from("tournaments")
            .update({ position: index })
            .eq("id", item.id);
        });
        
        return newArray;
      });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading tournaments...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tournaments</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Tournament
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tournaments} strategy={rectSortingStrategy}>
            {tournaments.map((tournament) => (
              <SortableTournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
