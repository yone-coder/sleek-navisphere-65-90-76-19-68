
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, Star, Users, Gamepad2, Settings, ChevronRight, 
  Medal, Flame, Target, Clock, Sword, Shield, Crown, 
  TrendingUp, Share2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const achievements = [
  { id: 1, name: "Tournament Champion", description: "Win a major tournament", progress: 100, icon: Crown, rarityColor: "from-yellow-400 to-amber-600" },
  { id: 2, name: "Win Streak Master", description: "Win 10 games in a row", progress: 80, icon: Flame, rarityColor: "from-purple-500 to-pink-600" },
  { id: 3, name: "Community Leader", description: "Reach 1000 followers", progress: 65, icon: Users, rarityColor: "from-blue-500 to-cyan-600" },
  { id: 4, name: "Veteran Player", description: "Play 500 matches", progress: 45, icon: Sword, rarityColor: "from-emerald-500 to-teal-600" },
];

const recentMatches = [
  { id: 1, game: "Chess Masters", result: "Victory", rating: "+25", date: "2h ago", score: "2-1" },
  { id: 2, game: "Speed Puzzle", result: "Victory", rating: "+18", date: "5h ago", score: "Perfect" },
  { id: 3, game: "Tournament Match", result: "Defeat", rating: "-12", date: "1d ago", score: "1-2" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [currentRank, setCurrentRank] = useState(1250);
  const [peakRank, setPeakRank] = useState(1385);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative -mt-24 mb-8">
            <div className="flex items-end gap-6">
              <div className="relative">
                <Avatar className="h-40 w-40 rounded-2xl border-4 border-purple-500/20 shadow-2xl shadow-purple-500/20">
                  <AvatarImage src="https://images.unsplash.com/photo-1566492031773-4f4e44671857" />
                  <AvatarFallback>GP</AvatarFallback>
                </Avatar>
                <Badge className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 border-none">
                  <Crown className="h-4 w-4 mr-1" /> Elite
                </Badge>
              </div>
              
              <div className="flex-1 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">ProGamer2024</h1>
                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 border-none">
                    <Trophy className="h-3.5 w-3.5 mr-1" /> Tournament Pro
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4">Competitive player • Strategy specialist • 3x Tournament winner</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Share2 className="h-4 w-4 mr-2" /> Share Profile
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
                    <Users className="h-4 w-4 mr-2" /> Follow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start rounded-none p-0">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="matches" className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500">
              Matches
            </TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400">{currentRank}</div>
                <div className="text-sm text-gray-400">Current Rating</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-blue-400">{peakRank}</div>
                <div className="text-sm text-gray-400">Peak Rating</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-green-400">72%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-2xl font-bold text-amber-400">156</div>
                <div className="text-sm text-gray-400">Tournaments</div>
              </div>
            </div>

            {/* Recent Matches */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
              <div className="space-y-3">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Gamepad2 className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium">{match.game}</div>
                        <div className="text-sm text-gray-400">{match.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className={match.result === "Victory" ? "text-green-400" : "text-red-400"}>
                          {match.result}
                        </div>
                        <div className="text-sm text-gray-400">{match.score}</div>
                      </div>
                      <div className={`font-medium ${
                        match.rating.startsWith("+") ? "text-green-400" : "text-red-400"
                      }`}>
                        {match.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Achievements */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Achievements</h2>
              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${achievement.rarityColor} flex items-center justify-center`}>
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{achievement.name}</h3>
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
          </TabsContent>

          <TabsContent value="matches" className="animate-fade-in">
            <div className="text-center py-20 text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Match history coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="animate-fade-in">
            <div className="text-center py-20 text-gray-400">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Full achievements list coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
