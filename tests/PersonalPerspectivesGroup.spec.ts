import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('PersonalPerspectivesGroup', () => {
  test.describe('can choose question', () => {
    test('can choose every item', async () => {});
    test('can update specific item', async () => {});
    test('answer should be erased when its question is changed', async () => {});
  });

  test.describe('input answer', () => {
    test('can input answer to each textbox', async () => {});
    test('can edit specific answer', async () => {});
    test('empty answer omit heading', async () => {});
    test('empty answer omit heading (once written and then erased)', async () => {});
  });

  test.describe('can edit after page reload', () => {
    test('question/answer pairs are persisted', async () => {});
    test('can update specific question after reloading', async () => {});
    test('can update specific answer after reloading', async () => {});
    test('fill -> reload -> erase -> reload: should be empty', async () => {});
  });

  test.describe('monitoring', () => {});
});
