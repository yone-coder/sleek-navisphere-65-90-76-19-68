
import { Search } from "lucide-react";
import { useState } from "react";

export function AppSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Search functionality would be implemented here
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl overflow-hidden">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="flex-1 flex items-center px-3 py-2">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for apps, games, and more..."
            className="bg-transparent w-full text-sm outline-none placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {searchQuery && (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium"
          >
            Search
          </button>
        )}
      </form>
    </div>
  );
}
