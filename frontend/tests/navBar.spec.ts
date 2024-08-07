import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
    test.beforeEach(async ({ page }) => {
        // Wait 3 seconds before navigating to the landing page
        await page.waitForTimeout(3000);
        // Navigate to the landing page before each test
        await page.goto('http://localhost:3000');
    });

    // Test that all navbar elements are visible
    test('should render correctly', async ({ page }) => {
        await expect(page.locator('[data-testid="settings-menu"]')).toBeVisible();
        await expect(page.locator('[data-testid="volume-control"]')).toBeVisible();
        await expect(page.locator('[data-testid="switch"]')).toBeVisible();
    });

    // Test volume toggle button
    test('should toggle volume', async ({ page }) => {
        const volumeToggle = page.locator('[data-testid="volume-toggle"]');
        await expect(volumeToggle).toBeVisible();
        await volumeToggle.click();
        await expect(volumeToggle).toHaveAttribute('data-testid', 'volume-toggle');
    });

    // Test dark mode toggle
    test('should toggle dark mode', async ({ page }) => {
        const darkModeToggle = page.locator('[data-testid="switch"]');
        await expect(darkModeToggle).toBeVisible();
        await darkModeToggle.click();
        const appContent = page.locator('[data-testid="app-content"]');
        await expect(appContent).toHaveClass(/dark/);
    });

    // Test settings menu open and close
    test('should open and close settings menu', async ({ page }) => {
        await page.click('[data-testid="settings-menu"]');
        await expect(page.locator('[data-testid="settings-drop"]')).toBeVisible();
        await page.click('[data-testid="settings-close"]');
        await expect(page.locator('[data-testid="settings-drop"]')).not.toBeVisible();
    });
});
