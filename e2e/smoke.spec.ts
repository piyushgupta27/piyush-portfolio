import { test, expect } from "@playwright/test";

test("home page loads with correct title", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Piyush Gupta — Sr Engineering Manager");
});
