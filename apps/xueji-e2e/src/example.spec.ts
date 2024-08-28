import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await page.click('text=About')
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL('/about')
  // The new page should contain an h1 with "about"
  await expect(page.locator('h1')).toContainText('about')
  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('about')
})
