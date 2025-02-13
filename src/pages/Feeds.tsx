
import { useLanguage } from "@/contexts/LanguageContext";
import { PostCard } from "@/components/posts/PostCard";

const SAMPLE_POSTS = [
  {
    author: {
      name: "John Doe",
      avatar: "https://storage.googleapis.com/a1aa/image/rWAY64MIJg1wsIJTnL7o9_5yPLAJleTdfaOeNl8Xa3Y.jpg"
    },
    timeAgo: "2 hours ago",
    content: "Just had an amazing weekend exploring the mountains! The views were absolutely breathtaking. Nature never ceases to amaze me.",
    image: "https://storage.googleapis.com/a1aa/image/C_ZFJtxQVMULaoSMWvqV0AC40hx-2BGVwnkXIUMyqOw.jpg",
    stats: {
      likes: 1200,
      comments: 234,
      shares: 56
    },
    hashtags: ["weekendvibes", "nature", "adventure"]
  },
  {
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    timeAgo: "4 hours ago",
    content: "Just finished my first competitive match! Can't believe how intense it was. Looking forward to more challenges ahead!",
    stats: {
      likes: 843,
      comments: 156,
      shares: 23
    },
    hashtags: ["gaming", "esports", "competitive"]
  },
  {
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    },
    timeAgo: "6 hours ago",
    content: "Check out this amazing play from yesterday's tournament! Still can't believe we pulled it off.",
    image: "https://picsum.photos/seed/gaming/800/400",
    stats: {
      likes: 2100,
      comments: 342,
      shares: 89
    },
    hashtags: ["highlight", "progaming", "clutch"]
  }
];

export default function Feeds() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">{t('nav.feeds')}</h1>
      
      {/* Stories Section */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          {/* Story 1 - Your Story */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <img 
                src="https://storage.googleapis.com/a1aa/image/GCUTXZTGWqbGpgtDgeGftMqoBVre0ZeqIO7zcxRf2iE.jpg"
                alt="Profile picture of a person with a flower crown"
                className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                width="56"
                height="56"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                <i className="fas fa-plus text-white text-xs"></i>
              </div>
            </div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">Your Story</span>
          </div>

          {/* Story 2 */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <img 
                src="https://storage.googleapis.com/a1aa/image/ogag8o5tu_v_24ZBFbBRzWwvdNC0ezDlrh7TSfD2PgY.jpg"
                alt="Profile picture of a person wearing a cap"
                className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                width="56"
                height="56"
              />
            </div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">mauroh_nas...</span>
          </div>

          {/* Story 3 */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <img 
                src="https://storage.googleapis.com/a1aa/image/_eJzSC9R0avEOAYQxoUKd6pkQ37RK_a45_h8D4yUiPE.jpg"
                alt="Profile picture of a person smiling"
                className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                width="56"
                height="56"
              />
            </div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">debby_yao</span>
          </div>

          {/* Story 4 */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <img 
                src="https://storage.googleapis.com/a1aa/image/RgZqjb8-1l_k5YYDf4X3Y1sjK48m64kRu3s8TMj9jaE.jpg"
                alt="Profile picture of a person with glasses"
                className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                width="56"
                height="56"
              />
            </div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">dramyhsu</span>
          </div>

          {/* Story 5 */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <img 
                src="https://storage.googleapis.com/a1aa/image/x0ZyuavIdf2kwiaZhzogOdm5CKLKuORq2wiewh3bOq0.jpg"
                alt="Profile picture with a logo"
                className="w-full h-full rounded-full border-2 border-pink-500 object-cover overflow-hidden"
                width="56"
                height="56"
              />
            </div>
            <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">annyelleparis</span>
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
      
      <div className="divide-y divide-gray-200 dark:divide-white/10">
        {SAMPLE_POSTS.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
