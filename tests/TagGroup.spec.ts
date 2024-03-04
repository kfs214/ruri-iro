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
    // TODO write test
    test('Focus on input when parent div is clicked ', async () => {});

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

  test.describe('can delete tag', () => {
    test('should delete only expected tags', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', {
        name: 'tag-input',
      });

      await tagInput.fill('test-tag-1');
      await tagInput.press('Enter');
      await tagInput.fill('test-tag-2');
      await tagInput.press('Enter');
      await tagInput.fill('test-tag-3');
      await tagInput.press('Enter');
      await tagInput.fill('test-tag-4');
      await tagInput.press('Enter');
      await tagInput.fill('test-tag-5');
      await tagInput.press('Enter');

      await expect(page.getByText('test-tag-1')).toHaveCount(2);
      await expect(page.getByText('test-tag-2')).toHaveCount(2);
      await expect(page.getByText('test-tag-3')).toHaveCount(2);
      await expect(page.getByText('test-tag-4')).toHaveCount(2);
      await expect(page.getByText('test-tag-5')).toHaveCount(2);

      await page
        .getByRole('button', { name: '#test-tag-2' })
        .getByTestId('CancelIcon')
        .click();

      await expect(page.getByText('test-tag-1')).toHaveCount(2);
      await expect(page.getByText('test-tag-2')).not.toBeVisible();
      await expect(page.getByText('test-tag-3')).toHaveCount(2);
      await expect(page.getByText('test-tag-4')).toHaveCount(2);
      await expect(page.getByText('test-tag-5')).toHaveCount(2);

      await page
        .getByRole('button', { name: '#test-tag-4' })
        .getByTestId('CancelIcon')
        .click();

      await expect(page.getByText('test-tag-1')).toHaveCount(2);
      await expect(page.getByText('test-tag-2')).not.toBeVisible();
      await expect(page.getByText('test-tag-3')).toHaveCount(2);
      await expect(page.getByText('test-tag-4')).not.toBeVisible();
      await expect(page.getByText('test-tag-5')).toHaveCount(2);
    });
  });

  // TODO write tests
  test.describe.skip('can edit after page reload', () => {
    test('tags are persisted', async () => {});
    test('can add tags after reloading', async () => {});
    test('can delete tags after reloading', async () => {});
    test('add (a, b, c, d, e) -> delete (b) -> reload -> delete (d) -> add (f, g) -> delete (c, f)', async () => {});
  });

  test.describe.skip('monitoring', () => {});
});
