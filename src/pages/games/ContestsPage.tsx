
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { ContestSection } from "@/components/contests/ContestSection";

// 1. Gaming Contests
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
  },
  {
    id: "meme-challenge",
    title: "Gaming Meme Contest",
    description: "Create the funniest gaming-related memes",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: ["Gaming", "Creative"],
    rating: 4.5,
    players: "500",
    prize: "$1,000",
    status: "Registering",
    startsIn: "2d"
  }
];

// 2. Creative Contests
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
  },
  {
    id: "3d-modeling",
    title: "3D Art Challenge",
    description: "Create stunning 3D artwork",
    thumbnail: "https://images.unsplash.com/photo-1481137344492-d5a150a97f8b",
    category: ["Creative", "3D"],
    rating: 4.8,
    players: "150",
    prize: "$3,000",
    status: "Coming Soon",
    startsIn: "5d"
  }
];

// 3. Writing & Storytelling
const writingContests = [
  {
    id: "short-story",
    title: "Short Story Challenge",
    description: "Write a compelling short story",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    category: ["Writing", "Creative"],
    rating: 4.5,
    players: "200",
    prize: "$1,500",
    status: "Live",
    startsIn: "Now"
  },
  {
    id: "poetry-contest",
    title: "Poetry Competition",
    description: "Submit your best poetic work",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    category: ["Writing", "Poetry"],
    rating: 4.7,
    players: "300",
    prize: "$1,000",
    status: "Registering",
    startsIn: "3d"
  }
];

// 4. Social Media Contests
const socialContests = [
  {
    id: "tiktok-challenge",
    title: "TikTok Dance Challenge",
    description: "Create trending short videos",
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    category: ["Social", "Dance"],
    rating: 4.9,
    players: "5000",
    prize: "$5,000",
    status: "Live",
    startsIn: "Now"
  }
];

// 5. Business & Startup
const businessContests = [
  {
    id: "startup-pitch",
    title: "Startup Pitch Competition",
    description: "Present your innovative startup idea",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: ["Business", "Pitch"],
    rating: 4.8,
    players: "100",
    prize: "$50,000",
    status: "Coming Soon",
    startsIn: "7d"
  }
];

// 6. Tech & Coding
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

// 7. Fitness & Sports
const fitnessContests = [
  {
    id: "home-workout",
    title: "Home Workout Challenge",
    description: "Best home workout transformation",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    category: ["Fitness", "Health"],
    rating: 4.7,
    players: "1000",
    prize: "$3,000",
    status: "Live",
    startsIn: "Now"
  }
];

// 8. Music & Performance
const musicContests = [
  {
    id: "singing-competition",
    title: "Online Singing Contest",
    description: "Show off your vocal talent",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    category: ["Music", "Performance"],
    rating: 4.8,
    players: "300",
    prize: "$5,000",
    status: "Registering",
    startsIn: "4d"
  }
];

// 9. Educational
const educationalContests = [
  {
    id: "math-olympiad",
    title: "Online Math Olympiad",
    description: "Test your mathematical skills",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    category: ["Education", "Math"],
    rating: 4.6,
    players: "2000",
    prize: "$2,000",
    status: "Coming Soon",
    startsIn: "10d"
  }
];

// 10. Photography
const photographyContests = [
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

// 11. Food & Cooking
const cookingContests = [
  {
    id: "baking-challenge",
    title: "Master Baker Challenge",
    description: "Create the best pastries and cakes",
    thumbnail: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0",
    category: ["Cooking", "Baking"],
    rating: 4.8,
    players: "200",
    prize: "$2,500",
    status: "Live",
    startsIn: "Now"
  }
];

// 12. Fashion & Beauty
const fashionContests = [
  {
    id: "makeup-challenge",
    title: "Makeup Transformation",
    description: "Show your best makeup skills",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    category: ["Fashion", "Beauty"],
    rating: 4.7,
    players: "500",
    prize: "$2,000",
    status: "Registering",
    startsIn: "2d"
  }
];

// 13. Pet & Animal
const petContests = [
  {
    id: "cute-pets",
    title: "Cutest Pet Contest",
    description: "Share your adorable pet photos",
    thumbnail: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    category: ["Pets", "Photography"],
    rating: 4.9,
    players: "1000",
    prize: "$1,500",
    status: "Live",
    startsIn: "Now"
  }
];

// 14. Charity & Social Impact
const charityContests = [
  {
    id: "fundraising",
    title: "Charity Fundraising Challenge",
    description: "Raise funds for a good cause",
    thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
    category: ["Charity", "Social"],
    rating: 4.8,
    players: "150",
    prize: "To Charity",
    status: "Live",
    startsIn: "Now"
  }
];

// 15. Random & Fun
const funContests = [
  {
    id: "talent-show",
    title: "Weird Talent Contest",
    description: "Show off your unique abilities",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    category: ["Fun", "Talent"],
    rating: 4.6,
    players: "300",
    prize: "$1,000",
    status: "Registering",
    startsIn: "5d"
  }
];

export default function ContestsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="pt-4 pb-24">
        <ContestSection title="Gaming Contests" contests={gamingContests} />
        <ContestSection title="Creative Contests" contests={creativeContests} />
        <ContestSection title="Writing & Storytelling" contests={writingContests} />
        <ContestSection title="Social Media Challenges" contests={socialContests} />
        <ContestSection title="Business & Startup" contests={businessContests} />
        <ContestSection title="Tech & Coding" contests={techContests} />
        <ContestSection title="Fitness & Sports" contests={fitnessContests} />
        <ContestSection title="Music & Performance" contests={musicContests} />
        <ContestSection title="Educational Contests" contests={educationalContests} />
        <ContestSection title="Photography & Videography" contests={photographyContests} />
        <ContestSection title="Food & Cooking" contests={cookingContests} />
        <ContestSection title="Fashion & Beauty" contests={fashionContests} />
        <ContestSection title="Pet & Animal Contests" contests={petContests} />
        <ContestSection title="Charity & Social Impact" contests={charityContests} />
        <ContestSection title="Random & Fun Contests" contests={funContests} />
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
