import { useState, useCallback, useRef, useEffect } from 'react';

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

import { useDataLayer } from '@/hooks';
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

// TODO hook切り出す
export function SelectImage({ buttonText, type }: Props) {
  // TODO 両方取って必要なのだけ抜き出すのいかがなものか
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

  const setting = {
    profile: {
      aspect: 1,
      renderedWidth: 128,
      imgSrc: profileImgSrc,
      completedCrop: profileCrop,
      setImgSrc: setProfileImgSrc,
      setCompletedCrop: setProfileCrop,
      setImage: setProfileImage,
      circularCrop: true,
    },
    cover: {
      aspect: 16 / 9,
      renderedWidth: 320,
      imgSrc: coverImgSrc,
      completedCrop: coverCrop,
      setImgSrc: setCoverImgSrc,
      setCompletedCrop: setCoverCrop,
      setImage: setCoverImage,
      circularCrop: false,
    },
  } as const;

  const {
    aspect,
    renderedWidth,
    imgSrc,
    completedCrop,
    setImgSrc,
    setCompletedCrop,
    setImage,
    circularCrop,
  } = setting[type];

  const [crop, setCrop] = useState<Crop | undefined>(completedCrop);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const dataLayer = useDataLayer({ componentName: 'SelectImage' });

  useEffect(() => {
    useImageStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setCrop(completedCrop);
  }, [completedCrop]);

  // TODO 2回ずつ呼ばれる
  const handleClickSelectFile = () => {
    dataLayer.pushEvent('clickSelectFile', { selectImageType: type });
  };

  // TODO 画像を再選択したら選択範囲が消える問題。IndexedDBからの読み出しの場合？
  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsImgLoading(true);
    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() ?? ''),
    );
    reader.readAsDataURL(e.target.files[0]);

    dataLayer.pushEvent('selectFile', { selectImageType: type });
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

    canvas.width = renderedWidth * devicePixelRatio;
    canvas.height = (renderedWidth / aspect) * devicePixelRatio;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      img,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    setCompletedCrop(pixelCrop);
    setImage(canvas.toDataURL('image/jpeg'));

    // TODO Rehydrateで呼ばれている可能性があるので確認
    dataLayer.pushEvent('completeCrop', { selectImageType: type });
  };

  return (
    <>
      <Box>
        <Button
          component="label"
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={handleClickSelectFile}
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
            circularCrop={circularCrop}
            ruleOfThirds
            keepSelection
          >
            {/* TODO width/heightを動的に取得してImageコンポーネントを使う */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imgSrc}
              onLoad={onImageLoad}
              style={{ maxHeight: '25vh' }}
              alt="Crop me"
            />
          </ReactCrop>
        </Box>
      )}
    </>
  );
}
