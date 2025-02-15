
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentCardSkeleton } from "@/components/tournaments/TournamentCardSkeleton";
import { MatchCard } from "@/components/matches/MatchCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Match } from "@/components/matches/types";

const sampleMatches: Match[] = [
  {
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
  }
];

export default function Tournaments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tournaments' | 'matches' | 'leaderboard'>('matches');
  
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Custom Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-14 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-2">Game Details</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="pt-14">
          <h1 className="text-2xl font-bold mb-6 px-4">Tournaments</h1>
          <div className="flex overflow-x-auto space-x-6 pb-6 px-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <TournamentCardSkeleton key={n} className="min-w-[300px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Custom Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-14 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Game Details</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="pt-14">
        {/* Chess Game Card Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-800 text-white w-full">
            <div className="relative">
              <img
                alt="Chess game background"
                className="w-full h-48 object-cover"
                src="https://storage.googleapis.com/a1aa/image/30DXDBKFa6waogbGp91vb710vkQQtDtK7-17FAvnp2s.jpg"
              />
              <div className="absolute top-2 left-2 flex space-x-2">
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">
                  1vs1
                </span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
                  Tournament
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <i className="fas fa-bookmark text-white"></i>
              </div>
              <div className="absolute -bottom-6 left-4">
                <img
                  alt="Profile picture"
                  className="w-12 h-12 rounded-full border-2 border-gray-800"
                  src="https://storage.googleapis.com/a1aa/image/Kpv055PTHWBW_W_tc40OtDzOQ6AESZ6xJ-4UHNtreIg.jpg"
                />
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-300 bg-black bg-opacity-50 px-2 py-1">
                Developed by Mima
              </div>
            </div>
            <div className="p-4 pt-8">
              <div className="flex items-center justify-end text-xs text-gray-400 mb-1">
                <span className="flex items-center">
                  4.4
                  <span className="material-icons text-white ml-1 text-xs">star</span>
                </span>
                <span className="mx-1">•</span>
                <span className="flex items-center">1.2M Reviews</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    Chess
                    <i className="fas fa-check-circle text-green-500 text-sm ml-2"></i>
                  </h2>
                </div>
                <button className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  + Follow
                </button>
              </div>
              <p className="text-gray-400 mt-2 text-sm">
                A two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
                <div className="flex items-center space-x-1">
                  <i className="fas fa-heart text-red-500"></i>
                  <span>1,259</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-comment"></i>
                  <span>346</span>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-share"></i>
                  <span>528</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white text-base font-semibold w-full py-2 mt-4 rounded-md">
                Play Now
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="w-full bg-gray-800">
            <div className="flex justify-between text-white text-sm border-b border-gray-700">
              <button 
                onClick={() => setActiveTab('tournaments')}
                className={`px-4 py-2 ${activeTab === 'tournaments' ? 'border-b-2 border-blue-500 text-blue-500' : 'opacity-70'}`}
              >
                Tournaments
              </button>
              <button 
                onClick={() => setActiveTab('matches')}
                className={`px-4 py-2 ${activeTab === 'matches' ? 'border-b-2 border-blue-500 text-blue-500' : 'opacity-70'}`}
              >
                Matches
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`px-4 py-2 ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-500 text-blue-500' : 'opacity-70'}`}
              >
                Leaderboard
              </button>
            </div>
            {/* Filter Buttons */}
            <div className="flex space-x-3 p-4 overflow-x-auto">
              <button className="bg-gray-700 text-white px-4 py-2 flex items-center whitespace-nowrap rounded-md">
                <i className="fas fa-check text-blue-500 mr-2"></i>
                Top free
                <i className="fas fa-chevron-down ml-2 text-sm"></i>
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 flex items-center whitespace-nowrap rounded-md">
                <i className="fas fa-check text-blue-500 mr-2"></i>
                Phone
                <i className="fas fa-chevron-down ml-2 text-sm"></i>
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 whitespace-nowrap rounded-md">
                Categories
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === 'tournaments' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Available Tournaments</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tournaments?.map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Current Matches</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sampleMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Leaderboard</h2>
              <p className="text-gray-500">Leaderboard content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
