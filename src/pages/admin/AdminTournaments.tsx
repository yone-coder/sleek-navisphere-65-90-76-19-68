
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TournamentStatus = "upcoming" | "in-progress" | "closed" | "completed";

interface FormData {
  title: string;
  start_date: string;
  prize_pool: string;
  max_participants: string;
  status: TournamentStatus;
  banner_url: string;
}

export default function AdminTournaments() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    start_date: "",
    prize_pool: "",
    max_participants: "",
    status: "upcoming",
    banner_url: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ["admin-tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("position");
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("tournaments")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete tournament",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Tournament deleted successfully",
    });
    setIsDeleteDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["admin-tournaments"] });
  };

  const handleAddTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("tournaments").insert({
        title: formData.title,
        start_date: new Date(formData.start_date).toISOString(),
        prize_pool: Number(formData.prize_pool),
        max_participants: Number(formData.max_participants),
        status: formData.status,
        banner_url: formData.banner_url,
        position: tournaments ? tournaments.length : 0,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tournament added successfully",
      });
      
      setIsAddDialogOpen(false);
      setFormData({
        title: "",
        start_date: "",
        prize_pool: "",
        max_participants: "",
        status: "upcoming",
        banner_url: "",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-tournaments"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add tournament",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tournaments Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Tournament
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prize Pool</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournaments?.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell>{tournament.position}</TableCell>
                <TableCell>{tournament.title}</TableCell>
                <TableCell>
                  {new Date(tournament.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{tournament.status}</TableCell>
                <TableCell>${tournament.prize_pool}</TableCell>
                <TableCell>
                  {tournament.current_participants}/{tournament.max_participants}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedTournament(tournament);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tournament</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedTournament?.title}</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedTournament?.id)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tournament Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tournament</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddTournament} className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="datetime-local"
                required
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="prize_pool">Prize Pool ($)</Label>
              <Input
                id="prize_pool"
                type="number"
                required
                value={formData.prize_pool}
                onChange={(e) =>
                  setFormData({ ...formData, prize_pool: e.target.value })
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                required
                value={formData.max_participants}
                onChange={(e) =>
                  setFormData({ ...formData, max_participants: e.target.value })
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: TournamentStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="banner_url">Banner URL</Label>
              <Input
                id="banner_url"
                required
                value={formData.banner_url}
                onChange={(e) =>
                  setFormData({ ...formData, banner_url: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Tournament
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
