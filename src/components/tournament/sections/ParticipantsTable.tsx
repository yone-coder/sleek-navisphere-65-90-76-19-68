
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter,
  ArrowUpDown,
  CalendarDays,
  Trophy,
  Users,
  UserX
} from "lucide-react";

type Participant = {
  id: number;
  name: string;
  rank: string;
  avatar: string;
  country: string;
  rating: number;
  winRate: number;
  status: "confirmed" | "pending" | "withdrawn";
  joinDate: string;
  lastActive: string;
  achievements: number;
};

export function ParticipantsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Participant>("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<Participant["status"] | "all">("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const participants: Participant[] = [
    {
      id: 1,
      name: "Alex Johnson",
      rank: "#1",
      avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
      country: "USA",
      rating: 2800,
      winRate: 85,
      status: "confirmed",
      joinDate: "2024-01-15",
      lastActive: "2024-02-28",
      achievements: 12
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rank: "#2",
      avatar: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
      country: "Spain",
      rating: 2750,
      winRate: 82,
      status: "confirmed",
      joinDate: "2024-01-16",
      lastActive: "2024-02-27",
      achievements: 9
    },
    {
      id: 3,
      name: "James Wilson",
      rank: "#3",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      country: "UK",
      rating: 2700,
      winRate: 79,
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-02-26",
      achievements: 7
    },
    {
      id: 4,
      name: "Sarah Chen",
      rank: "#4",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      country: "China",
      rating: 2680,
      winRate: 76,
      status: "withdrawn",
      joinDate: "2024-01-20",
      lastActive: "2024-02-15",
      achievements: 5
    }
  ];

  const handleSort = (field: keyof Participant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredParticipants = participants
    .filter(p => 
      (statusFilter === "all" || p.status === statusFilter) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.country.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return multiplier * (String(a[sortField]) > String(b[sortField]) ? 1 : -1);
    });

  const paginatedParticipants = filteredParticipants.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);

  const getStatusColor = (status: Participant["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "withdrawn":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Total Players</span>
          </div>
          <p className="text-2xl font-bold mt-2">{participants.length}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
          <div className="flex items-center gap-2 text-green-600">
            <Trophy className="h-5 w-5" />
            <span className="text-sm font-medium">Confirmed</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {participants.filter(p => p.status === "confirmed").length}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-600">
            <CalendarDays className="h-5 w-5" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {participants.filter(p => p.status === "pending").length}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg">
          <div className="flex items-center gap-2 text-red-600">
            <UserX className="h-5 w-5" />
            <span className="text-sm font-medium">Withdrawn</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {participants.filter(p => p.status === "withdrawn").length}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2",
              statusFilter === "all" && "bg-primary text-primary-foreground"
            )}
            onClick={() => setStatusFilter("all")}
          >
            <Filter className="h-4 w-4" />
            All
          </Button>
          {(["confirmed", "pending", "withdrawn"] as const).map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              className={cn(
                "gap-2",
                statusFilter === status && "bg-primary text-primary-foreground"
              )}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <ScrollArea className="h-[450px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-2"
                    onClick={() => handleSort("rating")}
                  >
                    Rating
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-2"
                    onClick={() => handleSort("winRate")}
                  >
                    Win Rate
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedParticipants.map((participant) => (
                <TableRow key={participant.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell className="font-medium">{participant.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div>{participant.name}</div>
                        <div className="text-sm text-muted-foreground">{participant.country}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{participant.rating}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={participant.winRate} 
                        className="w-20 h-2"
                      />
                      <span className="text-sm text-muted-foreground">
                        {participant.winRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={cn(getStatusColor(participant.status))}
                    >
                      {participant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {participant.lastActive}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
