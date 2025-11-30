import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { ProseCard } from "@/components/ProseCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "lucide-react";
import { getPublishedProse, type Prose } from "@/data";

export default function ProseCollection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const proseStories = getPublishedProse();

  const filteredProse = proseStories.filter((prose) => {
    const matchesSearch = !searchQuery || 
      prose.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prose.philosophyContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prose.narrativeContent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && prose.status === "published";
  });

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

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Reflections in Prose
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Life lessons through stories and reflections
          </p>
          
          <div className="max-w-2xl mx-auto text-left bg-muted/30 p-6 rounded-lg mb-8">
            <p className="text-muted-foreground leading-relaxed">
              This section reflects the same themes I've explored in my poetry—but through a different lens. 
              Each piece pairs a philosophical observation with a personal narrative, showing how abstract 
              truths emerge from lived experience.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search prose stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-prose"
            />
          </div>
        </div>

        {/* Prose Grid */}
        {filteredProse.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProse.map((prose) => (
              <ProseCard
                key={prose.id}
                prose={prose}
                onClick={() => setLocation(`/prose/${prose.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "No stories found matching your search" : "No prose stories published yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
