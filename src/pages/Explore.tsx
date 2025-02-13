
import { useLanguage } from "@/contexts/LanguageContext";
import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/components/games/types";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const competitiveGames = sampleGames.filter(game => game.type.includes("Tournament"));
const casualGames = sampleGames.filter(game => game.type.includes("1vs1"));
const trendingGames = [...sampleGames].sort((a, b) => b.likes - a.likes);

export default function Explore() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 animate-fade-in">
      <div className="flex justify-end px-6 mb-8">
        <Link to="/tournaments" className="text-blue-600 hover:text-blue-700">
          View Tournaments
        </Link>
      </div>

      <div className="space-y-12">
        <section className="px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Trending Games</h2>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-8">
              {trendingGames.map((game) => (
                <CarouselItem key={game.id} className="pl-8 basis-[300px]">
                  <GameCard game={game} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        <section className="px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Competitive Games</h2>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-8">
              {competitiveGames.map((game) => (
                <CarouselItem key={game.id} className="pl-8 basis-[300px]">
                  <GameCard game={game} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        <section className="px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Casual Games</h2>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-8">
              {casualGames.map((game) => (
                <CarouselItem key={game.id} className="pl-8 basis-[300px]">
                  <GameCard game={game} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </div>
  );
}
