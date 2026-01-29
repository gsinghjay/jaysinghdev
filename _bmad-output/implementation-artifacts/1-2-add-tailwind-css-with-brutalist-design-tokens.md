# Story 1.2: Add Tailwind CSS with Brutalist Design Tokens

Status: done

## Story

As a **template user**,
I want the brutalist design system pre-configured,
So that I can use consistent styling without manual setup.

## Acceptance Criteria

1. **Given** the project has Tailwind CSS installed
   **When** I use brutalist utility classes (e.g., `shadow-brutal`, `bg-cream`, `bg-lime`, `bg-yellow`, `bg-pink`)
   **Then** the correct brutalist styles are applied
   **And** CSS is purged to include only used classes in production build

2. **Given** the design token CSS variables are defined
   **When** I inspect the compiled CSS
   **Then** I see `--shadow-brutal-sm`, `--shadow-brutal`, `--shadow-brutal-md`, `--shadow-brutal-lg` defined
   **And** the brutalist color palette (cream, lime, yellow, pink) is available as both CSS variables and Tailwind utilities

## Tasks / Subtasks

- [x] Task 1: Complete Brutalist Color Palette Configuration (AC: #1, #2)
  - [x] 1.1: Add `lime`, `yellow`, and `pink` colors to `tailwind.config.js` extend.colors
  - [x] 1.2: Add corresponding CSS custom properties to `css/main.css` :root
  - [x] 1.3: Document color values in code comments for template users

- [x] Task 2: Enhance Brutalist Utility Classes (AC: #1)
  - [x] 2.1: Add `.brutal-box` utility class (border + shadow + bg-cream combination)
  - [x] 2.2: Add color-variant utility classes (`.brutal-box-lime`, `.brutal-box-yellow`, `.brutal-box-pink`)
  - [x] 2.3: Add `.hover-lift` and `.hover-lift-lg` transition utilities

- [x] Task 3: Verify CSS Purging and Build Output (AC: #1)
  - [x] 3.1: Run `npm run build` and verify CSS is minified
  - [x] 3.2: Confirm unused Tailwind classes are purged from output
  - [x] 3.3: Verify all brutalist utilities work in templates

- [x] Task 4: Verify Design Token Integration (AC: #2)
  - [x] 4.1: Create test page using all brutalist colors and shadows
  - [x] 4.2: Inspect compiled CSS for CSS custom properties
  - [x] 4.3: Document design tokens for template users

## Dev Notes

### Critical Context: Story 1-1 Already Configured Partial Setup

Story 1-1 already installed Tailwind CSS and configured **partial** brutalist tokens:
- ✅ Tailwind CSS v3.4.17 installed
- ✅ `cream: '#FFFBEB'` color configured
- ✅ `shadow-brutal-*` shadows configured
- ✅ `borderRadius: 'none'` configured
- ✅ `prefers-reduced-motion` support added
- ❌ **MISSING:** `lime`, `yellow`, `pink` colors from the brutalist palette

**DO NOT reinstall Tailwind CSS** - it's already working. This story completes the design token setup.

### Current Tailwind Configuration

From `tailwind.config.js`:
```javascript
export default {
  content: [
    './_includes/**/*.{njk,html}',
    './_config/**/*.js',
    './content/**/*.{njk,html,md}',
    './css/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBEB',
        // MISSING: lime, yellow, pink
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
  },
  plugins: [],
};
```

### Brutalist Color Palette (Complete)

Based on Architecture document requirement: "cream/lime/yellow/pink palette"

| Color | Hex Value | CSS Variable | Tailwind Class | Usage |
|-------|-----------|--------------|----------------|-------|
| cream | `#FFFBEB` | `--color-cream` | `bg-cream` | Primary background |
| lime | `#84CC16` | `--color-lime` | `bg-lime` | Accent, CTAs |
| yellow | `#FACC15` | `--color-yellow` | `bg-yellow` | Highlights, warnings |
| pink | `#EC4899` | `--color-pink` | `bg-pink` | Accent, interactive |

**Note:** These are standard brutalist web design colors. Verify against any existing design assets if available.

### CSS Custom Properties to Add

Update `css/main.css` :root section:
```css
:root {
  /* Existing */
  --color-cream: #FFFBEB;
  --shadow-brutal-sm: 3px 3px 0 #000;
  --shadow-brutal: 4px 4px 0 #000;
  --shadow-brutal-md: 6px 6px 0 #000;
  --shadow-brutal-lg: 8px 8px 0 #000;

  /* ADD THESE */
  --color-lime: #84CC16;
  --color-yellow: #FACC15;
  --color-pink: #EC4899;
}
```

### Utility Classes to Add

Based on Architecture `css/Styling Patterns` section:
```css
/* Design system utilities use brutal- prefix */
.brutal-box {
  @apply bg-cream border-2 border-black shadow-brutal;
}

.brutal-box-lime {
  @apply bg-lime border-2 border-black shadow-brutal;
}

.brutal-box-yellow {
  @apply bg-yellow border-2 border-black shadow-brutal;
}

.brutal-box-pink {
  @apply bg-pink border-2 border-black shadow-brutal;
}

/* Hover utilities use hover- prefix */
.hover-lift {
  @apply transition-all hover:shadow-brutal-md hover:-translate-y-0.5;
}

.hover-lift-lg {
  @apply transition-all hover:shadow-brutal-lg hover:-translate-y-1;
}
```

### Technical Requirements

| Requirement | Specification | Source |
|-------------|---------------|--------|
| Tailwind Version | v3.4.17 (already installed) | package.json |
| CSS Output | Purged/minified in production | [Architecture] |
| CSS Variables | Must define all design tokens | [Architecture] |
| Utility Naming | `brutal-*` for design system, `hover-*` for interactions | [Architecture §CSS Patterns] |

### Project Structure Notes

Files to modify:
- `tailwind.config.js` - Add lime, yellow, pink to extend.colors
- `css/main.css` - Add CSS custom properties and utility classes

**DO NOT create new files** - extend existing configuration only.

### Architecture Compliance

From Architecture `Implementation Patterns & Consistency Rules`:

1. **Custom Utility Naming:** `brutal-*` prefix for design system utilities ✓
2. **Hover Utilities:** `hover-*` prefix ✓
3. **CSS Variables:** Defined in `:root` ✓
4. **Tailwind Usage:** Prefer utilities, use custom only for design tokens ✓

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Styling Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#CSS/Styling Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Migration Constraints] - "cream/lime/yellow/pink palette"
- [Source: _bmad-output/planning-artifacts/prd.md#Design System]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2]
- [Source: _bmad-output/implementation-artifacts/1-1-*.md] - Previous story context

### Previous Story Intelligence

**From Story 1-1 Completion Notes:**
- Tailwind CSS v3.4.17 installed with PostCSS and Autoprefixer
- Basic brutalist tokens configured (cream, shadows, no border-radius)
- CSS build pipeline working: `npm run css:build` outputs to `_site/css/main.css`
- `prefers-reduced-motion` support already added
- Build verified working: 15 files in <1s

**Dev Notes from 1-1:**
- Used `@apply` directives for utility class composition
- Skip link already styled with brutalist tokens
- Build scripts use `npm-run-all` for parallel CSS/11ty builds

### Git Intelligence

**Recent Commit (14cf91f):** `feat: initialize 11ty portfolio with brutalist design system`
- Established Tailwind + PostCSS pipeline
- Created `css/main.css` with Tailwind directives and `:root` variables
- Configured content paths in `tailwind.config.js`

### Verification Checklist

After implementation, verify:
- [x] `bg-lime`, `bg-yellow`, `bg-pink` classes work in templates
- [x] `text-lime`, `text-yellow`, `text-pink` classes work
- [x] `border-lime`, `border-yellow`, `border-pink` classes work
- [x] `.brutal-box` and color variants render correctly
- [x] `.hover-lift` transitions work with `prefers-reduced-motion` respect
- [x] CSS custom properties visible in compiled output
- [x] Production build purges unused classes

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

N/A

### Completion Notes List

- Added `lime: '#84CC16'`, `yellow: '#FACC15'`, `pink: '#EC4899'` to tailwind.config.js colors
- Added CSS custom properties `--color-lime`, `--color-yellow`, `--color-pink` to css/main.css :root
- Created `.brutal-box`, `.brutal-box-lime`, `.brutal-box-yellow`, `.brutal-box-pink` utility classes
- Created `.hover-lift` and `.hover-lift-lg` transition utilities with `-translate-y` and shadow transitions
- Build verification: CSS minified to single line, all custom properties present in compiled output
- Created `content/design-test.njk` for visual verification of all design tokens (excluded from collections)
- All utility classes confirmed in compiled CSS: bg-*, text-*, border-* for all colors; brutal-box variants; hover-lift variants
- `prefers-reduced-motion` support preserved from Story 1-1

### Code Review Fixes (2026-01-29)

- **M1 Fixed**: Added focus states to `.hover-lift` and `.hover-lift-lg` utilities (`css/main.css:62-68`)
- **M2 Fixed**: Added `id="main-content"` and `tabindex="-1"` to main element (`content/design-test.njk:8`)
- **M3 Fixed**: Added `type="button"` to test buttons (`content/design-test.njk:48-49`)

### File List

- `tailwind.config.js` - Added lime, yellow, pink colors with documentation comments
- `css/main.css` - Added CSS custom properties and utility classes (brutal-box, hover-lift); added focus states to hover utilities
- `content/design-test.njk` - Design system test page (new file, excluded from collections); fixed accessibility landmarks

