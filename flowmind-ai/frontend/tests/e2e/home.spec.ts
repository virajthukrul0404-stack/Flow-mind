import { test, expect } from "@playwright/test";

test("homepage renders headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Your AI Productivity Co-Pilot")).toBeVisible();
});
