# Source Tree Analysis

> Generated: 2026-01-28 | Project: jaysinghdev

## Directory Structure

```
jaysinghdev/
├── content/                    # Source content (markdown/yaml)
│   ├── blog/                   # Blog post markdown files
│   │   ├── building-fastapi-microservices.md
│   │   ├── ci-cd-best-practices.md
│   │   ├── docker-observability.md
│   │   ├── oauth2-authentication-gateway.md
│   │   └── postgresql-performance.md
│   ├── config/                 # YAML configuration data
│   │   ├── profile.yaml        # Personal profile info
│   │   ├── resume.yaml         # Work experience & education
│   │   └── skills.yaml         # Technical skills inventory
│   └── projects/               # Project showcase markdown files
│       ├── authentication-gateway.md
│       ├── automation-scripts.md
│       ├── cicd-pipeline.md
│       ├── covid-dashboard.md
│       ├── event-driven-microservices.md
│       ├── jamf-pro-deployment.md
│       ├── observability-infrastructure.md
│       └── qr-code-platform.md
│
├── public/                     # Static assets served by Vite
│   ├── blog/                   # Copied blog markdown (raw access)
│   ├── blog-posts.json         # [BUILD OUTPUT] Compiled blog data
│   ├── config/                 # Copied config files (raw access)
│   ├── diagrams/               # Architecture diagram images
│   ├── docs/                   # Downloadable documents
│   ├── projects/               # Copied project markdown (raw access)
│   └── projects.json           # [BUILD OUTPUT] Compiled project data
│
├── scripts/                    # Build scripts
│   └── build-content.js        # Markdown → JSON compiler
│
├── src/                        # React application source
│   ├── App.tsx                 # [ENTRY] Main app component + routing
│   ├── main.tsx                # [ENTRY] React DOM mount point
│   ├── index.css               # Global styles + Tailwind + brutalist system
│   ├── vite-env.d.ts           # Vite type declarations
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Card.tsx            # Brutalist card container
│   │   ├── Button.tsx          # Styled button variants
│   │   ├── Tag.tsx             # Tech/category tags
│   │   ├── Section.tsx         # Content section wrapper
│   │   ├── Input.tsx           # Form input
│   │   ├── Textarea.tsx        # Form textarea
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── CalloutBox.tsx      # Info/warning callouts
│   │   ├── ContentBlock.tsx    # Dynamic content renderer
│   │   ├── MermaidDiagram.tsx  # Interactive Mermaid diagrams
│   │   ├── DiagramImage.tsx    # Fullscreen diagram images
│   │   ├── BlogDetail.tsx      # Blog post detail view
│   │   ├── ProjectDetail.tsx   # Project detail view
│   │   ├── RelatedProjects.tsx # Related projects list
│   │   ├── SocialShare.tsx     # Share buttons
│   │   ├── DocumentDownload.tsx # Download button
│   │   └── ReadingProgress.tsx # Scroll progress indicator
│   │
│   ├── pages/                  # Page-level components
│   │   ├── Home.tsx            # Landing page
│   │   ├── Blog.tsx            # Blog listing + routing
│   │   ├── Projects.tsx        # Projects listing + filtering
│   │   ├── Resume.tsx          # Resume/CV display
│   │   └── Contact.tsx         # Contact form
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # All shared interfaces
│   │
│   ├── utils/                  # Utility functions
│   │   └── content-loader.ts   # Async data fetching
│   │
│   └── data/                   # Static JSON data (dev fallback)
│       ├── blog-posts.json
│       ├── projects.json
│       ├── profile.json
│       ├── resume.json
│       └── skills.json
│
├── docs/                       # [OUTPUT] Generated documentation
│
├── index.html                  # HTML entry point
├── package.json                # Dependencies + scripts
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript config (references)
├── tsconfig.app.json           # TypeScript config (app)
├── tsconfig.node.json          # TypeScript config (node scripts)
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS plugins
├── eslint.config.js            # ESLint configuration
├── .gitignore                  # Git ignore rules
└── .env                        # Environment variables (empty)
```

## Critical Folders

### `/src` - Application Source
The main React application code. Contains all TypeScript/TSX files that make up the frontend.

**Entry Points:**
- `main.tsx` - React DOM render, imports App.tsx
- `App.tsx` - Main component, hash-based routing, data loading

### `/content` - Content Source
Markdown and YAML files that define the site's content. These are processed at build time.

**Build Process:**
1. `scripts/build-content.js` reads `/content/blog/*.md` and `/content/projects/*.md`
2. Parses YAML front matter with `gray-matter`
3. Converts markdown body to content blocks
4. Outputs to `/public/blog-posts.json` and `/public/projects.json`

### `/public` - Static Assets
Files served directly by Vite. Includes both source assets and build outputs.

**Build Outputs:**
- `blog-posts.json` - Compiled blog data
- `projects.json` - Compiled project data

### `/src/components` - UI Components
18 reusable React components following a brutalist design system pattern.

**Design System Elements:**
- Hard shadows (`4px 4px 0 #000`)
- No border radius (explicitly set to 0)
- Bold borders (4px black)
- Monospace typography
- Limited color palette (cream, lime, yellow, pink)

## Data Flow

```
content/*.md → build-content.js → public/*.json → fetch() → React State → UI
```

1. **Build Time:** Markdown files are parsed and converted to JSON
2. **Runtime:** React fetches JSON from `/public/`
3. **Rendering:** Data flows through props from App.tsx to page/component tree
