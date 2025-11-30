import { Link, useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PoemCard } from "@/components/PoemCard";
import { ArrowLeft, BookOpen, Eye, Home } from "lucide-react";
import { getProseById, getPoemById, type Prose, type Poem } from "@/data";

export default function ProseStory() {
  const [, params] = useRoute("/prose/:id");
  const [, setLocation] = useLocation();
  const proseId = params?.id;

  const prose = proseId ? getProseById(proseId) : undefined;
  const relatedPoem = prose?.relatedPoemId ? getPoemById(prose.relatedPoemId) : undefined;

  if (!prose) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl font-bold hover:text-primary transition-colors">
              Same Moon Poetry
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/poetry" className="text-sm hover:text-primary transition-colors">
                Poetry
              </Link>
              <Link href="/prose" className="text-sm font-medium text-primary">
                Prose
              </Link>
              <Link href="/about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            <h1 className="font-display text-3xl font-bold mb-4">Story Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The prose piece you're looking for doesn't exist or may have been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setLocation("/prose")} data-testid="button-browse-prose">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Prose
              </Button>
              <Button variant="outline" onClick={() => setLocation("/")} data-testid="button-go-home">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold hover:text-primary transition-colors">
            Same Moon Poetry
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/poetry" className="text-sm hover:text-primary transition-colors">
              Poetry
            </Link>
            <Link href="/prose" className="text-sm font-medium text-primary">
              Prose
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => setLocation("/prose")}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Prose
        </Button>

        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-prose-title">
            {prose.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <Badge variant="secondary">{prose.theme}</Badge>
              <Badge variant="outline">{prose.mood}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {prose.readingTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {prose.views} views
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <div className="sticky top-24">
              <div className="bg-secondary/20 border-l-4 border-secondary p-6 rounded-lg ring-1 ring-secondary/30 dark:bg-secondary/15">
                <h2 className="font-display text-2xl font-semibold mb-4 text-secondary-foreground">
                  The Philosophy
                </h2>
                <div 
                  className="prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap text-foreground"
                  data-testid="text-philosophy-content"
                >
                  {prose.philosophyContent}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">
                The Story
              </h2>
              <div 
                className="prose prose-lg max-w-none leading-relaxed whitespace-pre-wrap"
                data-testid="text-narrative-content"
              >
                {prose.narrativeContent}
              </div>
            </div>
          </div>
        </div>

        {relatedPoem && (
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-display text-2xl font-semibold mb-6">
              Related Poem
            </h3>
            <div className="max-w-md">
              <PoemCard 
                poem={relatedPoem}
                onClick={() => setLocation("/poetry")}
              />
            </div>
          </div>
        )}

        <Card className="mt-16 p-8 bg-muted/30">
          <h3 className="font-display text-xl font-semibold mb-3">
            Reflect on This
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            What resonated most with you in this piece? How does this philosophy 
            show up in your own life? Take a moment to contemplate before moving forward.
          </p>
        </Card>
      </div>
    </div>
  );
}
