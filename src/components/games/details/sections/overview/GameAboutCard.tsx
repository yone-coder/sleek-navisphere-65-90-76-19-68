
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameAboutCardProps {
  game: any;
}

export const GameAboutCard = ({ game }: GameAboutCardProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-bold">About Game</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {game?.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {game?.features?.map((feature: string) => (
            <Badge 
              key={feature} 
              variant="outline" 
              className="bg-blue-50 dark:bg-blue-900/20"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
