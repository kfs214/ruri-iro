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

  test.describe('DOB', () => {
    test.describe('text field with label `お誕生日` exists', () => {
      test('initial rendering', async ({ page }) => {
        await expect(page.getByLabel('お誕生日')).toBeVisible();
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
      test('focused/empty', async ({ page }) => {
        await page.getByLabel('お誕生日').click();
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
      test('focused/filled', async ({ page }) => {
        await page.getByLabel('お誕生日').fill('5月14日');
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
      test('blur/filled', async ({ page }) => {
        const dobField = page.getByLabel('お誕生日');
        await dobField.fill('5月14日');
        await dobField.blur();
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
      test('blur/empty', async ({ page }) => {
        const dobField = page.getByLabel('お誕生日');
        await dobField.click();
        await dobField.blur();
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
      test('filled/reloaded', async ({ page }) => {
        await page.getByLabel('お誕生日').fill('5月14日');
        await page.reload();
        await expect(
          page.locator('label').filter({ hasText: 'お誕生日' }),
        ).toBeVisible();
      });
    });
    test('can input/edit DOB as free text', async ({ page }) => {
      const dobField = page.getByLabel('お誕生日');

      await dobField.fill('5月14日');
      await expect(dobField).toHaveValue('5月14日');
      await dobField.fill('5/14');
      await expect(dobField).toHaveValue('5/14');
    });
    test('can choose DOB on calender and edit', async ({ page }) => {
      const dobField = page.getByLabel('お誕生日');
      const calendarIcon = page
        .locator('div')
        .filter({ hasText: /^お誕生日$/ })
        .getByRole('button');

      await calendarIcon.click();
      await page.getByLabel('calendar view is open, switch').click();
      await page.getByRole('radio', { name: '1995' }).click();
      await page.getByLabel('5月').click();
      await page.getByRole('gridcell', { name: '14' }).click();
      await page.getByRole('button', { name: 'OK' }).click();
      await expect(dobField).toHaveValue('1995年05月14日（日曜日）');

      await dobField.fill('5月14日');
      await expect(dobField).toHaveValue('5月14日');

      await calendarIcon.click();
      await page.getByRole('gridcell', { name: '15' }).click();
      await page.getByRole('button', { name: 'OK' }).click();
      await expect(dobField).toHaveValue('1995年05月15日（月曜日）');
    });
    test('DOB is persisted', async ({ page }) => {
      const dobField = page.getByLabel('お誕生日');

      await dobField.fill('5月14日');
      await page.reload();
      await expect(dobField).toHaveValue('5月14日');
    });
    test('can edit after page reload', async ({ page }) => {
      const dobField = page.getByLabel('お誕生日');

      await dobField.fill('5月14日');
      await expect(dobField).toHaveValue('5月14日');
      await page.reload();

      await page
        .locator('div')
        .filter({ hasText: /^お誕生日$/ })
        .getByRole('button')
        .click();
      await page.getByLabel('calendar view is open, switch').click();
      await page.getByRole('radio', { name: '1995' }).click();
      await page.getByLabel('5月').click();
      await page.getByRole('gridcell', { name: '14' }).click();
      await page.getByRole('button', { name: 'OK' }).click();
      await expect(dobField).toHaveValue('1995年05月14日（日曜日）');
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
