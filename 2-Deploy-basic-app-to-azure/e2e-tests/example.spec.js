// @ts-check
import { test, expect } from '@playwright/test';

// page is fixture coming in as context
// codegen gives dom elements
test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
  });