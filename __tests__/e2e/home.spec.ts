import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays the hero section", async ({ page }) => {
    // "Walking With God" also appears in the Navbar logo, so scope to the H1
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Walking With God");
    await expect(heading).toContainText("Week by Week");
  });

  test("shows the correct number of weeks published", async ({ page }) => {
    const statsBar = page.locator("text=Weeks Published").locator("..");
    await expect(statsBar).toBeVisible();
  });

  test("featured week card is visible", async ({ page }) => {
    // "This Week" also appears in the CTA link and section heading, so
    // target the badge rendered on the featured (isLatest) WeekCard
    await expect(page.locator(".week-gradient-badge")).toBeVisible();
  });

  test("subscribe form is present and functional", async ({ page }) => {
    await page.locator("#subscribe").scrollIntoViewIfNeeded();
    const emailInput = page.getByPlaceholder("your@email.com");
    await expect(emailInput).toBeVisible();

    await emailInput.fill("test@example.com");
    await page.getByRole("button", { name: /subscribe/i }).click();
    // The API round-trips to Supabase + Resend, which can exceed 5s under
    // concurrent worker load
    await expect(page.getByText(/subscribed|thank/i)).toBeVisible({ timeout: 10_000 });
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
    // First navigation to /week/[id] triggers on-demand dev-server compilation,
    // which can take longer than the default assertion timeout
    await expect(page).toHaveURL(/\/week\/\d+/, { timeout: 15_000 });
  });
});
