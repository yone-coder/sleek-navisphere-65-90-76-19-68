
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news/NewsCard";
import type { NewsArticle } from "@/components/news/types";

interface GameNewsSectionProps {
  news: NewsArticle[];
}

export const GameNewsSection = ({ news }: GameNewsSectionProps) => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Latest News</h2>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter News
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}
      </div>
    </div>
  );
};
