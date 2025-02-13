
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
  }
];

const Games = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Featured Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
