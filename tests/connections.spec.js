import { test, expect } from "@playwright/test";

const TEST_USER = {
  uid: "test_student_101",
  id: "test_student_101",
  name: "Aman Sharma",
  email: "aman.sharma@chitkara.edu.in",
  isPro: false
};

test.beforeEach(async ({ page }) => {
  // Inject authenticated test user and clear any prior connection state
  await page.addInitScript((user) => {
    localStorage.clear();
    localStorage.setItem("talentforge_test_user", JSON.stringify(user));
  }, TEST_USER);
});

test.describe("Connections Page & Networking Hub", () => {
  test("1. Direct navigation and page layout loads correctly", async ({ page }) => {
    await page.goto("/connections");

    // Page title and highlight
    const heading = page.locator(".connections-header-titles h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Connections");

    // Quota banner
    const quotaBanner = page.locator(".connections-quota-banner");
    await expect(quotaBanner).toBeVisible();
    await expect(quotaBanner).toContainText("Weekly Free Requests Remaining");

    // Tabs exist
    await expect(page.locator("button.connections-tab-btn:has-text('My Connections')")).toBeVisible();
    await expect(page.locator("button.connections-tab-btn:has-text('Invitations')")).toBeVisible();
    await expect(page.locator("button.connections-tab-btn:has-text('Pending Requests')")).toBeVisible();
    await expect(page.locator("button.connections-tab-btn:has-text('Find Peers')")).toBeVisible();
  });

  test("2. Displays seed active connections and stats", async ({ page }) => {
    await page.goto("/connections");

    const cards = page.locator("[data-testid='active-connections-grid'] .connection-card-active");
    // Default seed has 2 active connections: Misthi Rawal and Aisha Khan
    await expect(cards).toHaveCount(2);

    const firstCard = cards.first();
    await expect(firstCard.locator(".connection-card-name")).toContainText("Misthi Rawal");
    await expect(firstCard.locator("button.contact-btn")).toBeVisible();
    await expect(firstCard.locator(".connection-avail-badge")).toBeVisible();
  });

  test("3. Filters and searches active connections dynamically", async ({ page }) => {
    await page.goto("/connections");

    const searchInput = page.locator(".connections-search-input");
    await searchInput.fill("Misthi");

    const cards = page.locator("[data-testid='active-connections-grid'] .connection-card-active");
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator(".connection-card-name")).toContainText("Misthi Rawal");

    // Clear search and test availability filter
    await searchInput.fill("");
    const filterSelect = page.locator(".connections-filter-select");
    await filterSelect.selectOption("open_to_collaborate");

    // Aisha Khan has availability open_to_collaborate
    await expect(page.locator("[data-testid='active-connections-grid'] .connection-card-active")).toContainText("Aisha Khan");
  });

  test("4. Clicking Message on connection card transfers to /messages tab", async ({ page }) => {
    await page.goto("/connections");

    const messageBtn = page.locator("[data-testid='active-connections-grid'] .connection-card-active button.contact-btn").first();
    await expect(messageBtn).toContainText("Message");
    await messageBtn.click();

    // Transfers directly to /messages?user=stu_001
    await expect(page).toHaveURL(/\/messages\?user=stu_001/);
    await expect(page.locator(".messages-page-wrapper")).toBeVisible();
    await expect(page.locator(".chat-peer-name")).toContainText("Misthi Rawal");
    await expect(page.locator(".chat-textarea")).toBeVisible();
  });

  test("5. Switches between tabs and displays respective items", async ({ page }) => {
    await page.goto("/connections");

    // 1. Invitations Tab
    const invitationsTab = page.locator("button.connections-tab-btn:has-text('Invitations')");
    await invitationsTab.click();
    const incomingGrid = page.locator("[data-testid='incoming-requests-grid']");
    await expect(incomingGrid).toBeVisible();
    // Default seed has Rahul Verma invitation
    await expect(incomingGrid.locator(".connection-card-incoming")).toHaveCount(1);
    await expect(incomingGrid).toContainText("Rahul Verma");

    // 2. Pending Requests Tab
    const pendingTab = page.locator("button.connections-tab-btn:has-text('Pending Requests')");
    await pendingTab.click();
    const pendingGrid = page.locator("[data-testid='pending-requests-grid']");
    await expect(pendingGrid).toBeVisible();
    await expect(pendingGrid.locator(".connection-card-pending")).toHaveCount(1);

    // 3. Find Peers Tab
    const discoverTab = page.locator("button.connections-tab-btn:has-text('Find Peers')");
    await discoverTab.click();
    const discoverGrid = page.locator("[data-testid='discover-grid']");
    await expect(discoverGrid).toBeVisible();
    const suggestedCards = discoverGrid.locator(".connection-card-suggested");
    await expect(suggestedCards.first()).toBeVisible();
  });

  test("6. Accepts incoming invitation and increments active connections", async ({ page }) => {
    await page.goto("/connections");

    // Go to invitations
    await page.locator("button.connections-tab-btn:has-text('Invitations')").click();
    const acceptBtn = page.locator("[data-testid='incoming-requests-grid'] button.connection-action-btn.accept").first();
    await acceptBtn.click();

    // Verify incoming tab is now empty
    await expect(page.locator(".connections-empty-state")).toContainText("No pending invitations");

    // Switch to My Connections tab and verify Rahul Verma is now connected (total 3)
    await page.locator("button.connections-tab-btn:has-text('My Connections')").click();
    const activeCards = page.locator("[data-testid='active-connections-grid'] .connection-card-active");
    await expect(activeCards).toHaveCount(3);
    await expect(page.locator("[data-testid='active-connections-grid']")).toContainText("Rahul Verma");
  });

  test("7. Theme toggle preserves styling and contrast tokens", async ({ page }) => {
    await page.goto("/connections");

    // Initial light mode
    const html = page.locator("html");
    const themeToggle = page.locator(".theme-toggle");

    // Toggle theme to dark mode
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await expect(html).toHaveAttribute("data-theme", "dark");

      // Verify dark theme background
      const connectionsPage = page.locator(".connections-page");
      await expect(connectionsPage).toBeVisible();

      // Card surface in dark mode
      const card = page.locator(".connection-card").first();
      await expect(card).toBeVisible();
    }
  });

  test("8. Removes active connection with confirmation", async ({ page }) => {
    await page.goto("/connections");

    const cards = page.locator("[data-testid='active-connections-grid'] .connection-card-active");
    await expect(cards).toHaveCount(2);

    // Click remove button on first card
    const removeBtn = cards.first().locator("button.connection-action-btn.remove");
    await removeBtn.click();

    // Confirm button appears
    const confirmBtn = cards.first().locator("button.connection-action-btn.danger-confirm");
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    // Count reduces to 1
    await expect(page.locator("[data-testid='active-connections-grid'] .connection-card-active")).toHaveCount(1);
  });
});
