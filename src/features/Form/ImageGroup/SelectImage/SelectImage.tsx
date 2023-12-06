import { useState, useCallback } from 'react';

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
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const { setCoverImage, setProfileImage } = useImageStore();

  // TODO プロフ画用の丸切り抜きに対応
  const setting = {
    cover: {
      aspect: 16 / 9,
      setter: setCoverImage,
    },
    profile: {
      aspect: 1,
      setter: setProfileImage,
    },
  } as const;

  // TODO 切り抜きが更新されたらBase64にしてGlobalStateに保存
  const { aspect, setter } = setting[type];

  const onSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setCrop(undefined); // Makes crop preview update between images.
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() ?? ''),
    );
    reader.readAsDataURL(e.target.files[0]);
  }, []);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    },
    [aspect],
  );

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
          {/* TODO CSSが当たっておらずCrop時の見た目が期待値と異なるのでサンプルを見る */}
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            {/* TODO 画像のサイズ制御 */}
            {/* TODO width/heightを動的に取得してImageコンポーネントを使う */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        </Box>
      )}
    </>
  );
}
