import { test, expect } from "@playwright/test";

const TEST_USER = {
  uid: "test_student_101",
  id: "test_student_101",
  name: "Aman Sharma",
  email: "aman.sharma@chitkara.edu.in",
  isPro: false
};

test.beforeEach(async ({ page }) => {
  // Inject authenticated test user
  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);
});

test.describe("LinkedIn-Style Messages Hub", () => {
  test("1. Direct navigation loads messaging page and conversation list", async ({ page }) => {
    await page.goto("/messages");

    await expect(page.locator(".messages-page-wrapper")).toBeVisible();
    await expect(page.locator(".conversations-title-row h2")).toContainText("Messaging");

    // Conversation list contains seed conversations (Misthi Rawal, Aisha Khan)
    const convItems = page.locator(".conversation-card-item");
    await expect(convItems.first()).toBeVisible();
    await expect(page.locator(".conversations-list")).toContainText("Misthi Rawal");
    await expect(page.locator(".conversations-list")).toContainText("Aisha Khan");
  });

  test("2. Navigating with ?user= parameter opens recipient thread directly", async ({ page }) => {
    await page.goto("/messages?user=stu_002");

    await expect(page.locator(".chat-peer-name")).toContainText("Aisha Khan");
    const activeItem = page.locator(".conversation-card-item.active");
    await expect(activeItem).toContainText("Aisha Khan");
  });

  test("3. Composing and sending a message adds bubble to chat and updates list", async ({ page }) => {
    await page.goto("/messages?user=stu_001");

    const textarea = page.locator(".chat-textarea");
    await expect(textarea).toBeVisible();
    await textarea.fill("Hello Misthi, let's connect for the hackathon!");

    const sendBtn = page.locator("[data-testid='chat-send-btn']");
    await sendBtn.click();

    // Bubble appears in stream
    const sentBubble = page.locator(".chat-bubble-row.sent .chat-bubble").last();
    await expect(sentBubble).toBeVisible();
    await expect(sentBubble).toContainText("Hello Misthi, let's connect for the hackathon!");

    // Conversation preview updates
    const activeItem = page.locator(".conversation-card-item.active");
    await expect(activeItem.locator(".conversation-last-msg")).toContainText("Hello Misthi");

    // Persisted in localStorage
    const saved = await page.evaluate((uid) => {
      return localStorage.getItem(`talentforge_messages_v1_${uid}`);
    }, TEST_USER.uid);
    expect(saved).toContain("Hello Misthi, let's connect for the hackathon!");
  });

  test("4. Clicking quick suggestion chip populates composer", async ({ page }) => {
    await page.goto("/messages?user=stu_001");

    const suggestion = page.locator(".chat-suggestion-chip").first();
    await suggestion.click();

    const textarea = page.locator(".chat-textarea");
    await expect(textarea).not.toBeEmpty();
  });

  test("5. Filtering conversations by peer name in search box", async ({ page }) => {
    await page.goto("/messages");

    const searchInput = page.locator(".conversations-search-input");
    await searchInput.fill("Aisha");

    await expect(page.locator(".conversations-list")).toContainText("Aisha Khan");
    await expect(page.locator(".conversations-list")).not.toContainText("Misthi Rawal");
  });

  test("6. Dark theme preserves readability and contrast", async ({ page }) => {
    await page.goto("/messages");

    const themeToggle = page.locator(".theme-toggle");
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(page.locator(".messages-page-wrapper")).toBeVisible();
      await expect(page.locator(".chat-window-panel")).toBeVisible();
    }
  });

  test("7. Mobile view toggles between conversation list and active chat", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/messages");

    // In mobile initially without ?user=, conversation list is visible
    const convSidebar = page.locator(".conversations-sidebar");
    await expect(convSidebar).toBeVisible();

    // Click on a conversation
    await page.locator(".conversation-card-item").first().click();

    // Active chat is visible and back button works
    const chatPanel = page.locator(".chat-window-panel");
    await expect(chatPanel).toBeVisible();

    const backBtn = page.locator("button.chat-back-btn");
    await expect(backBtn).toBeVisible();
    await backBtn.click();

    // Returns to conversations list
    await expect(convSidebar).toBeVisible();
  });
});
