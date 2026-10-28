import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const TEST_USER = {
  uid: "test_dashboard_user",
  id: "test_dashboard_user",
  name: "Aman Sharma",
  email: "aman.sharma@chitkara.edu.in",
  isPro: false
};

const outputDir = path.resolve("test-results/visual-dashboard-hero");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);

  await page.goto("http://localhost:5173/dashboard");
  await page.waitForSelector(".hero_part");

  // Capture Hero Section
  const hero = page.locator(".hero_part");
  await hero.screenshot({ path: path.join(outputDir, "hero-dashboard-light.png") });

  // Capture Theme Toggle Slider
  const toggle = page.locator(".theme-toggle");
  await toggle.screenshot({ path: path.join(outputDir, "theme-toggle-slider-light.png") });

  // Toggle Dark Mode
  await toggle.click();
  await page.waitForTimeout(400);

  // Capture in Dark Mode
  await hero.screenshot({ path: path.join(outputDir, "hero-dashboard-dark.png") });
  await toggle.screenshot({ path: path.join(outputDir, "theme-toggle-slider-dark.png") });

  await browser.close();
  console.log("Screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Visual capture error:", err);
  process.exit(1);
});
