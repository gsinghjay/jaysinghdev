# Architecture Documentation

> jaysinghdev Portfolio | Generated: 2026-01-28

## Overview

This document describes the technical architecture of the jaysinghdev portfolio site, a React-based single-page application (SPA) with static content generation.

## Architecture Pattern

**Component-based SPA with Static Content Generation**

The application follows a modern frontend architecture where:
1. Content is authored in Markdown with YAML front matter
2. A build script transforms content to JSON at build time
3. React components fetch and render JSON data at runtime
4. Client-side hash routing handles navigation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         BUILD TIME                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  content/blog/*.md ──┐                                          │
│  content/projects/*.md ──┼──► build-content.js ──► public/*.json│
│  content/config/*.yaml ──┘                                      │
│                                                                  │
│  src/**/*.tsx ──────────────► Vite Build ──────► dist/          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         RUNTIME                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Browser ──► index.html ──► main.tsx ──► App.tsx                │
│                                              │                   │
│                                    ┌─────────┴─────────┐        │
│                                    │ useState hooks    │        │
│                                    │ - currentPage     │        │
│                                    │ - blogPosts[]     │        │
│                                    │ - projects[]      │        │
│                                    └─────────┬─────────┘        │
│                                              │                   │
│                         ┌────────────────────┼────────────────┐ │
│                         ▼                    ▼                ▼ │
│                      Home.tsx           Blog.tsx       Projects │
│                                              │                   │
│                                    ┌─────────┴─────────┐        │
│                                    │ fetch('/**.json') │        │
│                                    └───────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Layer Structure

```
┌─────────────────────────────────────────┐
│              Pages Layer                 │
│  Home, Blog, Projects, Resume, Contact  │
├─────────────────────────────────────────┤
│           Components Layer              │
│  BlogDetail, ProjectDetail, Header...   │
├─────────────────────────────────────────┤
│          Primitives Layer               │
│  Card, Button, Tag, Input, Section...   │
├─────────────────────────────────────────┤
│             Utilities                    │
│  content-loader.ts, types/index.ts      │
└─────────────────────────────────────────┘
```

### Data Flow

```
App.tsx (State Owner)
    │
    ├── currentPage: Page
    ├── selectedItemId: string
    ├── blogPosts: BlogPost[]
    ├── projects: Project[]
    └── loading: boolean
          │
          ▼
    ┌─────────────────┐
    │   useEffect()   │
    │ loadBlogPosts() │
    │ loadProjects()  │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │  fetch() JSON   │
    │  from /public/  │
    └────────┬────────┘
             │
             ▼
    Props Drilling to Pages & Components
```

## Routing Architecture

### Hash-Based Client Routing

The application uses a custom hash-based routing system instead of a routing library.

**URL Pattern:** `#page` or `#page/id`

**Examples:**
- `#home` → Home page
- `#blog` → Blog listing
- `#blog/ci-cd-best-practices` → Blog post detail
- `#projects` → Projects listing
- `#projects/authentication-gateway` → Project detail

**Implementation:**

```typescript
// App.tsx
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1);
    const [page, id] = hash.split('/');
    if (page) {
      setCurrentPage(page as Page);
      setSelectedItemId(id);
    }
  };

  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);
```

## Content Pipeline

### Build Process

```
npm run build:content
        │
        ▼
┌────────────────────────────────────┐
│      scripts/build-content.js      │
├────────────────────────────────────┤
│ 1. Read content/blog/*.md          │
│ 2. Parse YAML front matter         │
│ 3. Convert markdown to blocks      │
│ 4. Sort by date                    │
│ 5. Write to public/blog-posts.json │
├────────────────────────────────────┤
│ 1. Read content/projects/*.md      │
│ 2. Parse YAML front matter         │
│ 3. Extract sections (Challenge,    │
│    Solution, Impact)               │
│ 4. Write to public/projects.json   │
└────────────────────────────────────┘
```

### Content Block Types

The build script converts markdown into structured content blocks:

| Type | Description | Metadata |
|------|-------------|----------|
| `text` | Paragraph text | - |
| `code` | Code block | `language` |
| `diagram` | Mermaid diagram | `diagramType: 'mermaid'` |
| `image` | Image | `alt` |
| `callout` | Blockquote callout | - |

## State Management

### Approach: Local State with Hooks

The application uses React's built-in `useState` for all state management. There is no global state library (Redux, Zustand, etc.).

**State Locations:**

| Component | State | Purpose |
|-----------|-------|---------|
| App.tsx | currentPage, selectedItemId | Navigation |
| App.tsx | blogPosts, projects | Content data |
| App.tsx | loading | Loading indicator |
| Header.tsx | mobileMenuOpen | Mobile nav toggle |
| Projects.tsx | activeFilter | Project filtering |
| Contact.tsx | formData, showSuccess | Form state |
| MermaidDiagram.tsx | zoom, pan, isDragging | Diagram controls |

### Why No Global State Library?

- Small application scope
- Minimal cross-component state sharing
- Content is loaded once and passed via props
- Simpler mental model and fewer dependencies

## Styling Architecture

### Tailwind CSS Configuration

**Custom Theme Extensions:**

```javascript
// tailwind.config.js
{
  colors: {
    cream: '#FFFBEB'
  },
  boxShadow: {
    'brutal-sm': '3px 3px 0 #000',
    'brutal': '4px 4px 0 #000',
    'brutal-md': '6px 6px 0 #000',
    'brutal-lg': '8px 8px 0 #000'
  },
  borderRadius: {
    'none': '0'  // Force all radius to 0
  }
}
```

### CSS Custom Properties

```css
/* src/index.css */
:root {
  --shadow-brutal-sm: 3px 3px 0 #000;
  --shadow-brutal: 4px 4px 0 #000;
  --shadow-brutal-md: 6px 6px 0 #000;
  --shadow-brutal-lg: 8px 8px 0 #000;
}
```

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FFFBEB` (cream) | Page background |
| Primary | `#000000` | Text, borders |
| Accent Lime | Tailwind lime-400 | CTAs, hover states |
| Accent Yellow | Tailwind yellow-400 | Active states |
| Accent Pink | Tailwind pink-400/600 | Links, highlights |

## Type System

### Core Interfaces

```typescript
// src/types/index.ts

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  contentBlocks?: ContentBlock[];
  tags: string[];
  readTime: string;
  featured: boolean;
  relatedProjectIds?: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
}

type Page = 'home' | 'blog' | 'projects' | 'resume' | 'contact';
```

## Build & Deployment

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (runs build:content first) |
| `npm run build` | Production build (runs build:content first) |
| `npm run build:content` | Compile markdown to JSON |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |

### Output Structure

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── blog-posts.json
├── projects.json
├── content/
│   └── config/*.yaml
└── [other static assets]
```

## Future Considerations

### Supabase Integration
The `@supabase/supabase-js` dependency is installed but not yet implemented. Planned use:
- Contact form submission
- Potential blog comments or analytics

### Potential Improvements
1. **Routing Library** - Consider React Router for more robust routing
2. **Static Site Generation** - Could benefit from Astro or similar SSG
3. **Image Optimization** - Add image processing pipeline
4. **SEO** - Add meta tags, sitemap, structured data
5. **Testing** - No test framework currently configured
