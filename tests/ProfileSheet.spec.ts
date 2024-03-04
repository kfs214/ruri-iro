import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// TODO write tests
test.describe.skip('ProfileSheet', () => {
  test.describe('Share button', () => {
    test.describe('disabled correctly', () => {
      test('when full name is empty', () => {});
    });

    test.describe('navigator.canShare', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const EXPECTED_SHARING_TEXT = `こういうものです。自己紹介シートをお送りします。よろしくお願いいたします。
        
#こういうものです で自己紹介シートを作成してシェアしよう！
<BASE_URL>?openExternalBrowser=1`;

      test('browser native share UI is called', () => {});

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
    test.describe('!navigator.canShare', () => {
      test('png image is downloaded', () => {});

      test.describe('downloaded filename', () => {
        test.describe('preferred name is empty', () => {
          test('filename: <fullName>さんの自己紹介シート_こういうものです.png', () => {});
        });

        test.describe('preferred name is filled', () => {
          test('filename: <preferredName>さんの自己紹介シート_こういうものです.png', () => {});
        });
      });
    });
  });

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
