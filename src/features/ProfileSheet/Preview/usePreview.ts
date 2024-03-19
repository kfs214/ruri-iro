import { RefObject, useEffect } from 'react';

import { toPng } from 'html-to-image';

import {
  useNameStore,
  useOverviewStore,
  useImageStore,
  useTagStore,
  usePersonalPerspectiveStore,
} from '@/store';
import { usePreviewStore } from '@/store/usePreviewStore';

export function usePreview(ref: RefObject<HTMLDivElement>) {
  // TODO 更新を検知するselector
  const { shownDOB, occupation, location } = useOverviewStore();
  const { fullName, preferredName } = useNameStore();
  const { profileImage, coverImage } = useImageStore();
  const { tags } = useTagStore();
  const { questionAnswerPairs } = usePersonalPerspectiveStore();
  const { profileSheetBase64Url, setProfileSheetBase64Url } = usePreviewStore();

  // The image rendering issue in Safari was addressed by implementing a workaround found at:
  // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
  useEffect(() => {
    void (async () => {
      if (!ref.current) return;

      // Invoking `toPng` multiple times for potential stability in Safari rendering
      await toPng(ref.current, { cacheBust: true });
      await toPng(ref.current, { cacheBust: true });
      toPng(ref.current, { cacheBust: true })
        .then(async (dataUrl) => {
          setProfileSheetBase64Url(dataUrl);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shownDOB,
    occupation,
    location,
    fullName,
    preferredName,
    profileImage,
    coverImage,
    tags,
    questionAnswerPairs,
  ]);

  return { profileSheetBase64Url };
}
