# DESIGN GUIDELINES: SAME MOON POETRY WEBSITE

## Design Philosophy
Contemplative, minimalist aesthetic celebrating universal connection through poetry and prose. Design evokes introspection, spiritual growth, and shared human experience under "the same moon."

## Color System
```
Primary: #6b8b7e (Jade Green - HSL: 160 24% 38%) - contemplation, growth
Secondary: #b8704d (Rich Bronze - HSL: 32 62% 50% light / 32 72% 58% dark) - warm accents, highlights
Secondary-Foreground: #f8f5f1 (Cream - light) / #0a0f1a (Near-black - dark) - text on secondary backgrounds
Accent: #d4d0cc (Muted Taupe - HSL: 160 8% 88%) - depth, subtle backgrounds
Background: #faf9f7 (Off-white - HSL: 40 14% 98%) - breathing room
Text: #2c2c2c (Charcoal - HSL: 0 0% 17%) - primary readability
Muted: #e8e4e0 (Warm Taupe) - secondary backgrounds, subtle accents
```

### Rationale
**Rich Bronze Secondary Color**: Replaces harsh yellow with a richer, warmer bronze tone (32° hue, 62-72% saturation) that feels inviting and earthy. Higher saturation creates better visual hierarchy without being garish.

**High-Contrast Text**: Secondary-foreground uses cream text on light mode (90%+ lightness) and near-black on dark mode for maximum readability (7:1+ contrast ratio) when used on secondary backgrounds.

**Improved Styling**: The Philosophy box on Prose pages uses 20% opacity on light backgrounds and 15% on dark, with a subtle ring border to create clear visual separation while maintaining harmony with the overall design.

## Typography
- **Display Font**: 'Crimson Text' (serif) - titles, quotes, spiritual elements
- **Body Font**: 'Source Sans 3' (sans-serif) - content, UI elements
- **Mono Font**: 'Monaco' - code/admin areas
- **Line Heights**: 1.2 (tight), 1.5 (normal), 1.75 (relaxed), 2 (loose for poems)

## Spacing System
Use Tailwind units: 2, 4, 8, 12, 16, 20, 24, 32 for consistent rhythm

## Visual Elements
- Minimalist hand-drawn illustrations (contemplative silhouettes, misty mountains, bonsai trees, flying birds, moon phases)
- Organic shapes with geometric precision
- Generous whitespace for contemplative breathing room
- Subtle texture overlays on backgrounds
- Depth through layering, avoid heavy shadows

## Page-Specific Layouts

### Home Page
**Hero Section**: Full viewport height with animated parallax background (3-4 layers), moon phase animation cycling every 30s, rotating featured quotes (5s intervals with fade), typewriter effect on hero quote, author name with gradient text, scroll indicator with pulse

**Featured Journey Section**: 3-act structure timeline (Searching → Discovering → Becoming) with connecting animated line, cards slide in from sides on scroll, hover lifts cards revealing full excerpt

**Prose Stories Section**: Dual-column layout (desktop) - LEFT: Philosophy callouts, Gold vertical divider, RIGHT: Personal narrative. Stack on mobile. Include reading time, mood badges, "Save to Collection" and "Share Story" buttons

**Footer**: Dark gradient background, newsletter signup ("Receive Monthly Reflections"), social links, quick stats, all section links

### Poetry Collection Page
Four theme sections with unique backgrounds:
- **Spiritual Depth** 🌙: Sage green gradient, moon icon
- **Presence & Connection** 💫: Slate blue gradient, connected circles
- **Time & Purpose** ⏰: Gold gradient, clock/path icon  
- **Growth & Becoming** 🌱: Green gradient, tree/seedling icon

Each section displays poem cards with title, first line excerpt, mood indicator, reading time, "Open" button. Smooth scroll reveals with staggered fade-ins.

### Prose Collection Page
Story cards grid showing title, philosophy summary, theme badge, reading time. Individual story pages use full dual-column layout with callout boxes for insights, related poem suggestions, reflection prompts

### About Page
Visual timeline of creative journey with milestones, interactive philosophy cards (click to reveal full exploration + related poem), contact form with specific prompts ("What brought you here?", "Which poem resonated most?")

### Immersive Poem Reader
Full-screen modal with centered poem, right sidebar controls (font size, line height, dark/light mode, bookmark), minimal UI that fades on scroll, max-width 60-70 characters per line, smooth background transitions, previous/next navigation

## Animations & Transitions
- **All transitions**: 0.6s cubic-bezier(0.4, 0, 0.2, 1)
- Subtle parallax on scroll (accessible)
- Quote fade-in-up on hero load
- Cards slide in from sides with stagger
- Moon phases animate smoothly
- Birds fly across hero (infinite loop)
- Theme sections reveal with title slide + content fade
- Minimize distracting animations - focus on smooth, purposeful motion

## Images
**Hero Section**: Large parallax background image with contemplative silhouette on cliff/mountain overlooking landscape under moon - full viewport height

**Additional Images**: Minimal illustrations (hand-drawn aesthetic) for theme icons, timeline milestones, philosophy cards. Real contemplative photography for About page background.

**Image Treatment**: Subtle overlays, texture blending, always maintain readability of overlaid text. Buttons on images use blurred backgrounds.

## Responsive Breakpoints
- Mobile (<640px): Stacked, full-width, 48px+ touch targets
- Tablet (640-1024px): 2-column layouts, adjusted spacing
- Desktop (>1024px): Multi-column, optimized spacing
- Mobile-first approach

## Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML (header, article, section)
- ARIA labels throughout
- Color contrast ≥4.5:1 for text
- Keyboard navigation support
- Screen reader friendly
- Reduced motion options for animations

## Performance
- Lazy loading for images
- Optimized animations (transform + opacity only)
- WebP images with fallbacks
- Minified assets
- Code splitting for faster loads