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

const mockGame = {
  id: "1",
  title: "League of Legends",
  banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  current_players: 95000,
  total_players: 128000,
  release_date: "2009-10-27",
  developer: "Riot Games",
  publisher: "Riot Games",
  game_type: "MOBA",
  status: "live",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  description: "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base.",
  features: ["Multiplayer", "Competitive", "Free to Play", "Cross-Platform"],
  platform: ["PC", "Mac"],
  category: ["MOBA", "Strategy", "Action"],
  system_requirements: {
    minimum: {
      os: "Windows 7 or higher",
      processor: "3 GHz processor",
      memory: "2 GB RAM",
      graphics: "Shader version 2.0 capable",
      storage: "16 GB"
    },
    recommended: {
      os: "Windows 10",
      processor: "3 GHz processor",
      memory: "4 GB RAM",
      graphics: "Nvidia GeForce 8800 / AMD Radeon HD 5670 or equivalent",
      storage: "16 GB"
    }
  }
};

const mockTournaments = [
  {
    id: "1",
    title: "Winter Championship 2025",
    start_date: "2025-01-15",
    end_date: "2025-02-15",
    status: "upcoming" as const,
    prize_pool: 10000,
    max_participants: 128,
    current_participants: 64,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "League of Legends"
  },
  {
    id: "2",
    title: "Spring Tournament 2025",
    start_date: "2025-03-01",
    end_date: "2025-03-31",
    status: "upcoming" as const,
    prize_pool: 15000,
    max_participants: 256,
    current_participants: 128,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "League of Legends"
  }
];

const mockMatches = [
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
  },
  {
    id: 2,
    championship: "Pro League Finals",
    phase: "Semifinals",
    status: "upcoming",
    date: "2025-02-13",
    time: "19:00:00",
    venue: "O2 Arena",
    location: "London, UK",
    opponents: [
      {
        name: "James Wilson",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "UK",
        city: "London",
        rank: 3,
        stats: "Veteran",
        wins: 36,
        losses: 14
      },
      {
        name: "Sofia Chen",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "China",
        city: "Shanghai",
        rank: 4,
        stats: "Champion",
        wins: 40,
        losses: 10
      }
    ],
    spectators: 1800,
    likes: 950,
    comments: 324,
    predictions: {
      firstPlayer: 45,
      secondPlayer: 55
    }
  },
  {
    id: 3,
    championship: "Regional Championship",
    phase: "Finals",
    status: "upcoming",
    date: "2025-02-14",
    time: "20:00:00",
    venue: "Staples Center",
    location: "Los Angeles, USA",
    opponents: [
      {
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "South Korea",
        city: "Seoul",
        rank: 5,
        stats: "Rising Star",
        wins: 32,
        losses: 8
      },
      {
        name: "Lucas Silva",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "Brazil",
        city: "São Paulo",
        rank: 6,
        stats: "Champion",
        wins: 28,
        losses: 12
      }
    ],
    spectators: 1500,
    likes: 750,
    comments: 280,
    predictions: {
      firstPlayer: 55,
      secondPlayer: 45
    }
  },
  {
    id: 4,
    championship: "Summer Cup",
    phase: "Group Stage",
    status: "done",
    date: "2025-02-11",
    time: "15:30:00",
    venue: "Tokyo Dome",
    location: "Tokyo, Japan",
    opponents: [
      {
        name: "Yuki Tanaka",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "Japan",
        city: "Tokyo",
        rank: 7,
        stats: "Veteran",
        wins: 25,
        losses: 15
      },
      {
        name: "Anna Liu",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "China",
        city: "Beijing",
        rank: 8,
        stats: "Rising Star",
        wins: 22,
        losses: 18
      }
    ],
    spectators: 1200,
    likes: 500,
    comments: 150,
    predictions: {
      firstPlayer: 40,
      secondPlayer: 60
    }
  }
];

const mockNews = [
  {
    id: "1",
    title: "Major Update Coming to League of Legends",
    excerpt: "Riot Games announces groundbreaking changes coming to League of Legends in the next patch, including new champions and map updates.",
    content: "Full article content here...",
    category: "Updates",
    date: "2024-02-15",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    author: {
      name: "Alex Turner",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    }
  },
  {
    id: "2",
    title: "Pro Players React to Latest Balance Changes",
    excerpt: "Professional players share their thoughts on the recent balance changes and how they might affect the competitive scene.",
    content: "Full article content here...",
    category: "Esports",
    date: "2024-02-14",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  },
  {
    id: "3",
    title: "Community Spotlight: Player-Created Content",
    excerpt: "Highlighting the most creative and innovative content created by the League of Legends community this month.",
    content: "Full article content here...",
    category: "Community",
    date: "2024-02-13",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    }
  }
];

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
          <GameTabNav tabs={tabs} />
        </div>
      </div>

      <div className="pt-24 pb-4">
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
            <GameMatchesSection matches={mockMatches} />
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
    </div>
  );
}
