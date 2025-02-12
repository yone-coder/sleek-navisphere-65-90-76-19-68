import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Trophy, Users, Radio, Gamepad, Video, List, MoreHorizontal, Calendar, Award, CheckCircle, XCircle, Clock, User, ArrowUpRight, MessageSquare, RefreshCw, Heart, Share2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const tweets = [
  {
    id: 1,
    author: {
      name: "Sarah Williams",
      handle: "@sarahw",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: "Just finished an amazing tournament! The competition was fierce but our team pulled through. Thanks to everyone who supported us! 🏆 #ESports #Gaming",
    timestamp: "2h ago",
    stats: {
      likes: 1243,
      retweets: 328,
      comments: 64
    }
  },
  {
    id: 2,
    author: {
      name: "Alex Chen",
      handle: "@alexc",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: "New tournament season is about to start! Who's ready for some intense matches? The prize pool this year is insane! 🎮 #GamingCommunity",
    timestamp: "4h ago",
    stats: {
      likes: 892,
      retweets: 245,
      comments: 42
    }
  },
  {
    id: 3,
    author: {
      name: "Emma Watson",
      handle: "@emmaw",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: "Just announced: Our team will be competing in the upcoming Winter Championship! The preparation starts now. 🎯 #ESports #Competition",
    timestamp: "6h ago",
    stats: {
      likes: 1567,
      retweets: 423,
      comments: 89
    }
  },
  {
    id: 4,
    author: {
      name: "Michael Rodriguez",
      handle: "@michaelr",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80"
    },
    content: "Big updates coming to the tournament platform! You won't believe what we've been working on. Stay tuned! ✨ #Gaming #Innovation",
    timestamp: "8h ago",
    stats: {
      likes: 2134,
      retweets: 567,
      comments: 123
    }
  }
];

const slides = [
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
];

const quickActions = [
  { icon: Trophy, label: "Tournaments", color: "#9b87f5" },
  { icon: Users, label: "Teams", color: "#9b87f5" },
  { icon: Gamepad, label: "Games", color: "#9b87f5" },
  { icon: Video, label: "Streams", color: "#9b87f5" },
  { icon: Radio, label: "Lives", color: "#9b87f5" },
  { icon: Users, label: "Friends", color: "#9b87f5" },
  { icon: List, label: "Rankings", color: "#9b87f5" },
  { icon: MoreHorizontal, label: "More", color: "#7E69AB" },
];

const tournaments = [
  {
    id: 1,
    title: "Winter Championship 2024",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=200&q=80",
    status: "ongoing",
    date: "Apr 15 - May 1",
    participants: 128,
    currentParticipants: 84,
    maxParticipants: 128,
    prizePool: "$10,000",
  },
  {
    id: 2,
    title: "Spring Tournament",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=200&q=80",
    status: "upcoming",
    date: "May 5 - May 20",
    participants: 256,
    currentParticipants: 156,
    maxParticipants: 256,
    prizePool: "$15,000",
  },
  {
    id: 3,
    title: "Summer League",
    banner: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&h=200&q=80",
    status: "closed",
    date: "Mar 1 - Mar 15",
    participants: 64,
    currentParticipants: 64,
    maxParticipants: 64,
    prizePool: "$5,000",
  },
  {
    id: 4,
    title: "Regional Masters",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=200&q=80",
    status: "upcoming",
    date: "May 25 - Jun 10",
    participants: 32,
    currentParticipants: 12,
    maxParticipants: 32,
    prizePool: "$8,000",
  },
];

const recentWinners = [
  {
    id: 1,
    playerName: "Alex Chen",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
    tournamentTitle: "Winter Championship 2024",
    prize: "$5,000",
    date: "2 days ago"
  },
  {
    id: 2,
    playerName: "Sarah Williams",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    tournamentTitle: "Spring Tournament Elite",
    prize: "$3,500",
    date: "3 days ago"
  },
  {
    id: 3,
    playerName: "Michael Rodriguez",
    profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80",
    tournamentTitle: "Regional Masters",
    prize: "$2,000",
    date: "5 days ago"
  },
  {
    id: 4,
    playerName: "Emma Watson",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
    tournamentTitle: "Summer League Finals",
    prize: "$4,000",
    date: "1 week ago"
  }
];

const newsItems = [
  {
    id: 1,
    title: "Major Update to Tournament System",
    excerpt: "New features include real-time matchmaking and enhanced team management",
    category: "Updates",
    date: "2h ago",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: 2,
    title: "Spring Tournament Registration Open",
    excerpt: "Register now for the biggest tournament of the season with $50,000 prize pool",
    category: "Tournaments",
    date: "4h ago",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: 3,
    title: "New Partnership Announcement",
    excerpt: "Strategic collaboration with major gaming peripherals manufacturer",
    category: "Business",
    date: "6h ago",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&h=250&q=80"
  },
  {
    id: 4,
    title: "Community Spotlight: Team Phoenix",
    excerpt: "Rising stars showcase exceptional performance in recent tournaments",
    category: "Community",
    date: "12h ago",
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=400&h=250&q=80"
  }
];

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-[#F2FCE2] text-green-700";
      case "upcoming":
        return "bg-[#FEF7CD] text-yellow-700";
      case "closed":
        return "bg-[#FEC6A1] text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ongoing":
        return CheckCircle;
      case "upcoming":
        return Clock;
      case "closed":
        return XCircle;
      default:
        return CheckCircle;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-500";
      case "upcoming":
        return "bg-yellow-500";
      case "closed":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleNewsClick = (news: any) => {
    navigate(`/news/${news.id}`, { state: { news } });
  };

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.next();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="min-h-screen animate-fade-in pt-14 pb-24">
      <section className="relative w-full h-[calc(100vw*500/1500)] max-h-[500px] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
          setApi={setApi}
          onSelect={() => {
            setActiveIndex(api?.selectedScrollSnap() || 0);
          }}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="relative w-full h-full">
                <div className="relative w-full h-full group">
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div 
              className="flex gap-3 relative transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(${activeIndex === slides.length - 1 ? 0 : activeIndex * -12}px)`
              }}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out transform
                    ${activeIndex === index 
                      ? "bg-[#9b87f5] scale-125 shadow-lg animate-scale-in" 
                      : "bg-white/60 hover:bg-white/80 hover:scale-110"
                    }`}
                  onClick={() => {
                    api?.scrollTo(index);
                  }}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </section>

      <section className="py-6 px-6">
        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const isMoreButton = index === quickActions.length - 1;
            return (
              <button
                key={index}
                className={`group flex flex-col items-center gap-2 ${
                  index >= 4 ? 'mt-4' : ''
                }`}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-active:scale-95 ${
                    isMoreButton ? 'bg-[#7E69AB]' : ''
                  }`}
                >
                  <Icon 
                    className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                      isMoreButton ? 'text-white' : 'text-[#9b87f5]'
                    }`}
                    strokeWidth={1.5} 
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-6 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold px-2">Community Feed</h2>
          <button className="text-[#9b87f5] hover:text-[#7E69AB] flex items-center gap-1 text-sm font-medium transition-colors">
            View all <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="flex-none w-[350px] animate-fade-in"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10 border-2 border-[#9b87f5]">
                          <AvatarImage src={tweet.author.avatar} alt={tweet.author.name} />
                          <AvatarFallback>
                            <User className="w-5 h-5 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{tweet.author.name}</span>
                          <span className="text-sm text-gray-500">{tweet.author.handle}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{tweet.timestamp}</span>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm whitespace-normal line-clamp-3">
                      {tweet.content}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-[#9b87f5] transition-colors text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>{tweet.stats.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors text-sm">
                        <RefreshCw className="w-4 h-4" />
                        <span>{tweet.stats.retweets}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors text-sm">
                        <Heart className="w-4 h-4" />
                        <span>{tweet.stats.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-[#9b87f5] transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section className="py-6 px-6">
        <h2 className="text-2xl font-bold mb-6 px-2">Featured Tournaments</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {tournaments.map((tournament) => {
              const StatusIcon = getStatusIcon(tournament.status);
              const progressPercentage = (tournament.currentParticipants / tournament.maxParticipants) * 100;
              return (
                <div
                  key={tournament.id}
                  className="group flex-none w-[300px] animate-fade-in"
                >
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-2px] group-hover:border-gray-200">
                    <div className="relative h-[150px]">
                      <img
                        src={tournament.banner}
                        alt=""
                        className="w-full h-full object-cover brightness-[0.95] group-hover:brightness-100 transition-all duration-300"
                      />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(tournament.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{tournament.status}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-3 text-left truncate">{tournament.title}</h3>
                      <div className="flex flex-col gap-3 text-sm text-left">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{tournament.date}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-gray-600">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{tournament.currentParticipants}/{tournament.maxParticipants} Participants</span>
                            </div>
                          </div>
                          <Progress 
                            value={progressPercentage} 
                            className={`h-1.5 bg-gray-100 ${getProgressColor(tournament.status)}`}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{tournament.prizePool} Prize Pool</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section className="py-6 w-full">
        <h2 className="text-2xl font-bold mb-6 px-6">Recent Winners</h2>
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 shrink-0" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 shrink-0" />
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4 pb-4 px-6">
              {recentWinners.map((winner) => (
                <div
                  key={winner.id}
                  className="flex-none w-[220px] shrink-0 animate-fade-in"
                >
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200">
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-10 w-10 border-2 border-[#9b87f5]">
                          <AvatarImage src={winner.profileImage} alt={winner.playerName} />
                          <AvatarFallback>
                            <User className="w-5 h-5 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-gray-900 truncate">{winner.playerName}</span>
                          <span className="text-xs text-gray-500">{winner.date}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Trophy className="w-4 h-4 text-[#9b87f5]" />
                          <span className="text-xs truncate">{winner.tournamentTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4 text-[#9b87f5]" />
                          <span className="text-xs font-medium text-[#7E69AB]">{winner.prize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 px-6">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <button className="text-[#9b87f5] hover:text-[#7E69AB] flex items-center gap-1 text-sm font-medium transition-colors">
            View all <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="flex-none w-[350px] animate-fade-in cursor-pointer"
                onClick={() => handleNewsClick(news)}
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={news.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 hover:bg-white/95 text-[#7E69AB] backdrop-blur-sm"
                      >
                        {news.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-left line-clamp-2 leading-tight">
                          {news.title}
                        </h3>
                        <p className="text-sm text-gray-600 text-left line-clamp-2">
                          {news.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{news.date}</span>
                        <button className="text-[#9b87f5] hover:text-[#7E69AB] flex items-center gap-1 text-sm transition-colors">
                          Read more <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <div className="pt-20 px-6">
        <h1 className="text-4xl font-bold">{t('nav.home')}</h1>
      </div>
    </div>
  );
}
