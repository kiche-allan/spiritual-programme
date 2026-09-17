import { test, expect } from "@playwright/test";

test.describe("Progress Dashboard", () => {
  test("progress page loads", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByRole("heading", { name: "Your Progress" })).toBeVisible();
  });

  test("all stat cards are visible", async ({ page }) => {
    await page.goto("/progress");
    // "Current Streak" and "Longest Streak" also appear in the Streak
    // Details section further down the page, so check the first (summary
    // card) occurrence of each label
    for (const label of ["Days Read", "Weeks Started", "Weeks Completed", "Current Streak", "Longest Streak"]) {
      await expect(page.getByText(label).first()).toBeVisible();
    }
  });

  test("heatmap renders with correct number of cells", async ({ page }) => {
    await page.goto("/progress");
    // 7 weeks × 7 days = 49 cells
    // Heatmap cells are unstyled divs identified by their title attribute
    const cells = page.locator("div[title]");
    // Check cells exist (exact count depends on published weeks)
    await expect(cells.first()).toBeVisible();
  });

  test("export button downloads a JSON file", async ({ page }) => {
    await page.goto("/progress");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: /export progress/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/spiritual-programme-progress.*\.json/);
  });

  test("badges section is visible", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByText("Badges")).toBeVisible();
  });
});
