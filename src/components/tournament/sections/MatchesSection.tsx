
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Match {
  id: number;
  championship: string;
  phase: string;
  status: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  opponents: Array<{
    name: string;
    photo: string;
    country: string;
    city: string;
    rank: number;
    stats: string;
    wins: number;
    losses: number;
  }>;
  spectators: number;
  likes: number;
  comments: number;
  predictions: {
    firstPlayer: number;
    secondPlayer: number;
  };
}

interface MatchesSectionProps {
  matches: Match[];
  title: string;
}

export function MatchesSection({ matches, title }: MatchesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-medium">{match.championship}</h4>
                <p className="text-sm text-gray-500">{match.phase}</p>
              </div>
              <Badge 
                variant={match.status === 'live' ? 'default' : 'secondary'}
                className={match.status === 'live' ? 'bg-red-500' : ''}
              >
                {match.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              {match.opponents.map((opponent, index) => (
                <div key={opponent.name} className={`${index === 1 ? 'col-span-1 text-center' : ''}`}>
                  {index === 1 ? (
                    <div className="text-2xl font-bold text-gray-400">VS</div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img 
                        src={opponent.photo} 
                        alt={opponent.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{opponent.name}</p>
                        <p className="text-sm text-gray-500">{opponent.country}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t flex justify-between text-sm text-gray-500">
              <div>{format(new Date(`${match.date} ${match.time}`), 'PPp')}</div>
              <div>{match.venue}, {match.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
