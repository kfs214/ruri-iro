import { RefObject, useCallback, useEffect, useState } from 'react';

import { toPng } from 'html-to-image';

import { useNameStore, useOverviewStore } from '@/store';

// TODO 共有オプションを動的に生成
const imageOptions = {
  share: {
    title: 'さんの自己紹介シート[ruri-iro]',
    text: 'ruri-iroで自己紹介シートを作ろう！',
  },
  fileName: 'さんの自己紹介シート_ruri-iro.png',
};

// eslint-disable-next-line consistent-return
async function base64toFile(base64url: string) {
  try {
    const blob = await fetch(base64url).then((res) => res.blob());
    return new File([blob], imageOptions.fileName, { type: blob.type });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function saveImage(dataUrl: string) {
  const link = document.createElement('a');
  link.download = imageOptions.fileName;
  link.href = dataUrl;
  link.click();
}

export function usePreview(ref: RefObject<HTMLDivElement>) {
  const { shownDOB, occupation, location } = useOverviewStore();
  const { fullName, preferredName } = useNameStore();

  const [base64url, setBase64url] = useState('');

  const handleShare = useCallback(async () => {
    const file = await base64toFile(base64url);

    // TODO AbortError: Abort due to cancellation of share.
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator
        .share({
          ...imageOptions.share,
          files: [file],
        })
        .catch();
    } else {
      saveImage(base64url);
    }
  }, [base64url]);

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
  }, [shownDOB, occupation, location, fullName, preferredName]);

  return { base64url, handleShare };
}
