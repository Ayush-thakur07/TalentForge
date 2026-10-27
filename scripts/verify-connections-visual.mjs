import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const TEST_USER = {
  uid: "visual_test_user",
  id: "visual_test_user",
  name: "Visual Reviewer",
  email: "reviewer@chitkara.edu.in",
  isPro: false
};

const outputDir = path.resolve("test-results/visual");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log("Launching Chromium at /usr/bin/chromium...");
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  // Inject user
  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);

  console.log("Navigating to http://localhost:5173/connections...");
  await page.goto("http://localhost:5173/connections");
  await page.waitForSelector("[data-testid='connections-page']");

  // 1. Capture Desktop Light Mode
  console.log("Capturing 1-connections-light-desktop.png...");
  await page.screenshot({ path: path.join(outputDir, "1-connections-light-desktop.png"), fullPage: false });

  // 2. Open Contact Modal and capture
  console.log("Opening Contact Modal...");
  const contactBtn = page.locator("button.contact-btn").first();
  await contactBtn.click();
  await page.waitForSelector(".contact-modal");
  await page.locator(".contact-preset-chip").first().click();

  console.log("Capturing 2-contact-modal-open.png...");
  await page.screenshot({ path: path.join(outputDir, "2-contact-modal-open.png"), fullPage: false });

  // Close modal with Escape
  await page.keyboard.press("Escape");
  await page.waitForSelector(".contact-modal", { state: "hidden" });

  // 3. Toggle to Dark Theme
  console.log("Toggling Dark Theme...");
  const themeToggle = page.locator(".theme-toggle");
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
    await page.waitForSelector("html[data-theme='dark']");
  }

  console.log("Capturing 3-connections-dark-desktop.png...");
  await page.screenshot({ path: path.join(outputDir, "3-connections-dark-desktop.png"), fullPage: false });

  // 4. Test Invitations Tab in Dark Mode
  console.log("Switching to Invitations tab...");
  await page.locator("button.connections-tab-btn:has-text('Invitations')").click();
  await page.waitForSelector("[data-testid='incoming-requests-grid']");
  await page.screenshot({ path: path.join(outputDir, "4-invitations-dark.png"), fullPage: false });

  // 5. Mobile viewport clearance check
  console.log("Testing Mobile Viewport (390x844)...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("button.connections-tab-btn:has-text('My Connections')").click();
  await page.waitForSelector("[data-testid='active-connections-grid']");

  // Verify padding bottom on mobile
  const paddingBottom = await page.$eval(".connections-page", (el) => {
    return window.getComputedStyle(el).paddingBottom;
  });
  console.log(`Mobile .connections-page padding-bottom computed style: ${paddingBottom}`);

  console.log("Capturing 5-connections-mobile.png...");
  await page.screenshot({ path: path.join(outputDir, "5-connections-mobile.png"), fullPage: false });

  await browser.close();
  console.log("Visual verification complete! All screenshots saved in test-results/visual/");
}

run().catch((err) => {
  console.error("Visual verification failed:", err);
  process.exit(1);
});
