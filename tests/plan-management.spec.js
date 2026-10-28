import { test, expect } from "@playwright/test";

const PRO_TEST_USER = {
  uid: "test_student_pro",
  id: "test_student_pro",
  name: "Priya Patel",
  email: "priya.patel@chitkara.edu.in",
  isPro: true,
  plan: "pro"
};

test.describe("Pro Plan Management & Downgrade Flow", () => {
  test("1. Pro user sees active status and navigates to /manage-plan via Manage Pro button", async ({ page }) => {
    await page.addInitScript((user) => {
      localStorage.clear();
      localStorage.setItem("talentforge_test_user", JSON.stringify(user));
      localStorage.setItem(`talentforge_pro_active_${encodeURIComponent(user.uid)}`, "true");
    }, PRO_TEST_USER);

    await page.goto("/dashboard");

    // Sidebar shows TalentForge Pro ACTIVE card
    const proCard = page.locator(".upgrade-card.pro-active-card");
    await expect(proCard).toBeVisible();
    await expect(proCard.locator("h3")).toContainText("TalentForge Pro");
    await expect(proCard.locator(".pro-active-tag")).toContainText("ACTIVE");

    // Click "Manage Pro" button
    const manageBtn = proCard.locator(".upgrade-button");
    await expect(manageBtn).toBeVisible();
    await manageBtn.click();

    // Verify URL transitions to /manage-plan
    await expect(page).toHaveURL(/.*\/manage-plan/);

    // Verify Manage Plan page rendered
    await expect(page.locator(".manage-plan-page")).toBeVisible();
    await expect(page.locator(".hero-title")).toBeVisible();

    // Verify Pro card indicates active plan
    const activeProBtn = page.locator(".pro-card .btn-active-pro");
    await expect(activeProBtn).toBeVisible();
    await expect(activeProBtn).toBeDisabled();

    // Verify Free card provides downgrade option
    const downgradeBtn = page.locator(".free-card .btn-downgrade-plan");
    await expect(downgradeBtn).toBeVisible();
    await expect(downgradeBtn).toContainText("Switch to Free");
  });

  test("2. Pro user can downgrade to Free plan and revert back to non-Pro", async ({ page }) => {
    await page.addInitScript((user) => {
      localStorage.clear();
      localStorage.setItem("talentforge_test_user", JSON.stringify(user));
      localStorage.setItem(`talentforge_pro_active_${encodeURIComponent(user.uid)}`, "true");
    }, PRO_TEST_USER);

    await page.goto("/manage-plan");

    // Handle the browser confirmation dialog
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Switch back to the Free plan?");
      await dialog.accept();
    });

    const downgradeBtn = page.locator(".free-card .btn-downgrade-plan");
    await expect(downgradeBtn).toBeVisible();
    await downgradeBtn.click();

    // After downgrade, Free plan should now be the current plan
    const currentFreeBtn = page.locator(".free-card .btn-current-plan");
    await expect(currentFreeBtn).toBeVisible();

    // Pro plan card should now offer Upgrade to Pro
    const upgradeProBtn = page.locator(".pro-card .btn-upgrade-pro");
    await expect(upgradeProBtn).toBeVisible();

    // Sidebar upgrade card should now revert to "Upgrade to Pro" state
    const upgradeCard = page.locator(".upgrade-card:not(.pro-active-card)");
    await expect(upgradeCard).toBeVisible();
    await expect(upgradeCard.locator("h3")).toContainText("Upgrade to Pro");

    // Non-Pro user clicking Upgrade Now opens PaymentUpgradeModal
    const upgradeNowBtn = upgradeCard.locator(".upgrade-button");
    await upgradeNowBtn.click();

    const upgradeModal = page.locator(".payment-modal-overlay");
    await expect(upgradeModal).toBeVisible();
  });
});
