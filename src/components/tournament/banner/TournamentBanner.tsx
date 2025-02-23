
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TournamentBannerProps {
  bannerUrl: string;
  statusColor: string;
  statusText: string;
  game?: string;
  onImageClick: () => void;
}

export function TournamentBanner({
  bannerUrl,
  statusColor,
  statusText,
  game,
  onImageClick,
}: TournamentBannerProps) {
  return (
    <div className="relative group cursor-pointer" onClick={onImageClick}>
      <img 
        src={bannerUrl}
        alt="Tournament banner" 
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <Badge 
        className={cn(
          "absolute top-4 right-4 shadow-lg",
          statusColor
        )}
        variant="default"
      >
        {statusText}
      </Badge>
      <Badge 
        className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg" 
        variant="default"
      >
        Sponsored by Google
      </Badge>
      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
        <img
          src="https://storage.googleapis.com/a1aa/image/RW76eSv1bI06GoXLZPNVQlLvVFuloRbfcxmSiTYAc8E.jpg"
          alt="Game icon"
          className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
        />
        <div className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
          <span className="text-white text-xs font-medium">{game || "Chess"}</span>
        </div>
      </div>
    </div>
  );
}
