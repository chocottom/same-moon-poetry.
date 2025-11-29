import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, BookOpen, Moon, Heart, Clock, Sprout } from "lucide-react";
import type { Prose } from "@shared/schema";

interface ProseCardProps {
  prose: Prose;
  onClick?: () => void;
}

const themeIcons = {
  "Spiritual Depth": Moon,
  "Presence & Connection": Heart,
  "Time & Purpose": Clock,
  "Growth & Becoming": Sprout,
};

export function ProseCard({ prose, onClick }: ProseCardProps) {
  const philosophySummary = prose.philosophyContent.slice(0, 120) + "...";
  const ThemeIcon = themeIcons[prose.theme as keyof typeof themeIcons] || Moon;

  return (
    <Card 
      className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all duration-600"
      onClick={onClick}
      data-testid={`card-prose-${prose.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display text-2xl font-semibold text-foreground">
          {prose.title}
        </h3>
        <div className="flex-shrink-0 text-primary/80">
          <ThemeIcon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-xs">
          {prose.theme}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {prose.mood}
        </Badge>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-4">
        {philosophySummary}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {prose.readingTime} min
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {prose.views}
          </span>
        </div>
        <Button variant="default" size="sm" data-testid={`button-read-prose-${prose.id}`}>
          Read Story
        </Button>
      </div>
    </Card>
  );
}
