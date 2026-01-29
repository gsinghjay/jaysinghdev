---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4-skipped
status: skipped
skipReason: "1:1 conversion - existing React SPA serves as UX spec"
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - docs/index.md
  - docs/project-overview.md
workflowType: 'ux-design'
project_name: 'jaysinghdev'
user_name: 'Jay'
date: '2026-01-29'
---

# UX Design Specification jaysinghdev

**Author:** Jay
**Date:** 2026-01-29

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

Migrate jaysinghdev portfolio from React SPA to 11ty + Nunjucks static site generator, creating both a premium personal portfolio and a reusable template for developers. The site preserves a distinctive brutalist design system while achieving 100% Lighthouse scores and WCAG 2.1 AA compliance.

### Target Users

| User Type | Primary Goal | Key UX Need |
|-----------|--------------|-------------|
| **Recruiters (Sarah)** | Quick candidate assessment | Fast loads, clear project impact, visible contact path |
| **Developers (Marcus)** | Find technical solutions | Scannable blog, copyable code, SEO-discoverable |
| **Template Users (Priya)** | Deploy own portfolio | Obvious structure, simple customization, <1 hour to live |
| **Content Author (Jay)** | Publish content quickly | Markdown workflow, commit-to-live in minutes |

### Key Design Challenges

1. **Dual-audience design** - Balance premium recruiter impression with template-user clarity
2. **Brutalist accessibility** - Maintain bold aesthetic while ensuring WCAG 2.1 AA compliance
3. **Content scannability** - Support both quick-scan recruiters and solution-seeking developers
4. **Template self-documentation** - Structure must be obvious without extensive docs

### Design Opportunities

1. **Brutalist + Accessible** - Differentiate by proving bold design and accessibility coexist
2. **Zero-JS performance** - Instant page loads create premium feel competitors lack
3. **Developer-first interactions** - One-click code copy, clear diagrams, scannable structure
4. **Self-documenting architecture** - Template success without friction drives adoption

## Core User Experience

### Defining Experience

The core experience prioritizes **recruiter assessment** - enabling quick, confident evaluation of technical competence. Every design decision filters through: "Does this help Sarah decide in 3 minutes?"

Secondary experiences (developer code-finding, template customization, content authoring) are fully supported but never at the expense of the primary recruiter journey.

### Platform Strategy

| Aspect | Decision |
|--------|----------|
| Platform | Web-only, static HTML |
| Input | Keyboard + mouse primary, touch secondary |
| Responsive | Mobile-first, scales to desktop |
| Offline | Not required (static = fast enough) |
| JavaScript | Progressive enhancement only - core works without JS |

### Effortless Interactions

| User | What Must Be Effortless |
|------|------------------------|
| Recruiters | Finding evidence of competence - project impact visible immediately |
| Developers | Copying code - one click, clipboard populated, done |
| Template Users | Understanding structure - file names tell the story |
| Content Author | Publishing - commit markdown, live in minutes |

### Critical Success Moments

| Moment | Success Looks Like | Failure Looks Like |
|--------|-------------------|-------------------|
| First page load | Instant render, no spinner | Any loading state |
| Project scan | Impact statement visible without scrolling | Wall of text, buried metrics |
| Code discovery | Copy button works, syntax highlighted | Select-all-copy dance |
| Template clone | `npm start` works first try | Cryptic error messages |

### Experience Principles

1. **Evidence Over Claims** - Show measurable impact, not self-description. Recruiters trust numbers.
2. **Instant Gratification** - Zero waiting. Pages load instantly. Interactions respond immediately.
3. **Scannable Hierarchy** - Visual structure enables 10-second assessment. No hunting.
4. **Obvious Architecture** - File names, folder structure, and code organization are self-documenting.

---

## Workflow Status: Skipped

**Reason:** This is a 1:1 conversion from React SPA to 11ty. The existing site serves as the UX specification.

**UX Reference:** The current React implementation at `src/` defines all:
- Visual design (brutalist aesthetic)
- Page layouts and component structure
- Navigation patterns
- Content display patterns
- Interaction behaviors

**Implementation Guidance:** Replicate the existing UX exactly. Refer to:
- `docs/component-inventory.md` - All 18 UI components
- `docs/architecture.md` - Current data flow and patterns
- `src/index.css` + `tailwind.config.js` - Design tokens
