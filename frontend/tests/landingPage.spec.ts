import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({page}) => {
    // wait 3 seconds before navgiating to the landing page
    await page.waitForTimeout(3000);
    await page.goto('http://localhost:3000/');
    // wait 3 seconds for the page to load
    await page.waitForTimeout(3000);
    });

    test('should render correctly', async ({ page }) => {
        await expect(page.locator('[data-testid="play-now-button"]')).toBeVisible();
        await expect(page.locator('[data-testid="about-game-button"]')).toBeVisible();
        await expect(page.locator('[data-testid="about-me-button"]')).toBeVisible();
    });

    // play now button + category modal
    test('should open and close Category Modal by clicking close button', async ({ page }) => {
        await page.click('[data-testid="play-now-button"]');
        await expect(page.locator('[data-testid="category-modal"]')).toBeVisible();
        await page.click('[data-testid="close-category-modal"]');
        await expect(page.locator('[data-testid="category-modal"]')).not.toBeVisible();
    });

    // about game button + about modal
    test('should open and close About Modal by clicking close button', async ({ page }) => {
        await page.click('[data-testid="about-game-button"]');
        await expect(page.locator('[data-testid="about-modal"]')).toBeVisible();
        await page.click('[data-testid="close-about-modal"]');
        await expect(page.locator('[data-testid="about-modal"]')).not.toBeVisible();
    });

    // about me button + about me modal
    test('should open and close About Me Modal by clicking close button', async ({ page }) => {
        await page.click('[data-testid="about-me-button"]');
        await expect(page.locator('[data-testid="about-me-modal"]')).toBeVisible();
        await page.click('[data-testid="close-about-me-modal"]');
        await expect(page.locator('[data-testid="about-me-modal"]')).not.toBeVisible();
    });

    // leaderboard button + leaderboard modal
    test('should open and close Leaderboard Modal by clicking close button', async ({ page }) => {
        await page.click('[data-testid="leaderboard-button"]');
        await expect(page.locator('[data-testid="leaderboard-modal"]')).toBeVisible();
        await page.click('[data-testid="close-leaderboard-modal"]');
        await expect(page.locator('[data-testid="leaderboard-modal"]')).not.toBeVisible();
    });

});
