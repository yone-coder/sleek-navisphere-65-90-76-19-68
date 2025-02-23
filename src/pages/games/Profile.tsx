import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, Star, Users, Gamepad2, Settings, ChevronRight, 
  Shield, Hexagon, BadgeCheck, Clock, Heart
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

const achievements = [
  { id: 1, name: "First Victory", description: "Win your first game", progress: 100, icon: Trophy },
  { id: 2, name: "Social Butterfly", description: "Add 10 friends", progress: 60, icon: Users },
  { id: 3, name: "Gaming Legend", description: "Play 100 games", progress: 45, icon: Gamepad2 },
];

const stats = [
  { label: "Games Played", value: "1,234" },
  { label: "Win Rate", value: "67%" },
  { label: "Tournament Wins", value: "12" },
  { label: "Total Hours", value: "456" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black/95">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600" />
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative -mt-16 flex items-end gap-4 mb-4">
            <Avatar className="h-32 w-32 rounded-full border-4 border-black/95">
              <AvatarImage src="https://images.unsplash.com/photo-1566492031773-4f4e44671857" />
              <AvatarFallback>GP</AvatarFallback>
            </Avatar>
            <div className="flex-1 mb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">GamerPro99</h1>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none">
                  <Shield className="h-3 w-3 mr-1" /> Pro Player
                </Badge>
              </div>
              <p className="text-gray-400">Level 42 • Joined 2 years ago</p>
            </div>
            <Button variant="outline" size="icon" className="mb-4 border-white/10 text-white hover:bg-white/5">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          {/* Achievement Progress */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white">{achievement.name}</h3>
                        <span className="text-sm text-gray-400">{achievement.progress}%</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                      <Progress value={achievement.progress} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              >
                <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                Won Tournament "Summer Championship 2024"
                <span className="ml-auto text-sm text-gray-500">2h ago</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              >
                <Star className="h-4 w-4 mr-2 text-purple-500" />
                Achieved "Master Strategist" badge
                <span className="ml-auto text-sm text-gray-500">1d ago</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              >
                <Gamepad2 className="h-4 w-4 mr-2 text-blue-500" />
                Played "Chess Master Pro"
                <span className="ml-auto text-sm text-gray-500">2d ago</span>
              </Button>
            </div>
          </div>

          {/* Game Collection */}
          <div>
            <h2 className="text-lg font-medium text-white mb-4">Game Collection</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-white/10 hover:bg-white/5"
                onClick={() => navigate("/games/chess")}
              >
                <img
                  src="https://images.unsplash.com/photo-1586165368502-1bad197a6461"
                  alt="Chess"
                  className="h-10 w-10 rounded-lg object-cover mr-3"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium text-white">Chess Master Pro</div>
                  <div className="text-sm text-gray-400">Last played 2h ago</div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
