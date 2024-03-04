import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('PersonalPerspectivesGroup', () => {
  test('has heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '三問三答' })).toBeVisible();
  });

  // TODO Extract as common processing.
  test.describe('labels', () => {
    test.describe('select box with label `質問1` exists', () => {
      test('initial rendering', async () => {});
      test('focused', async () => {});
      test('blur', async () => {});
      test('reloaded', async () => {});
    });
    test.describe('text field with label `回答1` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test.describe('select box with label `質問2` exists', () => {
      test('initial rendering', async () => {});
      test('focused', async () => {});
      test('blur', async () => {});
      test('reloaded', async () => {});
    });
    test.describe('text field with label `回答2` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
    test.describe('select box with label `質問3` exists', () => {
      test('initial rendering', async () => {});
      test('focused', async () => {});
      test('blur', async () => {});
      test('reloaded', async () => {});
    });
    test.describe('text field with label `回答3` exists', () => {
      test('initial rendering', async () => {});
      test('focused/empty', async () => {});
      test('focused/filled', async () => {});
      test('blur/filled', async () => {});
      test('blur/empty', async () => {});
      test('filled/reloaded', async () => {});
    });
  });

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
