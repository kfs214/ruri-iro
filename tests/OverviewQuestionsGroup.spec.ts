import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
// "edit" means "focus out and focus again, and then edit"
test.describe.skip('OverviewQuestionsGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'あなたについて' }),
    ).toBeVisible();
  });

  test.describe('DOB', () => {
    test.describe('text field with label `お誕生日` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test.describe('text field with label `お誕生日` exists ("お誕生日をカレンダーから設定する" is chosen)', async () => {
      test('initial rendering', async () => {});
      test('blur/filled', async () => {});
      test('filled/reloaded', async () => {});
    });
    test('can input/edit custom DOB as free text at the initial rendering', async () => {});
    test('can input/edit Dayjs DOB by choosing "お誕生日をカレンダーから設定する"', async () => {});
    test.describe('DOB setting and value are persisted', () => {
      test('Dayjs DOB', async () => {});
      test('Custom DOB', async () => {});
    });
    test.describe('can edit after page reload', () => {
      test('Custom DOB value', async () => {});
      test('Dayjs DOB value', async () => {});
      test('Custom DOB -> Dayjs DOB -> Custom DOB', async () => {});
    });
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
