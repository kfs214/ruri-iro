import { useCallback } from 'react';

import { useSurvey } from '@/features/Survey';
import { useDataLayer } from '@/hooks';
import { useNameStore } from '@/store';
import { usePreviewStore } from '@/store/usePreviewStore';

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

function composeImageOptions(name: string) {
  const userName = composeUserName(name);

  const sharedUrl = new URL(window.location.href);
  sharedUrl.searchParams.set('openExternalBrowser', '1');
  const imageOptions = {
    share: {
      title: `${userName}さんの自己紹介シート[こういうものです]`,
      text: `こういうものです。自己紹介シートをお送りします。よろしくお願いいたします。
        
#こういうものです で自己紹介シートを作成してシェアしよう！
${sharedUrl.toString()}`,
    },
    fileName: `${userName}さんの自己紹介シート_こういうものです.png`,
  };

  return imageOptions;
}

export function useShare() {
  const { fullName, preferredName } = useNameStore();
  const { profileSheetBase64Url } = usePreviewStore();
  const { scrollSurveyIntoView } = useSurvey();

  const dataLayer = useDataLayer({
    componentName: 'Footer',
  });

  const imageOptions = composeImageOptions(preferredName || fullName);

  const handleDownload = useCallback(async () => {
    saveImage(profileSheetBase64Url, imageOptions);

    /* Survey Begin */
    setTimeout(() => {
      scrollSurveyIntoView();
    }, 1000);
    /* Survey End */
  }, [profileSheetBase64Url, imageOptions, scrollSurveyIntoView]);

  const handleShare = useCallback(async () => {
    const file = await base64toFile(profileSheetBase64Url, imageOptions);
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          ...imageOptions.share,
          files: [file],
        })
        .catch(() => {});

      dataLayer.pushEvent('handleShare-canShare');
    } else {
      handleDownload();
      dataLayer.pushEvent('handleShare-saveImage');
    }

    /* Survey Begin */
    setTimeout(() => {
      scrollSurveyIntoView();
    }, 1000);
    /* Survey End */
  }, [
    dataLayer,
    profileSheetBase64Url,
    imageOptions,
    handleDownload,
    scrollSurveyIntoView,
  ]);

  return { fullName, handleDownload, handleShare };
}
