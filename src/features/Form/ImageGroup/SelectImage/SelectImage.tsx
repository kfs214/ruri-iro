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
      imgSrc: coverImgSrc,
      completedCrop: coverCrop,
      setImgSrc: setCoverImgSrc,
      setCompletedCrop: setCoverCrop,
      setImage: setCoverImage,
    },
    profile: {
      aspect: 1,
      imgSrc: profileImgSrc,
      completedCrop: profileCrop,
      setImgSrc: setProfileImgSrc,
      setCompletedCrop: setProfileCrop,
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

  // TODO 画像の品質を最適化
  // TODO スクロール位置保持。プレビュー切り替え時
  // TODO iOSシミュレータにおいて画像選択に失敗するときがあるので調査
  const handleCompleteCrop = (pixelCrop: PixelCrop): void => {
    if (!imgRef.current) throw new Error('No HTMLImageElement');
    const img = imgRef.current;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.imageSmoothingQuality = 'low';

    ctx.drawImage(
      img,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
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
