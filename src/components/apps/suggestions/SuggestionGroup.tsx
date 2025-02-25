
import { SuggestionCard } from "./SuggestionCard";
import type { App } from "../types";

interface SuggestionGroupProps {
  apps: App[];
  groupIndex: number;
}

export const SuggestionGroup = ({ apps, groupIndex }: SuggestionGroupProps) => {
  return (
    <div 
      className="flex-none w-[320px] first:ml-0 animate-fade-in"
      style={{ 
        animationDelay: `${groupIndex * 100}ms`,
        animationFillMode: 'backwards'
      }}
    >
      <div className="grid grid-cols-4 gap-4">
        {apps.map((app) => (
          <SuggestionCard 
            key={app.name} 
            app={app}
            animationDelay={`${Math.floor(Math.random() * 10000) + 5000}ms`}
          />
        ))}
      </div>
    </div>
  );
};
