# Project Overview: jaysinghdev

> Personal Portfolio & Technical Blog | Generated: 2026-01-28

## Executive Summary

**jaysinghdev** is a personal developer portfolio and technical blog built with React and TypeScript. The site showcases Jay Singh's professional work, technical blog posts, and resume using a distinctive brutalist design aesthetic.

## Quick Reference

| Attribute | Value |
|-----------|-------|
| **Project Type** | Static Web Application |
| **Primary Language** | TypeScript |
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Architecture** | Component-based SPA |
| **Repository Type** | Monolith |

## Purpose & Goals

This portfolio site serves to:
1. **Showcase Projects** - Display technical projects with detailed case studies
2. **Share Knowledge** - Publish technical blog posts about software engineering
3. **Present Experience** - Display resume, skills, and professional background
4. **Enable Contact** - Provide a way for potential employers/clients to connect

## Key Features

- **Blog System** - Markdown-based blog with code syntax highlighting, Mermaid diagrams
- **Project Showcase** - Filterable project gallery with detailed case studies
- **Resume Display** - Structured resume with experience, education, certifications
- **Contact Form** - Contact functionality (Supabase integration prepared)
- **Responsive Design** - Mobile-first with brutalist aesthetic

## Technology Stack

### Frontend
- **React 18.3.1** - Component-based UI library
- **TypeScript 5.5.3** - Static typing with strict mode
- **Tailwind CSS 3.4.1** - Utility-first CSS with custom design tokens
- **Lucide React** - SVG icon library

### Content & Build
- **Vite 5.4.2** - Fast ESM-based build system
- **gray-matter** - YAML front matter parsing
- **remark/rehype** - Markdown processing pipeline
- **Mermaid 11.12.2** - Diagram rendering

### Backend (Prepared)
- **Supabase 2.57.4** - BaaS for future contact form

### Development Tools
- **ESLint 9** - Code linting with TypeScript + React plugins
- **PostCSS/Autoprefixer** - CSS processing

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  index.html → main.tsx → App.tsx                            │
│       │                     │                                │
│       │              ┌──────┴──────┐                        │
│       │              │ Hash Router │                        │
│       │              └──────┬──────┘                        │
│       │         ┌───────────┼───────────┐                   │
│       │         ▼           ▼           ▼                   │
│       │      Home.tsx   Blog.tsx   Projects.tsx             │
│       │         │           │           │                   │
│       │         └───────────┴───────────┘                   │
│       │                     │                                │
│       │              ┌──────┴──────┐                        │
│       │              │ Components  │                        │
│       │              └─────────────┘                        │
├─────────────────────────────────────────────────────────────┤
│  public/                                                     │
│    ├── blog-posts.json  ← fetch()                           │
│    └── projects.json    ← fetch()                           │
├─────────────────────────────────────────────────────────────┤
│  Build Time (npm run build:content)                         │
│    content/*.md → scripts/build-content.js → public/*.json  │
└─────────────────────────────────────────────────────────────┘
```

## Design System

The site uses a **brutalist design system** characterized by:

- **No Border Radius** - All corners are sharp (0px)
- **Hard Shadows** - Box shadows offset 4-8px with solid black
- **Bold Borders** - 2-4px solid black borders
- **Limited Palette** - Cream (#FFFBEB), Lime, Yellow, Pink, Black
- **Monospace Typography** - System monospace font stack
- **Heavy Weights** - Font-weight 900 for headings

## Related Documentation

- [Architecture](./architecture.md) - Detailed technical architecture
- [Source Tree Analysis](./source-tree-analysis.md) - Directory structure
- [Component Inventory](./component-inventory.md) - UI component catalog
- [Development Guide](./development-guide.md) - Setup & development instructions
