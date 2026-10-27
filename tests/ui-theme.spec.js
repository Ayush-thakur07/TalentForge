import { test, expect } from "@playwright/test";

const TEST_USER = {
  uid: "ui_theme_verifier",
  id: "ui_theme_verifier",
  name: "Theme Verifier",
  email: "theme.verifier@chitkara.edu.in",
  isPro: true
};

const PAGES_TO_TEST = [
  { path: "/dashboard", selector: ".dashboard-content" },
  { path: "/students", selector: ".browse-students" },
  { path: "/schedule", selector: ".planner-page" },
  { path: "/saved", selector: ".saved-page" },
  { path: "/notifications", selector: ".notifications-page" },
  { path: "/profile", selector: ".profile-page" }
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);
});

test.describe("UI & Theme Harmonization Across Core Pages", () => {
  for (const { path, selector } of PAGES_TO_TEST) {
    test(`Page ${path} renders correctly in Light and Dark mode`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(selector)).toBeVisible();

      // Verify theme variables in Light mode
      const lightBg = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).getPropertyValue("--app-bg").trim();
      });
      expect(lightBg).toBe("#f5f7fb");

      // Toggle Dark Mode
      const themeToggle = page.locator(".theme-toggle");
      if (await themeToggle.isVisible()) {
        await themeToggle.click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

        const darkBg = await page.evaluate(() => {
          return window.getComputedStyle(document.documentElement).getPropertyValue("--app-bg").trim();
        });
        expect(darkBg).toBe("#0f172a");

        const darkSurface = await page.evaluate(() => {
          return window.getComputedStyle(document.documentElement).getPropertyValue("--surface").trim();
        });
        expect(darkSurface).toBe("#111827");
      }
    });

    test(`Page ${path} provides bottom navbar clearance on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(path);
      await expect(page.locator(selector)).toBeVisible();

      const paddingBottom = await page.$eval(selector, (el) => {
        return parseFloat(window.getComputedStyle(el).paddingBottom) || 0;
      });

      // Mobile clearance must be at least 80px to prevent navbar overlap
      expect(paddingBottom).toBeGreaterThanOrEqual(80);
    });
  }
});
