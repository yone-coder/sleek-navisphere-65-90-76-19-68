
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/components/games/types";

const sampleGames: Game[] = [
  {
    id: 1,
    title: "Chess",
    description: "A two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.",
    coverImage: "https://storage.googleapis.com/a1aa/image/mXWQ7mdPAnTHpduxXF4Ijpxvg_lJjGQ1WpJw-QQrNqA.jpg",
    creatorImage: "https://storage.googleapis.com/a1aa/image/Rx1djXfNKOUuCzUIYc6iMZXnX0AAqQTUDeMdWWnW-uE.jpg",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 1259,
    comments: 346,
    shares: 528,
    bookmarked: false
  },
  {
    id: 2,
    title: "Poker",
    description: "A family of card games involving betting and individual play, whereby the winner is determined by the ranks and combinations of cards.",
    coverImage: "https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&q=80&w=2574",
    creatorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
    verified: true,
    type: ["Multiplayer", "Tournament"],
    likes: 2894,
    comments: 452,
    shares: 789,
    bookmarked: true
  },
  {
    id: 3,
    title: "Go",
    description: "An abstract strategy board game for two players in which the aim is to surround more territory than the opponent.",
    coverImage: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&q=80&w=2574",
    creatorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80",
    verified: false,
    type: ["1vs1"],
    likes: 876,
    comments: 234,
    shares: 345,
    bookmarked: false
  },
  {
    id: 4,
    title: "Morpion",
    description: "A classic game where two players take turns marking spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins.",
    coverImage: "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&q=80&w=2574",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=MorpionCreator",
    verified: true,
    type: ["1vs1"],
    likes: 1543,
    comments: 289,
    shares: 432,
    bookmarked: false
  }
];

export default function Explore() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 px-6 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">{t('nav.products')}</h1>
      
      <Tabs defaultValue="games" className="w-full">
        <TabsList className="w-full max-w-md h-12 grid grid-cols-3 gap-4 p-1 bg-gray-100/50 rounded-xl">
          <TabsTrigger 
            value="games"
            className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Games
          </TabsTrigger>
          <TabsTrigger 
            value="tournaments"
            className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Tournaments
          </TabsTrigger>
          <TabsTrigger 
            value="events"
            className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="mt-6">
          <div className="text-center text-gray-500">
            Tournaments coming soon
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <div className="text-center text-gray-500">
            Events coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
