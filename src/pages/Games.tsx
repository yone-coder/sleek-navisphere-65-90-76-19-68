
import GameCard from "@/components/games/GameCard";
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
    coverImage: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
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
    description: "A classic strategy game where players take turns marking spaces in a 3×3 grid, aiming to get three in a row to win.",
    coverImage: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
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
    coverImage: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player3",
    verified: false,
    type: ["1vs1"],
    likes: 876,
    comments: 234,
    shares: 345,
    bookmarked: false
  },
  {
    id: 5,
    title: "Checkers",
    description: "A diagonal moving board game where players compete to capture all opposing pieces by jumping over them.",
    coverImage: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player4",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 654,
    comments: 189,
    shares: 267,
    bookmarked: false
  },
  {
    id: 6,
    title: "Backgammon",
    description: "One of the oldest known board games, combining strategy and luck as players race to bear off all their pieces.",
    coverImage: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player5",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 432,
    comments: 98,
    shares: 156,
    bookmarked: false
  },
  {
    id: 7,
    title: "Chinese Chess",
    description: "Also known as Xiangqi, this strategy game features unique piece movements and river division on the board.",
    coverImage: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player6",
    verified: true,
    type: ["1vs1"],
    likes: 567,
    comments: 145,
    shares: 234,
    bookmarked: false
  },
  {
    id: 8,
    title: "Othello",
    description: "A strategy board game where players capture opponent's disks by flanking them with their own colored disks.",
    coverImage: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player7",
    verified: false,
    type: ["1vs1", "Tournament"],
    likes: 389,
    comments: 87,
    shares: 156,
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
