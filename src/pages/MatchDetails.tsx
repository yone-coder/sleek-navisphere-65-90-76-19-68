
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Match } from "@/components/matches/types";
import { ArrowLeft, Search, Heart, MessageSquare, Eye, Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format, parse } from "date-fns";

export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [subTab, setSubTab] = useState("stats");
  const [matchTime, setMatchTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatMatchTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // This would normally come from an API call using the id
  const match: Match = {
    id: 1,
    championship: "World Championship",
    phase: "Quarterfinals",
    status: "live",
    date: "2025-02-12",
    time: "17:45:00",
    venue: "Madison Square Garden",
    location: "New York, USA",
    opponents: [
      {
        name: "Alex Johnson",
        photo: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
        country: "USA",
        city: "New York",
        rank: 1,
        stats: "Top Player",
        wins: 42,
        losses: 12
      },
      {
        name: "Maria Rodriguez",
        photo: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
        country: "Spain",
        city: "Miami",
        rank: 2,
        stats: "Rising Star",
        wins: 38,
        losses: 15
      }
    ],
    spectators: 2500,
    likes: 1200,
    comments: 458,
    predictions: {
      firstPlayer: 65,
      secondPlayer: 35
    }
  };

  const formatMatchDateTime = (dateString: string, timeString: string) => {
    try {
      const dateTime = parse(`${dateString} ${timeString}`, 'yyyy-MM-dd HH:mm:ss', new Date());
      return `${format(dateTime, "MMM d, yyyy")} • ${format(dateTime, "h:mm a")}`;
    } catch (error) {
      console.error('Error formatting date/time:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white animate-fade-in">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800">
        <div className="h-16 px-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Match Details</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Match Banner */}
      <div className="pt-16">
        <div className="bg-gradient-to-b from-purple-900 to-gray-800 p-4 pt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🏆</span>
              <h2 className="text-lg font-bold uppercase">{match.championship}</h2>
            </div>
            <Badge variant="secondary" className="bg-green-700 text-green-100">
              {match.status === "live" && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse mr-1 inline-block" />
                  LIVE
                </>
              )}
            </Badge>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mt-4 space-x-1">
            {["overview", "livestream"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg focus:outline-none capitalize",
                  activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Section */}
          {activeTab === "overview" && (
            <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary" className="bg-gray-700">
                  {match.phase}
                </Badge>
                <span className="text-gray-300 text-sm">
                  {formatMatchDateTime(match.date, match.time)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                {match.opponents.map((opponent, index) => (
                  <div key={opponent.name} className="flex flex-col items-center w-1/3">
                    <Avatar className="w-16 h-16 mb-2 ring-2 ring-white/10">
                      <AvatarImage src={opponent.photo} alt={opponent.name} className="object-cover" />
                      <AvatarFallback>{opponent.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-center">{opponent.name}</h3>
                    <p className="text-sm text-gray-400">{opponent.city}</p>
                    <p className="text-sm font-medium mt-1">
                      {opponent.wins}W - {opponent.losses}L
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "mt-2 rounded-full",
                        index === 1 ? "bg-gray-700 text-gray-300" : "bg-blue-600 hover:bg-blue-700 text-white"
                      )}
                    >
                      {index === 1 ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <p className="text-lg font-bold mb-2">eFootball</p>
                  <p className="text-2xl font-bold">2 - 3</p>
                  <p className="text-lg font-semibold mt-2">{formatMatchTime(matchTime)}</p>
                </div>
              </div>

              {/* Fan Poll */}
              {match.predictions && (
                <div className="mb-4">
                  <Progress value={match.predictions.firstPlayer} className="h-2" />
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">{match.predictions.firstPlayer}%</span>
                    <span className="text-sm text-gray-400">Fan Prediction Poll</span>
                    <span className="text-sm">{match.predictions.secondPlayer}%</span>
                  </div>
                </div>
              )}

              {/* Engagement */}
              <div className="flex justify-between items-center text-sm text-gray-400">
                <button className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{match.likes}</span>
                </button>
                <button className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{match.comments}</span>
                </button>
                <button className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{match.spectators}</span>
                </button>
                <button>
                  <Share2 className="w-4 h-4" />
                </button>
                <button>
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* LiveStream Section */}
          {activeTab === "livestream" && (
            <div className="mt-4">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center h-64 bg-black rounded-lg w-full">
                  <span className="text-gray-400">LiveStream Content Here</span>
                </div>
                <div className="flex items-center mt-2 text-gray-400">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>1.5K viewers</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center mt-4 ml-4">
        <Avatar className="w-8 h-8">
          <AvatarImage 
            src="https://storage.googleapis.com/a1aa/image/tqMpx5Cggv_-GtyiCLvQDejG62SE4Hnb7XvmRd4XzNA.jpg" 
            alt="Chess" 
          />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex items-center">
          <h3 className="font-semibold">Chess</h3>
          <Check className="w-4 h-4 text-blue-500 ml-1" />
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="flex justify-center mt-4 space-x-1">
        {["stats", "highlights", "commentary"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={cn(
              "px-4 py-2 rounded-lg focus:outline-none capitalize",
              subTab === tab ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 px-4 pb-16">
        {subTab === "stats" && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Match Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Possession</span>
                <span>55% - 45%</span>
              </div>
              <div className="flex justify-between">
                <span>Shots on Target</span>
                <span>8 - 6</span>
              </div>
              <div className="flex justify-between">
                <span>Fouls</span>
                <span>12 - 9</span>
              </div>
              <div className="flex justify-between">
                <span>Corners</span>
                <span>5 - 3</span>
              </div>
            </div>
          </div>
        )}

        {subTab === "highlights" && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Match Highlights</h3>
            <div className="space-y-2">
              {[
                { time: "12'", event: "Goal by Alex Johnson" },
                { time: "34'", event: "Yellow Card for Maria Rodriguez" },
                { time: "45'", event: "Half-time" },
                { time: "67'", event: "Goal by Maria Rodriguez" },
                { time: "89'", event: "Full-time" }
              ].map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-400 w-12">{highlight.time}</span>
                  <p>{highlight.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {subTab === "commentary" && (
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Live Commentary</h3>
            <div className="space-y-2">
              {[
                { time: "12'", comment: "Alex Johnson scores a stunning goal!" },
                { time: "34'", comment: "Maria Rodriguez receives a yellow card for a rough tackle." },
                { time: "45'", comment: "The referee blows the whistle for half-time." },
                { time: "67'", comment: "Maria Rodriguez equalizes with a brilliant goal!" },
                { time: "89'", comment: "The match ends with a thrilling finish." }
              ].map((commentary, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-400 w-12">{commentary.time}</span>
                  <p>{commentary.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
