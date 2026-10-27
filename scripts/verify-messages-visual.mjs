import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const TEST_USER = {
  uid: "visual_messages_user",
  id: "visual_messages_user",
  name: "Visual Reviewer",
  email: "reviewer@chitkara.edu.in",
  isPro: false
};

const outputDir = path.resolve("test-results/visual-messages");
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

  // Inject authenticated test user
  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);

  // 1. Test transition from Connections page
  console.log("Navigating to /connections...");
  await page.goto("http://localhost:5173/connections");
  await page.waitForSelector("[data-testid='connections-page']");

  console.log("Clicking Message button on Misthi Rawal's card...");
  const messageBtn = page.locator("button.contact-btn").first();
  await messageBtn.click();

  await page.waitForSelector(".messages-page-wrapper");
  console.log("Capturing 1-transition-from-connections-to-messages.png...");
  await page.screenshot({ path: path.join(outputDir, "1-transition-from-connections-to-messages.png"), fullPage: false });

  // 2. Type and send a message
  console.log("Typing and sending a message...");
  const textarea = page.locator(".chat-textarea");
  await textarea.fill("Hey Misthi! Let's schedule a time to discuss the frontend architecture on TalentForge.");
  await page.locator("[data-testid='chat-send-btn']").click();

  await page.waitForSelector(".chat-bubble-row.sent");
  console.log("Capturing 2-chat-sent-message-desktop-light.png...");
  await page.screenshot({ path: path.join(outputDir, "2-chat-sent-message-desktop-light.png"), fullPage: false });

  // 3. Toggle Dark Mode
  console.log("Toggling Dark Mode...");
  const themeToggle = page.locator(".theme-toggle");
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
    await page.waitForSelector("html[data-theme='dark']");
  }

  console.log("Capturing 3-messages-desktop-dark.png...");
  await page.screenshot({ path: path.join(outputDir, "3-messages-desktop-dark.png"), fullPage: false });

  // 4. Mobile View
  console.log("Testing mobile viewport 390x844...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForSelector(".chat-window-panel");

  console.log("Capturing 4-messages-mobile-chat.png...");
  await page.screenshot({ path: path.join(outputDir, "4-messages-mobile-chat.png"), fullPage: false });

  // Click back button on mobile
  await page.locator("button.chat-back-btn").click();
  await page.waitForSelector(".conversations-sidebar");

  console.log("Capturing 5-messages-mobile-conversations-list.png...");
  await page.screenshot({ path: path.join(outputDir, "5-messages-mobile-conversations-list.png"), fullPage: false });

  await browser.close();
  console.log("Visual verification complete! All screenshots saved to test-results/visual-messages/");
}

run().catch((err) => {
  console.error("Visual verification failed:", err);
  process.exit(1);
});
