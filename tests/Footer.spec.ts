import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Footer', () => {
  test.describe('preview / back', () => {
    test('hidden in PC layout', async ({ page }) => {
      if ((page.viewportSize()?.width ?? 0) < 900) return;

      await expect(
        page.getByRole('button', {
          name: 'SHOW PREVIEW',
        }),
      ).not.toBeVisible();
      await expect(
        page.getByRole('button', {
          name: 'BACK',
        }),
      ).not.toBeVisible();
    });

    test.describe('SP layout', () => {
      test('initial rendering', async ({ page }) => {
        if ((page.viewportSize()?.width ?? 0) >= 900) return;

        const showPreviewButton = page.getByRole('button', {
          name: 'SHOW PREVIEW',
        });
        const backButton = page.getByRole('button', {
          name: 'BACK',
        });

        await expect(showPreviewButton).toBeVisible();
        await expect(showPreviewButton).toBeEnabled();
        await expect(backButton).not.toBeVisible();
      });
      test('can switch by clicking', async ({ page }) => {
        if ((page.viewportSize()?.width ?? 0) >= 900) return;

        const showPreviewButton = page.getByRole('button', {
          name: 'SHOW PREVIEW',
        });
        const backButton = page.getByRole('button', {
          name: 'BACK',
        });

        await showPreviewButton.click();
        await expect(backButton).toBeVisible();
        await expect(backButton).toBeEnabled();
        await expect(showPreviewButton).not.toBeVisible();
        await expect(
          page.getByRole('heading', { name: 'お名前' }),
        ).not.toBeVisible();

        await backButton.click();
        await expect(showPreviewButton).toBeVisible();
        await expect(showPreviewButton).toBeEnabled();
        await expect(backButton).not.toBeVisible();
        await expect(
          page.getByRole('heading', { name: 'お名前' }),
        ).toBeVisible();
      });
    });
  });

  test.describe('share / download', () => {
    test.describe('layout', () => {
      test.describe('shown in PC layout', () => {
        test('download', async ({ page }) => {
          if ((page.viewportSize()?.width ?? 0) < 900) return;

          await expect(
            page.getByRole('button', {
              name: 'DOWNLOAD',
            }),
          ).toBeVisible();
        });

        test('share', async ({ page }) => {
          // TODO 共通化できないか検討
          if ((page.viewportSize()?.width ?? 0) < 900) return;
          if (!(await page.evaluate(() => navigator.canShare))) return;

          await expect(
            page.getByRole('button', {
              name: 'SHARE',
            }),
          ).toBeVisible();
        });
      });

      test.describe('SP layout', () => {
        test('initial rendering', async ({ page }) => {
          if ((page.viewportSize()?.width ?? 0) >= 900) return;

          await expect(
            page.getByRole('button', {
              name: 'DOWNLOAD',
            }),
          ).not.toBeVisible();
          await expect(
            page.getByRole('button', {
              name: 'SHARE',
            }),
          ).not.toBeVisible();
        });

        test.describe('shown in preview view', () => {
          test('download', async ({ page }) => {
            if ((page.viewportSize()?.width ?? 0) >= 900) return;

            const showPreviewButton = page.getByRole('button', {
              name: 'SHOW PREVIEW',
            });
            const backButton = page.getByRole('button', {
              name: 'BACK',
            });
            const downloadButton = page.getByRole('button', {
              name: 'DOWNLOAD',
            });

            await showPreviewButton.click();
            await expect(downloadButton).toBeVisible();

            await backButton.click();
            await expect(downloadButton).not.toBeVisible();
          });

          test('share', async ({ page }) => {
            if ((page.viewportSize()?.width ?? 0) >= 900) return;
            if (!(await page.evaluate(() => navigator.canShare))) return;

            const showPreviewButton = page.getByRole('button', {
              name: 'SHOW PREVIEW',
            });
            const backButton = page.getByRole('button', {
              name: 'BACK',
            });
            const shareButton = page.getByRole('button', {
              name: 'SHARE',
            });

            await showPreviewButton.click();
            await expect(shareButton).toBeVisible();

            await backButton.click();
            await expect(shareButton).not.toBeEnabled();
          });
        });
      });
    });

    test.describe('disabled correctly', () => {
      test.describe('when full name is empty', () => {
        test('download', async ({ page }) => {
          const downloadButton = page.getByRole('button', {
            name: 'DOWNLOAD',
          });
          const showPreviewButton = page.getByRole('button', {
            name: 'SHOW PREVIEW',
          });
          const backButton = page.getByRole('button', {
            name: 'BACK',
          });

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await showPreviewButton.click();
          }
          await expect(downloadButton).toBeDisabled();

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await backButton.click();
          }
          await page.getByLabel('お名前 *').fill('test-full-name');

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await showPreviewButton.click();
          }
          await expect(downloadButton).toBeEnabled();
        });

        test('share', async ({ page }) => {
          if (!(await page.evaluate(() => navigator.canShare))) return;

          const showPreviewButton = page.getByRole('button', {
            name: 'SHOW PREVIEW',
          });
          const backButton = page.getByRole('button', {
            name: 'BACK',
          });
          const shareButton = page.getByRole('button', {
            name: 'SHARE',
          });

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await showPreviewButton.click();
          }
          await expect(shareButton).toBeDisabled();

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await backButton.click();
          }
          await page.getByLabel('お名前 *').fill('test-full-name');

          if ((page.viewportSize()?.width ?? 0) < 900) {
            await showPreviewButton.click();
          }
          await expect(shareButton).toBeEnabled();
        });
      });
    });

    test.describe('works correctly', () => {
      test.describe('download', () => {
        test.describe('preferred name is empty', () => {
          test('10 characters', async ({ page }) => {
            await page.getByLabel('お名前 *').click();
            await page.getByLabel('お名前 *').fill('0123456789');

            if ((page.viewportSize()?.width ?? 0) < 900) {
              await page
                .getByRole('button', {
                  name: 'SHOW PREVIEW',
                })
                .click();
            }

            const downloadPromise = page.waitForEvent('download');
            await page.getByRole('button', { name: 'Download' }).click();

            // Workaround for failure caused by Unicode combining characters
            expect((await downloadPromise).suggestedFilename()).toMatch(
              /0123456789さんの自己紹介シート_こういうもの(で|で)す.png/,
            );
          });

          test('longer than 10 characters', async ({ page }) => {
            await page.getByLabel('お名前 *').click();
            await page.getByLabel('お名前 *').fill('01234567890123');

            if ((page.viewportSize()?.width ?? 0) < 900) {
              await page
                .getByRole('button', {
                  name: 'SHOW PREVIEW',
                })
                .click();
            }

            const downloadPromise = page.waitForEvent('download');
            await page.getByRole('button', { name: 'Download' }).click();

            expect((await downloadPromise).suggestedFilename()).toMatch(
              /012345678…さんの自己紹介シート_こういうもの(で|で)す.png/,
            );
          });
        });

        test.describe('preferred name is filled', () => {
          test('10 characters', async ({ page }) => {
            await page.getByLabel('お名前 *').click();
            await page.getByLabel('お名前 *').fill('test-full-name');
            await page.getByLabel('なんて呼ばれてる？？').click();
            await page.getByLabel('なんて呼ばれてる？？').fill('0123456789');

            if ((page.viewportSize()?.width ?? 0) < 900) {
              await page
                .getByRole('button', {
                  name: 'SHOW PREVIEW',
                })
                .click();
            }

            const downloadPromise = page.waitForEvent('download');
            await page.getByRole('button', { name: 'Download' }).click();

            expect((await downloadPromise).suggestedFilename()).toMatch(
              /0123456789さんの自己紹介シート_こういうもの(で|で)す.png/,
            );
          });

          test('longer than 10 characters', async ({ page }) => {
            await page.getByLabel('お名前 *').click();
            await page.getByLabel('お名前 *').fill('test-full-name');
            await page.getByLabel('なんて呼ばれてる？？').click();
            await page
              .getByLabel('なんて呼ばれてる？？')
              .fill('01234567890123');

            if ((page.viewportSize()?.width ?? 0) < 900) {
              await page
                .getByRole('button', {
                  name: 'SHOW PREVIEW',
                })
                .click();
            }

            const downloadPromise = page.waitForEvent('download');
            await page.getByRole('button', { name: 'Download' }).click();

            expect((await downloadPromise).suggestedFilename()).toMatch(
              /012345678…さんの自己紹介シート_こういうもの(で|で)す.png/,
            );
          });
        });
      });

      // TODO write tests
      test.describe('share', () => {
        test('!navigator.canShare', () => {
          // shareボタンが表示されない
        });
        test('!navigator.canShare(...)', () => {
          // fallbackでdownload
          // オプションは確認済み
        });
        test.describe('navigator.canShare(...)', () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const EXPECTED_SHARING_TEXT = `こういうものです。自己紹介シートをお送りします。よろしくお願いいたします。
        
#こういうものです で自己紹介シートを作成してシェアしよう！
<BASE_URL>?openExternalBrowser=1`;

          test('navigator.share is called', () => {});

          test.describe('sharing title', () => {
            test.describe('preferred name is empty', () => {
              test('has sharing title: <fullName>さんの自己紹介シート[こういうものです]', () => {});
            });

            test.describe('preferred name is filled', () => {
              test('has sharing title: <preferredName>さんの自己紹介シート[こういうものです]', () => {});
            });
          });

          test.describe('sharing text', () => {
            test.describe('without any searchParams', () => {
              test('has correct sharing text with ?openExternalBrowser=1', () => {});
            });

            test.describe('with ?openExternalBrowser=1', () => {
              test('has correct sharing text with ?openExternalBrowser=1 without duplicate', () => {});
            });

            test.describe('with another searchParam', () => {
              test('has correct sharing text with ?openExternalBrowser=1 and other searchParams', () => {});
            });
          });
        });
      });
    });
  });

  test.describe('monitoring', () => {});
});
