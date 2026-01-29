---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
status: complete
completedAt: '2026-01-29'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/source-tree-analysis.md
workflowType: 'architecture'
project_name: 'jaysinghdev'
user_name: 'Jay'
date: '2026-01-28'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
43 functional requirements spanning content display, authoring, navigation, accessibility, SEO, and template usage. The architecture must support:
- Static content rendering for blog posts (5) and projects (8)
- Markdown-based authoring with YAML frontmatter
- Build-time code syntax highlighting and Mermaid diagram rendering
- Full keyboard navigation and screen reader compatibility
- Comprehensive SEO stack (meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap)
- GitHub Pages deployment via GitHub Actions

**Non-Functional Requirements:**
- Performance: 100% Lighthouse score, FCP < 1s, LCP < 1.5s, TBT < 50ms, CLS < 0.1
- Accessibility: WCAG 2.1 AA, 4.5:1 contrast ratio, prefers-reduced-motion support
- Maintainability: Self-documenting structure, minimal dependencies, clear config
- SEO: 100% Lighthouse SEO/Best Practices, mobile-friendly, clean URLs
- Build: < 30 second builds, static HTML/CSS/JS output

**Scale & Complexity:**
- Primary domain: Static Site / Frontend
- Complexity level: Low
- Estimated architectural components: ~15-20 templates/partials

### Technical Constraints & Dependencies

**Migration Constraints:**
- Must preserve brutalist design system exactly (hard shadows, no radius, bold borders, cream/lime/yellow/pink palette)
- Must support existing content structure (5 blog posts, 8 projects, profile/resume/skills YAML)
- GitHub Pages hosting (no server-side processing)
- No external runtime dependencies for core functionality

**Technology Decisions (from PRD):**
- Generator: 11ty (Eleventy)
- Templating: Nunjucks
- Content: Markdown + YAML frontmatter
- Styling: Tailwind CSS (purged) or vanilla CSS with brutalist tokens
- JavaScript: Progressive enhancement only
- CI/CD: GitHub Actions

**Browser Support:**
- Last 2 versions of Chrome, Firefox, Safari, Edge
- No IE11 support (modern CSS features allowed)

### Cross-Cutting Concerns Identified

1. **Accessibility** - Every template must implement ARIA landmarks, heading hierarchy, focus management, and motion preferences
2. **SEO** - All page types need consistent meta tag patterns, structured data schemas, and sitemap inclusion
3. **Design System** - Brutalist tokens (shadows, borders, colors) must be centralized and consistently applied
4. **Content Schema** - Frontmatter structure must be documented and validated for both blog posts and projects
5. **Template Reusability** - Architecture must be self-explanatory for template users who fork the repo

## Starter Template Evaluation

### Primary Technology Domain

Static Site Generator (SSG) for portfolio/blog based on project requirements analysis.

### Starter Options Considered

| Starter | Pros | Cons |
|---------|------|------|
| `eleventy-base-blog` | Official, v3.0, zero-JS, GitHub Pages ready, well-documented | No Tailwind (easy to add) |
| `ta11y` | A11Y-first, Tailwind included, SEO patterns | Needs heavy customization for brutalist design |
| `minimal-11ty-tailwind-starter` | Simple, Tailwind 4 | Missing SEO, accessibility features |

### Selected Starter: eleventy-base-blog

**Rationale for Selection:**
- Official 11ty starter ensures long-term maintenance and community trust
- Clean foundation for custom brutalist design system (no existing styling to fight)
- GitHub Pages deployment workflow included
- Template distribution goal benefits from recognizable, trustworthy base
- Zero-JavaScript output aligns with "progressive enhancement only" requirement
- Content structure is decoupled from URLs (easier migration)

**Initialization Command:**

```bash
# Clone official starter
git clone https://github.com/11ty/eleventy-base-blog.git jaysinghdev
cd jaysinghdev
npm install

# Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- Node.js 18+
- ESM configuration (eleventy.config.js)
- No TypeScript (static content doesn't need it)

**Templating:**
- Nunjucks as primary template language
- Layouts in `_includes/layouts/`
- Partials in `_includes/`

**Build Tooling:**
- 11ty v3.0 for static generation
- PostCSS for CSS processing (add Tailwind)
- No bundler needed (zero-JS output)

**Content Organization:**
- `content/` directory for markdown
- `_data/` for global data files
- YAML frontmatter for metadata

**GitHub Pages Deployment:**
- Pre-configured workflow in `.github/workflows/`
- `pathPrefix` support via HtmlBasePlugin
- `peaceiris/actions-gh-pages` action

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Content directory structure (11ty conventions)
- Template/layout organization
- Mermaid build-time rendering approach

**Important Decisions (Shape Architecture):**
- Frontmatter schema simplification
- CSS architecture (Tailwind + CSS vars)
- JavaScript bundling strategy

**Deferred Decisions (Post-MVP):**
- Advanced caching strategies
- Image optimization pipeline (if images added)

### Content Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Directory Structure | 11ty conventions | `_data/` auto-loads globals, standard pattern |
| Blog Frontmatter | Simplified | Let 11ty compute readTime, derive slug from filename |
| Project Frontmatter | 11ty-native | Leverage collections and computed data |

**Content Directory Structure:**
```
content/
├── blog/
│   └── *.md          # Blog posts
├── projects/
│   └── *.md          # Project case studies
├── pages/
│   ├── index.njk     # Home
│   ├── about.njk     # About/Profile
│   ├── resume.njk    # Resume
│   └── contact.njk   # Contact
_data/
├── profile.yaml      # Name, bio, social links
├── resume.yaml       # Experience, education, certs
├── skills.yaml       # Technical skills
└── site.yaml         # Site metadata, navigation
```

**Simplified Blog Frontmatter:**
```yaml
title: "CI/CD Best Practices"
date: 2024-01-15
excerpt: "Brief description for cards and SEO"
tags:
  - DevOps
  - Docker
featured: true
relatedProjects:
  - cicd-pipeline
```
- `slug` derived from filename (ci-cd-best-practices.md → /blog/ci-cd-best-practices/)
- `readTime` computed by 11ty plugin
- `draft: true` support via 11ty's draft plugin

**11ty-Native Project Frontmatter:**
```yaml
title: "Authentication Gateway"
description: "OAuth2/OIDC authentication gateway"
date: 2024-01-10
technologies:
  - Python
  - FastAPI
  - Redis
links:
  live: https://...
  github: https://...
featured: true
category: work  # or 'personal'
```
- Simplified `links` object instead of separate `liveUrl`/`githubUrl`
- `category` replaces `projectType` for filtering
- Diagram content in markdown body, not frontmatter

### Template Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Layout Hierarchy | Flat | Simpler for template users |
| Component Organization | Grouped | Clear structure for 18+ partials |

**Layout Structure:**
```
_includes/
├── layouts/
│   ├── base.njk        # HTML shell, head, body
│   ├── page.njk        # Static pages (about, contact)
│   ├── post.njk        # Blog posts
│   └── project.njk     # Project case studies
```

**Component Organization:**
```
_includes/
├── layout/
│   ├── header.njk
│   ├── footer.njk
│   └── nav.njk
├── components/
│   ├── card.njk
│   ├── button.njk
│   ├── tag.njk
│   ├── code-block.njk
│   └── callout.njk
├── seo/
│   ├── meta.njk
│   ├── open-graph.njk
│   ├── twitter-card.njk
│   └── json-ld.njk
└── content/
    ├── post-list.njk
    ├── project-grid.njk
    └── toc.njk
```

### Styling Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tailwind Config | Extend defaults | Keep utilities, add brutalist tokens |
| CSS Variables | Tailwind + CSS vars | Matches current setup, flexible |

**Tailwind Configuration:**
```js
// tailwind.config.js
export default {
  content: [
    './content/**/*.{njk,md}',
    './_includes/**/*.njk',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBEB',
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0 #000',
        'brutal': '4px 4px 0 #000',
        'brutal-md': '6px 6px 0 #000',
        'brutal-lg': '8px 8px 0 #000',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
    },
  },
}
```

**CSS Custom Properties (preserved):**
```css
:root {
  --shadow-brutal-sm: 3px 3px 0 #000;
  --shadow-brutal: 4px 4px 0 #000;
  --shadow-brutal-md: 6px 6px 0 #000;
  --shadow-brutal-lg: 8px 8px 0 #000;
  --transition-default: all 0.15s ease;
}
```

### Build & Progressive Enhancement

| Decision | Choice | Rationale |
|----------|--------|-----------|
| JavaScript Strategy | ESBuild via 11ty | Proper bundling, tree-shaking |
| Mermaid Rendering | Build-time SVG | Zero client JS, faster loads |

**JavaScript Bundling:**
- Use `@11ty/eleventy-plugin-bundle` with ESBuild
- Bundle progressive enhancement scripts (code copy, etc.)
- Output: Single minified JS file, loaded with `defer`

**Mermaid Build-Time Rendering:**
- Use `@mermaid-js/mermaid-cli` in build pipeline
- Transform `mermaid` code blocks to inline SVG
- Fallback: `<pre>` block with diagram code for accessibility

**Build Pipeline:**
```
npm run build
├── 11ty processes markdown → HTML
├── Mermaid CLI renders diagrams → SVG
├── Tailwind purges CSS → minimal bundle
├── ESBuild bundles JS → single file
└── Output to _site/
```

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (clone starter, add Tailwind)
2. Content migration (convert frontmatter, move to `_data/`)
3. Base layout + design system (CSS, tokens)
4. Component templates (header, footer, cards)
5. Page templates (home, blog, projects, resume, contact)
6. SEO templates (meta, JSON-LD, sitemap)
7. Progressive enhancement (code copy, Mermaid)
8. GitHub Actions deployment

**Cross-Component Dependencies:**
- All templates depend on base layout + design tokens
- SEO partials included in base layout
- Mermaid rendering affects blog/project templates
- JavaScript bundle loaded in base layout

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
6 areas where AI agents could make different choices, all addressed below.

### Naming Patterns

**File Naming Conventions:**

| File Type | Convention | Example |
|-----------|------------|---------|
| Templates | kebab-case.njk | `post-list.njk`, `json-ld.njk` |
| Content | kebab-case.md | `ci-cd-best-practices.md` |
| Layouts | kebab-case.njk | `base.njk`, `post.njk` |
| Data files | kebab-case.yaml | `site.yaml`, `profile.yaml` |
| CSS | kebab-case.css | `main.css`, `brutalist.css` |
| JS | kebab-case.js | `code-copy.js`, `main.js` |

**Frontmatter Field Naming:**

| Convention | Example | Rationale |
|------------|---------|-----------|
| camelCase | `relatedProjects`, `readTime` | JavaScript-friendly |
| No `is` prefix | `featured: true` not `isFeatured` | Cleaner |
| ISO dates | `date: 2024-01-15` | Machine-parseable |

### Template Patterns

**Nunjucks Include Syntax:**
```njk
{# Always use path-based includes from _includes root #}
{% include "components/card.njk" %}
{% include "seo/meta.njk" %}
{% include "layout/header.njk" %}
```

**Data Access:**
```njk
{# Direct access to _data files (11ty convention) #}
{{ site.title }}
{{ profile.name }}
{{ resume.experience }}

{# Page-specific data via frontmatter #}
{{ title }}
{{ excerpt }}
```

**Collection Loops:**
```njk
{# Always use collections.* for content #}
{% for post in collections.blog %}
  {% include "components/post-card.njk" %}
{% endfor %}

{% for project in collections.projects %}
  {% include "components/project-card.njk" %}
{% endfor %}
```

**Component Parameters:**
```njk
{# Pass data via set before include #}
{% set cardTitle = post.data.title %}
{% set cardExcerpt = post.data.excerpt %}
{% include "components/card.njk" %}

{# Or use macros for reusable components #}
{% from "components/button.njk" import button %}
{{ button(text="Read More", href=post.url, variant="lime") }}
```

### CSS/Styling Patterns

**Custom Utility Naming:**
```css
/* Design system utilities use brutal- prefix */
.brutal-box { }
.brutal-box-sm { }
.brutal-box-lg { }

/* Hover utilities use hover- prefix */
.hover-lift { }
.hover-lift-lg { }
```

**Component Class Naming:**
```css
/* Flat naming, no BEM nesting */
.card { }
.card-title { }
.card-excerpt { }
.card-featured { }

/* State classes use is- prefix */
.is-active { }
.is-loading { }
.is-hidden { }
```

**Tailwind Usage:**
```html
<!-- Prefer Tailwind utilities over custom CSS -->
<div class="bg-cream border-4 border-black shadow-brutal p-6">

<!-- Use custom utilities only for design system tokens -->
<div class="brutal-box hover-lift">
```

### HTML/Accessibility Patterns

**Required Landmarks (Every Page):**
```html
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to main content
  </a>

  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>{{ title }}</h1>
    ...
  </main>

  <footer role="contentinfo">...</footer>
</body>
</html>
```

**Heading Hierarchy:**
```html
<!-- CORRECT: Sequential, single h1 -->
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>

<!-- WRONG: Skipped level -->
<h1>Page Title</h1>
<h3>Subsection</h3>  <!-- Missing h2! -->
```

**Interactive Elements:**
```html
<!-- Buttons: Actions that don't navigate -->
<button type="button" onclick="copyCode()">Copy Code</button>
<button type="button" aria-expanded="false">Menu</button>

<!-- Links: Navigation -->
<a href="/blog/">View all posts</a>
<a href="/projects/auth-gateway/">View project</a>

<!-- NEVER: Links styled as buttons for actions -->
<a href="#" onclick="doSomething()">Click</a>  <!-- WRONG -->
```

**Focus Management:**
```css
/* All interactive elements MUST have visible focus */
:focus {
  outline: 3px solid #000;
  outline-offset: 2px;
}

/* Focus-visible for keyboard-only focus */
:focus:not(:focus-visible) {
  outline: none;
}
:focus-visible {
  outline: 3px solid #000;
  outline-offset: 2px;
}
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### URL/Output Patterns

**URL Structure:**

| Content Type | Listing URL | Detail URL |
|--------------|-------------|------------|
| Blog | `/blog/` | `/blog/{slug}/` |
| Projects | `/projects/` | `/projects/{slug}/` |
| Pages | N/A | `/{slug}/` |

**Rules:**
- All URLs use trailing slashes
- Slugs derived from filename (kebab-case)
- No `.html` extensions
- No date prefixes in URLs (dates in frontmatter only)

**Asset Paths:**
```html
<!-- Use 11ty's url filter for all internal paths -->
<a href="{{ '/blog/' | url }}">Blog</a>
<link href="{{ '/css/main.css' | url }}" rel="stylesheet">
<script src="{{ '/js/main.js' | url }}" defer></script>
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. Use kebab-case for all filenames (templates, content, assets)
2. Follow the heading hierarchy (single h1, never skip levels)
3. Include all required ARIA landmarks on every page
4. Use `collections.*` for content loops, never custom variables
5. Apply `| url` filter to all internal links and asset paths
6. Respect `prefers-reduced-motion` in any CSS with transitions
7. Use path-based includes from `_includes` root
8. Keep frontmatter in camelCase with ISO dates

**Pattern Violations:**
- Run axe-core accessibility tests in CI
- Lighthouse CI for performance/SEO/accessibility scores
- ESLint for JavaScript patterns (when JS added)

### Pattern Examples

**Good Example - Blog Post Template:**
```njk
---
layout: layouts/post.njk
---
<article>
  <header>
    <h1>{{ title }}</h1>
    <time datetime="{{ date | dateToISO }}">{{ date | dateToHuman }}</time>
    {% for tag in tags %}
      {% include "components/tag.njk" %}
    {% endfor %}
  </header>

  <div class="prose">
    {{ content | safe }}
  </div>

  {% if relatedProjects.length %}
    <aside aria-label="Related projects">
      <h2>Related Projects</h2>
      {% for projectSlug in relatedProjects %}
        {% set project = collections.projects | getBySlug(projectSlug) %}
        {% include "components/project-card.njk" %}
      {% endfor %}
    </aside>
  {% endif %}
</article>
```

**Anti-Patterns to Avoid:**

```njk
{# WRONG: Relative includes #}
{% include "./card.njk" %}

{# WRONG: Skipping heading levels #}
<h1>Title</h1>
<h3>Section</h3>

{# WRONG: Links for actions #}
<a href="#" onclick="copy()">Copy</a>

{# WRONG: Missing url filter #}
<a href="/blog/">Blog</a>

{# WRONG: snake_case frontmatter #}
related_projects: [...]

{# WRONG: Custom loop variable instead of collections #}
{% for post in blogPosts %}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
jaysinghdev/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
├── _data/
│   ├── site.yaml                   # Site metadata (title, description, author, social)
│   ├── profile.yaml                # Personal info (name, role, bio, contact)
│   ├── resume.yaml                 # Experience, education, certifications
│   ├── skills.yaml                 # Technical skills by category
│   └── navigation.yaml             # Nav menu items
├── _includes/
│   ├── layouts/
│   │   ├── base.njk                # HTML shell (doctype, head, body wrapper)
│   │   ├── page.njk                # Static pages (extends base)
│   │   ├── post.njk                # Blog post detail (extends base)
│   │   └── project.njk             # Project detail (extends base)
│   ├── layout/
│   │   ├── header.njk              # Site header with nav
│   │   ├── footer.njk              # Site footer
│   │   ├── nav.njk                 # Navigation component
│   │   └── skip-link.njk           # Skip to main content link
│   ├── components/
│   │   ├── card.njk                # Generic card container
│   │   ├── post-card.njk           # Blog post card
│   │   ├── project-card.njk        # Project card
│   │   ├── button.njk              # Button macro
│   │   ├── tag.njk                 # Tag/chip component
│   │   ├── code-block.njk          # Syntax-highlighted code
│   │   ├── callout.njk             # Info/warning callout box
│   │   └── social-share.njk        # Social sharing buttons
│   ├── seo/
│   │   ├── meta.njk                # Meta title, description, canonical
│   │   ├── open-graph.njk          # OG tags for social sharing
│   │   ├── twitter-card.njk        # Twitter Card tags
│   │   ├── json-ld-person.njk      # Person schema
│   │   ├── json-ld-post.njk        # BlogPosting schema
│   │   └── json-ld-project.njk     # CreativeWork schema
│   └── content/
│       ├── post-list.njk           # Blog post listing
│       ├── project-grid.njk        # Project grid with filters
│       ├── toc.njk                 # Table of contents
│       ├── reading-progress.njk    # Reading progress bar
│       └── related-projects.njk    # Related projects section
├── content/
│   ├── blog/
│   │   ├── blog.json               # Collection config (layout, tags, permalink)
│   │   ├── ci-cd-best-practices.md
│   │   ├── docker-observability.md
│   │   ├── building-fastapi-microservices.md
│   │   ├── oauth2-authentication-gateway.md
│   │   └── postgresql-performance.md
│   ├── projects/
│   │   ├── projects.json           # Collection config
│   │   ├── authentication-gateway.md
│   │   ├── cicd-pipeline.md
│   │   ├── observability-infrastructure.md
│   │   ├── event-driven-microservices.md
│   │   ├── qr-code-platform.md
│   │   ├── covid-dashboard.md
│   │   ├── jamf-pro-deployment.md
│   │   └── automation-scripts.md
│   └── pages/
│       ├── index.njk               # Home page
│       ├── about.njk               # About/Profile page
│       ├── blog.njk                # Blog listing page
│       ├── projects.njk            # Projects listing page
│       ├── resume.njk              # Resume page
│       ├── contact.njk             # Contact page
│       └── 404.njk                 # 404 error page
├── css/
│   └── main.css                    # Tailwind + custom utilities
├── js/
│   └── main.js                     # Progressive enhancement (code copy, etc.)
├── public/
│   ├── images/
│   │   └── og-default.png          # Default Open Graph image
│   ├── fonts/                      # Custom fonts (if any)
│   └── favicon.ico
├── .eleventy.js                    # 11ty configuration (ESM)
├── .gitignore
├── .nojekyll                       # Disable Jekyll on GitHub Pages
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md                       # Template documentation for users
└── LICENSE
```

### Architectural Boundaries

**Template Boundaries:**

| Boundary | Responsibility | Files |
|----------|---------------|-------|
| Layouts | Page-level structure, head/body wrapper | `_includes/layouts/*.njk` |
| Layout partials | Header, footer, navigation | `_includes/layout/*.njk` |
| Components | Reusable UI elements | `_includes/components/*.njk` |
| SEO partials | Meta tags, structured data | `_includes/seo/*.njk` |
| Content partials | Content display patterns | `_includes/content/*.njk` |

**Data Boundaries:**

| Data Source | Scope | Access Pattern |
|-------------|-------|----------------|
| `_data/*.yaml` | Global (all templates) | `{{ site.title }}`, `{{ profile.name }}` |
| Frontmatter | Page-specific | `{{ title }}`, `{{ date }}` |
| Collections | Content lists | `collections.blog`, `collections.projects` |

**Build Output Boundaries:**

| Source | Output |
|--------|--------|
| `content/blog/*.md` | `_site/blog/{slug}/index.html` |
| `content/projects/*.md` | `_site/projects/{slug}/index.html` |
| `content/pages/*.njk` | `_site/{slug}/index.html` |
| `css/main.css` | `_site/css/main.css` (purged) |
| `js/main.js` | `_site/js/main.js` (bundled) |
| `public/*` | `_site/*` (passthrough copy) |

### Requirements to Structure Mapping

**FR Category → Directory Mapping:**

| FR Category | Primary Location | Supporting Files |
|-------------|-----------------|------------------|
| Content Display (FR1-FR7) | `_includes/content/`, layouts | `post-list.njk`, `project-grid.njk` |
| Content Authoring (FR8-FR14) | `content/blog/`, `content/projects/` | Collection JSON configs |
| Navigation (FR15-FR20) | `_includes/layout/` | `header.njk`, `nav.njk`, `404.njk` |
| Code/Diagrams (FR21-FR23) | `_includes/components/` | `code-block.njk`, Mermaid plugin |
| Accessibility (FR24-FR28) | All layouts + CSS | `base.njk`, `main.css` |
| SEO (FR29-FR34) | `_includes/seo/` | All SEO partials |
| Template Usage (FR35-FR39) | Root config + README | `package.json`, `README.md` |
| Build/Deploy (FR40-FR43) | `.github/workflows/`, `.eleventy.js` | `deploy.yml` |

**Cross-Cutting Concerns → Location:**

| Concern | Files Affected |
|---------|---------------|
| Accessibility | `_includes/layouts/base.njk` (landmarks, skip link), `css/main.css` (focus, motion) |
| SEO | `_includes/seo/*.njk` (included in `base.njk`), `_data/site.yaml` |
| Design System | `tailwind.config.js`, `css/main.css`, all component templates |
| Build Pipeline | `.eleventy.js`, `package.json` scripts, `.github/workflows/deploy.yml` |

### Integration Points

**Template Include Hierarchy:**
```
base.njk
├── _includes/layout/skip-link.njk
├── _includes/seo/meta.njk
├── _includes/seo/open-graph.njk
├── _includes/seo/twitter-card.njk
├── _includes/seo/json-ld-*.njk (conditional)
├── _includes/layout/header.njk
│   └── _includes/layout/nav.njk
├── [Page Content - from child layout]
└── _includes/layout/footer.njk

post.njk (extends base.njk)
├── _includes/content/reading-progress.njk
├── _includes/components/tag.njk (loop)
├── [Markdown Content]
└── _includes/content/related-projects.njk
```

**Data Flow:**
```
_data/*.yaml ─────────────────────────────────────┐
                                                  │
content/blog/*.md ──→ collections.blog ───────────┼──→ Templates ──→ _site/
content/projects/*.md ──→ collections.projects ───┤
                                                  │
Frontmatter ──────────────────────────────────────┘
```

**Build Pipeline Integration:**
```
npm run build
│
├── 11ty reads _data/*.yaml (global data)
├── 11ty processes content/**/*.md (collections)
├── 11ty renders templates (Nunjucks)
│   ├── Mermaid plugin transforms code blocks → SVG
│   └── Syntax highlighting plugin → HTML
├── PostCSS/Tailwind processes css/main.css
│   └── Purges unused classes
├── ESBuild bundles js/main.js
│   └── Minifies output
└── Output to _site/
```

### File Organization Patterns

**Configuration Files:**

| File | Purpose |
|------|---------|
| `.eleventy.js` | 11ty config: plugins, collections, filters, passthrough |
| `tailwind.config.js` | Tailwind theme: brutalist tokens, content paths |
| `postcss.config.js` | PostCSS plugins: Tailwind, Autoprefixer |
| `package.json` | Dependencies, scripts, project metadata |

**Content Organization:**

| Pattern | Example |
|---------|---------|
| Blog posts | `content/blog/{slug}.md` |
| Projects | `content/projects/{slug}.md` |
| Static pages | `content/pages/{slug}.njk` |
| Collection config | `content/{type}/{type}.json` |

**Collection JSON Example:**
```json
// content/blog/blog.json
{
  "layout": "layouts/post.njk",
  "tags": "blog",
  "permalink": "/blog/{{ page.fileSlug }}/"
}
```

### Development Workflow Integration

**Development Commands:**
```bash
npm run dev      # 11ty --serve + Tailwind watch
npm run build    # Production build
npm run preview  # Preview production build locally
```

**Hot Reload Structure:**
- 11ty watches `content/`, `_includes/`, `_data/`
- Tailwind watches template files for class changes
- Browser-sync provides live reload

**Deployment Structure:**
```
Push to main
    │
    ▼
.github/workflows/deploy.yml
    │
    ├── npm ci
    ├── npm run build
    │       │
    │       └── Output: _site/
    │
    └── peaceiris/actions-gh-pages
            │
            └── Deploy _site/ to gh-pages branch
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are compatible and work together without conflicts:
- 11ty v3.0 with Nunjucks templating
- Tailwind CSS with PostCSS processing
- ESBuild bundling via 11ty plugin
- Mermaid CLI for build-time diagram rendering
- GitHub Pages deployment via peaceiris action

**Pattern Consistency:**
All implementation patterns align with technology choices:
- Naming conventions (kebab-case) applied consistently
- Template patterns follow 11ty/Nunjucks best practices
- CSS patterns leverage Tailwind utilities with custom extensions

**Structure Alignment:**
Project structure fully supports all architectural decisions:
- Clear separation of layouts, components, and SEO partials
- Data boundaries properly defined (_data/ vs frontmatter vs collections)
- Build output structure matches GitHub Pages requirements

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 43 functional requirements have architectural support:
- FR1-FR7 (Content Display): Covered by layouts and content partials
- FR8-FR14 (Content Authoring): Covered by markdown structure and frontmatter schema
- FR15-FR20 (Navigation): Covered by header, nav, and 404 templates
- FR21-FR23 (Code/Diagrams): Covered by code-block and Mermaid integration
- FR24-FR28 (Accessibility): Covered by landmark patterns and CSS utilities
- FR29-FR34 (SEO): Covered by SEO partials and structured data templates
- FR35-FR39 (Template Usage): Covered by README and clear project structure
- FR40-FR43 (Build/Deploy): Covered by 11ty config and GitHub Actions workflow

**Non-Functional Requirements Coverage:**
- Performance: Static HTML output, CSS purging, minimal JS ensures 100% Lighthouse
- Accessibility: ARIA patterns, focus management, reduced motion support
- Maintainability: Clear structure, documented patterns, minimal dependencies
- SEO: Comprehensive meta tags, structured data, sitemap generation

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical decisions documented with technology sources
- Starter template clearly identified with initialization commands
- Version information referenced from current documentation

**Structure Completeness:**
- Complete project tree with ~40 files/directories
- All component boundaries clearly defined
- Integration points fully mapped

**Pattern Completeness:**
- 8 mandatory enforcement rules for AI agents
- Comprehensive good/bad examples
- Anti-patterns documented to prevent conflicts

### Gap Analysis Results

**Critical Gaps:** None identified

**Minor Gaps (Non-blocking, addressed during implementation):**
- Specific 11ty plugin versions (use latest compatible)
- Mermaid CLI integration details (follow 11ty plugin docs)
- RSS feed configuration (included in base-blog starter)

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low complexity, SSG)
- [x] Technical constraints identified (GitHub Pages, no server-side)
- [x] Cross-cutting concerns mapped (A11y, SEO, Design System)

**✅ Architectural Decisions**
- [x] Critical decisions documented with sources
- [x] Technology stack fully specified (11ty + Nunjucks + Tailwind)
- [x] Integration patterns defined (template hierarchy, data flow)
- [x] Performance considerations addressed (static output, purged CSS)

**✅ Implementation Patterns**
- [x] Naming conventions established (kebab-case files, camelCase frontmatter)
- [x] Structure patterns defined (grouped components, flat layouts)
- [x] Communication patterns specified (collections, includes, data access)
- [x] Process patterns documented (build pipeline, deployment)

**✅ Project Structure**
- [x] Complete directory structure defined (~40 files)
- [x] Component boundaries established (layouts, components, SEO, content)
- [x] Integration points mapped (template hierarchy, data flow)
- [x] Requirements to structure mapping complete (all FRs mapped)

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** High - All validations passed, no critical gaps

**Key Strengths:**
- Clean migration path from existing React SPA
- Brutalist design system preserved exactly
- Template distribution goal supported by clear structure
- Zero-JS core aligns with performance requirements
- Comprehensive accessibility patterns baked in

**Areas for Future Enhancement:**
- Image optimization pipeline (if images added to content)
- Advanced caching strategies (post-MVP)
- Sanity.io CMS integration (Phase 3)

### Implementation Handoff

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions
5. Validate against the 8 enforcement rules before completing any work

**First Implementation Priority:**
```bash
# Initialize project from official starter
git clone https://github.com/11ty/eleventy-base-blog.git jaysinghdev
cd jaysinghdev
npm install

# Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Verify setup
npm run build
```
