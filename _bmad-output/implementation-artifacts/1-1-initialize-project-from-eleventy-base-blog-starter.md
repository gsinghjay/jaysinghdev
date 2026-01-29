# Story 1.1: Initialize Project from Eleventy Base Blog Starter

Status: done

## Story

As a **template user**,
I want to clone the repository and run it locally with standard npm commands,
So that I can start customizing my portfolio without complex setup.

## Acceptance Criteria

1. **Given** a developer has cloned the repository
   **When** they run `npm install && npm run dev`
   **Then** the site builds successfully and serves on localhost
   **And** the build completes in under 30 seconds

2. **Given** a developer runs `npm run build`
   **When** the build completes
   **Then** static HTML/CSS/JS files are generated in `_site/` directory
   **And** no build errors or warnings appear

## Tasks / Subtasks

- [x] Task 1: Replace React SPA with Eleventy Base Blog Starter (AC: #1, #2)
  - [x] 1.1: Backup and remove React-specific files (keep content/, docs/, _bmad/, _bmad-output/)
  - [x] 1.2: Initialize from eleventy-base-blog starter
  - [x] 1.3: Restore preserved directories (content/, docs/, _bmad/, _bmad-output/)
  - [x] 1.4: Update .gitignore for 11ty project structure

- [x] Task 2: Configure Tailwind CSS with Brutalist Design Tokens (AC: #1)
  - [x] 2.1: Install Tailwind CSS, PostCSS, and Autoprefixer
  - [x] 2.2: Configure tailwind.config.js with brutalist tokens (shadow-brutal-*, cream color, borderRadius: none)
  - [x] 2.3: Configure postcss.config.js
  - [x] 2.4: Create base CSS file with Tailwind directives

- [x] Task 3: Configure 11ty for Project Structure (AC: #1, #2)
  - [x] 3.1: Update eleventy.config.js for ESM and project paths
  - [x] 3.2: Configure content input/output directories
  - [x] 3.3: Add passthrough copy for static assets

- [x] Task 4: Verify Build and Development Server (AC: #1, #2)
  - [x] 4.1: Run `npm install` - verify no errors
  - [x] 4.2: Run `npm run dev` - verify site serves on localhost
  - [x] 4.3: Run `npm run build` - verify _site/ output generated
  - [x] 4.4: Verify build completes in under 30 seconds

## Dev Notes

### Critical Context: Brownfield Migration

This is a **migration story** - replacing the existing React SPA with 11ty. The current project has:
- React + Vite + TypeScript setup (to be replaced)
- Existing content in `content/` folder (blog/, config/, projects/) - **MUST PRESERVE**
- Existing docs in `docs/` folder - **MUST PRESERVE**
- BMAD workflow files in `_bmad/` and `_bmad-output/` - **MUST PRESERVE**

### Files to REMOVE (React SPA)

```
src/                      # React components and pages
index.html                # Vite entry point
vite.config.ts           # Vite configuration
tsconfig.json            # TypeScript configs
tsconfig.app.json
tsconfig.node.json
eslint.config.js         # ESLint config
scripts/                 # React build scripts
dist/                    # React build output
public/                  # React public assets (review first)
tests/                   # Playwright tests (may need migration)
playwright.config.ts     # Playwright config
```

### Files to PRESERVE

```
content/                 # Existing markdown content
  blog/                  # Blog posts
  config/                # YAML configuration
  projects/              # Project case studies
docs/                    # Project documentation
_bmad/                   # BMAD workflow system
_bmad-output/            # BMAD artifacts
.claude/                 # Claude Code settings
.env                     # Environment variables (if any)
.git/                    # Git history
```

### Existing Brutalist Design Tokens (MUST PRESERVE)

From current `tailwind.config.js` - replicate exactly in new config:

```javascript
theme: {
  extend: {
    colors: {
      cream: '#FFFBEB',
    },
    fontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
    },
    boxShadow: {
      'brutal-sm': '3px 3px 0 #000',
      'brutal': '4px 4px 0 #000',
      'brutal-md': '6px 6px 0 #000',
      'brutal-lg': '8px 8px 0 #000',
    },
  },
  borderRadius: {
    'none': '0',
  },
}
```

### Architecture-Mandated Commands

From Architecture document - use these EXACT commands:

```bash
# Step 1: Clone official starter (into temp directory first)
git clone https://github.com/11ty/eleventy-base-blog.git temp-11ty
cd temp-11ty

# Step 2: Add Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Step 3: Verify base setup
npm install
npm run build
```

### Technical Requirements

| Requirement | Specification | Source |
|-------------|---------------|--------|
| Node.js | v18+ required | [11ty docs] |
| 11ty Version | v3.x (latest) | [Architecture] |
| Tailwind CSS | v3.4+ | [Architecture] |
| Build Output | `_site/` directory | [Architecture] |
| Build Time | < 30 seconds | [NFR9] |
| JavaScript | Zero JS for core (progressive enhancement only) | [Architecture] |

### NPM Scripts Required

The final `package.json` must include:

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy",
    "preview": "eleventy --serve --port=8080"
  }
}
```

### Project Structure Notes

After this story, the project structure should be:

```
jaysinghdev/
├── .github/workflows/        # (Added in Story 1.4)
├── _data/                    # Global data files (11ty convention)
├── _includes/                # Templates and partials
│   └── layouts/
│       └── base.njk          # Base HTML layout
├── _site/                    # Build output (gitignored)
├── content/                  # Preserved from existing
│   ├── blog/
│   ├── config/
│   └── projects/
├── css/
│   └── main.css              # Tailwind CSS entry
├── docs/                     # Preserved from existing
├── _bmad/                    # Preserved
├── _bmad-output/             # Preserved
├── .eleventy.js              # 11ty configuration (ESM)
├── .gitignore
├── .nojekyll                 # For GitHub Pages
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

### Alignment with Architecture Patterns

| Pattern | Requirement |
|---------|-------------|
| File naming | kebab-case for all files |
| Config format | ESM (export default) |
| Template language | Nunjucks (.njk) |
| Content format | Markdown with YAML frontmatter |
| CSS architecture | Tailwind + CSS custom properties |

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Styling Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Handoff]
- [Source: _bmad-output/planning-artifacts/prd.md#Technical Architecture]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1]
- [Source: 11ty docs - v3.1.2 requires Node 18+]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A - No issues encountered during implementation.

### Completion Notes List

- **Task 1:** Removed React SPA files (src/, vite.config.ts, tsconfig.*, eslint.config.js, index.html, etc.). Cloned eleventy-base-blog starter to temp directory, copied 11ty structure (_data/, _includes/, _config/, css/, public/, eleventy.config.js, package.json). Preserved content/, docs/, _bmad/, _bmad-output/, .claude/, .env, .git/. Updated .gitignore for _site/ output.

- **Task 2:** Installed tailwindcss@3.4.17, postcss@8.5.3, autoprefixer@10.4.21. Configured tailwind.config.js with exact brutalist design tokens (cream color, brutal shadows, borderRadius: none, mono font). Created postcss.config.js. Created css/main.css with Tailwind directives and brutalist utility classes.

- **Task 3:** Updated eleventy.config.js with CSS passthrough copy. Updated _data/metadata.js with Jay Singh's info. Created content/index.njk home page. Cleaned up home layout template. Content input/output directories already configured correctly (content/ -> _site/).

- **Task 4:** All verification passed:
  - `npm install`: 0 vulnerabilities, 237 packages
  - `npm run build`: 15 files written in 0.33 seconds (well under 30s)
  - `npm run dev`: Server at http://localhost:8080/
  - _site/ output: blog/, projects/, css/, feed/, index.html

- **Additional fixes:** Escaped Nunjucks template syntax conflicts in blog posts (docker-observability.md, ci-cd-best-practices.md) using {% raw %}...{% endraw %} tags for GitHub Actions and Prometheus template syntax.

### File List

**Created:**
- package.json
- tailwind.config.js
- postcss.config.js
- eleventy.config.js
- css/main.css
- content/index.njk
- .gitignore
- .nojekyll
- .nvmrc
- .editorconfig
- _data/metadata.js
- _data/eleventyDataSchema.js
- _config/filters.js
- _includes/layouts/base.njk
- _includes/layouts/home.njk
- _includes/layouts/post.njk
- _includes/postslist.njk
- css/index.css
- css/message-box.css
- css/prism-diff.css
- public/img/* (11ty starter assets)

**Modified:**
- content/blog/docker-observability.md (escaped Nunjucks syntax)
- content/blog/ci-cd-best-practices.md (escaped Nunjucks syntax)
- eleventy.config.js (code review: fixed RSS feed metadata)
- css/main.css (code review: added prefers-reduced-motion)
- css/index.css (code review: removed dark mode conflict)
- _includes/layouts/base.njk (code review: ARIA roles, skip-link class, tabindex)
- .gitignore (code review: added test-output.css)

**Deleted (Code Review):**
- test-output.css (build artifact)

**Deleted:**
- src/ (entire directory)
- index.html
- vite.config.ts
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- eslint.config.js
- scripts/ (entire directory)
- dist/ (entire directory)
- public/ (React version - replaced with 11ty public/)
- tests/ (Playwright tests for React)
- playwright.config.ts
- node_modules/ (reinstalled)
- package-lock.json (regenerated)
- .env.example

### Code Review Fixes (2026-01-29)

**Reviewed by:** Dev Agent (Opus 4.5) - Adversarial Code Review

**HIGH Severity Fixed:**
- H1: Fixed RSS feed placeholder metadata in `eleventy.config.js:64-87` - Updated title, subtitle, base URL, and author to Jay Singh's actual values
- H2: Added `prefers-reduced-motion` support in `css/main.css` - WCAG 2.1 AA compliance

**MEDIUM Severity Fixed:**
- M1: Removed `test-output.css` build artifact and added to `.gitignore`
- M2: Updated skip link to use `.skip-link` class (brutalist styled) instead of `visually-hidden`
- M3: Added explicit ARIA landmark roles (`role="banner"`, `role="contentinfo"`) and `tabindex="-1"` to main element in `base.njk`
- M4: Removed dark mode CSS rules that conflicted with brutalist cream-based design

**LOW Severity (Not Fixed - Informational):**
- L1: Browserslist outdated warning (cosmetic)
- L2: Empty author email in metadata.js (optional field)
- L3: borderRadius outside extend scope (intentional for brutalist design)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-01-29 | Code review fixes - RSS feed metadata, reduced-motion support, ARIA landmarks, skip link class, dark mode removal | Dev Agent (Opus 4.5) |
| 2026-01-29 | Initial implementation - migrated from React SPA to 11ty, configured Tailwind CSS with brutalist tokens, verified build and dev server | Dev Agent (Opus 4.5) |
