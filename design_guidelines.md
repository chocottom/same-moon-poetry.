# DESIGN GUIDELINES: SAME MOON POETRY WEBSITE

## Design Philosophy
Contemplative, minimalist aesthetic celebrating universal connection through poetry and prose. Design evokes introspection, spiritual growth, and shared human experience under "the same moon."

## Color System

### Light Mode - Soft Pastel Aesthetic
```
Background: #f0ebe5 (Warm Beige - HSL: 33 27% 92%) - calm, breathing room
Text/Foreground: #3e3b37 (Taupe Brown - HSL: 34 6% 23%) - deep, readable
Card Background: #fdfbf8 (Soft Cream - HSL: 36 56% 98%) - premium, elevated
Card Border: #e8e2d9 (Subtle Taupe - HSL: 36 25% 88%) - gentle definition
Primary/Secondary: #a8926b (Muted Sage-Gold - HSL: 38 26% 54%) - warm accents, highlights
Accent Light: #d4cec3 (Pale Taupe - HSL: 39 17% 80%) - secondary backgrounds
Muted Text: #7a7570 (Soft Gray - HSL: 30 4% 46%) - secondary information
```

### Dark Mode - Elegant Dark
```
Background: #1a1a1a (Deep Charcoal - HSL: 0 0% 10%) - sophisticated, premium
Text/Foreground: #f5f1e8 (Warm Cream - HSL: 42 39% 94%) - readable without harshness
Card Background: #2a2825 (Charcoal-Brown - HSL: 36 6% 15%) - refined elevation
Card Border: #3d3a34 (Subtle Brown - HSL: 40 8% 22%) - gentle definition
Primary/Secondary: #c99a6e (Warm Terracotta - HSL: 29 46% 61%) - elegant warmth
Muted Text: #a89e93 (Soft Beige-Gray - HSL: 31 11% 62%) - secondary information
```

### Rationale
**Soft Pastel Aesthetic (Light)**: Warm beige background (#f0ebe5) creates a contemplative, literary feel without being sterile. The muted sage-gold accent (#a8926b) provides visual hierarchy while remaining elegant and readable. This palette evokes the feel of aged paper and refined book design.

**Elegant Dark (Dark)**: Deep charcoal background with warm cream text creates a sophisticated, eye-friendly reading experience. The terracotta accent (#c99a6e) adds warmth and prevents the dark palette from feeling cold or clinical. Perfect for evening reading sessions.

**High Contrast for Readability**: Text on both backgrounds achieves 7:1+ contrast ratios for accessibility. Card backgrounds are subtly elevated from the base background to create clear visual hierarchy.

**Poetry-First Design**: Both palettes prioritize long-form reading with generous line heights, soft borders, and warm color temperatures. The palettes create an atmosphere of introspection and contemplation aligned with the "Same Moon Poetry" brand.

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