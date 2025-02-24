
import { Star, Info, GripHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";

interface FavoritesSectionProps {
  favoriteApps: Array<{
    name: string;
    icon: any;
    color: string;
    route: string;
    updates?: number;
  }>;
  onFavoritesChange?: (apps: string[]) => void;
}

const DraggableApp = ({ app, isOverTrash }: { app: any; isOverTrash: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: app.name,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-transparent border-0 ${isOverTrash ? 'opacity-50' : ''}`}
    >
      <div className="relative w-full overflow-hidden">
        <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
          <div 
            {...attributes}
            {...listeners}
            className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative group`}
          >
            <app.icon className="w-8 h-8 text-white" strokeWidth={2} />
            {app.updates > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5"
              >
                {app.updates}
              </Badge>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl flex items-center justify-center">
              <GripHorizontal className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className={`w-[70px] overflow-hidden h-5 flex justify-center`}>
            <span className="text-sm font-medium text-gray-700 text-center truncate">
              {app.name}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const FavoritesSection = ({ favoriteApps, onFavoritesChange }: FavoritesSectionProps) => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  if (favoriteApps.length === 0) return null;

  const totalUpdates = favoriteApps.reduce((sum, app) => sum + (app.updates || 0), 0);

  // Create groups of 4 apps
  const groups = favoriteApps.reduce((acc, app, i) => {
    const groupIndex = Math.floor(i / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(app);
    return acc;
  }, [] as typeof favoriteApps[]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsOverTrash(false);

    if (!over) return;

    if (over.id === 'trash') {
      // Remove the app from favorites
      const newFavorites = favoriteApps.filter(app => app.name !== active.id);
      onFavoritesChange?.(newFavorites.map(app => app.name));
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = favoriteApps.findIndex(app => app.name === active.id);
      const newIndex = favoriteApps.findIndex(app => app.name === over.id);
      
      const newOrder = arrayMove(favoriteApps, oldIndex, newIndex);
      onFavoritesChange?.(newOrder.map(app => app.name));
    }
  };

  const handleDragOver = (event: any) => {
    setIsOverTrash(event.over?.id === 'trash');
  };

  const activeApp = activeId ? favoriteApps.find(app => app.name === activeId) : null;

  return (
    <div className="mb-8 -mx-4 sm:-mx-6 md:-mx-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Favorites</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs whitespace-nowrap">
              {favoriteApps.length} apps
            </Badge>
            {totalUpdates > 0 && (
              <Badge variant="destructive" className="animate-pulse px-2 py-0.5 text-xs whitespace-nowrap">
                {totalUpdates} updates
              </Badge>
            )}
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4 text-gray-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Drag to reorder or drop on trash to remove</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div 
          className={`w-10 h-10 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors ${
            isOverTrash ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          data-id="trash"
        >
          <Trash2 className={`w-5 h-5 ${isOverTrash ? 'text-red-500' : 'text-gray-400'}`} />
        </div>
      </div>

      <ScrollArea className="w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="flex gap-4 pb-4 px-4 sm:px-6 md:px-8">
            <SortableContext 
              items={favoriteApps.map(app => app.name)}
              strategy={horizontalListSortingStrategy}
            >
              {groups.map((group, groupIndex) => (
                <div 
                  key={groupIndex} 
                  className="flex-none w-[320px] first:ml-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${groupIndex * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className="grid grid-cols-4 gap-4">
                    {group.map((app) => (
                      <DraggableApp 
                        key={app.name} 
                        app={app} 
                        isOverTrash={isOverTrash && activeId === app.name} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </SortableContext>

            <DragOverlay>
              {activeId && activeApp ? (
                <Card className="w-[70px] overflow-hidden bg-transparent border-0">
                  <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
                    <div className={`w-14 h-14 rounded-2xl ${activeApp.color} flex items-center justify-center`}>
                      <activeApp.icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate w-full text-center">
                      {activeApp.name}
                    </span>
                  </div>
                </Card>
              ) : null}
            </DragOverlay>
          </div>
        </DndContext>
        <ScrollBar 
          orientation="horizontal" 
          className="px-4 sm:px-6 md:px-8 hover:bg-gray-200 transition-colors duration-200"
        />
      </ScrollArea>
    </div>
  );
};
