import { test, expect } from '@playwright/test';

// TODO rename filenames into kebab-case

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('TagGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'あなたを表わすハッシュタグ' }),
    ).toBeVisible();
  });

  test.describe('can add tag', () => {
    test('Enter', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', { name: 'tag-input' });
      await tagInput.click();

      await expect(page.getByText('test-tag-enter')).not.toBeVisible();
      await tagInput.fill('test-tag-enter');
      await tagInput.press('Enter');
      await expect(page.getByText('test-tag-enter')).toHaveCount(2);
    });

    test('Icon', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', {
        name: 'tag-input',
      });

      await expect(page.getByText('test-tag-icon')).not.toBeVisible();
      await tagInput.fill('test-tag-icon');
      await page.getByRole('button', { name: 'add-tag-button' }).click();
      await expect(page.getByText('test-tag-icon')).toHaveCount(2);
    });

    test('Blur', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', {
        name: 'tag-input',
      });

      await expect(page.getByText('test-tag-blur')).not.toBeVisible();
      await tagInput.fill('test-tag-blur');
      await tagInput.blur();
      await expect(page.getByText('test-tag-blur')).toHaveCount(2);
    });
  });
});
