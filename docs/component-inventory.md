# Component Inventory

> jaysinghdev Portfolio | Generated: 2026-01-28

## Overview

The application contains **18 React components** organized into functional categories. All components follow a brutalist design pattern with consistent styling.

## Component Categories

### Layout Components (4)

#### Header
**File:** `src/components/Header.tsx`

Navigation header with responsive mobile menu.

| Prop | Type | Description |
|------|------|-------------|
| currentPage | `Page` | Currently active page |
| onNavigate | `(page: Page) => void` | Navigation callback |

**Features:**
- Sticky positioning
- Mobile hamburger menu
- Active state highlighting
- Brutalist button styling with shadows

---

#### Footer
**File:** `src/components/Footer.tsx`

Simple site footer with copyright.

| Prop | Type | Description |
|------|------|-------------|
| (none) | - | Static component |

---

#### Card
**File:** `src/components/Card.tsx`

Primary container component with brutalist styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Card content |
| className | `string` | `''` | Additional classes |
| onClick | `() => void` | - | Click handler |
| size | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |

**Sizes:**
- `sm`: 4px padding, 4px shadow
- `default`: 6px padding, 6px shadow
- `lg`: 8px padding, 8px shadow

---

#### Section
**File:** `src/components/Section.tsx`

Content section wrapper with optional border.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Section content |
| className | `string` | `''` | Additional classes |
| bordered | `boolean` | `true` | Show top border |

---

### Interactive Components (3)

#### Button
**File:** `src/components/Button.tsx`

Brutalist-styled button with color variants.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'lime' \| 'pink' \| 'yellow'` | `'lime'` | Color variant |
| children | `ReactNode` | - | Button content |
| className | `string` | `''` | Additional classes |
| ...props | `ButtonHTMLAttributes` | - | Standard button props |

---

#### Input
**File:** `src/components/Input.tsx`

Styled form input with label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Input label |
| focusColor | `string` | `'focus:border-lime-400'` | Focus border color |
| ...props | `InputHTMLAttributes` | - | Standard input props |

---

#### Textarea
**File:** `src/components/Textarea.tsx`

Styled form textarea with label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Textarea label |
| focusColor | `string` | `'focus:border-lime-400'` | Focus border color |
| ...props | `TextareaHTMLAttributes` | - | Standard textarea props |

---

### Display Components (6)

#### Tag
**File:** `src/components/Tag.tsx`

Technology or category tag with color coding.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Tag text |
| onClick | `() => void` | - | Click handler |
| variant | `'default' \| 'category'` | `'default'` | Tag variant |

**Color Logic:**
- Default variant: Maps technology names to colors (Python→lime, React→cyan, etc.)
- Category variant: Maps categories to colors (Architecture→purple, DevOps→orange, etc.)

---

#### CodeBlock
**File:** `src/components/CodeBlock.tsx`

Syntax-highlighted code block with copy button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| code | `string` | - | Code content |
| language | `string` | `'text'` | Language for highlighting |

**Features:**
- Copy to clipboard button
- Language label display
- Scrollable overflow

---

#### CalloutBox
**File:** `src/components/CalloutBox.tsx`

Info/warning/tip callout box.

| Prop | Type | Description |
|------|------|-------------|
| content | `string` | Callout text |
| type | `'info' \| 'warning' \| 'tip' \| 'important'` | Callout style |

---

#### ContentBlock
**File:** `src/components/ContentBlock.tsx`

Dynamic content renderer based on block type.

| Prop | Type | Description |
|------|------|-------------|
| block | `ContentBlock` | Block data |
| index | `number` | Block index (for keys) |

**Renders:**
- `text` → Markdown paragraph
- `code` → CodeBlock component
- `diagram` → MermaidDiagram component
- `image` → Image element
- `callout` → CalloutBox component

---

#### MermaidDiagram
**File:** `src/components/MermaidDiagram.tsx`

Interactive Mermaid diagram with controls.

| Prop | Type | Description |
|------|------|-------------|
| content | `string` | Mermaid diagram code |
| label | `string` | Optional diagram label |

**Features:**
- Zoom in/out (50%-200%)
- Pan (drag to move)
- Fullscreen mode
- Copy diagram code
- Reset view

---

#### DiagramImage
**File:** `src/components/DiagramImage.tsx`

Fullscreen-capable image display.

| Prop | Type | Description |
|------|------|-------------|
| src | `string` | Image source URL |
| alt | `string` | Alt text |
| label | `string` | Optional label |

**Features:**
- Zoom controls
- Fullscreen modal
- Click to expand

---

### Content Components (4)

#### BlogDetail
**File:** `src/components/BlogDetail.tsx`

Blog post detail view.

| Prop | Type | Description |
|------|------|-------------|
| post | `BlogPost` | Blog post data |
| projects | `Project[]` | All projects (for related) |
| onBack | `() => void` | Back navigation |
| onNavigate | `(page: Page, id?: string) => void` | Navigation callback |

**Features:**
- Table of contents extraction
- Reading progress indicator
- Related projects section
- Social share buttons
- Back navigation

---

#### ProjectDetail
**File:** `src/components/ProjectDetail.tsx`

Project case study view.

| Prop | Type | Description |
|------|------|-------------|
| project | `Project` | Project data |
| onBack | `() => void` | Back navigation |
| onNavigate | `(page: Page, id?: string) => void` | Navigation callback |

**Sections:**
- Overview
- The Challenge
- Our Solution
- Key Features
- Technical Impact
- Architecture Diagram (if available)

---

#### RelatedProjects
**File:** `src/components/RelatedProjects.tsx`

Related projects list display.

| Prop | Type | Description |
|------|------|-------------|
| projects | `Project[]` | Related projects |
| onNavigate | `(page: Page, id?: string) => void` | Navigation callback |

---

#### SocialShare
**File:** `src/components/SocialShare.tsx`

Social media share buttons.

| Prop | Type | Description |
|------|------|-------------|
| title | `string` | Content title |
| url | `string` | URL to share |

**Platforms:** Twitter, LinkedIn, Copy Link

---

### Utility Components (1)

#### ReadingProgress
**File:** `src/components/ReadingProgress.tsx`

Scroll progress indicator bar.

| Prop | Type | Description |
|------|------|-------------|
| (none) | - | Uses scroll position |

---

#### DocumentDownload
**File:** `src/components/DocumentDownload.tsx`

Download button for documents.

| Prop | Type | Description |
|------|------|-------------|
| url | `string` | Document URL |
| filename | `string` | Display filename |

---

## Pages (5)

### Home
**File:** `src/pages/Home.tsx`

Landing page with featured content.

**Sections:**
- Hero card with intro
- CTA buttons (View Work, Read Blog, Hire Me)
- Latest blog post
- Featured projects

---

### Blog
**File:** `src/pages/Blog.tsx`

Blog listing and detail routing.

**States:**
- Listing: Shows all posts in grid
- Detail: Shows BlogDetail for selected post

---

### Projects
**File:** `src/pages/Projects.tsx`

Project gallery with filtering.

**Filters:**
- All
- Personal
- Work

---

### Resume
**File:** `src/pages/Resume.tsx`

Resume display with data from YAML.

**Sections:**
- Profile header
- Skills grid
- Experience timeline
- Education
- Certifications
- Download button

---

### Contact
**File:** `src/pages/Contact.tsx`

Contact form.

**Fields:**
- Name
- Email
- Subject
- Message

**Note:** Form submission not yet implemented (Supabase planned)

---

## Design Pattern Summary

All components follow these patterns:

1. **TypeScript interfaces** for props
2. **Default function exports**
3. **Brutalist styling** via Tailwind classes
4. **Consistent shadow handling** with hover/active states
5. **Accessibility considerations** (reduced motion media query)
