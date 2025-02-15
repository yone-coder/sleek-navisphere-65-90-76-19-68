
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Trophy, Heart, MessageSquare, Eye, Share2, Copy, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MatchDetails() {
  const navigate = useNavigate();
  const [matchTime, setMatchTime] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [statsTab, setStatsTab] = useState("stats");

  useEffect(() => {
    const timer = setInterval(() => {
      setMatchTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-800">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Match Details</h1>
        <button className="p-1">
          <Search className="h-6 w-6" />
        </button>
      </div>

      {/* Match Banner */}
      <div className="relative">
        <div className="bg-gradient-to-b from-purple-900 to-gray-800 p-4 pt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-bold">WORLD CHAMPIONSHIP</h2>
            </div>
            <Badge variant="default" className="bg-green-700 text-green-100">
              LIVE
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full mt-4">
            <TabsList className="w-full">
              <TabsTrigger 
                value="overview" 
                className="w-1/2"
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="livestream" 
                className="w-1/2"
                onClick={() => setActiveTab("livestream")}
              >
                LiveStream
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="bg-gray-700/50 rounded-lg p-4 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="bg-gray-700">
                    Quarterfinals
                  </Badge>
                  <span className="text-gray-300 text-sm">Feb 12, 2025 • 5:45 PM</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col items-center w-1/3">
                    <Avatar className="w-16 h-16 mb-2">
                      <AvatarImage src="https://storage.googleapis.com/a1aa/image/Z05Umw_l3IQvA13pkFLbc5jLjnmkklqZeJmZFFp2c1w.jpg" alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-center">Alex Johnson</h3>
                    <p className="text-sm text-gray-400">New York</p>
                    <p className="text-sm font-medium mt-1">42W - 12L</p>
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm">
                      Follow
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-lg font-bold mb-2">eFootball</p>
                    <p className="text-2xl font-bold">2 - 3</p>
                    <p className="text-lg font-semibold mt-2">{formatTime(matchTime)}</p>
                  </div>

                  <div className="flex flex-col items-center w-1/3">
                    <Avatar className="w-16 h-16 mb-2">
                      <AvatarImage src="https://storage.googleapis.com/a1aa/image/819K0NP1nz90MmYguZ0QaCtdphmeFfBrfLt9uftVq-M.jpg" alt="Maria Rodriguez" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-center">Maria Rodriguez</h3>
                    <p className="text-sm text-gray-400">Miami</p>
                    <p className="text-sm font-medium mt-1">38W - 15L</p>
                    <button className="mt-2 bg-gray-700 text-gray-300 px-4 py-1 rounded-full text-sm">
                      Following
                    </button>
                  </div>
                </div>

                {/* Fan Poll */}
                <div className="mb-4">
                  <Progress value={65} className="h-2" />
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">65%</span>
                    <span className="text-sm text-gray-400">Fan Prediction Poll</span>
                    <span className="text-sm">35%</span>
                  </div>
                </div>

                {/* Engagement */}
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <button className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>1.2K</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>458</span>
                  </button>
                  <button className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>2.5K</span>
                  </button>
                  <button>
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button>
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="livestream">
              <div className="flex flex-col items-center mt-4">
                <div className="flex justify-center items-center h-64 bg-black rounded-lg w-full">
                  <span className="text-gray-400">LiveStream Content Here</span>
                </div>
                <div className="flex items-center mt-2 text-gray-400 gap-1">
                  <Eye className="h-4 w-4" />
                  <span>1.5K viewers</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center mt-4 ml-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://storage.googleapis.com/a1aa/image/tqMpx5Cggv_-GtyiCLvQDejG62SE4Hnb7XvmRd4XzNA.jpg" alt="Chess" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <div className="ml-2 flex items-center">
          <h3 className="font-semibold">Chess</h3>
          <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
        </div>
      </div>

      {/* Stats Tabs */}
      <Tabs defaultValue="stats" className="w-full mt-4">
        <TabsList className="w-full">
          <TabsTrigger 
            value="stats" 
            className="w-1/3"
            onClick={() => setStatsTab("stats")}
          >
            Stats
          </TabsTrigger>
          <TabsTrigger 
            value="highlights" 
            className="w-1/3"
            onClick={() => setStatsTab("highlights")}
          >
            Highlights
          </TabsTrigger>
          <TabsTrigger 
            value="commentary" 
            className="w-1/3"
            onClick={() => setStatsTab("commentary")}
          >
            Commentary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="px-4">
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
        </TabsContent>

        <TabsContent value="highlights" className="px-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Match Highlights</h3>
            <div className="flex flex-col space-y-2">
              {[
                { time: "12'", event: "Goal by Alex Johnson" },
                { time: "34'", event: "Yellow Card for Maria Rodriguez" },
                { time: "45'", event: "Half-time" },
                { time: "67'", event: "Goal by Maria Rodriguez" },
                { time: "89'", event: "Full-time" }
              ].map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2">{highlight.time}</span>
                  <p>{highlight.event}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commentary" className="px-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Live Commentary</h3>
            <div className="flex flex-col space-y-2">
              {[
                { time: "12'", comment: "Alex Johnson scores a stunning goal!" },
                { time: "34'", comment: "Maria Rodriguez receives a yellow card for a rough tackle." },
                { time: "45'", comment: "The referee blows the whistle for half-time." },
                { time: "67'", comment: "Maria Rodriguez equalizes with a brilliant goal!" },
                { time: "89'", comment: "The match ends with a thrilling finish." }
              ].map((commentary, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2">{commentary.time}</span>
                  <p>{commentary.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
