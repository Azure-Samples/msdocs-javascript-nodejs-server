// @ts-check
const { test, expect } = require('@playwright/test');

// page is fixture coming in as context
// codegen gives dom elements
test('basic test', async ({ page }) => {
  console.log(`URL = ${process.env.TEST_URL_BASE}`)
  await page.goto(`${process.env.TEST_URL_BASE}/`);
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
  });