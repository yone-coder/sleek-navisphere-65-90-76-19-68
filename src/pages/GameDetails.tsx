
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader } from "lucide-react";
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

export default function GameDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGame;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const tabs = ["overview", "stats", "tournaments", "matches", "news", "dlc"];

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
            tabs={tabs} 
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
        />
      )}
    </div>
  );
}
