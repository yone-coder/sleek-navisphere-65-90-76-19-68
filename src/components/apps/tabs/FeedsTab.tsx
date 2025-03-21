
import { Rss, Bell, Newspaper, Calendar, ChevronRight, ShoppingBag, Trophy, Gamepad, Mail, MessageSquare, Music, Video, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModishShopSection } from "@/components/modish/product/ModishShopSection";
import { ModishRecentlyViewed } from "@/components/modish/product/ModishRecentlyViewed";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface FeedSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FeedSection = ({ title, icon, children }: FeedSectionProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-blue-500 px-2">
          See all <ChevronRight className="h-3 w-3 ml-0.5" />
        </Button>
      </div>
      {children}
    </div>
  );
};

export function FeedsTab() {
  return (
    <motion.div 
      className="pt-1 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Feeds</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full h-8 px-3">
            <Bell className="h-4 w-4 mr-1" />
            <span className="text-xs">Updates</span>
          </Button>
          <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modish Products Section */}
      <FeedSection title="Trending Products" icon={<ShoppingBag className="h-5 w-5 text-pink-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="shrink-0 w-40">
                <div className="relative h-44 w-40 rounded-lg bg-white border border-gray-200 overflow-hidden">
                  <img 
                    src={`/api/placeholder/200/250?text=Product${item}`}
                    alt={`Product ${item}`}
                    className="h-full w-full object-cover"
                  />
                  {item === 1 && (
                    <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium line-clamp-1">Product Name {item}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-red-500 font-medium">$59.99</p>
                    <p className="text-xs text-gray-500">1.2k sold</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* Tournaments Section */}
      <FeedSection title="Live Tournaments" icon={<Trophy className="h-5 w-5 text-amber-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="shrink-0 w-56 p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Gamepad className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Tournament {item}</h4>
                    <p className="text-xs text-gray-500">32 players</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${25 * item}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {item === 1 ? 'Live Now' : `Starts in ${item}h`}
                  </Badge>
                  <p className="text-xs text-gray-500">Prize: $1,000</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* Modish Shop Section */}
      <FeedSection title="Fashion For You" icon={<ShoppingBag className="h-5 w-5 text-purple-500" />}>
        <ModishShopSection />
      </FeedSection>

      {/* Messages Section */}
      <FeedSection title="Recent Messages" icon={<Mail className="h-5 w-5 text-blue-500" />}>
        <Card className="p-3 mb-3">
          <div className="flex gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="shrink-0 w-64 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="text-sm font-medium">User Name {item}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  This is a preview of the message content. Click to view the full conversation and continue chatting.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </FeedSection>

      {/* Recently Viewed Products */}
      <FeedSection title="Recently Viewed" icon={<Clock className="h-5 w-5 text-gray-500" />}>
        <ModishRecentlyViewed />
      </FeedSection>

      {/* News Section */}
      <FeedSection title="Latest News" icon={<Newspaper className="h-5 w-5 text-green-500" />}>
        <Carousel className="w-full">
          <CarouselContent>
            {[1, 2, 3, 4].map((item) => (
              <CarouselItem key={item} className="basis-4/5 sm:basis-1/2 md:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="h-32 bg-gray-100">
                    <img 
                      src={`/api/placeholder/300/200?text=News${item}`}
                      alt={`News ${item}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <Badge variant="outline" className="mb-2 text-xs">Technology</Badge>
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">This is a news headline about something interesting</h4>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </FeedSection>

      {/* Entertainment Section */}
      <FeedSection title="Entertainment" icon={<Video className="h-5 w-5 text-red-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="shrink-0 w-48">
                <div className="relative h-28 w-48 rounded-lg bg-gray-100 overflow-hidden">
                  <img 
                    src={`/api/placeholder/240/140?text=Video${item}`}
                    alt={`Video ${item}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
                      <Video className="h-5 w-5 text-black" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs">
                    3:45
                  </Badge>
                </div>
                <p className="text-sm font-medium mt-1 line-clamp-2">This is a video title that might be two lines long</p>
                <p className="text-xs text-gray-500">12K views • 3 days ago</p>
              </div>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* Music Section */}
      <FeedSection title="Music For You" icon={<Music className="h-5 w-5 text-indigo-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="shrink-0 w-40">
                <div className="h-40 w-40 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 overflow-hidden">
                  <img 
                    src={`/api/placeholder/200/200?text=Album${item}`}
                    alt={`Album ${item}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium mt-1">Album Title {item}</p>
                <p className="text-xs text-gray-500">Artist Name</p>
              </div>
            ))}
          </div>
        </div>
      </FeedSection>
    </motion.div>
  );
}
