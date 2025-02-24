import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Filter,
  ArrowUpDown,
  CalendarDays,
  Trophy,
  Users,
  UserX,
  MoreHorizontal,
  MessageSquare,
  UserPlus,
  Shield,
  Medal,
  Flag,
  BadgeCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  role?: "admin" | "mod" | "vip";
  isVerified?: boolean;
  streak?: number;
};

export function ParticipantsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Participant>("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<Participant["status"] | "all">("all");
  const [page, setPage] = useState(1);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const { toast } = useToast();
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
      achievements: 12,
      role: "admin",
      isVerified: true,
      streak: 5
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
      achievements: 9,
      role: "vip",
      isVerified: true,
      streak: 3
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
      achievements: 7,
      streak: 0
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
      achievements: 5,
      streak: 1
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

  const toggleParticipantSelection = (id: number) => {
    setSelectedParticipants(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleAction = (action: string, participantId: number) => {
    const participant = participants.find(p => p.id === participantId);
    if (!participant) return;

    switch (action) {
      case "message":
        toast({
          title: `Messaging ${participant.name}`,
          description: "Opening chat window...",
          duration: 2000,
        });
        break;
      case "friend":
        toast({
          title: `Friend Request Sent`,
          description: `Request sent to ${participant.name}`,
          duration: 2000,
        });
        break;
      case "report":
        toast({
          title: "Report Submitted",
          description: "We'll review this player soon",
          duration: 2000,
        });
        break;
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

  const getRoleBadge = (role?: Participant["role"]) => {
    switch (role) {
      case "admin":
        return <Badge variant="secondary" className="bg-red-500/10 text-red-500">Admin</Badge>;
      case "mod":
        return <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Mod</Badge>;
      case "vip":
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">VIP</Badge>;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-14rem)] w-full">
      <div className="min-w-[900px]">
        <div className="p-3 grid grid-cols-4 gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
            <div className="flex items-center gap-1.5 text-blue-600">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Total Players</span>
            </div>
            <p className="text-base font-bold">{participants.length}</p>
          </div>
          <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
            <div className="flex items-center gap-1.5 text-green-600">
              <Trophy className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Confirmed</span>
            </div>
            <p className="text-base font-bold">
              {participants.filter(p => p.status === "confirmed").length}
            </p>
          </div>
          <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg">
            <div className="flex items-center gap-1.5 text-yellow-600">
              <CalendarDays className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Pending</span>
            </div>
            <p className="text-base font-bold">
              {participants.filter(p => p.status === "pending").length}
            </p>
          </div>
          <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg">
            <div className="flex items-center gap-1.5 text-red-600">
              <UserX className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Withdrawn</span>
            </div>
            <p className="text-base font-bold">
              {participants.filter(p => p.status === "withdrawn").length}
            </p>
          </div>
        </div>

        <div className="px-3 py-2 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-8 text-sm"
            />
          </div>
          <ScrollArea className="max-w-[300px]">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 px-2 text-xs flex-shrink-0",
                  statusFilter === "all" && "bg-primary text-primary-foreground"
                )}
                onClick={() => setStatusFilter("all")}
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="ml-1">All</span>
              </Button>
              {(["confirmed", "pending", "withdrawn"] as const).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-xs flex-shrink-0",
                    statusFilter === status && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="px-3">
          <div className="border rounded-lg overflow-hidden bg-background">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] py-2">Rank</TableHead>
                  <TableHead className="w-[250px] py-2">Player</TableHead>
                  <TableHead className="w-[90px] py-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 px-2 -ml-2 text-xs"
                      onClick={() => handleSort("rating")}
                    >
                      Rating
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[120px] py-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 px-2 -ml-2 text-xs"
                      onClick={() => handleSort("winRate")}
                    >
                      Win Rate
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[90px] py-2">Status</TableHead>
                  <TableHead className="w-[110px] py-2">Last Active</TableHead>
                  <TableHead className="w-[70px] py-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedParticipants.map((participant) => (
                  <TableRow 
                    key={participant.id} 
                    className={cn(
                      "hover:bg-muted/50 cursor-pointer transition-colors",
                      selectedParticipants.includes(participant.id) && "bg-muted"
                    )}
                    onClick={() => toggleParticipantSelection(participant.id)}
                  >
                    <TableCell className="py-1.5 font-medium">
                      <div className="flex items-center gap-1">
                        {participant.rank}
                        {participant.streak > 2 && (
                          <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 px-1 text-[10px]">
                            🔥 {participant.streak}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img 
                            src={participant.avatar} 
                            alt={participant.name}
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-offset-1 ring-offset-background ring-blue-500/20"
                          />
                          {participant.isVerified && (
                            <Badge 
                              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 p-0 bg-blue-500"
                            >
                              <BadgeCheck className="w-2.5 h-2.5 text-white" />
                            </Badge>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{participant.name}</span>
                            {getRoleBadge(participant.role)}
                          </div>
                          <div className="text-[10px] text-muted-foreground">{participant.country}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="text-sm tabular-nums">{participant.rating}</span>
                        {participant.achievements > 0 && (
                          <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 px-1 text-[10px]">
                            <Medal className="w-2.5 h-2.5 mr-0.5" />
                            {participant.achievements}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={participant.winRate} 
                          className={cn(
                            "w-14 h-1.5",
                            participant.winRate >= 80 ? "bg-green-200" :
                            participant.winRate >= 60 ? "bg-blue-200" :
                            "bg-orange-200"
                          )}
                        />
                        <span className="text-xs text-muted-foreground">
                          {participant.winRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "text-[10px] px-1.5 py-0.5",
                          getStatusColor(participant.status)
                        )}
                      >
                        {participant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-1.5 text-xs text-muted-foreground">
                      {participant.lastActive}
                    </TableCell>
                    <TableCell className="py-1.5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleAction("message", participant.id)}>
                            <MessageSquare className="h-4 w-4 mr-2" /> Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("friend", participant.id)}>
                            <UserPlus className="h-4 w-4 mr-2" /> Add Friend
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction("report", participant.id)}>
                            <Flag className="h-4 w-4 mr-2" /> Report Player
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between py-3">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
