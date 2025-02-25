
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader, Plus, Search, UserPlus } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { GameHeaderNav } from "@/components/games/details/GameHeaderNav";
import { GameTabNav } from "@/components/games/details/GameTabNav";
import { GameOverviewSection } from "@/components/games/details/sections/overview/GameOverviewSection";
import { GameTournamentsSection } from "@/components/games/details/sections/tournaments/GameTournamentsSection";
import { GameMatchesSection } from "@/components/games/details/sections/matches/GameMatchesSection";
import { GameNewsSection } from "@/components/games/details/sections/news/GameNewsSection";
import { FloatingActions } from "@/components/games/details/sections/overview/FloatingActions";
import { mockGame, mockTournaments, mockMatches, mockNews } from "@/data/mockGameData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GameMenu from "@/components/games/morpion/GameMenu";
import { Button } from "@/components/ui/button";

export default function GameDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [showOnlineOptions, setShowOnlineOptions] = useState(false);

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGame;
    },
  });

  const handleGameModeSelect = (mode: 'local' | 'bot' | 'online' | 'blitz', roomId?: string) => {
    if (mode === 'online') {
      setShowOnlineOptions(true);
      return;
    }
    setShowModeSelect(false);
    navigate(`/games/morpion?start=true&mode=${mode}${roomId ? `&roomId=${roomId}` : ''}`);
  };

  const handleOnlineOption = (option: 'create' | 'find' | 'invite') => {
    setShowOnlineOptions(false);
    setShowModeSelect(false);

    switch (option) {
      case 'create':
        navigate('/games/morpion?start=true&mode=online&create=true');
        break;
      case 'find':
        navigate('/games/morpion?start=true&mode=online&find=true');
        break;
      case 'invite':
        navigate('/games/morpion?start=true&mode=online&invite=true');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-lg bg-background/80">
          <GameHeaderNav 
            title={game?.title} 
            gameType={game?.game_type} 
            status={game?.status} 
          />
          <GameTabNav 
            tabs={["overview", "stats", "tournaments", "matches", "news", "dlc"]} 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      <div className="pt-24 pb-28">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview">
            <GameOverviewSection game={game} />
          </TabsContent>

          <TabsContent value="stats">
            <div className="p-4 text-center text-gray-500">
              Stats content coming soon...
            </div>
          </TabsContent>

          <TabsContent value="tournaments">
            <GameTournamentsSection tournaments={mockTournaments} />
          </TabsContent>

          <TabsContent value="matches">
            <GameMatchesSection matches={mockMatches.map(match => ({
              ...match,
              status: match.status as "live" | "upcoming" | "done"
            }))} />
          </TabsContent>

          <TabsContent value="news">
            <GameNewsSection news={mockNews} />
          </TabsContent>

          <TabsContent value="dlc">
            <div className="p-4 text-center text-gray-500">
              DLC content coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "overview" && (
        <FloatingActions 
          currentPlayers={game?.current_players}
          gameTitle={game?.title}
          onPlayClick={() => setShowModeSelect(true)}
        />
      )}

      <Dialog open={showModeSelect} onOpenChange={setShowModeSelect}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Select Game Mode</DialogTitle>
          </DialogHeader>
          <GameMenu onSelectMode={handleGameModeSelect} />
        </DialogContent>
      </Dialog>

      <Dialog open={showOnlineOptions} onOpenChange={setShowOnlineOptions}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle>Online Multiplayer Options</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <Button
              onClick={() => handleOnlineOption('create')}
              className="w-full h-14 text-lg font-medium relative overflow-hidden group"
              size="lg"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                <span>Create a Room</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 transition-opacity" />
            </Button>

            <Button
              onClick={() => handleOnlineOption('find')}
              className="w-full h-14 text-lg font-medium relative overflow-hidden group"
              size="lg"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Search className="h-5 w-5" />
                <span>Find a Match</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-opacity" />
            </Button>

            <Button
              onClick={() => handleOnlineOption('invite')}
              className="w-full h-14 text-lg font-medium relative overflow-hidden group"
              size="lg"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Invite a Friend</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 transition-opacity" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
