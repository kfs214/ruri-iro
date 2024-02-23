import { RefObject, useCallback, useEffect, useState } from 'react';

import { toPng } from 'html-to-image';

import { useSurvey } from '@/features/Survey';
import { useDataLayer } from '@/hooks';
import {
  useNameStore,
  useOverviewStore,
  useImageStore,
  useTagStore,
  usePersonalPerspectiveStore,
} from '@/store';

type ImageOptions = {
  share: {
    title: string;
    text: string;
  };
  fileName: string;
};

const FILENAME_USER_NAME_MAX_LENGTH = 10;

// eslint-disable-next-line consistent-return
async function base64toFile(base64url: string, options: ImageOptions) {
  try {
    const blob = await fetch(base64url).then((res) => res.blob());
    return new File([blob], options.fileName, { type: blob.type });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function saveImage(dataUrl: string, options: ImageOptions) {
  const link = document.createElement('a');
  link.download = options.fileName;
  link.href = dataUrl;
  link.click();
}

function composeUserName(userName: string) {
  if (userName.length <= FILENAME_USER_NAME_MAX_LENGTH) {
    return userName;
  }

  return `${userName.substring(0, FILENAME_USER_NAME_MAX_LENGTH - 1)}…`;
}

export function usePreview(ref: RefObject<HTMLDivElement>) {
  // TODO 更新を検知するselector
  const { shownDOB, occupation, location } = useOverviewStore();
  const { fullName, preferredName } = useNameStore();
  const { profileImage, coverImage } = useImageStore();
  const { tags } = useTagStore();
  const { questionAnswerPairs } = usePersonalPerspectiveStore();
  const { scrollSurveyIntoView } = useSurvey();

  const [base64url, setBase64url] = useState('');

  const dataLayer = useDataLayer({
    componentName: 'Preview',
  });

  const handleShare = useCallback(async () => {
    const userName = composeUserName(preferredName || fullName);
    const imageOptions = {
      share: {
        title: `${userName}さんの自己紹介シート[こういうものです]`,
        text: `こういうものです。自己紹介シートをお送りします。よろしくお願いいたします。
        
#こういうものです で自己紹介シートを作成してシェアしよう！
${window.location.href}`,
      },
      fileName: `${userName}さんの自己紹介シート_こういうものです.png`,
    };

    dataLayer.pushEvent('clickShare');

    const file = await base64toFile(base64url, imageOptions);
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          ...imageOptions.share,
          files: [file],
        })
        .catch(() => {});

      dataLayer.pushEvent('canShare');
    } else {
      saveImage(base64url, imageOptions);
      dataLayer.pushEvent('saveImage');
    }

    /* Survey Begin */
    setTimeout(() => {
      if (scrollSurveyIntoView) scrollSurveyIntoView();
    }, 1000);
    /* Survey End */
  }, [preferredName, fullName, dataLayer, base64url, scrollSurveyIntoView]);

  // The image rendering issue in Safari was addressed by implementing a workaround found at:
  // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
  useEffect(() => {
    (async () => {
      if (!ref.current) return;

      // Invoking `toPng` multiple times for potential stability in Safari rendering
      await toPng(ref.current, { cacheBust: true });
      await toPng(ref.current, { cacheBust: true });
      toPng(ref.current, { cacheBust: true })
        .then(async (dataUrl) => {
          setBase64url(dataUrl);
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

  return { base64url, handleShare };
}
