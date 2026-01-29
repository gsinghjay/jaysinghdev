# Story 1.3: Create Base Layout with Accessibility Landmarks

Status: done

## Story

As a **screen reader user**,
I want proper ARIA landmarks on every page,
So that I can navigate the site structure efficiently.

## Acceptance Criteria

1. **Given** any page on the site
   **When** a screen reader scans the page
   **Then** it identifies: banner (header), navigation, main content, and contentinfo (footer) landmarks
   **And** a skip link is the first focusable element

2. **Given** the skip link is focused
   **When** the user activates it
   **Then** focus moves to the main content area
   **And** the skip link is visually hidden until focused

3. **Given** the base layout template exists
   **When** other layouts extend it
   **Then** they inherit the accessibility landmarks automatically
   **And** the HTML document includes proper `lang` attribute

## Tasks / Subtasks

- [x] Task 1: Align Skip Link and Main Content ID with Architecture (AC: #1, #2)
  - [x] 1.1: Update main element id from `main` to `main-content` in `_includes/layouts/base.njk`
  - [x] 1.2: Update skip link href from `#main` to `#main-content` in `_includes/layouts/base.njk`
  - [x] 1.3: Verify skip link id attribute for focus styling (`id="skip-link"` already exists)

- [x] Task 2: Add Complete ARIA Landmark Attributes (AC: #1)
  - [x] 2.1: Add `aria-label="Main navigation"` to nav element in `_includes/layouts/base.njk:52`
  - [x] 2.2: Verify `role="banner"` exists on header (already present line 48)
  - [x] 2.3: Verify `role="contentinfo"` exists on footer (already present line 68)
  - [x] 2.4: Verify main element has `tabindex="-1"` for focus management (already present line 62)

- [x] Task 3: Verify Layout Inheritance (AC: #3)
  - [x] 3.1: Confirm `post.njk` layout extends `layouts/base.njk` (verified: line 2)
  - [x] 3.2: Confirm `home.njk` layout extends `layouts/base.njk` (verified: line 2)
  - [x] 3.3: Create page layout (`page.njk`) extending base if not exists
  - [x] 3.4: Verify `metadata.language` resolves to "en" in `_data/metadata.js`

- [x] Task 4: Verify Accessibility Compliance (AC: #1, #2, #3)
  - [x] 4.1: Run site locally and tab through page - verify skip link is first focusable element
  - [x] 4.2: Activate skip link and verify focus moves to main content area
  - [x] 4.3: Inspect HTML in browser - verify `lang="en"` on html element
  - [x] 4.4: Verify heading-anchors web component doesn't interfere with landmark detection

## Dev Notes

### Critical Context: Partial Implementation Already Exists

**Story 1-1 already created `_includes/layouts/base.njk`** with most accessibility features:
- ✅ Skip link exists (line 46)
- ✅ Skip link styled with `.skip-link` class (sr-only until focused)
- ✅ Header has `role="banner"` (line 48)
- ✅ Footer has `role="contentinfo"` (line 68)
- ✅ Main has `tabindex="-1"` (line 62)
- ✅ HTML has `lang="{{ metadata.language }}"` (line 2)
- ⚠️ **NEEDS FIX:** Main element id is `main`, architecture requires `main-content`
- ⚠️ **NEEDS FIX:** Nav element missing `aria-label="Main navigation"`

### Architecture-Mandated Pattern

From `architecture.md#HTML/Accessibility Patterns`:

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

### Current base.njk Structure (Key Lines)

```njk
<!-- Line 2 -->
<html lang="{{ metadata.language }}">

<!-- Line 46 - Skip link (needs href update) -->
<a href="#main" id="skip-link" class="skip-link">Skip to main content</a>

<!-- Line 48-60 - Header with nav -->
<header role="banner">
  <a href="/" class="home-link">{{ metadata.title }}</a>
  <nav>  <!-- MISSING: aria-label="Main navigation" -->
    <h2 class="visually-hidden">Top level navigation menu</h2>
    <ul class="nav">
    {%- for entry in collections.all | eleventyNavigation %}
      <li class="nav-item"><a href="{{ entry.url }}"...>{{ entry.title }}</a></li>
    {%- endfor %}
    </ul>
  </nav>
</header>

<!-- Line 62-66 - Main (needs id update) -->
<main id="main" tabindex="-1">  <!-- CHANGE to id="main-content" -->
  <heading-anchors>
    {{ content | safe }}
  </heading-anchors>
</main>

<!-- Line 68-71 - Footer -->
<footer role="contentinfo">
```

### Skip Link CSS (Already Correct)

From `css/main.css:25-29`:
```css
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50;
  @apply bg-cream text-black px-4 py-2 border-2 border-black shadow-brutal;
}
```

This correctly:
- Hides skip link visually (`sr-only`)
- Shows on focus (`focus:not-sr-only`)
- Positions at top-left with brutalist styling

### Layout Inheritance Chain

```
base.njk (accessibility landmarks)
├── home.njk (extends base.njk ✓)
├── post.njk (extends base.njk ✓)
└── page.njk (needs creation if missing)
```

### Technical Requirements

| Requirement | Specification | Source |
|-------------|---------------|--------|
| HTML lang | `lang="en"` | [WCAG 3.1.1] |
| Skip link | First focusable, targets `#main-content` | [Architecture] |
| Main element | `id="main-content"`, `tabindex="-1"` | [Architecture] |
| Nav element | `aria-label="Main navigation"` | [Architecture] |
| Landmarks | banner, navigation, main, contentinfo | [WCAG 1.3.1] |

### Files to Modify

| File | Changes |
|------|---------|
| `_includes/layouts/base.njk` | Update main id, skip link href, add nav aria-label |
| `_includes/layouts/page.njk` | Create if missing (extends base.njk) |

### Verification Commands

```bash
# Build and serve
npm run dev

# In browser console, verify landmarks
document.querySelector('[role="banner"]')     // Should find header
document.querySelector('[role="contentinfo"]') // Should find footer
document.querySelector('main#main-content')    // Should find main
document.querySelector('nav[aria-label]')      // Should find nav

# Tab test: First Tab should focus skip link
# Enter on skip link: Focus should move to main content
```

### Project Structure Notes

After this story, all page templates inherit accessibility landmarks from `base.njk`:
- No accessibility code duplication
- Consistent landmark structure across all pages
- Skip link functions correctly for keyboard users

### Previous Story Intelligence

**From Story 1-1:**
- Base layout created with most ARIA landmarks
- Skip link styled with brutalist design
- `heading-anchors` web component wraps content (doesn't affect landmarks)

**From Story 1-2:**
- CSS custom properties and utility classes complete
- `prefers-reduced-motion` support in place
- Brutalist design tokens ready for any new elements

### Git Intelligence

**Commit 14cf91f:** `feat: initialize 11ty portfolio with brutalist design system`
- Established base.njk with initial accessibility structure
- Used `id="main"` instead of `id="main-content"` (needs alignment)

**Commit b49e973:** `feat: add Tailwind CSS brutalist design tokens and test page`
- Added focus states to hover utilities
- Design test page created with proper accessibility landmarks

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#HTML/Accessibility Patterns]
- [Source: _bmad-output/planning-artifacts/architecture.md#Required Landmarks (Every Page)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Focus Management]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3]
- [Source: _bmad-output/implementation-artifacts/1-1-*.md] - Previous story learnings
- [Source: WCAG 2.1 Success Criterion 1.3.1 - Info and Relationships]
- [Source: WCAG 2.1 Success Criterion 2.4.1 - Bypass Blocks]
- [Source: WCAG 2.1 Success Criterion 3.1.1 - Language of Page]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None

### Completion Notes List

- ✅ Updated main element id from `main` to `main-content` in base.njk:62
- ✅ Updated skip link href from `#main` to `#main-content` in base.njk:46
- ✅ Added `aria-label="Main navigation"` to nav element in base.njk:52
- ✅ Created page.njk layout extending base.njk for general pages
- ✅ Fixed design-test.njk duplicate main element (changed to div wrapper)
- ✅ Added blog.json directory data to configure post layout for blog posts
- ✅ Added projects.json directory data to configure page layout for projects
- ✅ Installed Playwright and axe-core for accessibility testing
- ✅ Created comprehensive accessibility-landmarks.spec.ts test suite (12 tests)
- ✅ All 12 tests pass: landmarks, skip link functionality, layout inheritance, axe validation

### File List

**Modified:**
- _includes/layouts/base.njk - Updated main id, skip link href, added nav aria-label
- content/design-test.njk - Changed main wrapper to div to avoid duplicate id
- package.json - Added Playwright, axe-core, test scripts
- css/index.css - Removed dead skip-link CSS (code review fix)
- tests/accessibility-landmarks.spec.ts - Added page.njk layout test, documented URL dependencies (code review fix)

**Created:**
- _includes/layouts/page.njk - New general page layout extending base.njk
- content/blog/blog.json - Directory data for blog post layouts
- content/projects/projects.json - Directory data for project page layouts
- playwright.config.ts - Playwright test configuration
- tests/accessibility-landmarks.spec.ts - Accessibility landmark test suite (13 tests)

## Senior Developer Review (AI)

**Reviewer:** Amelia (Dev Agent) | **Date:** 2026-01-29 | **Model:** Claude Opus 4.5

### Review Outcome: ✅ APPROVED

**AC Validation:** All 3 Acceptance Criteria verified implemented
**Task Audit:** All 15 tasks/subtasks marked [x] confirmed complete
**Test Coverage:** 13/13 tests passing (12 original + 1 added for page.njk)

### Issues Found & Fixed

| Severity | Issue | Resolution |
|----------|-------|------------|
| MEDIUM | Dead CSS in index.css for `#skip-link.visually-hidden:focus` | Removed redundant CSS, consolidated to main.css |
| MEDIUM | No test coverage for page.njk layout | Added test for project page using page.njk |
| MEDIUM | Hardcoded blog post URL in test | Added documentation comment |

### Issues Noted (Not Fixed - Low Priority)

- projects.json uses page.njk instead of architecture-specified project.njk (acceptable until project.njk created)
- package-lock.json not in File List (auto-generated, expected behavior)
