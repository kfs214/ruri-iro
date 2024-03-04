import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('AppBar', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'こういうものです。' }),
    ).toBeVisible();
  });

  test.describe('preview toggle switch', () => {
    test('hidden in PC layout', async () => {});

    test.describe('SP layout', () => {
      test('shown in SP layout', async () => {});
      test('NOT checked at the initial rendering', async () => {});
      test('can toggle switch by clicking', async () => {});

      test.describe('NOT checked', () => {
        test('Preview is NOT rendered', async () => {});
        test('Form is rendered', async () => {});
      });

      test.describe('checked', () => {
        test('Preview is rendered', async () => {});
        test('Form is NOT rendered', async () => {});
      });
    });
  });

  test.describe('monitoring', () => {});
});
