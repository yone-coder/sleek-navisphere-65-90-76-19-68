
import { Rss, Bell, Newspaper, Calendar } from "lucide-react";

export function FeedsTab() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-gray-100 p-8 rounded-3xl mb-6">
        <Rss className="w-12 h-12 text-gray-500 mx-auto mb-4" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Feeds coming soon</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Stay tuned for personalized feeds with news, updates, and content from your favorite apps.
      </p>
      
      <div className="grid grid-cols-3 gap-6 max-w-md w-full mt-8">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Bell className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-sm font-medium">Updates</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Newspaper className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-sm font-medium">News</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
          <Calendar className="w-8 h-8 text-purple-500 mb-2" />
          <span className="text-sm font-medium">Events</span>
        </div>
      </div>
    </div>
  );
}
