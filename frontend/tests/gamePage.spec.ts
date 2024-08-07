import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe('Game Page', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Mock the API response for fetching a word based on category and difficulty
    await page.route('**/api/word**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          category: 'Food',
          word: 'Muffin',
          difficulty: 'easy',
          hint: 'Small, cake-like bread often served for breakfast',
        }),
      });
    });


  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    // wait 3 seconds before navgiating to the landing page
    await page.waitForTimeout(3000);
    // Navigate to the landing page
    await page.goto('http://localhost:3000/');

    // Simulate starting the game
    await page.click('[data-testid="play-now-button"]');
    await expect(page.locator('[data-testid="category-modal"]')).toBeVisible();

    await page.click('[data-testid="button-select-food"]');
    await page.click('[data-testid="button-select-easy"]');
    await page.click('[data-testid="start-game-button"]');

  });

  test('should render correctly', async () => {
    await expect(page.locator('[data-testid="game-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="settings-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="volume-control"]')).toBeVisible();
    await expect(page.locator('[data-testid="switch"]')).toBeVisible();
  });

  test('should be 20 score points after 2 correct guesses', async () => {
    await page.click('[data-testid="keyboard-M"]');
    await page.click('[data-testid="keyboard-U"]');
    await expect(page.locator('[data-testid="score"]')).toContainText('20');
  });

  test('should disappear letter after being guessed', async () => {
    await page.click('[data-testid="keyboard-M"]');
    await expect(page.locator('[data-testid="keyboard-M"]')).toBeDisabled();
  });

  test('should show correct and wrong guesses', async () => {
    // Correct guess
    await page.click('[data-testid="keyboard-U"]');
    await expect(page.locator('[data-testid="gameboard"]')).toContainText('U');

    // Wrong guess
    await page.click('[data-testid="keyboard-X"]');
    await expect(page.locator('[data-testid="hangman-animation"]')).toBeVisible();
  });

  test('should lose the game after six wrong guesses', async () => {
    const wrongGuesses = ['Q', 'W', 'R', 'Y', 'X', 'Z'];
    for (const letter of wrongGuesses) {
      await page.click(`[data-testid="keyboard-${letter}"]`);
    }
    await page.waitForSelector('[data-testid="endgame-modal"]', { timeout: 10000 });
    await expect(page.locator('[data-testid="endgame-modal"]')).toContainText('Game Over!');
  });

  test('should win the game after guessing the word', async () => {
    const word = 'Mufin';
    for (const letter of word) {
      await page.click(`[data-testid="keyboard-${letter.toUpperCase()}"]`);
    }
    await page.waitForSelector('[data-testid="endgame-modal"]', { timeout: 10000 });
    await expect(page.locator('[data-testid="endgame-modal"]')).toContainText('You Won!');
  });

});
