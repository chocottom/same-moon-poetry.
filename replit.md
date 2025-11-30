# Same Moon Poetry

A poetry and prose website for Amen Allah Jebali, featuring a collection of poems organized by themes and moods.

## Overview

This is a static website built for Netlify deployment:
- **Frontend**: React with Vite, TailwindCSS, shadcn/ui components
- **Data**: Local JSON files (no backend required for static deployment)
- **Routing**: wouter for client-side SPA routing

## Project Structure

```
client/
  src/
    components/     # Reusable UI components
    pages/          # Page components (Home, PoetryCollection, ProseCollection, ProseStory, About)
    data/           # JSON data files and helper functions
      poems.json    # All poems content
      prose.json    # All prose content  
      index.ts      # Data types and helper functions
    lib/            # Utility functions
    hooks/          # Custom React hooks
    contexts/       # Theme context for dark/light mode
```

## Static Deployment (Netlify)

This website is designed for static hosting on Netlify:

### Build Command
```bash
npm run build
```

### Publish Directory
```
dist/public
```

### Key Features for Static Deployment
1. All content loaded from local JSON files (`client/src/data/`)
2. No API calls or backend dependencies
3. Client-side routing with wouter (requires _redirects file for SPA)
4. Newsletter subscription shows informational message instead of form submission

### Netlify Configuration
Create a `_redirects` file in the public folder with:
```
/*    /index.html   200
```

## Theme Organization
Poems are organized into four themes:
- **Spiritual Depth** (Moon icon) - Exploring Allah, gratitude, transformation
- **Presence & Connection** (Heart icon) - Authentic relationships, listening
- **Time & Purpose** (Clock icon) - Discipline, intentional living
- **Growth & Becoming** (Sprout icon) - Transformation, evolution

## Mood Categories
- Reflective
- Energetic
- Melancholic
- Inspiring

## Data Helper Functions

Located in `client/src/data/index.ts`:
- `getFeaturedPoems()` - Get poems for homepage hero section
- `getPublishedPoems()` - Get all published poems
- `getPoemsByTheme(theme)` - Filter poems by theme
- `getPublishedProse()` - Get all published prose
- `getProseById(id)` - Get single prose piece by ID

## Recent Changes

- **2024-11-30**: Converted to static JSON-based architecture for Netlify deployment
- **2024-11-30**: Removed admin dashboard, authentication, and database dependencies
- **2024-11-30**: Created data utility layer with poems.json and prose.json
- **2024-11-30**: Updated all navigation to use wouter's Link component for proper SPA routing
