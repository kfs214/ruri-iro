import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('AppBar', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'こういうものです。' }),
    ).toBeVisible();
  });

  test.describe('External Links', () => {
    test('Survey', async ({ page }) => {
      const formPromise = page.waitForEvent('popup');
      await page.getByTestId('ForumIcon').click();
      expect(await formPromise).toBeTruthy();
    });

    test('Repository', async ({ page }) => {
      const formPromise = page.waitForEvent('popup');
      await page.getByTestId('GitHubIcon').click();
      expect(await formPromise).toBeTruthy();
    });
  });
});
