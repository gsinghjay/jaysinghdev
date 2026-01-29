import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Landmarks (Story 1.3)', () => {
  test.describe('AC#1: Screen reader landmarks', () => {
    test('identifies banner (header) landmark', async ({ page }) => {
      await page.goto('/');
      const header = page.locator('header[role="banner"]');
      await expect(header).toBeVisible();
    });

    test('identifies navigation landmark with aria-label', async ({ page }) => {
      await page.goto('/');
      const nav = page.locator('nav[aria-label="Main navigation"]');
      await expect(nav).toBeVisible();
    });

    test('identifies main content landmark', async ({ page }) => {
      await page.goto('/');
      const main = page.locator('main#main-content');
      await expect(main).toBeVisible();
      await expect(main).toHaveAttribute('tabindex', '-1');
    });

    test('identifies contentinfo (footer) landmark', async ({ page }) => {
      await page.goto('/');
      const footer = page.locator('footer[role="contentinfo"]');
      await expect(footer).toBeVisible();
    });

    test('skip link is first focusable element', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      const skipLink = page.locator('#skip-link');
      await expect(skipLink).toBeFocused();
    });
  });

  test.describe('AC#2: Skip link functionality', () => {
    test('skip link is visually hidden until focused', async ({ page }) => {
      await page.goto('/');
      const skipLink = page.locator('#skip-link');

      // Before focus, skip link should be visually hidden (sr-only uses clip/overflow)
      // Check that the element is clipped/hidden via CSS
      const beforeStyles = await skipLink.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          clip: computed.clip,
          overflow: computed.overflow,
          position: computed.position,
        };
      });
      expect(beforeStyles.clip).toBe('rect(0px, 0px, 0px, 0px)');
      expect(beforeStyles.overflow).toBe('hidden');
      expect(beforeStyles.position).toBe('absolute');

      // After focus, skip link should be visible (not clipped)
      await page.keyboard.press('Tab');
      await expect(skipLink).toBeFocused();
      const afterStyles = await skipLink.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          clip: computed.clip,
          overflow: computed.overflow,
          width: el.offsetWidth,
          height: el.offsetHeight,
        };
      });
      expect(afterStyles.clip).toBe('auto');
      expect(afterStyles.overflow).toBe('visible');
      expect(afterStyles.width).toBeGreaterThan(1);
      expect(afterStyles.height).toBeGreaterThan(1);
    });

    test('activating skip link moves focus to main content', async ({ page }) => {
      await page.goto('/');

      // Focus skip link and activate it
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      // Focus should now be on main content
      const main = page.locator('main#main-content');
      await expect(main).toBeFocused();
    });
  });

  test.describe('AC#3: Layout inheritance and lang attribute', () => {
    test('HTML document has lang="en" attribute', async ({ page }) => {
      await page.goto('/');
      const html = page.locator('html');
      await expect(html).toHaveAttribute('lang', 'en');
    });

    // Note: This test depends on a specific blog post existing. If renamed/deleted, update URL.
    test('blog post inherits accessibility landmarks from base layout', async ({ page }) => {
      await page.goto('/blog/building-fastapi-microservices/');

      // Verify all landmarks exist on blog post page
      await expect(page.locator('header[role="banner"]')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('home page inherits accessibility landmarks from base layout', async ({ page }) => {
      await page.goto('/');

      // Verify all landmarks exist on home page
      await expect(page.locator('header[role="banner"]')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
    });

    // Note: This test depends on a specific project existing. If renamed/deleted, update URL.
    test('project page (page.njk layout) inherits accessibility landmarks from base layout', async ({ page }) => {
      await page.goto('/projects/authentication-gateway/');

      // Verify all landmarks exist on project page using page.njk layout
      await expect(page.locator('header[role="banner"]')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
      await expect(page.locator('main#main-content')).toBeVisible();
      await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });

  test.describe('Axe accessibility validation', () => {
    test('homepage has no accessibility violations for landmarks', async ({ page }) => {
      await page.goto('/');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .include('header, nav, main, footer')
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('blog post page has no accessibility violations for landmarks', async ({ page }) => {
      await page.goto('/blog/building-fastapi-microservices/');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .include('header, nav, main, footer')
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
});
