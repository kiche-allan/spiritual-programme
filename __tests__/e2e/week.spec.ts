import { test, expect } from "@playwright/test";

test.describe("Week Reader", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/week/6");
  });

  test("loads week title and hero verse", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // The reference also appears in the verse card, practices, and footer,
    // so scope to the hero banner where the heroVerse + heroRef are shown
    await expect(page.getByRole("banner").getByText("1 John 3:1")).toBeVisible();
  });

  test("day 1 content is shown by default", async ({ page, isMobile }) => {
    // The full day name ("Monday") only renders in the day sidebar, which
    // is hidden on mobile (.hide-mobile, <720px) — the main content only
    // shows the abbreviated form there
    test.skip(isMobile, "Full day name is only rendered in the sidebar, hidden on mobile");
    await expect(page.getByText("Monday")).toBeVisible();
    await expect(page.getByText("You Are God's Beloved Child")).toBeVisible();
  });

  test("three scriptures are displayed", async ({ page }) => {
    const verses = page.locator(".verse-card");
    await expect(verses).toHaveCount(3);
  });

  test("navigating to next day works", async ({ page, isMobile }) => {
    // The full day name ("Tuesday") only renders in the day sidebar, which
    // is hidden on mobile (.hide-mobile, <720px)
    test.skip(isMobile, "Full day name is only rendered in the sidebar, hidden on mobile");
    await page.getByRole("button", { name: "Next →" }).click();
    await expect(page.getByText("Tuesday")).toBeVisible();
    await expect(page.locator("text=Day 2 of 7")).toBeVisible();
  });

  test("navigating to previous day works from day 2", async ({ page }) => {
    await page.getByRole("button", { name: "Next →" }).click();
    await page.getByRole("button", { name: "← Previous" }).click();
    await expect(page.getByText("Day 1 of 7")).toBeVisible();
  });

  test("Previous button is disabled on first day", async ({ page }) => {
    await expect(page.getByRole("button", { name: "← Previous" })).toBeDisabled();
  });

  test("marking a day complete updates the progress bar", async ({ page }) => {
    const markDoneBtn = page.getByRole("button", { name: "Mark Done" });
    await markDoneBtn.click();
    await expect(page.getByText("✓ Done")).toBeVisible();
    await expect(page.getByText("1 of 7 days")).toBeVisible();
  });

  test("clicking sidebar day navigates to that day", async ({ page, isMobile }) => {
    // The day sidebar is intentionally hidden on mobile (.hide-mobile, <720px)
    test.skip(isMobile, "Day sidebar is hidden on mobile viewports by design");
    await page.getByRole("button", { name: /Wednesday/ }).click();
    await expect(page.getByText("Day 3 of 7")).toBeVisible();
  });

  test("share button opens share dropdown", async ({ page }) => {
    // The ReflectionWall's submit button is also labelled "Share", so scope
    // to the dropdown trigger via its aria-haspopup attribute
    await page.locator('button[aria-haspopup="menu"]').filter({ hasText: /share/i }).click();
    await expect(page.getByText("Facebook")).toBeVisible();
    await expect(page.getByText("WhatsApp")).toBeVisible();
  });

  test("week navigation shows previous and next week links", async ({ page }) => {
    await expect(page.getByText("Next Week →")).toBeVisible();
  });
});

test.describe("Week Reader — Progress Persistence", () => {
  test("progress is saved and restored on page reload", async ({ page }) => {
    await page.goto("/week/6");
    await page.getByRole("button", { name: "Mark Done" }).click();
    await expect(page.getByText("✓ Done")).toBeVisible();

    await page.reload();
    await expect(page.getByText("✓ Done")).toBeVisible();
    await expect(page.getByText("1 of 7 days")).toBeVisible();
  });
});
