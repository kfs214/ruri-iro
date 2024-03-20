import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
// "edit" means "focus out and focus again, and then edit"
test.describe('OverviewQuestionsGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'あなたについて' }),
    ).toBeVisible();
  });

  // TODO write tests
  test.describe('DOB', () => {
    test.describe('text field with label `お誕生日` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test('can input/edit DOB as free text', async () => {});
    test('can choose DOB on calender', async () => {});
    test('DOB setting and value are persisted', () => {});
    test('can edit after page reload', () => {});
  });

  test.describe('Occupation', () => {
    test.describe('text field with label `何してる人？？` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test('can input/edit occupation', async () => {});
    test('heading is omitted when value is erased', async () => {});

    test.describe('value is persisted after page reload', () => {
      test('filled value is persisted', async () => {});
      test('empty value is persisted', async () => {});
    });

    test.describe('can edit after page reload', () => {
      test('filled value', async () => {});
      test('empty value', async () => {});
    });
  });

  test.describe('Location', () => {
    test.describe('text field with label `どこの人？？` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test('can input/edit location', async () => {});
    test('heading is omitted when value is erased', async () => {});

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
