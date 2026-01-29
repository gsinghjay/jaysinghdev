---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: '2026-01-29'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# jaysinghdev - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for jaysinghdev, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Content Display (FR1-FR7):**
- FR1: Visitors can view a list of all blog posts with title, date, excerpt, and tags
- FR2: Visitors can read individual blog posts with full content, code blocks, and diagrams
- FR3: Visitors can view a list of all projects with title, description, and technologies
- FR4: Visitors can view individual project details including challenge, solution, and impact
- FR5: Visitors can view a profile/about page with bio and contact information
- FR6: Visitors can view a resume page with experience, education, skills, and certifications
- FR7: Visitors can view a contact page with contact information

**Content Authoring (FR8-FR14):**
- FR8: Authors can create blog posts by adding markdown files with YAML frontmatter
- FR9: Authors can create projects by adding markdown files with YAML frontmatter
- FR10: Authors can update profile information by editing YAML configuration files
- FR11: Authors can update resume data by editing YAML configuration files
- FR12: Authors can include code blocks with syntax highlighting in blog posts
- FR13: Authors can include Mermaid diagrams in blog posts and project pages
- FR14: Authors can specify related projects for blog posts

**Navigation & Structure (FR15-FR20):**
- FR15: Visitors can navigate between all pages using a persistent header navigation
- FR16: Visitors can navigate the site using only keyboard input
- FR17: Visitors can return to the home page from any page
- FR18: Visitors can view a 404 page when accessing non-existent URLs
- FR19: Search engines can discover all pages via XML sitemap
- FR20: Search engines can read structured data (JSON-LD) for person, blog posts, and projects

**Code & Diagram Interaction (FR21-FR23):**
- FR21: Visitors can copy code blocks to clipboard with a single click
- FR22: Visitors can view Mermaid diagrams rendered as SVG graphics
- FR23: Visitors can see syntax highlighting appropriate to the code language

**Accessibility (FR24-FR28):**
- FR24: Screen reader users can navigate the site with proper heading hierarchy and landmarks
- FR25: Visitors with reduced motion preferences see no animations or transitions
- FR26: Visitors can perceive all content with sufficient color contrast
- FR27: All interactive elements are focusable and have visible focus indicators
- FR28: All images have descriptive alt text

**SEO & Social Sharing (FR29-FR34):**
- FR29: Each page has unique meta title and description
- FR30: Each page has Open Graph tags for social media sharing
- FR31: Each page has Twitter Card tags for Twitter sharing
- FR32: Blog posts include BlogPosting structured data
- FR33: The site includes a robots.txt file
- FR34: URLs are clean (no .html extensions)

**Template Usage (FR35-FR39):**
- FR35: Template users can clone the repository and run locally with standard npm commands
- FR36: Template users can customize site metadata via configuration files
- FR37: Template users can replace content by editing markdown files
- FR38: Template users can deploy to GitHub Pages using provided GitHub Actions workflow
- FR39: Template users can understand the project structure via README documentation

**Build & Deployment (FR40-FR43):**
- FR40: The build process generates static HTML, CSS, and JS files
- FR41: The build process generates an XML sitemap automatically
- FR42: Pushing to main branch triggers automatic deployment to GitHub Pages
- FR43: The build completes in under 30 seconds

### NonFunctional Requirements

**Performance:**
- NFR1: Lighthouse Performance Score 100
- NFR2: First Contentful Paint (FCP) < 1.0s
- NFR3: Largest Contentful Paint (LCP) < 1.5s
- NFR4: Total Blocking Time (TBT) < 50ms
- NFR5: Cumulative Layout Shift (CLS) < 0.1
- NFR6: Time to Interactive (TTI) < 1.5s
- NFR7: Total Page Weight < 500KB (excluding images)
- NFR8: JavaScript Bundle < 50KB (minified, gzipped)
- NFR9: Build Time < 30 seconds

**Accessibility:**
- NFR10: Lighthouse Accessibility Score 100
- NFR11: WCAG Compliance Level 2.1 AA minimum
- NFR12: Color Contrast Ratio Minimum 4.5:1 (normal text), 3:1 (large text)
- NFR13: Focus Indicators visible on all interactive elements
- NFR14: Keyboard Navigation - Full site navigable without mouse
- NFR15: Screen Reader Compatibility - Tested with VoiceOver and NVDA
- NFR16: Reduced Motion - Respects prefers-reduced-motion
- NFR17: Heading Structure - Single h1, logical h2-h6 hierarchy per page

**Maintainability:**
- NFR18: Code Documentation - README covers setup, structure, and customization
- NFR19: Content Structure - Self-explanatory directory layout
- NFR20: Configuration - All customization via clearly-named config files
- NFR21: Dependencies - Minimal; no unnecessary packages
- NFR22: Template Clarity - Nunjucks templates readable without deep 11ty knowledge
- NFR23: CSS Organization - Consistent naming conventions; brutalist tokens documented

**SEO:**
- NFR24: Lighthouse SEO Score 100
- NFR25: Lighthouse Best Practices Score 100
- NFR26: Mobile Friendliness - Fully responsive, passes Google Mobile-Friendly test
- NFR27: Indexability - All content pages indexable by search engines

### Additional Requirements

**From Architecture - Starter Template:**
- Selected starter: `eleventy-base-blog` (official 11ty v3.0 starter)
- Initialization requires cloning starter and adding Tailwind CSS
- This MUST be Epic 1, Story 1 (project foundation)

**From Architecture - Migration Constraints:**
- Must preserve brutalist design system exactly (hard shadows, no radius, bold borders, cream/lime/yellow/pink palette)
- Must support existing content structure (5 blog posts, 8 projects, profile/resume/skills YAML)
- GitHub Pages hosting (no server-side processing)
- No external runtime dependencies for core functionality

**From Architecture - Build Pipeline:**
- Mermaid build-time rendering via `@mermaid-js/mermaid-cli`
- ESBuild bundling via `@11ty/eleventy-plugin-bundle`
- PostCSS/Tailwind CSS purging for minimal CSS bundle
- GitHub Actions deployment workflow (peaceiris/actions-gh-pages)

**From Architecture - Implementation Patterns:**
- All filenames use kebab-case
- Frontmatter fields use camelCase
- All templates must include required ARIA landmarks
- All internal paths use `| url` filter
- CSS must respect `prefers-reduced-motion`

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 3 | Blog post listing |
| FR2 | Epic 3 | Blog post detail with code/diagrams |
| FR3 | Epic 4 | Project listing |
| FR4 | Epic 4 | Project detail |
| FR5 | Epic 2 | About/profile page |
| FR6 | Epic 5 | Resume page |
| FR7 | Epic 2 | Contact page |
| FR8 | Epic 3 | Blog markdown authoring |
| FR9 | Epic 4 | Project markdown authoring |
| FR10 | Epic 2 | Profile YAML configuration |
| FR11 | Epic 5 | Resume YAML configuration |
| FR12 | Epic 3 | Code syntax highlighting |
| FR13 | Epic 3 | Mermaid diagrams |
| FR14 | Epic 3 | Related projects linking |
| FR15 | Epic 2 | Header navigation |
| FR16 | Epic 2 | Keyboard navigation |
| FR17 | Epic 2 | Home link |
| FR18 | Epic 2 | 404 page |
| FR19 | Epic 6 | XML sitemap |
| FR20 | Epic 6 | JSON-LD structured data |
| FR21 | Epic 3 | Code copy buttons |
| FR22 | Epic 3 | Mermaid SVG rendering |
| FR23 | Epic 3 | Syntax highlighting |
| FR24 | Epic 7 | Screen reader navigation |
| FR25 | Epic 7 | Reduced motion support |
| FR26 | Epic 7 | Color contrast |
| FR27 | Epic 7 | Focus indicators |
| FR28 | Epic 7 | Alt text |
| FR29 | Epic 6 | Meta title/description |
| FR30 | Epic 6 | Open Graph tags |
| FR31 | Epic 6 | Twitter Card tags |
| FR32 | Epic 6 | BlogPosting schema |
| FR33 | Epic 6 | robots.txt |
| FR34 | Epic 6 | Clean URLs |
| FR35 | Epic 1 | Clone and run locally |
| FR36 | Epic 7 | Configuration documentation |
| FR37 | Epic 7 | Content editing documentation |
| FR38 | Epic 1 | GitHub Pages deployment |
| FR39 | Epic 7 | README documentation |
| FR40 | Epic 1 | Static file generation |
| FR41 | Epic 6 | Sitemap generation |
| FR42 | Epic 1 | Auto-deployment on push |
| FR43 | Epic 1 | Build time < 30s |

## Epic List

### Epic 1: Project Foundation
**Goal:** Template users can clone, install, run, and deploy a working (empty) site to GitHub Pages.

- Initialize from `eleventy-base-blog` starter (per Architecture)
- Add Tailwind CSS with brutalist design tokens
- Create base layout with accessibility landmarks
- Set up GitHub Actions deployment workflow

**FRs covered:** FR35, FR38, FR40, FR42, FR43

---

### Epic 2: Site Shell & Navigation
**Goal:** Visitors can navigate between all pages with full keyboard accessibility.

- Header with persistent navigation
- Footer
- Home page
- About/Profile page (with migrated profile data)
- Contact page
- 404 error page

**FRs covered:** FR5, FR7, FR10, FR15, FR16, FR17, FR18

---

### Epic 3: Blog System
**Goal:** Visitors can read blog posts with code examples, copy code snippets, and view architecture diagrams.

- Blog listing page
- Blog post detail page
- Code syntax highlighting
- Code copy buttons (progressive enhancement)
- Mermaid diagram rendering (build-time SVG)
- Related projects linking
- Migrate 5 existing blog posts

**FRs covered:** FR1, FR2, FR8, FR12, FR13, FR14, FR21, FR22, FR23

---

### Epic 4: Projects Portfolio
**Goal:** Visitors can explore projects, understand their impact, and access live demos/source code.

- Projects listing page
- Project detail page with challenge/solution/impact
- Technology tags
- Project links (live URL, GitHub)
- Migrate 8 existing projects

**FRs covered:** FR3, FR4, FR9

---

### Epic 5: Resume & Professional Profile
**Goal:** Recruiters can evaluate professional qualifications, experience, and skills.

- Resume page with experience, education, certifications
- Skills display
- YAML-driven content (resume.yaml, skills.yaml)

**FRs covered:** FR6, FR11

---

### Epic 6: SEO & Discoverability
**Goal:** Content is discoverable by search engines and shareable on social media with rich previews.

- Meta tags (title, description, canonical)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (Person, BlogPosting, CreativeWork)
- XML sitemap generation
- robots.txt
- Clean URLs (no .html extensions)

**FRs covered:** FR19, FR20, FR29, FR30, FR31, FR32, FR33, FR34, FR41

---

### Epic 7: Accessibility Verification & Template Documentation
**Goal:** All users (including those with disabilities) can use the site; template users can understand and customize it.

- Accessibility audit (axe-core, screen reader testing)
- Focus indicators verification
- Color contrast verification
- Reduced motion support
- Alt text verification
- README documentation
- Configuration/customization guide

**FRs covered:** FR24, FR25, FR26, FR27, FR28, FR36, FR37, FR39

---

## Epic 1: Project Foundation

**Goal:** Template users can clone, install, run, and deploy a working (empty) site to GitHub Pages.

### Story 1.1: Initialize Project from Eleventy Base Blog Starter

As a **template user**,
I want to clone the repository and run it locally with standard npm commands,
So that I can start customizing my portfolio without complex setup.

**Acceptance Criteria:**

**Given** a developer has cloned the repository
**When** they run `npm install && npm run dev`
**Then** the site builds successfully and serves on localhost
**And** the build completes in under 30 seconds

**Given** a developer runs `npm run build`
**When** the build completes
**Then** static HTML/CSS/JS files are generated in `_site/` directory
**And** no build errors or warnings appear

---

### Story 1.2: Add Tailwind CSS with Brutalist Design Tokens

As a **template user**,
I want the brutalist design system pre-configured,
So that I can use consistent styling without manual setup.

**Acceptance Criteria:**

**Given** the project has Tailwind CSS installed
**When** I use brutalist utility classes (e.g., `shadow-brutal`, `bg-cream`)
**Then** the correct brutalist styles are applied
**And** CSS is purged to include only used classes in production build

**Given** the design token CSS variables are defined
**When** I inspect the compiled CSS
**Then** I see `--shadow-brutal-sm`, `--shadow-brutal`, `--shadow-brutal-md`, `--shadow-brutal-lg` defined
**And** the brutalist color palette (cream, lime, yellow, pink) is available

---

### Story 1.3: Create Base Layout with Accessibility Landmarks

As a **screen reader user**,
I want proper ARIA landmarks on every page,
So that I can navigate the site structure efficiently.

**Acceptance Criteria:**

**Given** any page on the site
**When** a screen reader scans the page
**Then** it identifies: banner (header), navigation, main content, and contentinfo (footer) landmarks
**And** a skip link is the first focusable element

**Given** the skip link is focused
**When** the user activates it
**Then** focus moves to the main content area
**And** the skip link is visually hidden until focused

**Given** the base layout template exists
**When** other layouts extend it
**Then** they inherit the accessibility landmarks automatically
**And** the HTML document includes proper `lang` attribute

---

### Story 1.4: Configure GitHub Actions Deployment

As a **template user**,
I want automatic deployment to GitHub Pages on push to main,
So that my content updates go live without manual deployment steps.

**Acceptance Criteria:**

**Given** a commit is pushed to the main branch
**When** GitHub Actions workflow runs
**Then** the site builds and deploys to GitHub Pages
**And** the deployment completes successfully

**Given** the repository is configured for GitHub Pages
**When** I visit the GitHub Pages URL
**Then** the site loads correctly
**And** all assets (CSS, JS) load without 404 errors

**Given** the `.nojekyll` file exists in the output
**When** GitHub Pages serves the site
**Then** files starting with underscores are served correctly

---

## Epic 2: Site Shell & Navigation

**Goal:** Visitors can navigate between all pages with full keyboard accessibility.

### Story 2.1: Create Header with Navigation

As a **visitor**,
I want a persistent header with navigation links,
So that I can easily move between sections of the site.

**Acceptance Criteria:**

**Given** any page on the site
**When** I view the header
**Then** I see navigation links to: Home, Blog, Projects, Resume, About, Contact
**And** the header is visible at the top of every page

**Given** I am using keyboard navigation
**When** I tab through the header
**Then** each navigation link receives visible focus
**And** I can activate links with Enter key

**Given** the current page matches a nav link
**When** I view the navigation
**Then** the current page link is visually distinguished (aria-current="page")

---

### Story 2.2: Create Footer

As a **visitor**,
I want a footer with contact/social links,
So that I can find additional ways to connect.

**Acceptance Criteria:**

**Given** any page on the site
**When** I scroll to the bottom
**Then** I see a footer with social links and copyright
**And** the footer uses the contentinfo landmark role

**Given** social links are present
**When** I click a social link
**Then** it opens in a new tab with proper `rel="noopener"` attribute
**And** the link has accessible text describing the destination

---

### Story 2.3: Create Home Page

As a **visitor**,
I want a compelling home page,
So that I get an immediate sense of who Jay is and what he does.

**Acceptance Criteria:**

**Given** I visit the root URL
**When** the page loads
**Then** I see a hero section with name, role, and brief intro
**And** I see featured projects and recent blog posts
**And** there is a clear call-to-action to explore further

**Given** the home page displays featured content
**When** I click on a featured project or blog post
**Then** I am taken to the detail page for that item

---

### Story 2.4: Create About/Profile Page

As a **recruiter**,
I want to read about Jay's background and expertise,
So that I can evaluate cultural and professional fit.

**Acceptance Criteria:**

**Given** I navigate to the About page
**When** the page loads
**Then** I see a bio with professional background
**And** I see contact information
**And** content is driven by `_data/profile.yaml`

**Given** I want to contact Jay
**When** I look at the About page
**Then** I find clear contact methods (email, social links)

---

### Story 2.5: Create Contact Page

As a **visitor**,
I want a dedicated contact page,
So that I can easily find how to reach Jay.

**Acceptance Criteria:**

**Given** I navigate to the Contact page
**When** the page loads
**Then** I see email address and social links
**And** contact methods are clearly presented

**Given** I click an email link
**When** the link activates
**Then** my default email client opens with Jay's address pre-filled

---

### Story 2.6: Create 404 Error Page

As a **visitor**,
I want a helpful 404 page when I hit a broken link,
So that I can find my way back to valid content.

**Acceptance Criteria:**

**Given** I navigate to a non-existent URL
**When** the server responds
**Then** I see a custom 404 page (not browser default)
**And** the page includes navigation back to home and main sections

**Given** the 404 page loads
**When** I view the page
**Then** it maintains the site's design and navigation
**And** it clearly explains the page wasn't found

---

## Epic 3: Blog System

**Goal:** Visitors can read blog posts with code examples, copy code snippets, and view architecture diagrams.

### Story 3.1: Create Blog Listing Page

As a **developer visitor**,
I want to see all blog posts listed with title, date, and excerpt,
So that I can find articles relevant to my interests.

**Acceptance Criteria:**

**Given** I navigate to the Blog page
**When** the page loads
**Then** I see all published blog posts in reverse chronological order
**And** each post shows title, date, excerpt, and tags

**Given** the blog listing displays posts
**When** I click on a post title or card
**Then** I am taken to the full blog post

**Given** posts have tags
**When** I view the listing
**Then** tags are displayed and visually styled as chips/badges

---

### Story 3.2: Create Blog Post Detail Page

As a **developer visitor**,
I want to read full blog posts with proper formatting,
So that I can learn from the technical content.

**Acceptance Criteria:**

**Given** I navigate to a blog post URL
**When** the page loads
**Then** I see the full post content with title, date, and tags
**And** the content uses proper heading hierarchy (h1 for title, h2+ for sections)

**Given** the blog post has markdown content
**When** it renders
**Then** paragraphs, lists, blockquotes, and links are properly styled
**And** the brutalist design system is applied

**Given** I am reading a long post
**When** I view the page
**Then** the content width is comfortable for reading (not too wide)

---

### Story 3.3: Add Code Syntax Highlighting

As a **developer visitor**,
I want code blocks with syntax highlighting,
So that I can easily read and understand code examples.

**Acceptance Criteria:**

**Given** a blog post contains fenced code blocks with language specified
**When** the page renders
**Then** code is syntax highlighted appropriate to the language
**And** the highlighting uses colors compatible with the brutalist design

**Given** a code block is displayed
**When** I view it
**Then** it has a distinct background and border (brutalist style)
**And** code uses a monospace font

**Given** code blocks may be long
**When** they exceed the container width
**Then** horizontal scrolling is enabled (no content cutoff)

---

### Story 3.4: Add Code Copy Buttons

As a **developer visitor**,
I want to copy code blocks with one click,
So that I can quickly use examples in my own work.

**Acceptance Criteria:**

**Given** a code block is displayed
**When** I view/hover on it
**Then** a copy button is visible

**Given** I click the copy button
**When** the action completes
**Then** the code content is copied to my clipboard
**And** visual feedback confirms the copy succeeded

**Given** JavaScript is disabled
**When** I view code blocks
**Then** the code is still readable (graceful degradation)
**And** copy buttons are hidden (no broken UI)

---

### Story 3.5: Add Mermaid Diagram Rendering

As a **developer visitor**,
I want architecture diagrams rendered inline,
So that I can visualize system designs without leaving the page.

**Acceptance Criteria:**

**Given** a blog post contains a mermaid code block
**When** the site builds
**Then** the diagram is rendered as inline SVG at build time
**And** no client-side JavaScript is required for rendering

**Given** a Mermaid diagram is rendered
**When** I view it
**Then** the diagram is readable and properly sized
**And** it uses accessible colors with sufficient contrast

**Given** a diagram cannot render (syntax error)
**When** the build runs
**Then** the original code block is preserved as fallback
**And** build does not fail

---

### Story 3.6: Add Related Projects to Blog Posts

As a **visitor**,
I want to see related projects on blog posts,
So that I can explore the practical applications of concepts discussed.

**Acceptance Criteria:**

**Given** a blog post frontmatter includes `relatedProjects` array
**When** the post renders
**Then** a "Related Projects" section appears with linked project cards

**Given** a blog post has no related projects specified
**When** the post renders
**Then** no related projects section is shown

**Given** related projects are displayed
**When** I click on a project card
**Then** I am taken to that project's detail page

---

### Story 3.7: Migrate Existing Blog Posts

As a **content author**,
I want all 5 existing blog posts migrated,
So that no content is lost in the platform transition.

**Acceptance Criteria:**

**Given** the 5 existing blog posts exist in the source
**When** migration is complete
**Then** all posts are accessible at their new URLs
**And** content, code blocks, and formatting are preserved

**Given** a migrated blog post
**When** I view it
**Then** the frontmatter follows the new schema (title, date, excerpt, tags)
**And** any existing Mermaid diagrams render correctly

---

## Epic 4: Projects Portfolio

**Goal:** Visitors can explore projects, understand their impact, and access live demos/source code.

### Story 4.1: Create Projects Listing Page

As a **recruiter**,
I want to see all projects with descriptions and technologies,
So that I can quickly assess technical breadth and experience.

**Acceptance Criteria:**

**Given** I navigate to the Projects page
**When** the page loads
**Then** I see all projects displayed as cards in a grid
**And** each card shows title, description, and technology tags

**Given** projects are displayed
**When** I click on a project card
**Then** I am taken to the project detail page

**Given** projects have categories (work/personal)
**When** I view the listing
**Then** I can distinguish between project types

---

### Story 4.2: Create Project Detail Page

As a **recruiter**,
I want to read detailed project case studies,
So that I can understand problem-solving approach and impact.

**Acceptance Criteria:**

**Given** I navigate to a project detail URL
**When** the page loads
**Then** I see the full project content with challenge, solution, and impact
**And** technology tags are displayed

**Given** a project has external links
**When** I view the detail page
**Then** I see buttons/links for live demo and GitHub repo (if available)
**And** external links open in new tabs with `rel="noopener"`

**Given** the project content includes diagrams
**When** the page renders
**Then** Mermaid diagrams render correctly (same as blog posts)

---

### Story 4.3: Migrate Existing Projects

As a **content author**,
I want all 8 existing projects migrated,
So that my portfolio is complete on the new platform.

**Acceptance Criteria:**

**Given** the 8 existing projects exist in the source
**When** migration is complete
**Then** all projects are accessible at their new URLs
**And** content and metadata are preserved

**Given** a migrated project
**When** I view it
**Then** the frontmatter follows the new schema (title, description, date, technologies, links, category)
**And** challenge/solution/impact sections are properly formatted

---

## Epic 5: Resume & Professional Profile

**Goal:** Recruiters can evaluate professional qualifications, experience, and skills.

### Story 5.1: Create Resume Page

As a **recruiter**,
I want to view a comprehensive resume page,
So that I can evaluate professional qualifications.

**Acceptance Criteria:**

**Given** I navigate to the Resume page
**When** the page loads
**Then** I see sections for: Experience, Education, Certifications, and Skills
**And** content is driven by `_data/resume.yaml` and `_data/skills.yaml`

**Given** experience entries are displayed
**When** I view them
**Then** each shows: company, role, dates, and key accomplishments
**And** entries are in reverse chronological order

**Given** the skills section displays
**When** I view it
**Then** skills are grouped by category (languages, frameworks, tools, etc.)
**And** skill presentation is scannable (not a wall of text)

---

### Story 5.2: Migrate Resume and Skills Data

As a **content author**,
I want existing resume and skills data migrated to YAML,
So that the resume page displays accurate information.

**Acceptance Criteria:**

**Given** existing resume data exists in the source
**When** migration is complete
**Then** `_data/resume.yaml` contains all experience, education, and certifications
**And** `_data/skills.yaml` contains all technical skills by category

**Given** the YAML files are populated
**When** the resume page builds
**Then** all data displays correctly
**And** no data is missing or malformed

---

## Epic 6: SEO & Discoverability

**Goal:** Content is discoverable by search engines and shareable on social media with rich previews.

### Story 6.1: Add Meta Tags to All Pages

As a **search engine crawler**,
I want proper meta tags on every page,
So that search results display accurate titles and descriptions.

**Acceptance Criteria:**

**Given** any page on the site
**When** I inspect the HTML head
**Then** I find: title tag, meta description, and canonical URL
**And** the title follows format: `Page Name | Jay Singh`

**Given** each page has unique content
**When** meta tags are generated
**Then** title and description are unique per page (not duplicated)

**Given** the base layout includes SEO partial
**When** pages extend the base
**Then** meta tags are automatically included

---

### Story 6.2: Add Open Graph Tags

As a **user sharing on social media**,
I want rich previews when I share links,
So that the shared content looks professional and engaging.

**Acceptance Criteria:**

**Given** any page on the site
**When** I inspect the HTML head
**Then** I find: og:title, og:description, og:image, og:url, og:type

**Given** a link is shared on Facebook/LinkedIn
**When** the platform fetches metadata
**Then** a rich preview displays with image, title, and description

**Given** no page-specific OG image is set
**When** the page renders
**Then** a default OG image is used

---

### Story 6.3: Add Twitter Card Tags

As a **user sharing on Twitter/X**,
I want Twitter Card previews,
So that shared links display attractively on the platform.

**Acceptance Criteria:**

**Given** any page on the site
**When** I inspect the HTML head
**Then** I find: twitter:card, twitter:title, twitter:description, twitter:image

**Given** a link is shared on Twitter
**When** the platform fetches metadata
**Then** a summary_large_image card displays

---

### Story 6.4: Add JSON-LD Structured Data

As a **search engine**,
I want structured data for rich results,
So that I can display enhanced search snippets.

**Acceptance Criteria:**

**Given** the About page
**When** I inspect the HTML
**Then** I find a Person schema with name, job title, and social links

**Given** a blog post page
**When** I inspect the HTML
**Then** I find a BlogPosting schema with headline, datePublished, author

**Given** a project page
**When** I inspect the HTML
**Then** I find a CreativeWork schema with name, description, author

**Given** any page with JSON-LD
**When** validated with Google's Rich Results Test
**Then** no errors are reported

---

### Story 6.5: Add Sitemap and Robots.txt

As a **search engine crawler**,
I want a sitemap and robots.txt,
So that I can efficiently discover and index all pages.

**Acceptance Criteria:**

**Given** the site builds
**When** I access /sitemap.xml
**Then** I receive a valid XML sitemap listing all public pages

**Given** the sitemap exists
**When** I inspect it
**Then** blog posts, projects, and pages are all included
**And** lastmod dates are accurate

**Given** I access /robots.txt
**When** the file loads
**Then** it references the sitemap URL
**And** no pages are incorrectly blocked

---

### Story 6.6: Configure Clean URLs

As a **visitor**,
I want clean URLs without .html extensions,
So that URLs are memorable and professional.

**Acceptance Criteria:**

**Given** any page on the site
**When** I view the URL
**Then** it uses a clean format: `/blog/post-name/` not `/blog/post-name.html`

**Given** the 11ty configuration
**When** permalinks are set
**Then** all content uses trailing slash format

**Given** internal links in navigation and content
**When** the site builds
**Then** all links use the `| url` filter for proper path resolution

---

## Epic 7: Accessibility Verification & Template Documentation

**Goal:** All users (including those with disabilities) can use the site; template users can understand and customize it.

### Story 7.1: Verify Accessibility Compliance

As a **user with disabilities**,
I want the site to be fully accessible,
So that I can use it with assistive technologies.

**Acceptance Criteria:**

**Given** the complete site
**When** tested with axe-core automated tools
**Then** zero accessibility violations are reported

**Given** the site is tested with a screen reader (VoiceOver/NVDA)
**When** navigating all pages
**Then** all content is announced correctly
**And** navigation is logical and complete

**Given** any page on the site
**When** I navigate using only keyboard
**Then** all interactive elements are reachable
**And** focus order is logical
**And** focus indicators are clearly visible

---

### Story 7.2: Implement Reduced Motion Support

As a **user with vestibular disorders**,
I want animations disabled when I prefer reduced motion,
So that the site doesn't cause discomfort.

**Acceptance Criteria:**

**Given** my OS is set to prefer reduced motion
**When** I visit the site
**Then** all animations and transitions are disabled or minimized

**Given** the CSS includes motion
**When** `prefers-reduced-motion: reduce` is active
**Then** transition-duration and animation-duration are set to near-zero

---

### Story 7.3: Verify Color Contrast

As a **user with low vision**,
I want sufficient color contrast,
So that I can read all content.

**Acceptance Criteria:**

**Given** all text on the site
**When** contrast is measured
**Then** normal text meets 4.5:1 ratio minimum
**And** large text meets 3:1 ratio minimum

**Given** the brutalist design palette
**When** used in the UI
**Then** all color combinations pass WCAG AA contrast requirements

---

### Story 7.4: Verify Alt Text on Images

As a **screen reader user**,
I want all images to have descriptive alt text,
So that I understand visual content.

**Acceptance Criteria:**

**Given** any image on the site
**When** I inspect it
**Then** it has an alt attribute with descriptive text
**Or** it has alt="" if purely decorative

**Given** the OG image
**When** used in social sharing
**Then** the image file exists and is properly referenced

---

### Story 7.5: Create README Documentation

As a **template user**,
I want comprehensive README documentation,
So that I can understand how to use and customize the template.

**Acceptance Criteria:**

**Given** a new user clones the repository
**When** they read the README
**Then** they find: quick start instructions, project structure overview, and customization guide

**Given** the README exists
**When** I follow the quick start
**Then** I can install, run, and see the site locally within 10 minutes

**Given** I want to customize the template
**When** I read the README
**Then** I understand where to change: site metadata, content, colors/styles

---

### Story 7.6: Document Configuration and Content Authoring

As a **template user**,
I want clear documentation on content authoring,
So that I can add my own blog posts and projects.

**Acceptance Criteria:**

**Given** I want to add a blog post
**When** I read the documentation
**Then** I understand the frontmatter schema and where to place the file

**Given** I want to add a project
**When** I read the documentation
**Then** I understand the frontmatter schema and content structure

**Given** I want to update my profile/resume
**When** I read the documentation
**Then** I understand how to edit the YAML data files

---

## Summary

| Epic | Stories | FRs Covered |
|------|---------|-------------|
| Epic 1: Project Foundation | 4 | FR35, FR38, FR40, FR42, FR43 |
| Epic 2: Site Shell & Navigation | 6 | FR5, FR7, FR10, FR15, FR16, FR17, FR18 |
| Epic 3: Blog System | 7 | FR1, FR2, FR8, FR12, FR13, FR14, FR21, FR22, FR23 |
| Epic 4: Projects Portfolio | 3 | FR3, FR4, FR9 |
| Epic 5: Resume & Profile | 2 | FR6, FR11 |
| Epic 6: SEO & Discoverability | 6 | FR19, FR20, FR29, FR30, FR31, FR32, FR33, FR34, FR41 |
| Epic 7: Accessibility & Docs | 6 | FR24, FR25, FR26, FR27, FR28, FR36, FR37, FR39 |
| **Total** | **34 stories** | **All 43 FRs** |
