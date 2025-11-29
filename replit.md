# Same Moon Poetry

A poetry and prose website for Amen Allah Jebali, featuring a collection of poems organized by themes and moods.

## Overview

This is a full-stack JavaScript application built with:
- **Frontend**: React with Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter for client-side routing

## Project Structure

```
client/
  src/
    components/     # Reusable UI components
    pages/          # Page components (Home, PoetryCollection, ProseCollection, About)
    lib/            # Utility functions and query client
    hooks/          # Custom React hooks
server/
  routes.ts         # API endpoints
  storage.ts        # Database operations
  db.ts             # Database connection
shared/
  schema.ts         # Drizzle ORM schema and Zod types
```

## Key Features

### Theme Organization
Poems are organized into four themes:
- **Spiritual Depth** (Moon icon) - Exploring Allah, gratitude, transformation
- **Presence & Connection** (Heart icon) - Authentic relationships, listening
- **Time & Purpose** (Clock icon) - Discipline, intentional living
- **Growth & Becoming** (Sprout icon) - Transformation, evolution

### Mood Categories
- Reflective
- Energetic
- Melancholic
- Inspiring

### Search Prioritization
When searching or filtering poems:
1. Matching poems appear first at the top (ungrouped) in a highlighted results section
2. Remaining poems are displayed below, grouped by their respective themes
3. This ensures relevant content is immediately visible without scrolling through theme sections

## API Endpoints

- `GET /api/poems` - Retrieve all poems
- `GET /api/poems/:id` - Get single poem
- `POST /api/poems` - Create new poem
- `GET /api/prose` - Retrieve all prose pieces
- `GET /api/prose/:id` - Get single prose piece
- `POST /api/prose` - Create new prose piece

## Database Schema

### Poems Table
- id (UUID, primary key)
- title, content, excerpt
- theme (enum: Spiritual Depth, Presence & Connection, Time & Purpose, Growth & Becoming)
- mood (enum: Reflective, Energetic, Melancholic, Inspiring)
- status (draft/published)
- readingTime, views

### Prose Table
- id (UUID, primary key)
- title, content, excerpt
- category
- status (draft/published)
- readingTime, views

## Recent Changes

- **2024-11-29**: Implemented search prioritization - matching poems now appear first when filtering
- **2024-11-29**: Replaced emoji icons with lucide-react icons matching each poem's theme
- **2024-11-29**: Created PostgreSQL database and inserted 8 poems + 1 prose piece
