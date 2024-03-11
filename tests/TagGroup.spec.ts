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
      await expect(
        page
          .getByText('あなたを表わすハッシュタグ#')
          .getByText('test-tag-enter'),
      ).toBeVisible();
    });

    test('Icon', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', {
        name: 'tag-input',
      });

      await expect(page.getByText('test-tag-icon')).not.toBeVisible();
      await tagInput.fill('test-tag-icon');
      await page.getByRole('button', { name: 'add-tag-button' }).click();
      await expect(
        page
          .getByText('あなたを表わすハッシュタグ#')
          .getByText('test-tag-icon'),
      ).toBeVisible();
    });

    test('Blur', async ({ page }) => {
      const tagInput = await page.getByRole('textbox', {
        name: 'tag-input',
      });

      await expect(page.getByText('test-tag-blur')).not.toBeVisible();
      await tagInput.fill('test-tag-blur');
      await tagInput.blur();
      await expect(
        page
          .getByText('あなたを表わすハッシュタグ#')
          .getByText('test-tag-blur'),
      ).toBeVisible();
    });
  });

  test.describe('can delete tag', () => {
    test('should delete only expected tags', async ({ page }) => {
      const tagFormContainer = page.getByText('あなたを表わすハッシュタグ#');
      const tagInput = page.getByRole('textbox', {
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

      await expect(tagFormContainer.getByText('test-tag-1')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-2')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-3')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-4')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-5')).toBeVisible();

      await page
        .getByRole('button', { name: '#test-tag-2' })
        .getByTestId('CancelIcon')
        .click();

      await expect(tagFormContainer.getByText('test-tag-1')).toBeVisible();
      await expect(page.getByText('test-tag-2')).not.toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-3')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-4')).toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-5')).toBeVisible();

      await page
        .getByRole('button', { name: '#test-tag-4' })
        .getByTestId('CancelIcon')
        .click();

      await expect(tagFormContainer.getByText('test-tag-1')).toBeVisible();
      await expect(page.getByText('test-tag-2')).not.toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-3')).toBeVisible();
      await expect(page.getByText('test-tag-4')).not.toBeVisible();
      await expect(tagFormContainer.getByText('test-tag-5')).toBeVisible();
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
