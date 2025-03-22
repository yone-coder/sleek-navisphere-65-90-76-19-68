
import { Rss, Bell, Newspaper, Calendar, ChevronRight, ShoppingBag, Trophy, Gamepad, Mail, MessageSquare, Music, Video, Clock, Heart, PiggyBank, Briefcase, BookOpen, Ticket, Store, Bitcoin, Users, Building, Wallet, CreditCard, Package, Filter, TrendingUp, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModishShopSection } from "@/components/modish/product/ModishShopSection";
import { ModishRecentlyViewed } from "@/components/modish/product/ModishRecentlyViewed";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { apps } from "@/components/apps/data/appsData";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("all");
  const updatesCount = apps.filter(app => app.updates > 0).length;

  // Filter apps by category for different sections
  const shoppingApps = apps.filter(app => app.category === "Shopping");
  const financeApps = apps.filter(app => app.category === "Finance");
  const gamingApps = apps.filter(app => app.category === "Gaming");
  const educationApps = apps.filter(app => app.category === "Education");
  const workApps = apps.filter(app => app.category === "Work" || app.category === "Business");
  const entertainmentApps = apps.filter(app => app.category === "Entertainment");
  const socialApps = apps.filter(app => app.category === "Social");
  const realEstateApps = apps.filter(app => app.category === "Real Estate");

  // Filter sections based on active tab
  const showAllSections = activeTab === "all";
  const showRecentSections = activeTab === "recent";
  const showFrequentSections = activeTab === "frequent";
  
  return (
    <div className="pt-1 pb-20">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm pt-2 pb-3 px-2 border-b border-gray-100 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Feeds</h1>
          </div>
          
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-100/80 p-0.5 h-auto">
            <div className="flex w-full">
              <TabsTrigger 
                value="all" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <Package className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <Clock className="h-4 w-4" />
                <span>Recent</span>
                {updatesCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {updatesCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="frequent" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Frequent</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 mt-4">
        {/* Show all sections tab */}
        {showAllSections && (
          <>
            {/* Stories Section */}
            <div className="w-full mb-8">
              <div className="overflow-x-auto no-scrollbar">
                <div className="flex space-x-3 min-w-min pb-2">
                  {/* Story 1 - Your Story */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16">
                      <img 
                        src="https://storage.googleapis.com/a1aa/image/GCUTXZTGWqbGpgtDgeGftMqoBVre0ZeqIO7zcxRf2iE.jpg"
                        alt="Profile picture of a person with a flower crown"
                        className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                        width="64"
                        height="64"
                      />
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                        <i className="fas fa-plus text-white text-xs"></i>
                      </div>
                    </div>
                    <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Your Story</span>
                  </div>

                  {/* Other stories */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-16 h-16">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Person${index}`}
                          alt={`Profile picture ${index}`}
                          className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                          width="64"
                          height="64"
                        />
                      </div>
                      <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                        {index === 1 ? 'mauroh' : 
                         index === 2 ? 'debby' : 
                         index === 3 ? 'amy' : 
                         index === 4 ? 'annyelle' : 
                         index === 5 ? 'sarah' : 
                         index === 6 ? 'michael' : 
                         index === 7 ? 'emma' : 
                         index === 8 ? 'lucas' : 'sophia'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Create Post Section */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-gray-200 dark:bg-[#1a1a1a] rounded-full p-2 relative pl-4 pr-4">
                <div className="absolute left-0 transform -translate-x-16">
                  <div className="relative">
                    <img 
                      src="https://storage.googleapis.com/a1aa/image/--ZE9XtXSMls4itu_vT26OfFnb75N-Wpp5WQLWgFujE.jpg" 
                      alt="Profile picture of a person"
                      className="w-10 h-10 rounded-full"
                      width="40"
                      height="40"
                    />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                  </div>
                </div>
                
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  À quoi pensez-vous ?
                </span>
                
                <div className="absolute right-0 transform translate-x-16 flex flex-col items-center">
                  <i className="fas fa-image text-green-500 text-xl"></i>
                  <span className="text-gray-500">Photo</span>
                </div>
              </div>
            </div>
          
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

            {/* And other sections from the original FeedsTab */}
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
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium line-clamp-1">Event Name {item}</p>
                        <p className="text-xs text-gray-500">Venue Location</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-blue-500">From $49</p>
                          <Badge variant="outline" className="text-xs">
                            {item === 1 ? 'Selling Fast' : 'Available'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FeedSection>

            {/* Domus - Real Estate */}
            <FeedSection title="Domus Properties" icon={<Building className="h-5 w-5 text-blue-500" />}>
              <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex gap-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="shrink-0 w-64">
                      <div className="relative h-40 w-64 rounded-lg bg-gray-100 overflow-hidden">
                        <img 
                          src={`/api/placeholder/300/200?text=Property${item}`}
                          alt={`Property ${item}`}
                          className="h-full w-full object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-blue-500">
                          {item === 1 ? 'New Listing' : item === 2 ? 'For Rent' : 'For Sale'}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Modern Apartment {item}</p>
                        <p className="text-xs text-gray-500">Central Location</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">{item + 1} Beds</span>
                          <span className="text-xs text-gray-500">{item} Bath</span>
                          <span className="text-xs text-gray-500">{item * 400 + 600} sq ft</span>
                        </div>
                        <p className="text-sm font-medium text-blue-500 mt-1">${(item * 800 + 1200).toLocaleString()}/mo</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FeedSection>

            {/* Tribr - Social */}
            <FeedSection title="Tribr Communities" icon={<Users className="h-5 w-5 text-indigo-500" />}>
              <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Card key={item} className="shrink-0 w-56 p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Community {item}</h4>
                          <p className="text-xs text-gray-500">{item * 2.5}k members</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        A community for people interested in {item === 1 ? 'technology' : item === 2 ? 'design' : item === 3 ? 'cooking' : 'fitness'} to share ideas and connect.
                      </p>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((avatar) => (
                          <div key={avatar} className="h-6 w-6 rounded-full border border-white bg-gray-200">
                            <img 
                              src={`/api/placeholder/30/30?text=${avatar}`}
                              alt="Member avatar"
                              className="h-full w-full object-cover rounded-full"
                            />
                          </div>
                        ))}
                        <div className="h-6 w-6 rounded-full border border-white bg-indigo-100 flex items-center justify-center text-xs text-indigo-500">
                          +{item * 12}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </FeedSection>

            {/* Latest News Section */}
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

            {/* Recently Viewed Products */}
            <FeedSection title="Recently Viewed" icon={<Clock className="h-5 w-5 text-gray-500" />}>
              <ModishRecentlyViewed />
            </FeedSection>
          </>
        )}

        {/* Recent tab - Show only updates */}
        {showRecentSections && (
          <>
            {updatesCount > 0 && (
              <div className="py-2 px-3 mb-4 bg-blue-50 text-blue-700 text-sm rounded-md flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {updatesCount} {updatesCount === 1 ? 'app has' : 'apps have'} recently been updated
                </span>
              </div>
            )}
            
            <FeedSection title="Recent Updates" icon={<Newspaper className="h-5 w-5 text-blue-500" />}>
              <div className="space-y-3">
                {apps.filter(app => app.updates > 0).map((app, index) => (
                  <Card key={index} className="p-3 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                        {app.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{app.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {app.updates} update{app.updates > 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Updated 2 hours ago</p>
                        <p className="text-xs text-gray-600 mt-1">
                          New features and bug fixes available
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </FeedSection>
            
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
          </>
        )}
        
        {/* Frequent tab */}
        {showFrequentSections && (
          <>
            <div className="py-2 px-3 mb-4 bg-gray-50 text-gray-700 text-sm rounded-md flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>Your most frequently used apps and services</span>
            </div>
            
            <FeedSection title="Frequently Used Apps" icon={<Star className="h-5 w-5 text-yellow-500" />}>
              <div className="grid grid-cols-4 gap-4">
                {apps.slice(0, 8).map((app, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center mb-1">
                      {app.icon}
                    </div>
                    <p className="text-xs text-center font-medium">{app.name}</p>
                  </div>
                ))}
              </div>
            </FeedSection>
            
            <FeedSection title="Quick Access" icon={<Clock className="h-5 w-5 text-blue-500" />}>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="p-3 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                        {item === 1 ? <ShoppingBag className="h-6 w-6 text-pink-500" /> : 
                         item === 2 ? <Briefcase className="h-6 w-6 text-blue-500" /> : 
                                      <Wallet className="h-6 w-6 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{item === 1 ? 'Recent Order' : item === 2 ? 'Work Project' : 'Payment Method'}</h4>
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {item === 1 ? '2 days ago' : item === 2 ? 'Active' : 'Default'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{item === 1 ? 'Order #1234' : item === 2 ? 'Design System' : 'Visa •••• 4242'}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </FeedSection>
            
            <FeedSection title="Recent Searches" icon={<Filter className="h-5 w-5 text-gray-500" />}>
              <div className="flex flex-wrap gap-2">
                {['Flutter UI', 'React Components', 'Tailwind Examples', 'Startup Ideas', 'Productivity Tools', 'App Design'].map((term, index) => (
                  <Badge key={index} variant="outline" className="py-1.5 px-3">
                    {term}
                  </Badge>
                ))}
              </div>
            </FeedSection>
          </>
        )}
      </div>
    </div>
  );
}
