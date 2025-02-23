
import { useState } from "react";
import { Map, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  date: string;
  progress: number;
  tasks: {
    id: number;
    title: string;
    completed: boolean;
  }[];
}

const roadmapData: Milestone[] = [
  {
    id: 1,
    title: "Tournament Registration",
    description: "Open registration period for all eligible players",
    status: "completed",
    date: "March 1-10, 2024",
    progress: 100,
    tasks: [
      { id: 1, title: "Launch registration portal", completed: true },
      { id: 2, title: "Verify player eligibility", completed: true },
      { id: 3, title: "Process entry fees", completed: true },
      { id: 4, title: "Send confirmation emails", completed: true }
    ]
  },
  {
    id: 2,
    title: "Group Stage Draw",
    description: "Random draw to determine initial group assignments",
    status: "in-progress",
    date: "March 11-15, 2024",
    progress: 65,
    tasks: [
      { id: 1, title: "Seed players based on ranking", completed: true },
      { id: 2, title: "Conduct live draw ceremony", completed: true },
      { id: 3, title: "Publish group assignments", completed: false },
      { id: 4, title: "Schedule initial matches", completed: false }
    ]
  },
  {
    id: 3,
    title: "Group Stage Matches",
    description: "Round-robin matches within assigned groups",
    status: "upcoming",
    date: "March 16-30, 2024",
    progress: 0,
    tasks: [
      { id: 1, title: "Begin group stage matches", completed: false },
      { id: 2, title: "Record match results", completed: false },
      { id: 3, title: "Update standings", completed: false },
      { id: 4, title: "Determine group winners", completed: false }
    ]
  },
  {
    id: 4,
    title: "Knockout Stage",
    description: "Single elimination bracket for qualified players",
    status: "upcoming",
    date: "April 1-15, 2024",
    progress: 0,
    tasks: [
      { id: 1, title: "Draw knockout brackets", completed: false },
      { id: 2, title: "Schedule quarter-finals", completed: false },
      { id: 3, title: "Schedule semi-finals", completed: false },
      { id: 4, title: "Schedule final match", completed: false }
    ]
  }
];

const MilestoneCard = ({ milestone }: { milestone: Milestone }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "upcoming":
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "upcoming":
        return "bg-gray-400";
    }
  };

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden transition-all duration-200",
      isExpanded ? "shadow-md" : "shadow-sm"
    )}>
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getStatusIcon(milestone.status)}
              <h3 className="font-semibold">{milestone.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{milestone.description}</p>
            <Badge variant="secondary" className="mt-2">
              {milestone.date}
            </Badge>
          </div>
          <Button variant="ghost" size="sm">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{milestone.progress}%</span>
          </div>
          <Progress value={milestone.progress} className={cn(getStatusColor(milestone.status))} />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          <h4 className="text-sm font-medium mb-3">Tasks</h4>
          <div className="space-y-2">
            {milestone.tasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-center gap-2 text-sm"
              >
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  task.completed ? "bg-green-500" : "bg-gray-300"
                )} />
                <span className={cn(
                  task.completed ? "text-gray-700" : "text-gray-500"
                )}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function TournamentRoadmap() {
  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Map className="h-6 w-6 text-blue-500" />
          Tournament Roadmap
        </h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            2 Completed
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            1 In Progress
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            1 Upcoming
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {roadmapData.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          * The tournament roadmap is subject to change based on participant availability and other factors.
          All participants will be notified of any schedule changes via email.
        </p>
      </div>
    </div>
  );
}
