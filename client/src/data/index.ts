import poemsData from './poems.json';
import proseData from './prose.json';

export interface Poem {
  id: string;
  title: string;
  content: string;
  theme: string;
  mood: string;
  featuredImageUrl: string | null;
  readingTime: number;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  publishedAt: string;
  views: number;
  isFeatured: number;
  createdAt: string;
  updatedAt: string;
}

export interface Prose {
  id: string;
  title: string;
  philosophyContent: string;
  narrativeContent: string;
  theme: string;
  mood: string;
  featuredImageUrl: string | null;
  relatedPoemId: string | null;
  readingTime: number;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  publishedAt: string;
  views: number;
  isFeatured: number;
  createdAt: string;
  updatedAt: string;
}

export const poems: Poem[] = poemsData as Poem[];
export const prose: Prose[] = proseData as Prose[];

export function getPublishedPoems(): Poem[] {
  return poems.filter(p => p.status === 'published');
}

export function getFeaturedPoems(): Poem[] {
  return poems
    .filter(p => p.status === 'published' && p.isFeatured > 0)
    .sort((a, b) => a.isFeatured - b.isFeatured)
    .slice(0, 3);
}

export function getPoemById(id: string): Poem | undefined {
  return poems.find(p => p.id === id);
}

export function getPoemsByTheme(theme: string): Poem[] {
  return poems.filter(p => p.status === 'published' && p.theme === theme);
}

export function getPublishedProse(): Prose[] {
  return prose.filter(p => p.status === 'published');
}

export function getFeaturedProse(): Prose[] {
  return prose
    .filter(p => p.status === 'published' && p.isFeatured > 0)
    .sort((a, b) => a.isFeatured - b.isFeatured);
}

export function getProseById(id: string): Prose | undefined {
  return prose.find(p => p.id === id);
}
