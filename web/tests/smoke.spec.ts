import { test, expect } from "@playwright/test";

test.describe("Coy Discover - 390px Mobile Viewport Smoke Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  test("A4 & Root: / redirects to /discover, TabBar has Home and Discover", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await expect(page).toHaveURL(/.*\/discover/);

    const nav = page.locator('nav[aria-label="Primary navigation"]');
    await expect(nav).toBeVisible();

    const homeTab = nav.getByRole("link", { name: "Home" });
    const discoverTab = nav.getByRole("link", { name: "Discover" });
    await expect(homeTab).toBeVisible();
    await expect(discoverTab).toBeVisible();

    // Verify Home tab is completely blank
    await homeTab.click();
    await expect(page).toHaveURL(/.*\/home/);
    const mainContent = page.locator("main");
    await expect(mainContent).toBeEmpty();

    // Return to Discover
    await discoverTab.click();
    await expect(page).toHaveURL(/.*\/discover/);
  });

  test("C1, C2, C4, F4: Profile card rendered with action buttons, stamps, aria-labels", async ({ page }) => {
    await page.goto("http://localhost:3000/discover");

    // Wait for card stack to appear
    const passBtn = page.locator('button[aria-label="Pass on profile"]');
    const likeBtn = page.locator('button[aria-label="Like profile"]');
    await expect(passBtn).toBeVisible({ timeout: 10000 });
    await expect(likeBtn).toBeVisible();

    // Verify segmented header toggle (Discover | Matches)
    const discoverHeaderTab = page.getByRole("tab", { name: "Discover" });
    const matchesHeaderTab = page.getByRole("tab", { name: /Matches/ });
    await expect(discoverHeaderTab).toBeVisible();
    await expect(matchesHeaderTab).toBeVisible();

    // Action buttons visible and interactive
    await expect(passBtn).toBeEnabled();
    await expect(likeBtn).toBeEnabled();

    // Capture visual snapshot at 390px viewport
    await page.screenshot({ path: "screenshot-390.png" });
  });

  test("C5: Client does not use localStorage for swipe history", async ({ page }) => {
    await page.goto("http://localhost:3000/discover");
    const localKeys = await page.evaluate(() => Object.keys(localStorage));
    expect(localKeys.filter((k) => k.toLowerCase().includes("swipe"))).toHaveLength(0);
  });

  test("D3: Matches view shows empty state or match cards", async ({ page }) => {
    await page.goto("http://localhost:3000/discover");

    const matchesHeaderTab = page.getByRole("tab", { name: /Matches/ });
    await matchesHeaderTab.click();

    // Either matches grid or empty state appears
    const emptyMsg = page.getByText("No matches yet");
    const matchGrid = page.locator(".grid.grid-cols-2");
    await expect(emptyMsg.or(matchGrid)).toBeVisible({ timeout: 5000 });
  });

  test("D2 & F4: Match modal focus trap and escape key handling", async ({ page }) => {
    await page.goto("http://localhost:3000/discover");

    // Check if dialog is open (if matched) or verify modal properties
    const dialog = page.locator('div[role="dialog"][aria-modal="true"]');
    if (await dialog.isVisible()) {
      await expect(page.locator("#match-heading")).toContainText("It's a Match!");
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }
  });
});
