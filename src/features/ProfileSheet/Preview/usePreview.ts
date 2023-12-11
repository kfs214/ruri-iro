import { RefObject, useCallback, useEffect, useState } from 'react';

import { toPng } from 'html-to-image';

import { useNameStore, useOverviewStore, useImageStore } from '@/store';

type ImageOptions = {
  share: {
    title: string;
    text: string;
  };
  fileName: string;
};

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

export function usePreview(ref: RefObject<HTMLDivElement>) {
  // TODO 更新を検知するselector
  const { shownDOB, occupation, location } = useOverviewStore();
  const { fullName, preferredName } = useNameStore();
  const { profileImage, coverImage } = useImageStore();

  const [base64url, setBase64url] = useState('');

  const handleShare = useCallback(async () => {
    const userName = preferredName || fullName;
    const imageOptions = {
      share: {
        title: `${userName}さんの自己紹介シート[ruri-iro]`,
        text: '自己紹介シートをシェアしよう！',
      },
      fileName: `${userName}さんの自己紹介シート_ruri-iro.png`,
    };

    const file = await base64toFile(base64url, imageOptions);
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          ...imageOptions.share,
          files: [file],
        })
        .catch(() => {});
    } else {
      saveImage(base64url, imageOptions);
    }
  }, [base64url, preferredName, fullName]);

  // TODO 画像が更新されてもPreviewが再描画されない（Safari）
  useEffect(() => {
    if (ref.current) {
      toPng(ref.current, { cacheBust: true })
        .then(async (dataUrl) => {
          setBase64url(dataUrl);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shownDOB,
    occupation,
    location,
    fullName,
    preferredName,
    profileImage,
    coverImage,
  ]);

  return { base64url, handleShare };
}
