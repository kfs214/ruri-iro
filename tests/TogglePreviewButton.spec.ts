import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('TogglePreviewButton', () => {
  test('hidden in PC layout', async () => {});

  test.describe('SP layout', () => {
    test('shown in SP layout', async () => {});
    test('label is `SHOW PREVIEW` at the first rendering', async () => {});

    test.describe('click `SHOW PREVIEW`', () => {
      test('Preview is rendered', async () => {});
      test('Form is NOT rendered', async () => {});
      test('label is `BACK`', async () => {});
    });

    test.describe('click `BACK`', () => {
      test('Preview is NOT rendered', async () => {});
      test('Form is rendered', async () => {});
      test('label is `SHOW PREVIEW`', async () => {});
    });

    test('status is NOT persisted when reloaded', async () => {});
  });

  test.describe('monitoring', () => {});
});
