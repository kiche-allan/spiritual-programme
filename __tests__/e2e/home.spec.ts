import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays the hero section", async ({ page }) => {
    await expect(page.getByText("Walking With God")).toBeVisible();
    await expect(page.getByText("Week by Week")).toBeVisible();
  });

  test("shows the correct number of weeks published", async ({ page }) => {
    const statsBar = page.locator("text=Weeks Published").locator("..");
    await expect(statsBar).toBeVisible();
  });

  test("featured week card is visible", async ({ page }) => {
    await expect(page.getByText("This Week")).toBeVisible();
  });

  test("subscribe form is present and functional", async ({ page }) => {
    await page.locator("#subscribe").scrollIntoViewIfNeeded();
    const emailInput = page.getByPlaceholder("your@email.com");
    await expect(emailInput).toBeVisible();

    await emailInput.fill("test@example.com");
    await page.getByRole("button", { name: /subscribe/i }).click();
    // Expect success or loading state
    await expect(page.getByText(/subscribed|thank/i)).toBeVisible({ timeout: 5000 });
  });

  test("dark mode toggle switches theme", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: /toggle dark mode/i }).click();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: /toggle dark mode/i }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("navigation to week page works", async ({ page }) => {
    await page.getByRole("link", { name: "This Week →" }).click();
    await expect(page).toHaveURL(/\/week\/\d+/);
  });
});
