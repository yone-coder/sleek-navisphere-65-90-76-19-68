
import { Button } from "@/components/ui/button";

interface QuickAction {
  name: string;
  icon: any;
  color: string;
  description: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="ghost"
          className="flex flex-col items-center gap-3 p-4 h-auto hover:bg-gray-50 group"
        >
          <div className={`bg-gradient-to-tr ${action.color} p-3 rounded-xl group-hover:scale-105 transition-transform duration-300`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <span className="text-sm font-medium text-gray-700">{action.name}</span>
            <p className="text-xs text-gray-500 mt-1">{action.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};
