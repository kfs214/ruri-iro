import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('ImageGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: '画像を設定' }),
    ).toBeVisible();
  });

  test.describe('Profile', () => {
    test('has heading', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'プロフィール画像' }),
      ).toBeVisible();
    });

    test('button `画像を選択` exists', async () => {});
    test('can select/change profile photo', async () => {});
    test('can crop profile photo multiple times', async () => {});
    test('Profile Photo in Preview is not rendered when not selected', async () => {});

    test.describe('photo is persisted after page reload', () => {
      test('selected photo is persisted', async () => {});
      test('empty photo is persisted', async () => {});
    });

    test.describe('can edit after page reload', () => {
      test('selected photo', async () => {});
      test('empty photo', async () => {});
    });
  });

  test.describe('Cover', () => {
    test('has heading', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'カバー画像' }),
      ).toBeVisible();
    });

    test('button `画像を選択` exists', async () => {});
    test('can select/change cover photo', async () => {});
    test('can crop cover photo multiple times', async () => {});
    test('Cover Photo in Preview is not rendered when not selected', async () => {});

    test.describe('photo is persisted after page reload', () => {
      test('selected photo is persisted', async () => {});
      test('empty photo is persisted', async () => {});
    });

    test.describe('can edit after page reload', () => {
      test('selected photo', async () => {});
      test('empty photo', async () => {});
    });
  });

  test.describe('monitoring', () => {});
});
