
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Users, Globe, MapPin, Users2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface GameDetailCardsProps {
  game: any;
}

export const GameDetailCards = ({ game }: GameDetailCardsProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">Game Details</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <DetailItem 
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            label="Genre"
            value={game?.game_type}
          />
          <DetailItem 
            icon={<Globe className="h-4 w-4 text-muted-foreground" />}
            label="Developer"
            value={game?.developer}
          />
          <DetailItem 
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            label="Publisher"
            value={game?.publisher}
          />
          <DetailItem 
            icon={<Users2 className="h-4 w-4 text-muted-foreground" />}
            label="Platform"
            value={game?.platform?.join(", ")}
          />
          <DetailItem 
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            label="Release Date"
            value={game?.release_date ? format(new Date(game.release_date), 'MMM d, yyyy') : 'TBA'}
          />
          <DetailItem 
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            label="Last Updated"
            value={game?.updated_at ? format(new Date(game.updated_at), 'MMM d, yyyy') : 'N/A'}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);
