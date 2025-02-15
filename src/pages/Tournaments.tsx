import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentCardSkeleton } from "@/components/tournaments/TournamentCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Tournaments() {
  const navigate = useNavigate();
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
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold ml-2">Game Details</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="pt-14">
          <h1 className="text-2xl font-bold mb-6 px-6">Tournaments</h1>
          <div className="flex overflow-x-auto space-x-6 pb-6 px-6 no-scrollbar">
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
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Game Details</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="pt-14">
        {/* Chess Game Card Section */}
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg max-w-sm w-full overflow-hidden mb-4">
            <div className="relative">
              <img
                alt="Chess game background"
                className="w-full h-48 object-cover"
                src="https://storage.googleapis.com/a1aa/image/30DXDBKFa6waogbGp91vb710vkQQtDtK7-17FAvnp2s.jpg"
              />
              <div className="absolute top-2 left-2 flex space-x-2">
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  1vs1
                </span>
                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
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
              <div className="absolute bottom-2 right-2 text-xs text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded">
                Developed by Mima
              </div>
            </div>
            <div className="p-4 pt-3">
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
                <button className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md">
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
              <button className="bg-blue-600 text-white text-base font-semibold w-full py-2 rounded-lg mt-4">
                Play Now
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="w-full max-w-sm">
            <div className="flex justify-between text-white text-lg border-b border-gray-700">
              <a className="px-4 py-2 opacity-70" href="#">Tournaments</a>
              <a className="px-4 py-2 border-b-2 border-blue-500 text-blue-500" href="#">Matches</a>
              <a className="px-4 py-2 opacity-70" href="#">Leaderboard</a>
            </div>
            {/* Filter Buttons */}
            <div className="flex space-x-3 mt-4 overflow-x-auto">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center whitespace-nowrap">
                <i className="fas fa-check text-blue-500 mr-2"></i>
                Top free
                <i className="fas fa-chevron-down ml-2 text-sm"></i>
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center whitespace-nowrap">
                <i className="fas fa-check text-blue-500 mr-2"></i>
                Phone
                <i className="fas fa-chevron-down ml-2 text-sm"></i>
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-full whitespace-nowrap">
                Categories
              </button>
            </div>
          </div>
        </div>

        {/* Existing Tournaments Section */}
        <h1 className="text-2xl font-bold mb-6 px-6">Tournaments</h1>
        <div className="flex overflow-x-auto space-x-6 pb-6 px-6 no-scrollbar">
          {tournaments?.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} className="min-w-[300px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
