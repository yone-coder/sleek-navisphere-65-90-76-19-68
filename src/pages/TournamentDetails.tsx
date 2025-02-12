
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Calendar,
  Users,
  Clock,
  Award,
  Swords,
  MapPin,
  Share2,
  Heart,
  MessageSquare,
  User,
  Gamepad,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function TournamentDetails() {
  const { id } = useParams();
  // For demo purposes, we'll use static data
  const tournament = {
    id: 1,
    title: "Winter Championship 2024",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&h=800&q=80",
    status: "ongoing",
    date: "Apr 15 - May 1",
    currentParticipants: 84,
    maxParticipants: 128,
    prizePool: "$10,000",
    description: "Join the most prestigious gaming tournament of the season. Compete against the best players from around the world and prove your skills in this epic championship.",
    location: "Online & Los Angeles Finals",
    game: "Fortnite",
    format: "Double Elimination",
    rules: [
      "Players must be 16+ years old",
      "Valid game account required",
      "Streaming equipment recommended",
      "All matches are monitored",
      "Zero tolerance for cheating"
    ],
    schedule: [
      { phase: "Qualifiers", date: "Apr 15-20", status: "completed" },
      { phase: "Group Stage", date: "Apr 21-25", status: "ongoing" },
      { phase: "Quarter Finals", date: "Apr 26-27", status: "upcoming" },
      { phase: "Semi Finals", date: "Apr 28-29", status: "upcoming" },
      { phase: "Finals", date: "May 1", status: "upcoming" }
    ],
    topPlayers: [
      {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
        rank: "1st",
        score: "2,450"
      },
      {
        name: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
        rank: "2nd",
        score: "2,380"
      },
      {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80",
        rank: "3rd",
        score: "2,310"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "ongoing":
        return Clock;
      case "upcoming":
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={tournament.banner}
          alt={tournament.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{tournament.title}</h1>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{tournament.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad className="w-4 h-4" />
              <span>{tournament.game}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="participants">Participants</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">
                        {tournament.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <Trophy className="w-5 h-5 text-[#9b87f5] mb-2" />
                          <div className="text-sm text-gray-600">Prize Pool</div>
                          <div className="font-semibold">{tournament.prizePool}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <Users className="w-5 h-5 text-[#9b87f5] mb-2" />
                          <div className="text-sm text-gray-600">Participants</div>
                          <div className="font-semibold">{tournament.currentParticipants}/{tournament.maxParticipants}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <Swords className="w-5 h-5 text-[#9b87f5] mb-2" />
                          <div className="text-sm text-gray-600">Format</div>
                          <div className="font-semibold">{tournament.format}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <Award className="w-5 h-5 text-[#9b87f5] mb-2" />
                          <div className="text-sm text-gray-600">Status</div>
                          <div className="font-semibold capitalize">{tournament.status}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rules">
                    <div className="space-y-4">
                      {tournament.rules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#9b87f5]/10 flex items-center justify-center flex-shrink-0">
                            <ChevronRight className="w-4 h-4 text-[#9b87f5]" />
                          </div>
                          <p className="text-gray-600">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <div className="space-y-4">
                      {tournament.schedule.map((phase, index) => {
                        const StatusIcon = getStatusIcon(phase.status);
                        return (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <StatusIcon className={`w-5 h-5 ${phase.status === 'completed' ? 'text-green-500' : phase.status === 'ongoing' ? 'text-blue-500' : 'text-gray-400'}`} />
                              <div>
                                <div className="font-medium">{phase.phase}</div>
                                <div className="text-sm text-gray-500">{phase.date}</div>
                              </div>
                            </div>
                            <Badge className={getStatusColor(phase.status)}>
                              {phase.status}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="participants">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-sm text-gray-500">Registration Progress</div>
                          <div className="font-medium">{tournament.currentParticipants}/{tournament.maxParticipants} Participants</div>
                        </div>
                        <Progress value={(tournament.currentParticipants / tournament.maxParticipants) * 100} className="w-1/2" />
                      </div>
                      <ScrollArea className="h-[300px] pr-4">
                        {tournament.topPlayers.map((player, index) => (
                          <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>
                                  <User className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{player.name}</div>
                                <div className="text-sm text-gray-500">Score: {player.score}</div>
                              </div>
                            </div>
                            <Badge variant="secondary">{player.rank}</Badge>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">Registration closes in</div>
                    <div className="text-2xl font-bold text-[#9b87f5]">3 days 14 hours</div>
                  </div>
                  <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                    Register Now
                  </Button>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#9b87f5] transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>246</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#9b87f5] transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      <span>89</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#9b87f5] transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
