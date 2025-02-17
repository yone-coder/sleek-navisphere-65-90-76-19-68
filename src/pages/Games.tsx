
import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/components/games/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    title: "Gomoku",
    description: "A strategy board game where players alternate placing pieces on the board with the goal of getting 5 in a row.",
    coverImage: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=2574",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player1",
    verified: true,
    type: ["1vs1"],
    likes: 823,
    comments: 156,
    shares: 245,
    bookmarked: false
  },
  {
    id: 3,
    title: "Morpion",
    description: "A classic strategy game where players take turns marking spaces in a 3×3 grid, aiming to get five in a row to win.",
    coverImage: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=2574",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player2",
    verified: true,
    type: ["1vs1"],
    likes: 756,
    comments: 124,
    shares: 198,
    bookmarked: false
  },
  {
    id: 4,
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
  }
];

const Games = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Featured Games</h1>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {sampleGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Games;
