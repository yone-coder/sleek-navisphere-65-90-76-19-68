
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TournamentHeaderProps {
  title: string | undefined;
}

export function TournamentHeader({ title }: TournamentHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-border/40">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-foreground/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-base font-medium truncate max-w-[200px]">
          {title || "Tournament Details"}
        </h1>
      </div>
    </div>
  );
}
