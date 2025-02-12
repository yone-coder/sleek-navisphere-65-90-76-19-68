
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DragDropContext, Droppable, Draggable } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface Banner {
  id: number;
  image: string;
}

export default function AdminBanners() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1500&h=500&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&w=1500&h=500&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1500&h=500&q=80",
    },
  ]);
  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = banners.findIndex((banner) => banner.id === active.id);
      const newIndex = banners.findIndex((banner) => banner.id === over.id);
      const newBanners = [...banners];
      const [movedBanner] = newBanners.splice(oldIndex, 1);
      newBanners.splice(newIndex, 0, movedBanner);
      setBanners(newBanners);
      toast({
        title: "Banner order updated",
        description: "The banner order has been successfully updated.",
      });
    }
  };

  const handleAddBanner = () => {
    if (!newBannerUrl) return;
    const newBanner = {
      id: Math.max(...banners.map((b) => b.id), 0) + 1,
      image: newBannerUrl,
    };
    setBanners([...banners, newBanner]);
    setNewBannerUrl("");
    setIsAddDialogOpen(false);
    toast({
      title: "Banner added",
      description: "The new banner has been successfully added.",
    });
  };

  const handleEditBanner = () => {
    if (!editBanner) return;
    const updatedBanners = banners.map((banner) =>
      banner.id === editBanner.id ? editBanner : banner
    );
    setBanners(updatedBanners);
    setEditBanner(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Banner updated",
      description: "The banner has been successfully updated.",
    });
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id));
    toast({
      title: "Banner deleted",
      description: "The banner has been successfully deleted.",
    });
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Banners</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
              <Plus className="w-4 h-4 mr-2" /> Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter banner image URL"
                value={newBannerUrl}
                onChange={(e) => setNewBannerUrl(e.target.value)}
              />
              <Button onClick={handleAddBanner} className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                Add Banner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <Droppable droppableId="banners">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {banners.map((banner, index) => (
                <Draggable
                  key={banner.id}
                  draggableId={banner.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white"
                    >
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move p-2"
                        >
                          <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <CardTitle className="text-sm font-medium">
                          Banner {index + 1}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditBanner(banner);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteBanner(banner.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={banner.image}
                          alt={`Banner ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter banner image URL"
              value={editBanner?.image || ""}
              onChange={(e) =>
                setEditBanner(
                  editBanner ? { ...editBanner, image: e.target.value } : null
                )
              }
            />
            <Button onClick={handleEditBanner} className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
              Update Banner
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
