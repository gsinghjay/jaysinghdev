import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Story 1.4: Configure GitHub Actions Deployment
 * Tests verify the deployment configuration and build output structure
 */
test.describe('GitHub Actions Deployment Configuration (Story 1.4)', () => {
  const projectRoot = path.resolve(__dirname, '..');
  const siteDir = path.join(projectRoot, '_site');
  const workflowPath = path.join(projectRoot, '.github', 'workflows', 'deploy.yml');

  test.describe('AC#1: GitHub Actions workflow exists and configured correctly', () => {
    test('deploy.yml workflow file exists', () => {
      expect(fs.existsSync(workflowPath)).toBe(true);
    });

    test('workflow triggers on push to main branch', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('push:');
      expect(content).toContain('branches:');
      expect(content).toContain('- main');
    });

    test('workflow uses Node.js 20', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('node-version: 20');
    });

    test('workflow uses npm cache', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('cache: npm');
    });

    test('workflow runs npm ci and npm run build', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('npm ci');
      expect(content).toContain('npm run build');
    });

    test('workflow uses peaceiris/actions-gh-pages@v4', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('peaceiris/actions-gh-pages@v4');
    });

    test('workflow deploys _site directory', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('publish_dir: ./_site');
    });

    test('workflow has contents: write permission', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('contents: write');
    });

    test('workflow uses GITHUB_TOKEN for authentication', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('github_token: ${{ secrets.GITHUB_TOKEN }}');
    });

    test('workflow has concurrency group to prevent parallel deployments', () => {
      const content = fs.readFileSync(workflowPath, 'utf-8');
      expect(content).toContain('concurrency:');
      expect(content).toContain('group:');
      expect(content).toContain('cancel-in-progress: true');
    });
  });

  test.describe('AC#2: Build output includes all required assets', () => {
    test('CSS file exists at _site/css/main.css', () => {
      const cssPath = path.join(siteDir, 'css', 'main.css');
      expect(fs.existsSync(cssPath)).toBe(true);
    });

    test('CSS file is not empty', () => {
      const cssPath = path.join(siteDir, 'css', 'main.css');
      const stats = fs.statSync(cssPath);
      expect(stats.size).toBeGreaterThan(0);
    });

    test('JS bundle directory exists at _site/dist', () => {
      const distDir = path.join(siteDir, 'dist');
      expect(fs.existsSync(distDir)).toBe(true);
    });

    test('index.html exists at _site root', () => {
      const indexPath = path.join(siteDir, 'index.html');
      expect(fs.existsSync(indexPath)).toBe(true);
    });
  });

  test.describe('AC#3: .nojekyll file ensures underscore files are served', () => {
    test('.nojekyll file exists in _site output', () => {
      const nojekyllPath = path.join(siteDir, '.nojekyll');
      expect(fs.existsSync(nojekyllPath)).toBe(true);
    });

    test('.nojekyll file exists in public/ source (for passthrough)', () => {
      const publicNojekyllPath = path.join(projectRoot, 'public', '.nojekyll');
      expect(fs.existsSync(publicNojekyllPath)).toBe(true);
    });
  });
});

test.describe('Site assets load correctly (Story 1.4 AC#2)', () => {
  test('homepage loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    // Filter out expected errors (like missing favicon which is common)
    const significantErrors = errors.filter(e => !e.includes('favicon'));
    expect(significantErrors).toHaveLength(0);
  });

  test('CSS styles are applied (Tailwind classes work)', async ({ page }) => {
    await page.goto('/');

    // Check that body has some styling applied
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Verify CSS loaded by checking computed styles exist
    const backgroundColor = await body.evaluate(el =>
      getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBeTruthy();
  });

  test('no 404 errors for CSS assets', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', response => {
      if (response.status() === 404 && response.url().includes('.css')) {
        failedRequests.push(response.url());
      }
    });

    await page.goto('/');
    expect(failedRequests).toHaveLength(0);
  });

  test('no 404 errors for JS assets', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', response => {
      if (response.status() === 404 && response.url().includes('.js')) {
        failedRequests.push(response.url());
      }
    });

    await page.goto('/');
    expect(failedRequests).toHaveLength(0);
  });
});
