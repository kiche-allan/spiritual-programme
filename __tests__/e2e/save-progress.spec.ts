import { test, expect, type Page } from "@playwright/test";

// Signed-out flow only. Real Google sign-in is never exercised.
const finished = (days: number) =>
  JSON.stringify({ "1": Object.fromEntries(Array.from({ length: days }, (_, i) => [String(i + 1), true])) });

async function seed(page: Page, days: number) {
  await page.addInitScript(
    ([d]) => { try { if (!localStorage.getItem("__seeded")) { localStorage.setItem("spp_v1", d as string); localStorage.setItem("__seeded", "1"); } } catch {} },
    [finished(days)]
  );
}

test.describe("Save my progress (signed out)", () => {
  test("reading works with no account and no nudge for a new reader", async ({ page }) => {
    await page.goto("/week/1");
    await expect(page.getByRole("button", { name: /mark done/i })).toBeVisible();
    await expect(page.getByTestId("save-progress-nudge")).toHaveCount(0);
  });

  test("nudge appears after 3 finished days", async ({ page }) => {
    test.slow();
    for (let day = 1; day <= 3; day++) {
      await page.goto(`/week/1?day=${day}`);
      await expect(page.getByTestId("save-progress-nudge")).toHaveCount(0);
      await page.getByRole("button", { name: /mark done/i }).first().click();
    }
    await page.goto("/week/1?day=4");
    await expect(page.getByTestId("save-progress-nudge")).toBeVisible();
    await expect(page.getByText("Your progress is only on this phone")).toBeVisible();
  });

  test("Maybe later hides it, and it stays hidden after reload", async ({ page }) => {
    await seed(page, 3);
    await page.goto("/week/1");
    const nudge = page.getByTestId("save-progress-nudge");
    await expect(nudge).toBeVisible();
    await page.getByRole("button", { name: "Maybe later" }).dispatchEvent("click");
    await expect(nudge).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("button", { name: /mark done|done/i }).first()).toBeVisible();
    await expect(nudge).toHaveCount(0);
  });

  test("nudge returns after 14 days", async ({ page }) => {
    await seed(page, 3);
    const old = String(Date.now() - 15 * 24 * 60 * 60 * 1000);
    await page.addInitScript((t) => { try { localStorage.setItem("wwg_nudge_dismissed_at", t as string); } catch {} }, old);
    await page.goto("/week/1");
    await expect(page.getByTestId("save-progress-nudge")).toBeVisible();
  });

  test("sign-in screen renders with Google and consent", async ({ page }) => {
    await page.goto("/save-progress");
    await expect(page.getByRole("heading", { name: "Save your progress" })).toBeVisible();
    await expect(page.getByRole("button", { name: /continue with google/i })).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("link", { name: "Not now" })).toBeVisible();
  });
});
