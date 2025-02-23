import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { ContestSection } from "@/components/contests/ContestSection";

// Gaming Contests
const gamingContests = [
  {
    id: "puzzle-solving",
    title: "Speed Puzzle Challenge",
    description: "Solve game-related puzzles within a time limit",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    category: ["Gaming", "Puzzle"],
    rating: 4.7,
    players: "1000",
    prize: "$2,000",
    status: "Live",
    startsIn: "Now"
  }
];

// Creative Contests
const creativeContests = [
  {
    id: "logo-design",
    title: "Logo Design Contest 2024",
    description: "Create innovative logos for tech startups",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    category: ["Creative", "Design"],
    rating: 4.6,
    players: "256",
    prize: "$2,500",
    status: "Live",
    startsIn: "Now"
  }
];

// Tech Contests
const techContests = [
  {
    id: "hackathon-2024",
    title: "Global Hackathon 2024",
    description: "Build innovative solutions in 48 hours",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: ["Tech", "Coding"],
    rating: 4.9,
    players: "500",
    prize: "$10,000",
    status: "Coming Soon",
    startsIn: "5d"
  }
];

// Photography Contests
const photoContests = [
  {
    id: "wildlife-photo",
    title: "Wildlife Photography Challenge",
    description: "Capture nature's most stunning moments",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    category: ["Photography", "Nature"],
    rating: 4.7,
    players: "312",
    prize: "$3,000",
    status: "Registering",
    startsIn: "3d"
  }
];

export default function ContestsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="pt-4 pb-24">
        <ContestSection title="Gaming Contests" contests={gamingContests} />
        <ContestSection title="Creative Contests" contests={creativeContests} />
        <ContestSection title="Tech & Coding Contests" contests={techContests} />
        <ContestSection title="Photography Contests" contests={photoContests} />
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
