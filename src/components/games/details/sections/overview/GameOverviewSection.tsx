
import { BannerSlider } from "@/components/BannerSlider";
import { GameDetailCards } from "./GameDetailCards";
import { GameAboutCard } from "./GameAboutCard";
import { GameSystemRequirements } from "./GameSystemRequirements";

interface GameOverviewSectionProps {
  game: any;
}

export const GameOverviewSection = ({ game }: GameOverviewSectionProps) => {
  return (
    <div className="space-y-6">
      <BannerSlider />
      <div className="px-4">
        <GameDetailCards game={game} />
        <GameAboutCard game={game} />
        <GameSystemRequirements requirements={game?.system_requirements} />
      </div>
    </div>
  );
};
