
import { useState } from "react";
import { Trophy, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Player {
  id: number;
  name: string;
  avatar: string;
  seed?: number;
  score?: number;
}

interface Match {
  id: number;
  round: number;
  player1: Player;
  player2: Player;
  winner?: number;
  date: string;
  time: string;
}

interface BracketRound {
  name: string;
  matches: Match[];
}

const sampleBrackets: BracketRound[] = [
  {
    name: "Quarter Finals",
    matches: [
      {
        id: 1,
        round: 1,
        player1: {
          id: 1,
          name: "Alex Johnson",
          avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
          seed: 1,
          score: 3
        },
        player2: {
          id: 2,
          name: "Maria Rodriguez",
          avatar: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
          seed: 8,
          score: 1
        },
        date: "2024-03-15",
        time: "14:00"
      },
      {
        id: 2,
        round: 1,
        player1: {
          id: 3,
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
          seed: 4,
          score: 3
        },
        player2: {
          id: 4,
          name: "Sofia Chen",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          seed: 5,
          score: 2
        },
        date: "2024-03-15",
        time: "16:00"
      }
    ]
  },
  {
    name: "Semi Finals",
    matches: [
      {
        id: 3,
        round: 2,
        player1: {
          id: 1,
          name: "Alex Johnson",
          avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
          seed: 1,
          score: 3
        },
        player2: {
          id: 3,
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
          seed: 4,
          score: 1
        },
        date: "2024-03-16",
        time: "15:00"
      }
    ]
  },
  {
    name: "Finals",
    matches: []
  }
];

const MatchCard = ({ match }: { match: Match }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {match.date} - {match.time}
          </Badge>
          <Button variant="ghost" size="sm" className="h-6">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="space-y-3">
          {/* Player 1 */}
          <div className={cn(
            "flex items-center justify-between p-2 rounded-md",
            match.player1.score > (match.player2.score || 0) ? "bg-green-50" : "bg-gray-50"
          )}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <img 
                  src={match.player1.avatar} 
                  alt={match.player1.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {match.player1.seed}
                </Badge>
              </div>
              <span className="font-medium">{match.player1.name}</span>
            </div>
            <span className="text-2xl font-bold">{match.player1.score}</span>
          </div>

          {/* Player 2 */}
          <div className={cn(
            "flex items-center justify-between p-2 rounded-md",
            match.player2.score > (match.player1.score || 0) ? "bg-green-50" : "bg-gray-50"
          )}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <img 
                  src={match.player2.avatar} 
                  alt={match.player2.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {match.player2.seed}
                </Badge>
              </div>
              <span className="font-medium">{match.player2.name}</span>
            </div>
            <span className="text-2xl font-bold">{match.player2.score}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Match Details:</p>
            <ul className="text-sm space-y-1">
              <li>• Best of 5 games</li>
              <li>• Winner advances to next round</li>
              <li>• Match referee: John Smith</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export function TournamentBrackets() {
  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Tournament Bracket
        </h3>
        <Button variant="outline" size="sm">
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sampleBrackets.map((round, index) => (
          <div key={round.name} className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 px-2 flex items-center">
                Round {index + 1}
              </Badge>
              <h4 className="font-medium">{round.name}</h4>
              {index < sampleBrackets.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
            
            <div className="space-y-4">
              {round.matches.length > 0 ? (
                round.matches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Matches coming soon</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
