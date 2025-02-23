
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TournamentHeroProps {
  title?: string;
  game?: string;
  skillLevel?: string;
  description?: string;
  tags?: string[];
}

export function TournamentHero({ 
  title,
  game = "Chess",
  skillLevel = "Advanced",
  description = "The premier gaming event featuring the latest titles and top competitors from around the world. Join us for an unforgettable experience of competitive gaming at its finest.",
  tags = ["Competitive", "Professional", "Global", "Live Streamed", "Ranked"]
}: TournamentHeroProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="animate-in fade-in-50">
            Game: {game}
          </Badge>
          <Badge variant="outline" className="animate-in fade-in-50 delay-100">
            Skill Level: {skillLevel}
          </Badge>
        </div>
        <Button 
          variant="default" 
          size="sm"
          className="group"
        >
          <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          Follow
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="bg-blue-50 dark:bg-blue-900/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
