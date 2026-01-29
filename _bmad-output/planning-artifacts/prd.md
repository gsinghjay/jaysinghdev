---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain-skipped
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - docs/index.md
  - docs/project-overview.md
  - docs/architecture.md
  - docs/component-inventory.md
  - docs/development-guide.md
  - docs/source-tree-analysis.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 6
classification:
  projectType: static-website-ssg
  domain: general
  complexity: low
  projectContext: brownfield
---

# Product Requirements Document - jaysinghdev

**Author:** Jay
**Date:** 2026-01-28

## Executive Summary

**What:** Migrate jaysinghdev portfolio from React SPA to 11ty + Nunjucks static site generator, creating both a personal portfolio and a reusable template for other developers.

**Why:** Simpler content management (commit markdown → live), better performance (static HTML), easier hosting (GitHub Pages), and accessibility-first architecture.

**Key Targets:**
- 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- WCAG 2.1 AA compliance
- Template users can deploy in under 1 hour
- Content updates live in under 2 minutes

**Scope:** Full migration of existing content (5 blog posts, 8 projects, profile/resume/skills) with brutalist design preserved. Sanity.io CMS integration deferred to future phase.

**Users:** Portfolio visitors (recruiters, developers), template users (developers forking for their own portfolio), content authors (Jay and future template users).

## Success Criteria

### User Success

**For Portfolio Visitors (recruiters, potential clients):**
- Site loads fast, feels premium, represents you as a senior engineer
- Clear path to contact/hire you
- Blog posts demonstrate technical depth
- Projects showcase real impact
- Fully accessible to users with disabilities - works with screen readers, keyboard-only navigation, respects motion preferences

**For Template Users (developers who fork this):**
- Can clone, understand structure, and deploy within an hour
- Customization points are obvious (colors, content, config)
- No "what does this do?" moments in the codebase
- Markdown-first workflow feels natural
- Accessibility baked in by default - they don't have to think about it

### Business Success

- Recruiters/opportunities come inbound from the portfolio
- Template gains traction (GitHub stars, forks, community use)
- Content updates take minutes, not hours - just commit markdown

### Technical Success

- **100% Lighthouse scores** - Performance, Accessibility, Best Practices, SEO
- **WCAG 2.1 AA compliance minimum** (aiming for AAA where practical)
- Keyboard navigation works everywhere
- Screen reader tested (VoiceOver, NVDA)
- Reduced motion respected (`prefers-reduced-motion`)
- Sufficient color contrast (brutalist design helps here - bold borders, high contrast)
- GitHub Pages deployment works out of the box
- Build times stay fast (<30 seconds)
- Zero JavaScript required for core functionality (progressive enhancement only)

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| WCAG Compliance | 2.1 AA (AAA stretch) |
| Time to deploy (new user) | < 1 hour |
| Content update cycle | Commit → Live in < 2 min |

## Project Scope & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP - the minimum that delivers the complete user experience for all four user types. Not a feature-stripped demo, but a fully-functional portfolio that happens to also be a template.

**Resource Requirements:** Solo developer. No external dependencies or third-party integrations required for MVP.

### Phase 1: MVP (Must Ship)

**Core User Journeys Supported:**
- Sarah (Recruiter): Fast-loading portfolio with clear project impact and contact path
- Marcus (Developer): SEO-discoverable blog with code blocks and diagrams
- Priya (Template User): Clone, customize, deploy workflow
- Jay (Content Author): Markdown commit → live site workflow

**Must-Have Capabilities:**
- All existing content migrated (5 blog posts, 8 projects, profile/resume/skills)
- 11ty + Nunjucks architecture
- Brutalist design system ported exactly
- GitHub Pages deployment via GitHub Actions
- 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- WCAG 2.1 AA compliance
- Full SEO stack (meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap)
- Semantic HTML throughout
- Code copy buttons on code blocks
- Mermaid diagram rendering
- Keyboard navigation
- Screen reader compatibility
- Basic README for template users

### Phase 2: Growth (Post-MVP)

- Template customization guide (detailed documentation)
- Multiple color theme options
- GitHub template repository setup
- Example/starter content for new users
- Accessibility statement page

### Phase 3: Vision (Future)

- Sanity.io integration (optional CMS layer for all content)
- One-click deploy buttons (Netlify, Vercel)
- Theme variations/marketplace
- WCAG 2.1 AAA compliance

### Risk Mitigation Strategy

| Risk Type | Risk | Mitigation |
|-----------|------|------------|
| **Technical** | Mermaid diagrams in SSG | Use 11ty plugin for build-time rendering; avoid client-side JS dependency |
| **Technical** | Achieving 100% Lighthouse | SSG inherently performant; optimize images/fonts at build time; no render-blocking resources |
| **Technical** | WCAG AA compliance | Build accessibility into templates from start; use automated testing (axe-core) in CI |
| **Market** | Template adoption | Not a risk for MVP - portfolio works regardless of template popularity |
| **Resource** | Solo developer | Scope is right-sized; no external dependencies; phased approach allows incremental delivery |

## User Journeys

### Journey 1: Sarah the Senior Recruiter

**Situation:** Sarah is a technical recruiter at a Series B startup. She's got 47 open tabs of developer portfolios and LinkedIn profiles. Her hiring manager wants "someone who actually ships" - not just talks about it.

**Opening Scene:** Sarah finds Jay's portfolio through a LinkedIn link. She's skeptical - most developer sites are either broken, slow, or all sizzle. She's giving this 10 seconds.

**Rising Action:** The page loads instantly. No spinner. No layout shift. She scans the projects - real work, not tutorial clones. She clicks into the authentication gateway project. There's a clear problem statement, a solution, and measurable impact. She thinks: "This person can explain what they built and why it mattered."

**Climax:** She finds the blog. A post on CI/CD best practices - technical depth, clear writing. This isn't someone who just codes. This is someone who thinks.

**Resolution:** Sarah bookmarks the page, copies the URL into her candidate tracking sheet, and moves Jay to the "reach out" pile. Total time on site: 3 minutes. Decision made.

**Journey reveals:** Fast load times, clear project impact statements, visible contact path, professional presentation.

---

### Journey 2: Marcus the Curious Developer

**Situation:** Marcus is a mid-level developer who stumbled on Jay's blog post about Docker observability through a Google search. He's debugging a similar problem at work.

**Opening Scene:** Marcus lands on the blog post. He's looking for the code snippet that solves his problem - not a 20-minute read.

**Rising Action:** The post has clear headings, a table of contents, and code blocks he can copy. A Mermaid diagram shows the architecture visually. He finds the relevant section in 30 seconds.

**Climax:** The code block has a copy button. He grabs the snippet, drops it into his terminal. It works.

**Resolution:** Marcus bookmarks the blog for later. He notices the projects section and thinks "I should check this out when I have time." He's now a repeat visitor.

**Journey reveals:** SEO-friendly blog, code copy buttons, clear navigation, Mermaid diagrams, scannable structure.

---

### Journey 3: Priya the Template User

**Situation:** Priya is a bootcamp grad building her first portfolio. She found Jay's template on GitHub while searching for "eleventy portfolio template." She knows HTML/CSS but JavaScript frameworks intimidate her.

**Opening Scene:** Priya reads the README. She's looking for "can I actually do this?" signals. Clear install steps. No complex toolchain.

**Rising Action:** She clones the repo, runs `npm install && npm start`. It works first try. She opens the content folder - markdown files with clear frontmatter. She changes her name in the config. Refreshes. Her name appears.

**Climax:** She writes her first blog post in markdown, saves, and sees it appear on the site. No build errors. No cryptic messages. It just works.

**Resolution:** Priya deploys to GitHub Pages using the guide in the README. Her portfolio is live in under an hour. She tweets about it. She's no longer "that bootcamp grad without a portfolio."

**Journey reveals:** Clear README, simple npm scripts, obvious content structure, markdown-first workflow, GitHub Pages deployment guide.

---

### Journey 4: Jay the Content Author

**Situation:** It's Tuesday night. Jay just solved an interesting problem at work and wants to write a quick blog post about it while it's fresh.

**Opening Scene:** Jay opens VS Code, navigates to `content/blog/`, creates a new markdown file.

**Rising Action:** He copies the frontmatter from an existing post, updates the metadata. He writes the post in markdown - headers, code blocks, a Mermaid diagram for the architecture.

**Climax:** He commits and pushes. GitHub Actions builds. Two minutes later, it's live.

**Resolution:** Jay closes the laptop. No context switching to a CMS. No deploy commands. Just write, commit, done. The content is version controlled, backed up, and live.

**Journey reveals:** Markdown content workflow, minimal frontmatter, fast build times, Git-based deployment, no CMS required for basic updates.

---

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---------|--------------------------|
| Sarah (Recruiter) | Fast page loads, clear project impact, visible contact path, professional presentation |
| Marcus (Developer) | SEO-friendly blog, code copy buttons, clear navigation, Mermaid diagrams, scannable structure |
| Priya (Template User) | Clear README, simple npm scripts, obvious content structure, GitHub Pages deployment docs |
| Jay (Content Author) | Markdown-first content, simple frontmatter, fast builds, Git-based workflow |

## Technical Architecture

### Technology Stack

| Aspect | Decision |
|--------|----------|
| **Generator** | 11ty (Eleventy) |
| **Templating** | Nunjucks |
| **Content Format** | Markdown with YAML frontmatter |
| **Styling** | Tailwind CSS (or vanilla CSS with brutalist tokens) |
| **JavaScript** | Progressive enhancement only - core functionality works without JS |
| **Build Output** | Static HTML/CSS/JS |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |

### Browser Support

| Browser | Versions Supported |
|---------|-------------------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| IE11 | Not supported |

No polyfills for legacy browsers. Modern CSS features (grid, custom properties, clamp) are fair game.

### SEO Implementation

**Semantic HTML:**
- Proper heading hierarchy (single h1, logical h2-h6 structure)
- Semantic elements: `<article>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<header>`, `<footer>`
- Meaningful link text (no "click here")

**Meta Tags:**
- Title tags with consistent format (`Page Name | Jay Singh`)
- Meta descriptions for all pages
- Canonical URLs
- Robots meta (index, follow)

**Open Graph:**
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Optimized OG images (1200x630)

**Twitter Cards:**
- `twitter:card` (summary_large_image)
- `twitter:title`, `twitter:description`, `twitter:image`

**Structured Data (JSON-LD):**
- `Person` schema for profile/about
- `BlogPosting` schema for blog posts
- `CreativeWork` or `SoftwareSourceCode` for projects
- `BreadcrumbList` for navigation context

**Technical SEO:**
- XML sitemap generation (automated via 11ty plugin)
- robots.txt
- Clean URL structure (no .html extensions)
- Fast page loads (static = fast)

### Build & Deployment Pipeline

**Build Pipeline:**
- Markdown → 11ty → HTML
- Tailwind CSS purging for minimal CSS bundle
- Image optimization at build time (if images added)
- Minification of HTML/CSS/JS

**Content Authoring:**
- Markdown files in `content/` directory
- YAML frontmatter for metadata
- Simple, flat structure
- No database, no API calls at runtime

**Deployment:**
- Push to main → GitHub Actions → Build → Deploy to gh-pages branch
- No environment variables needed for static build
- Preview builds for PRs (optional, future)

### Sanity.io Integration (Future)

When Sanity.io is added:
- Content fetched from Sanity API at build time
- Sanity webhook triggers GitHub Actions rebuild
- Sanity API token stored in GitHub Secrets
- Static output remains the same - visitors never hit Sanity directly

## Functional Requirements

### Content Display

- **FR1:** Visitors can view a list of all blog posts with title, date, excerpt, and tags
- **FR2:** Visitors can read individual blog posts with full content, code blocks, and diagrams
- **FR3:** Visitors can view a list of all projects with title, description, and technologies
- **FR4:** Visitors can view individual project details including challenge, solution, and impact
- **FR5:** Visitors can view a profile/about page with bio and contact information
- **FR6:** Visitors can view a resume page with experience, education, skills, and certifications
- **FR7:** Visitors can view a contact page with contact information

### Content Authoring

- **FR8:** Authors can create blog posts by adding markdown files with YAML frontmatter
- **FR9:** Authors can create projects by adding markdown files with YAML frontmatter
- **FR10:** Authors can update profile information by editing YAML configuration files
- **FR11:** Authors can update resume data by editing YAML configuration files
- **FR12:** Authors can include code blocks with syntax highlighting in blog posts
- **FR13:** Authors can include Mermaid diagrams in blog posts and project pages
- **FR14:** Authors can specify related projects for blog posts

### Navigation & Structure

- **FR15:** Visitors can navigate between all pages using a persistent header navigation
- **FR16:** Visitors can navigate the site using only keyboard input
- **FR17:** Visitors can return to the home page from any page
- **FR18:** Visitors can view a 404 page when accessing non-existent URLs
- **FR19:** Search engines can discover all pages via XML sitemap
- **FR20:** Search engines can read structured data (JSON-LD) for person, blog posts, and projects

### Code & Diagram Interaction

- **FR21:** Visitors can copy code blocks to clipboard with a single click
- **FR22:** Visitors can view Mermaid diagrams rendered as SVG graphics
- **FR23:** Visitors can see syntax highlighting appropriate to the code language

### Accessibility

- **FR24:** Screen reader users can navigate the site with proper heading hierarchy and landmarks
- **FR25:** Visitors with reduced motion preferences see no animations or transitions
- **FR26:** Visitors can perceive all content with sufficient color contrast
- **FR27:** All interactive elements are focusable and have visible focus indicators
- **FR28:** All images have descriptive alt text

### SEO & Social Sharing

- **FR29:** Each page has unique meta title and description
- **FR30:** Each page has Open Graph tags for social media sharing
- **FR31:** Each page has Twitter Card tags for Twitter sharing
- **FR32:** Blog posts include BlogPosting structured data
- **FR33:** The site includes a robots.txt file
- **FR34:** URLs are clean (no .html extensions)

### Template Usage

- **FR35:** Template users can clone the repository and run locally with standard npm commands
- **FR36:** Template users can customize site metadata via configuration files
- **FR37:** Template users can replace content by editing markdown files
- **FR38:** Template users can deploy to GitHub Pages using provided GitHub Actions workflow
- **FR39:** Template users can understand the project structure via README documentation

### Build & Deployment

- **FR40:** The build process generates static HTML, CSS, and JS files
- **FR41:** The build process generates an XML sitemap automatically
- **FR42:** Pushing to main branch triggers automatic deployment to GitHub Pages
- **FR43:** The build completes in under 30 seconds

## Non-Functional Requirements

### Performance

| Metric | Requirement |
|--------|-------------|
| Lighthouse Performance Score | 100 |
| First Contentful Paint (FCP) | < 1.0s |
| Largest Contentful Paint (LCP) | < 1.5s |
| Total Blocking Time (TBT) | < 50ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 1.5s |
| Total Page Weight | < 500KB (excluding images) |
| JavaScript Bundle | < 50KB (minified, gzipped) |
| Build Time | < 30 seconds |

### Accessibility

| Metric | Requirement |
|--------|-------------|
| Lighthouse Accessibility Score | 100 |
| WCAG Compliance Level | 2.1 AA minimum |
| Color Contrast Ratio | Minimum 4.5:1 (normal text), 3:1 (large text) |
| Focus Indicators | Visible on all interactive elements |
| Keyboard Navigation | Full site navigable without mouse |
| Screen Reader Compatibility | Tested with VoiceOver and NVDA |
| Reduced Motion | Respects `prefers-reduced-motion` |
| Heading Structure | Single h1, logical h2-h6 hierarchy per page |

### Maintainability

| Attribute | Requirement |
|-----------|-------------|
| Code Documentation | README covers setup, structure, and customization |
| Content Structure | Self-explanatory directory layout |
| Configuration | All customization via clearly-named config files |
| Dependencies | Minimal; no unnecessary packages |
| Template Clarity | Nunjucks templates readable without deep 11ty knowledge |
| CSS Organization | Consistent naming conventions; brutalist tokens documented |

### SEO

| Metric | Requirement |
|--------|-------------|
| Lighthouse SEO Score | 100 |
| Lighthouse Best Practices Score | 100 |
| Mobile Friendliness | Fully responsive, passes Google Mobile-Friendly test |
| Indexability | All content pages indexable by search engines |
