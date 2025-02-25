
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MatchCard } from "@/components/matches/MatchCard";
import type { Match } from "@/components/matches/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameMatchesSectionProps {
  matches: Match[];
}

export const GameMatchesSection = ({ matches }: GameMatchesSectionProps) => {
  const liveAndUpcoming = matches.filter(m => m.status === "live" || m.status === "upcoming");
  const completed = matches.filter(m => m.status === "done");

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Game Matches</h2>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Matches</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                placeholder="Search by player or tournament..." 
                className="pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Match Status</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matches</SelectItem>
                <SelectItem value="live">Live Now</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatchesColumn
            title="Live & Upcoming"
            matches={liveAndUpcoming}
            badgeColor="green"
          />
          <MatchesColumn
            title="Recent Matches"
            matches={completed}
            badgeColor="blue"
          />
        </div>
      </div>
    </div>
  );
};

interface MatchesColumnProps {
  title: string;
  matches: Match[];
  badgeColor: "green" | "blue";
}

const MatchesColumn = ({ title, matches, badgeColor }: MatchesColumnProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-gray-400">{title}</h3>
      <Badge 
        variant="outline" 
        className={`bg-${badgeColor}-500/10 text-${badgeColor}-500 hover:bg-${badgeColor}-500/20`}
      >
        {matches.length} Matches
      </Badge>
    </div>
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard 
          key={match.id} 
          match={match}
        />
      ))}
    </div>
  </div>
);
