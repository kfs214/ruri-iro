import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('ProfileSheet', () => {
  test.describe('Preview', () => {
    test('png image is rendered', () => {});

    test.describe('rerendered on form update', () => {
      // TODO updates of each input element
    });

    test.describe('scroll', () => {
      test('scroll to top when rendered', () => {});
      test('scroll position of Form component is persisted when it is mounted again', () => {});
    });
  });

  test.describe('monitoring', () => {});
});
