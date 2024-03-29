import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
// "edit" means "focus out and focus again, and then edit"
test.describe.skip('NameInputGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'お名前' })).toBeVisible();
  });

  test.describe('FullName', () => {
    test.describe('text field with label `お名前` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });

    test('can input/edit full name', async () => {});
    test('Full Name is not rendered when value is empty or erased', async () => {});
    test('Share button is disabled when value is empty or erased', async () => {});
    test('form has alerted style when value is erased or focused out without filling', async () => {});

    test.describe('value is persisted after page reload', () => {
      test('filled value is persisted', async () => {});
      test('empty value is persisted', async () => {});
    });

    test.describe('can edit after page reload', () => {
      test('filled value', async () => {});
      test('empty value', async () => {});
    });
  });

  test.describe('PreferredName', () => {
    test.describe('text field with label `なんて呼ばれてる？？` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test('can input/edit preferred name', async () => {});
    test('Preferred Name is not rendered when value is empty or erased', async () => {});

    test.describe('value is persisted after page reload', () => {
      test('filled value is persisted', async () => {});
      test('empty value is persisted', async () => {});
    });

    test.describe('can edit after page reload', () => {
      test('filled value', async () => {});
      test('empty value', async () => {});
    });
  });

  test.describe('monitoring', () => {});
});
