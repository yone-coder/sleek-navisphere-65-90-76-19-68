
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

interface GameSystemRequirementsProps {
  requirements?: SystemRequirements;
}

export const GameSystemRequirements = ({ requirements }: GameSystemRequirementsProps) => {
  if (!requirements) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <h2 className="text-lg font-bold">System Requirements</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RequirementSection title="Minimum" specs={requirements.minimum} />
          <RequirementSection title="Recommended" specs={requirements.recommended} />
        </div>
      </CardContent>
    </Card>
  );
};

interface RequirementSectionProps {
  title: string;
  specs: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

const RequirementSection = ({ title, specs }: RequirementSectionProps) => (
  <div>
    <h4 className="font-medium mb-2">{title}:</h4>
    <div className="space-y-2 text-sm">
      <p><span className="text-muted-foreground">OS:</span> {specs.os}</p>
      <p><span className="text-muted-foreground">Processor:</span> {specs.processor}</p>
      <p><span className="text-muted-foreground">Memory:</span> {specs.memory}</p>
      <p><span className="text-muted-foreground">Graphics:</span> {specs.graphics}</p>
      <p><span className="text-muted-foreground">Storage:</span> {specs.storage}</p>
    </div>
  </div>
);
