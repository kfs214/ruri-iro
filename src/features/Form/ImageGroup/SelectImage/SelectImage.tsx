import { useState, useCallback, useRef } from 'react';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';

import { useImageStore } from '@/store';

import 'react-image-crop/dist/ReactCrop.css';

type Props = {
  buttonText: string;
  type: 'profile' | 'cover';
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const VisuallyHiddenInput = styled('input')({
  overflow: 'hidden',
  height: 1,
  width: 1,
});

export function SelectImage({ buttonText, type }: Props) {
  const {
    profileImgSrc,
    coverImgSrc,
    profileCrop,
    coverCrop,
    setProfileImgSrc,
    setCoverImgSrc,
    setProfileCrop,
    setCoverCrop,
    setCoverImage,
    setProfileImage,
  } = useImageStore();

  // TODO プロフ画用の丸切り抜きに対応
  const setting = {
    cover: {
      aspect: 16 / 9,
      imgSrc: profileImgSrc,
      completedCrop: profileCrop,
      setImgSrc: setProfileImgSrc,
      setCompletedCrop: setProfileCrop,
      setImage: setCoverImage,
    },
    profile: {
      aspect: 1,
      imgSrc: coverImgSrc,
      completedCrop: coverCrop,
      setImgSrc: setCoverImgSrc,
      setCompletedCrop: setCoverCrop,
      setImage: setProfileImage,
    },
  } as const;

  const {
    aspect,
    imgSrc,
    completedCrop,
    setImgSrc,
    setCompletedCrop,
    setImage,
  } = setting[type];

  const [crop, setCrop] = useState<Crop | undefined>(completedCrop);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsImgLoading(true);
    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() ?? ''),
    );
    reader.readAsDataURL(e.target.files[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!isImgLoading) return;

      // 初期位置で切り取りする処理
      // 再マウント時は実行しないのでisImgLoadingをフラグに早期リターン
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
      setIsImgLoading(false);
    },
    [aspect, isImgLoading],
  );

  const handleCompleteCrop = (pixelCrop: PixelCrop): void => {
    if (!imgRef.current) throw new Error('No HTMLImageElement');
    const img = imgRef.current;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = Math.floor(pixelCrop.width * scaleX * devicePixelRatio);
    canvas.height = Math.floor(pixelCrop.height * scaleY * devicePixelRatio);

    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      img,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
    );

    setCompletedCrop(pixelCrop);
    setImage(canvas.toDataURL('image/jpeg'));
  };

  return (
    <>
      <Box>
        <Button
          component="label"
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
        >
          {buttonText}
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={onSelectFile}
          />
        </Button>
      </Box>
      {!!imgSrc && (
        <Box mt={1}>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop) => setCrop(pixelCrop)}
            onComplete={handleCompleteCrop}
            aspect={aspect}
          >
            {/* TODO 画像のサイズ制御 */}
            {/* TODO width/heightを動的に取得してImageコンポーネントを使う */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Crop me" src={imgSrc} ref={imgRef} onLoad={onImageLoad} />
          </ReactCrop>
        </Box>
      )}
    </>
  );
}
