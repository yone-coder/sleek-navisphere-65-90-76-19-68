
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UpdatesTab() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Latest Update */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Major Milestone Reached!</h3>
            <p className="text-sm text-gray-500">Posted 2 days ago</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          We're excited to announce that we've reached 65% of our funding goal! Thank you to all our amazing backers...
        </p>
        <Button variant="outline" size="sm">Read More</Button>
      </div>

      {/* Previous Update */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Project Timeline Update</h3>
            <p className="text-sm text-gray-500">Posted 5 days ago</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Here's a detailed breakdown of our development timeline and upcoming milestones...
        </p>
        <Button variant="outline" size="sm">Read More</Button>
      </div>
    </div>
  );
}
