
import { Button } from '@/components/ui/button';

export function CommentsTab() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <textarea 
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Leave a comment..."
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button>Post Comment</Button>
          </div>
        </div>
      </div>

      {/* Sample Comments */}
      <div className="space-y-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">User Name</h4>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-gray-700">This project looks amazing! Can't wait to see it come to life.</p>
              <div className="mt-2 flex gap-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">Reply</button>
                <button className="text-sm text-gray-500 hover:text-gray-700">Like</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
