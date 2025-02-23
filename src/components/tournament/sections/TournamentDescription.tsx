
import { Badge } from "@/components/ui/badge";
import { Calendar, Flag, Shield, Target, Users, Trophy, MapPin } from "lucide-react";
import { format } from "date-fns";

interface TournamentDescriptionProps {
  tournament?: {
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    game?: string;
    prize_pool?: number;
    location?: string;
    skill_level?: string;
    max_participants?: number;
  };
}

export function TournamentDescription({ tournament }: TournamentDescriptionProps) {
  const features = [
    { icon: Shield, label: "Skill Level", value: tournament?.skill_level || "Advanced" },
    { icon: Users, label: "Max Players", value: tournament?.max_participants || "0" },
    { icon: Trophy, label: "Prize Pool", value: `$${tournament?.prize_pool?.toLocaleString() || "0"}` },
    { icon: MapPin, label: "Location", value: tournament?.location || "Online" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {tournament?.start_date && tournament?.end_date
              ? `${format(new Date(tournament.start_date), 'MMM dd')} - ${format(new Date(tournament.end_date), 'MMM dd, yyyy')}`
              : "Dates TBA"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-blue-500">
            {tournament?.game || "Game"}
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Professional
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-500">
            Official
          </Badge>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {tournament?.description || 
           "Join us for an exciting tournament that brings together the best players from around the world. Compete at the highest level and prove your skills in this prestigious event."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <div 
            key={feature.label} 
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <feature.icon className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{feature.label}</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{feature.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Tournament Features</h3>
        <ul className="grid grid-cols-2 gap-2">
          {[
            "Professional Referees",
            "Live Streaming",
            "Official Rankings",
            "Anti-Cheat System",
            "Player Support",
            "Real-time Stats"
          ].map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Target className="h-4 w-4 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
