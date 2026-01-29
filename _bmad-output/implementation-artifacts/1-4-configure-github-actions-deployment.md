# Story 1.4: Configure GitHub Actions Deployment

Status: review

## Story

As a **template user**,
I want automatic deployment to GitHub Pages on push to main,
So that my content updates go live without manual deployment steps.

## Acceptance Criteria

1. **Given** a commit is pushed to the main branch
   **When** GitHub Actions workflow runs
   **Then** the site builds and deploys to GitHub Pages
   **And** the deployment completes successfully

2. **Given** the repository is configured for GitHub Pages
   **When** I visit the GitHub Pages URL
   **Then** the site loads correctly
   **And** all assets (CSS, JS) load without 404 errors

3. **Given** the `.nojekyll` file exists in the output
   **When** GitHub Pages serves the site
   **Then** files starting with underscores are served correctly

## Tasks / Subtasks

- [x] Task 1: Create GitHub Pages Deployment Workflow (AC: #1, #3)
  - [x] 1.1: Create `.github/workflows/deploy.yml` with GitHub Pages deployment
  - [x] 1.2: Configure workflow to trigger on push to `main` branch
  - [x] 1.3: Add Node.js setup with version 20 and npm cache
  - [x] 1.4: Add `npm ci` and `npm run build` steps
  - [x] 1.5: Use `peaceiris/actions-gh-pages@v4` to deploy `_site/` to gh-pages branch
  - [x] 1.6: Add `.nojekyll` file to output via workflow (passthrough already configured)

- [x] Task 2: Configure Workflow Permissions (AC: #1)
  - [x] 2.1: Add `contents: write` permission for gh-pages branch push
  - [x] 2.2: Use `GITHUB_TOKEN` for authentication (no PAT needed)
  - [x] 2.3: Add concurrency group to prevent parallel deployments

- [x] Task 3: Ensure Output Includes Required Files (AC: #2, #3)
  - [x] 3.1: Verify `.nojekyll` is copied to `_site/` (already in passthrough via `public/`)
  - [x] 3.2: Move `.nojekyll` from root to `public/` folder if needed for passthrough
  - [x] 3.3: Verify CSS/JS assets are built to `_site/css/` and `_site/dist/`

- [x] Task 4: Update Semantic Release Workflow (AC: #1)
  - [x] 4.1: Rename existing `release.yml` to run after successful deploy (optional)
  - [x] 4.2: Consider separating build/deploy from versioning concerns
  - [x] 4.3: Ensure workflows don't conflict or run redundantly

- [x] Task 5: Verify Deployment Configuration (AC: #2)
  - [x] 5.1: Document GitHub Pages settings required (source: gh-pages branch, root)
  - [x] 5.2: Verify base URL matches `https://jaysingh.dev/` in feed config
  - [x] 5.3: Test local build with `npm run build` completes successfully

## Dev Notes

### Critical Context: Existing Workflow Infrastructure

**Current State:**
- ✅ `.nojekyll` exists in project root (needs to be in `_site/` output)
- ✅ `release.yml` workflow exists for semantic-release versioning
- ✅ `HtmlBasePlugin` configured in eleventy.config.js for pathPrefix support
- ✅ Build command `npm run build` works (CSS + 11ty)
- ⚠️ **NEEDS:** Separate deployment workflow `deploy.yml`
- ⚠️ **NEEDS:** `.nojekyll` in `public/` folder for passthrough copy

### Architecture-Mandated Deployment Pattern

From `architecture.md#Deployment Structure`:

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

### Required Workflow Configuration

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

# Prevent multiple deployments from running simultaneously
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

### .nojekyll Placement

**Issue:** `.nojekyll` is in project root but needs to be in `_site/` output.

**Solution:** Move to `public/` folder for passthrough copy:
```
public/.nojekyll  →  _site/.nojekyll
```

The eleventy.config.js passthrough already copies `./public/` to root of `_site/`:
```javascript
eleventyConfig.addPassthroughCopy({
  "./public/": "/"
});
```

### Existing Semantic Release Workflow

**File:** `.github/workflows/release.yml` (already exists)

This workflow handles:
- Semantic versioning (CHANGELOG generation)
- Git tags on main branch
- Runs after push to main

**Decision:** Keep both workflows separate:
1. `deploy.yml` - Deploys site to GitHub Pages
2. `release.yml` - Creates version tags and changelog

They can run in parallel since they serve different purposes.

### Build Pipeline Verification

**Build Output Structure (from `npm run build`):**
```
_site/
├── index.html
├── blog/
│   └── */index.html
├── projects/
│   └── */index.html
├── css/
│   └── main.css (Tailwind compiled)
├── dist/
│   └── *.js (bundled scripts)
├── feed/
│   └── feed.xml
└── .nojekyll (after fix)
```

### GitHub Pages Settings (Manual Configuration)

User must configure in GitHub repository settings:
1. Settings → Pages → Source: "Deploy from a branch"
2. Branch: `gh-pages` / `root`
3. Custom domain: `jaysingh.dev` (if applicable)

### Previous Story Learnings

**From Story 1-3:**
- Playwright tests are configured and passing
- Build process completes successfully
- All accessibility landmarks in place
- CSS compilation with Tailwind works

**From Story 1-2:**
- Tailwind CSS configured with brutalist design tokens
- Build creates minified CSS in `_site/css/main.css`

**From Story 1-1:**
- 11ty configuration stable
- HtmlBasePlugin enabled for path prefix support
- Feed configured with base URL `https://jaysingh.dev/`

### Git Intelligence

**Recent Commits:**
```
f503042 feat: add accessibility landmarks and skip link to base layout
35de9ac ci: add semantic-release for automated versioning
b49e973 feat: add Tailwind CSS brutalist design tokens and test page
14cf91f feat: initialize 11ty portfolio with brutalist design system
```

**Patterns Established:**
- Conventional commits used (feat:, ci:, etc.)
- Semantic release integrated for versioning
- Workflow files use Node 20 with npm cache

### Technical Requirements

| Requirement | Specification | Source |
|-------------|---------------|--------|
| GitHub Action | peaceiris/actions-gh-pages@v4 | [Architecture] |
| Node Version | 20 | [package.json engines] |
| Build Command | `npm run build` | [package.json scripts] |
| Output Directory | `_site/` | [eleventy.config.js] |
| Deploy Branch | gh-pages | [Architecture] |
| .nojekyll | Must exist in _site/ | [FR42] |

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `.github/workflows/deploy.yml` | Create | GitHub Pages deployment workflow |
| `public/.nojekyll` | Create | Empty file for passthrough to _site |
| `.nojekyll` (root) | Consider removing | Redundant after moving to public/ |

### Verification Steps

```bash
# 1. Verify local build succeeds
npm run build

# 2. Check .nojekyll is in output
ls -la _site/.nojekyll

# 3. Check CSS/JS assets exist
ls -la _site/css/
ls -la _site/dist/

# 4. Preview production build
npm run preview

# 5. After push, verify GitHub Actions
# - Check Actions tab for successful workflow run
# - Verify gh-pages branch created/updated
# - Visit GitHub Pages URL
```

### Project Structure Notes

**Workflow files location:** `.github/workflows/`
- `deploy.yml` - Site deployment (new)
- `release.yml` - Semantic versioning (existing)

**Passthrough copy pattern:**
```
public/           →  _site/
public/.nojekyll  →  _site/.nojekyll
public/favicon.ico → _site/favicon.ico
```

### Error Handling Considerations

**Common Issues:**
1. **Permissions error:** Ensure `contents: write` in workflow
2. **Build fails:** Check Node version matches package.json engines
3. **CSS 404:** Ensure `npm run build` includes both Tailwind and 11ty
4. **Underscore files 404:** Ensure `.nojekyll` is in `_site/`

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Deployment Structure]
- [Source: _bmad-output/planning-artifacts/architecture.md#GitHub Pages Deployment]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4]
- [Source: _bmad-output/implementation-artifacts/1-3-*.md] - Previous story
- [peaceiris/actions-gh-pages Documentation](https://github.com/peaceiris/actions-gh-pages)
- [11ty Deployment to GitHub Pages](https://www.11ty.dev/docs/deployment/#deploy-to-github-pages)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None required - implementation straightforward.

### Completion Notes List

1. **Task 1 - Deploy Workflow Created:** Created `.github/workflows/deploy.yml` with:
   - Trigger on push to main branch
   - Node.js 20 with npm cache
   - `npm ci` and `npm run build` steps
   - peaceiris/actions-gh-pages@v4 deploying `_site/` to gh-pages branch

2. **Task 2 - Permissions Configured:** Workflow includes:
   - `contents: write` permission for gh-pages push
   - GITHUB_TOKEN authentication (no PAT required)
   - Concurrency group `deploy-${{ github.ref }}` with cancel-in-progress

3. **Task 3 - Output Files Verified:**
   - Created `public/.nojekyll` for passthrough to `_site/`
   - Build verified: `.nojekyll`, `css/main.css`, `dist/*.js` all present in `_site/`

4. **Task 4 - Workflow Separation:** Per architecture decision, kept workflows separate:
   - `deploy.yml` - Site deployment to GitHub Pages
   - `release.yml` - Semantic versioning (unchanged)
   - Workflows run in parallel on push to main, no conflicts

5. **Task 5 - Configuration Verified:**
   - GitHub Pages settings documented in Dev Notes (gh-pages branch, root)
   - Feed base URL confirmed: `https://jaysingh.dev/` (eleventy.config.js:82)
   - Local build completes successfully

6. **Tests Added:** Created `tests/deployment-config.spec.ts` with 20 tests covering:
   - Workflow file structure and configuration (AC#1)
   - Build output assets verification (AC#2)
   - .nojekyll file presence (AC#3)
   - Runtime asset loading without 404 errors

### File List

**Created:**
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
- `public/.nojekyll` - Empty file for Jekyll bypass (passthrough copy)
- `tests/deployment-config.spec.ts` - Playwright tests for deployment config

**Modified:**
- `_bmad-output/implementation-artifacts/sprint-status.yaml` - Status updated

### Change Log

- 2026-01-29: Implemented GitHub Actions deployment workflow for GitHub Pages (Story 1.4)

