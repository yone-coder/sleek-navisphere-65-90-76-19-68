import { Rss, Bell, Newspaper, Calendar, ChevronRight, ShoppingBag, Trophy, Gamepad, Mail, MessageSquare, Music, Video, Clock, Heart, PiggyBank, Briefcase, BookOpen, Ticket, Store, Bitcoin, Users, Building, Wallet, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModishShopSection } from "@/components/modish/product/ModishShopSection";
import { ModishRecentlyViewed } from "@/components/modish/product/ModishRecentlyViewed";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { apps } from "@/components/apps/data/appsData";

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
  // Filter apps by category for different sections
  const shoppingApps = apps.filter(app => app.category === "Shopping");
  const financeApps = apps.filter(app => app.category === "Finance");
  const gamingApps = apps.filter(app => app.category === "Gaming");
  const educationApps = apps.filter(app => app.category === "Education");
  const workApps = apps.filter(app => app.category === "Work" || app.category === "Business");
  const entertainmentApps = apps.filter(app => app.category === "Entertainment");
  const socialApps = apps.filter(app => app.category === "Social");
  const realEstateApps = apps.filter(app => app.category === "Real Estate");
  
  return (
    <motion.div 
      className="pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sticky header section */}
      <div className="sticky top-0 z-10 bg-white py-3 px-1 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
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
      </div>

      {/* Content starts here */}
      <div className="pt-3">
        {/* Modish - Shopping */}
        <FeedSection title="Modish Shopping" icon={<ShoppingBag className="h-5 w-5 text-pink-500" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="shrink-0 w-40">
                  <div className="relative h-44 w-40 rounded-lg bg-white border border-gray-200 overflow-hidden">
                    <img 
                      src={`/api/placeholder/200/250?text=Fashion${item}`}
                      alt={`Fashion ${item}`}
                      className="h-full w-full object-cover"
                    />
                    {item === 1 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium line-clamp-1">Fashion Item {item}</p>
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

        {/* Flora - Shopping */}
        <FeedSection title="Flora Flowers & Cakes" icon={<Store className="h-5 w-5 text-pink-400" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="shrink-0 w-36">
                  <div className="relative h-36 w-36 rounded-full bg-white border border-gray-200 overflow-hidden">
                    <img 
                      src={`/api/placeholder/150/150?text=Flora${item}`}
                      alt={`Flora ${item}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium line-clamp-1">Bouquet {item}</p>
                    <p className="text-xs text-pink-500 font-medium">$39.99</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FeedSection>

        {/* Winnr - Tournaments */}
        <FeedSection title="Winnr Tournaments" icon={<Trophy className="h-5 w-5 text-amber-500" />}>
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

        {/* LernX - Education */}
        <FeedSection title="LernX Courses" icon={<BookOpen className="h-5 w-5 text-blue-500" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="shrink-0 w-56">
                  <div className="relative h-32 w-56 rounded-lg bg-blue-50 overflow-hidden">
                    <img 
                      src={`/api/placeholder/250/150?text=Course${item}`}
                      alt={`Course ${item}`}
                      className="h-full w-full object-cover"
                    />
                    <Badge className="absolute bottom-2 right-2 bg-blue-500">{item * 5} lessons</Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Learn New Skill {item}</p>
                    <div className="flex items-center mt-1">
                      <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${20 * item}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{20 * item}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FeedSection>

        {/* Rise - Finance */}
        <FeedSection title="Rise Investment" icon={<PiggyBank className="h-5 w-5 text-purple-500" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="shrink-0 w-64 p-3 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium">Investment Portfolio {item}</h4>
                    <Badge variant={item === 1 ? "default" : "outline"} className="text-xs">
                      {item === 1 ? 'Popular' : 'New'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bitcoin className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs text-gray-500">Return Rate</p>
                        <p className="text-xs font-medium text-green-500">+{4 + item}%</p>
                      </div>
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${30 * item}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Min investment: ${1000 * item}</p>
                </Card>
              ))}
            </div>
          </div>
        </FeedSection>

        {/* Wallet - Finance */}
        <FeedSection title="Wallet" icon={<Wallet className="h-5 w-5 text-purple-600" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="shrink-0 w-60 p-3 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{item === 1 ? 'Recent Transaction' : item === 2 ? 'Upcoming Bill' : 'Savings Goal'}</h4>
                      <p className="text-xs text-gray-500">{item === 1 ? '2 hours ago' : item === 2 ? 'Due in 3 days' : '65% complete'}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg mt-1">
                    <div className="flex justify-between items-center">
                      <p className="text-xs">{item === 1 ? 'Coffee Shop' : item === 2 ? 'Electric Bill' : 'Vacation Fund'}</p>
                      <p className="text-sm font-medium">${item * 18.50}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </FeedSection>

        {/* Skilt - Work */}
        <FeedSection title="Skilt Freelancers" icon={<Briefcase className="h-5 w-5 text-sky-500" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="shrink-0 w-56 p-3 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-gray-200">
                      <img 
                        src={`/api/placeholder/100/100?text=User${item}`}
                        alt={`Freelancer ${item}`}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Freelancer {item}</h4>
                      <p className="text-xs text-gray-500">Web Developer</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-amber-400 text-xs">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({item * 35})</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    Experienced developer specializing in React and Node.js applications with {item + 3} years of experience.
                  </p>
                  <p className="text-xs font-medium">$25/hr</p>
                </Card>
              ))}
            </div>
          </div>
        </FeedSection>

        {/* GoTix - Entertainment */}
        <FeedSection title="GoTix Events" icon={<Ticket className="h-5 w-5 text-yellow-500" />}>
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="shrink-0 w-48">
                  <div className="relative h-28 w-48 rounded-lg bg-gray-100 overflow-hidden">
                    <img 
                      src={`/api/placeholder/240/140?text=Event${item}`}
                      alt={`Event ${item}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {new Date(Date.now() + item * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                   

