import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const TEST_USER = {
  uid: "visual_audit_user",
  id: "visual_audit_user",
  name: "UI Auditor",
  email: "auditor@chitkara.edu.in",
  isPro: true
};

const outputDir = path.resolve("test-results/visual-ui-fixes");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const PAGES = [
  { name: "dashboard", path: "/dashboard", selector: ".dashboard-content" },
  { name: "students", path: "/students", selector: ".browse-students" },
  { name: "schedule", path: "/schedule", selector: ".planner-page" },
  { name: "saved", path: "/saved", selector: ".saved-page" },
  { name: "notifications", path: "/notifications", selector: ".notifications-page" },
  { name: "profile", path: "/profile", selector: ".profile-page" }
];

async function captureMode(page, isDark, modeLabel) {
  for (const item of PAGES) {
    console.log(`[${modeLabel}] Capturing ${item.name} (${item.path})...`);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`http://localhost:5173${item.path}`);
    await page.waitForSelector(item.selector);
    await page.waitForTimeout(100);

    const filename = `${item.name}-${modeLabel}-desktop.png`;
    await page.screenshot({ path: path.join(outputDir, filename), fullPage: false });

    // Also capture mobile for dark mode
    if (isDark) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: path.join(outputDir, `${item.name}-mobile.png`), fullPage: false });
    }
  }
}

async function run() {
  console.log("Launching Chromium at /usr/bin/chromium...");
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  // 1. Capture Light Mode
  console.log("\n--- LIGHT MODE ---");
  const lightContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const lightPage = await lightContext.newPage();
  await lightPage.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
    localStorage.setItem("talentforge_theme", "light");
  }, TEST_USER);
  await captureMode(lightPage, false, "light");
  await lightContext.close();

  // 2. Capture Dark Mode
  console.log("\n--- DARK MODE ---");
  const darkContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const darkPage = await darkContext.newPage();
  await darkPage.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
    localStorage.setItem("talentforge_theme", "dark");
  }, TEST_USER);
  await captureMode(darkPage, true, "dark");
  await darkContext.close();

  await browser.close();
  console.log("\nVisual audit completed cleanly! All screenshots saved in test-results/visual-ui-fixes/");
}

run().catch((err) => {
  console.error("Visual audit failed:", err);
  process.exit(1);
});
