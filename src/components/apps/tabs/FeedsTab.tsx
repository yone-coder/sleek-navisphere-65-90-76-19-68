
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

      {/* Winnr - Tournaments - Updated to match FundX style */}
      <FeedSection title="Winnr Tournaments" icon={<Trophy className="h-5 w-5 text-amber-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="shrink-0 w-64 p-3 border border-gray-200">
                <div className="relative h-32 w-full rounded-lg bg-gray-100 overflow-hidden mb-3">
                  <img 
                    src={`/api/placeholder/300/180?text=Tournament${item}`}
                    alt={`Tournament ${item}`}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-amber-500">
                    {item === 1 ? 'Live Now' : item === 2 ? 'Starting Soon' : 'Last Chance'}
                  </Badge>
                </div>
                <h4 className="text-sm font-medium mb-1">
                  {item === 1 ? 'Pro Gaming Championship' : item === 2 ? 'Amateur Tournament' : 'Weekly Challenge Cup'}
                </h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {item === 1 
                    ? 'Compete against the best players worldwide in this exclusive tournament with amazing prizes.'
                    : item === 2 
                    ? 'Perfect for beginners and casual players looking to test their skills in a competitive environment.'
                    : 'Weekly competition with new challenges every time. Join now before registration closes!'}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Players</span>
                    <span className="font-medium">{(item * 32)}/{(item * 64)} Registered</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(item * 15) + 20}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{(item * 15) + 20}% filled</span>
                    <span className="text-gray-500">{item * 2 + 1} days left</span>
                  </div>
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

      {/* TrdeX - Crypto Trading */}
      <FeedSection title="TrdeX Trading" icon={<Bitcoin className="h-5 w-5 text-orange-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="shrink-0 w-56 p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Crypto {item === 1 ? 'Bitcoin' : item === 2 ? 'Ethereum' : item === 3 ? 'Solana' : 'Cardano'}</h4>
                    <p className="text-xs text-gray-500">Market Cap: ${(item * 200 + 100).toFixed(2)}B</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">24h Change</p>
                      <p className={`text-xs font-medium ${item % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item % 2 === 0 ? '+' : '-'}{(item * 1.2).toFixed(2)}%
                      </p>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div 
                        className={`h-full ${item % 2 === 0 ? 'bg-green-500' : 'bg-red-500'} rounded-full`} 
                        style={{ width: `${item * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">${(item * 10000 + 20000).toLocaleString()}</p>
                  <Badge variant={item === 1 ? "default" : "outline"} className="text-xs">
                    {item === 1 ? 'Popular' : 'Trading'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* FundX - Crowdfunding */}
      <FeedSection title="FundX Projects" icon={<PiggyBank className="h-5 w-5 text-rose-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="shrink-0 w-64 p-3 border border-gray-200">
                <div className="relative h-32 w-full rounded-lg bg-gray-100 overflow-hidden mb-3">
                  <img 
                    src={`/api/placeholder/300/180?text=Project${item}`}
                    alt={`Project ${item}`}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-rose-500">
                    {item === 1 ? 'New' : item === 2 ? 'Trending' : 'Almost Funded'}
                  </Badge>
                </div>
                <h4 className="text-sm font-medium mb-1">
                  {item === 1 ? 'Eco-Friendly Water Bottle' : item === 2 ? 'Smart Home Assistant' : 'Portable Solar Charger'}
                </h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {item === 1 
                    ? 'A reusable water bottle made from sustainable materials that tracks your hydration.'
                    : item === 2 
                    ? 'Voice-activated assistant with multi-room capabilities and privacy features.'
                    : 'Compact solar panel that can charge your devices anywhere, anytime.'}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Funded</span>
                    <span className="font-medium">${(item * 10000).toLocaleString()} of ${(item * 15000).toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(item * 20) + 30}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{(item * 20) + 30}% funded</span>
                    <span className="text-gray-500">{item * 5 + 10} days left</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* Stash - Study Notes */}
      <FeedSection title="Stash Study Notes" icon={<BookOpen className="h-5 w-5 text-emerald-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="shrink-0 w-56 p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                    {item === 1 ? 'Computer Science' : item === 2 ? 'Business' : item === 3 ? 'Medicine' : 'Engineering'}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xs mr-1">★</span>
                    <span className="text-xs text-gray-500">{4.5 + (item * 0.1)}</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium mb-1">
                  {item === 1 ? 'Data Structures & Algorithms' : item === 2 ? 'Marketing Fundamentals' : item === 3 ? 'Anatomy Notes' : 'Circuit Analysis'}
                </h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  Comprehensive study notes with diagrams, examples, and practice problems.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-full bg-gray-200">
                      <img 
                        src={`/api/placeholder/30/30?text=U${item}`}
                        alt="User avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-700">by Student{item}</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600">${(item * 3) + 4.99}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </FeedSection>

      {/* Druck - Print Products */}
      <FeedSection title="Druck Custom Prints" icon={<Store className="h-5 w-5 text-cyan-500" />}>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="shrink-0 w-40">
                <div className="h-40 w-40 rounded-lg bg-white border border-gray-200 overflow-hidden">
                  <img 
                    src={`/api/placeholder/160/160?text=Print${item}`}
                    alt={`Print product ${item}`}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium line-clamp-1">
                    {item === 1 ? 'Custom T-Shirt' : item === 2 ? 'Business Cards' : item === 3 ? 'Canvas Print' : 'Sticker Pack'}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-cyan-600 font-medium">
                      From ${(item * 5) + 9.99}
                    </p>
                    <p className="text-xs text-gray-500">{item * 100}+ sold</p>
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
    </motion.div>
  );
}
