
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, MoreHorizontal, UserPlus, Globe } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  author: {
    name: string;
    avatar: string;
  };
  timeAgo: string;
  content: string;
  image?: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  hashtags: string[];
}

export const PostCard = ({
  author,
  timeAgo,
  content,
  image,
  stats,
  hashtags
}: PostCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 w-full border border-gray-200 dark:border-white/10">
      <div className="flex items-center mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold dark:text-white">{author.name}</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span>{timeAgo}</span>
                <Globe className="w-4 h-4 ml-1" />
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center text-sm px-2 py-1 rounded border transition-colors ${
                  isFollowing
                    ? "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300"
                    : "border-blue-500 text-blue-500"
                }`}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button className="text-gray-500">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 text-gray-800 dark:text-gray-200">
        {content}
        {hashtags.length > 0 && (
          <span className="text-blue-500 block mt-1">
            {hashtags.map(tag => `#${tag}`).join(" ")}
          </span>
        )}
      </p>

      {image && (
        <img
          src={image}
          alt="Post content"
          className="w-full rounded-lg mb-4 object-cover max-h-[400px]"
        />
      )}

      <div className="flex items-center text-gray-500 text-sm mb-4">
        <div className="flex items-center mr-4">
          <span className="flex -space-x-1 mr-2">
            <span className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full">
              <Heart className="w-3 h-3 text-white" />
            </span>
            <span className="w-5 h-5 flex items-center justify-center bg-red-500 rounded-full">
              <Heart className="w-3 h-3 text-white" />
            </span>
          </span>
          {formatNumber(stats.likes)}
        </div>
        <span className="mr-4">{formatNumber(stats.comments)} Comments</span>
        <span>{formatNumber(stats.shares)} Shares</span>
      </div>

      <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-2">
        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
          <Heart className="w-4 h-4 mr-1" />
          Like
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
          <MessageSquare className="w-4 h-4 mr-1" />
          Comment
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </button>
      </div>
    </div>
  );
};
