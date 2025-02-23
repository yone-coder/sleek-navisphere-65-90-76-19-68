
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function ParticipantsTable() {
  const participants = [
    {
      id: 1,
      name: "Alex Johnson",
      rank: "#1",
      avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
      country: "USA",
      rating: 2800,
      winRate: 85,
      status: "confirmed"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rank: "#2",
      avatar: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
      country: "Spain",
      rating: 2750,
      winRate: 82,
      status: "confirmed"
    },
    {
      id: 3,
      name: "James Wilson",
      rank: "#3",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      country: "UK",
      rating: 2700,
      winRate: 79,
      status: "pending"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tournament Participants</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Confirmed: 28
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Pending: 12
          </Badge>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{participant.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img 
                      src={participant.avatar} 
                      alt={participant.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{participant.name}</span>
                  </div>
                </TableCell>
                <TableCell>{participant.country}</TableCell>
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
                    variant={participant.status === "confirmed" ? "default" : "secondary"}
                    className={cn(
                      participant.status === "confirmed" 
                        ? "bg-green-500" 
                        : "bg-yellow-500"
                    )}
                  >
                    {participant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-muted/20 rounded-lg">
        <h4 className="font-medium mb-4">Quick Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="text-2xl font-bold">2750</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Top Country</div>
            <div className="text-2xl font-bold">USA</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Total Prize Claims</div>
            <div className="text-2xl font-bold">$45K</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Avg. Win Rate</div>
            <div className="text-2xl font-bold">82%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
