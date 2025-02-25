
import { format } from "date-fns";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { NewsArticle } from "./types";

interface NewsCardProps {
  news: NewsArticle;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {news.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(news.date), "MMM d, yyyy")}</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg leading-tight mb-2 hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/news/${news.id}`, { state: { news } })}>
            {news.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {news.excerpt}
          </p>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={news.author.avatar} />
            <AvatarFallback>{news.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{news.author.name}</span>
        </div>
        <Button variant="link" className="text-primary p-0" onClick={() => navigate(`/news/${news.id}`, { state: { news } })}>
          Read More
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
