import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe('Footer', () => {
  test.describe('preview / back', () => {
    test('hidden in PC layout', async ({ page }) => {
      if ((page.viewportSize()?.width ?? 0) < 900) return;

      await expect(
        page.getByRole('button', {
          name: 'SHOW PREVIEW',
        }),
      ).not.toBeVisible();
      await expect(
        page.getByRole('button', {
          name: 'BACK',
        }),
      ).not.toBeVisible();
    });

    test.describe('SP layout', () => {
      test('initial rendering', async ({ page }) => {
        if ((page.viewportSize()?.width ?? 0) >= 900) return;

        const showPreviewButton = page.getByRole('button', {
          name: 'SHOW PREVIEW',
        });
        const backButton = page.getByRole('button', {
          name: 'BACK',
        });

        await expect(showPreviewButton).toBeVisible();
        await expect(showPreviewButton).toBeEnabled();
        await expect(backButton).not.toBeVisible();
      });
      test('can switch by clicking', async ({ page }) => {
        if ((page.viewportSize()?.width ?? 0) >= 900) return;

        const showPreviewButton = page.getByRole('button', {
          name: 'SHOW PREVIEW',
        });
        const backButton = page.getByRole('button', {
          name: 'BACK',
        });

        await showPreviewButton.click();
        await expect(backButton).toBeVisible();
        await expect(backButton).toBeEnabled();
        await expect(showPreviewButton).not.toBeVisible();
        await expect(
          page.getByRole('heading', { name: 'お名前' }),
        ).not.toBeVisible();

        await backButton.click();
        await expect(showPreviewButton).toBeVisible();
        await expect(showPreviewButton).toBeEnabled();
        await expect(backButton).not.toBeVisible();
        await expect(
          page.getByRole('heading', { name: 'お名前' }),
        ).toBeVisible();
      });
    });
  });

  test.describe('share / download', () => {});

  test.describe('monitoring', () => {});
});
