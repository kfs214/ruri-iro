import { useLayoutEffect } from 'react';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useLayout } from '@/hooks';

import { MainVisual } from './MainVisual';
import { PersonalPerspective } from './PersonalPerspective';
import { Preview } from './Preview';
import { Tag } from './Tag';

export function ProfileSheet() {
  // BEGIN 暫定対応 - スクロール位置初期化
  // TODO 恒久対応を別途実施する。スクロール位置初期化は暫定対応
  const { isPC } = useLayout();

  useLayoutEffect(() => {
    if (!isPC) {
      window.scrollTo(0, 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // END 暫定対応 - スクロール位置初期化

  return (
    <Preview>
      <CardMedia>
        <MainVisual />
      </CardMedia>
      <CardContent>
        <Box display="grid" gridTemplateColumns="minmax(0,1fr)" gap={1}>
          <PersonalPerspective />
          <Tag />
        </Box>
      </CardContent>
    </Preview>
  );
}
